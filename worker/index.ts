import { apiPaths, clickSources, clickTargets, siteLanguages } from '../shared/siteApi';
import type { ClickRequest, WaitlistRequest } from '../shared/siteApi';

// De Worker serveert de site (dist/, via de ASSETS-binding) en handelt /api/* af: de wachtlijst en de klik-tellers in D1.
// Alleen /api/* komt hier binnen (run_worker_first in wrangler.jsonc); al het andere gaat rechtstreeks naar de statische bestanden.

interface Env {
    ASSETS: Fetcher;
    DB: D1Database;
    WAITLIST_LIMITER: RateLimit;
    CLICKS_LIMITER: RateLimit;
}

const allowedOrigins = ['https://expedition-games.com', 'https://www.expedition-games.com'];
const maxBodyBytes = 2048;
const maxEmailLength = 254;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function respond(status: number, body?: Record<string, string>) {
    return body
        ? Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
        : new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });
}

function isOneOf<T extends string>(values: readonly T[], value: unknown): value is T {
    return values.includes(value as T);
}

// Alleen verzoeken vanaf de site zelf (en lokaal); geen bescherming tegen een vastberaden bot, wel tegen andere sites en losse scripts.
function isAllowedOrigin(request: Request) {
    const origin = request.headers.get('Origin');
    if (!origin) {
        return false;
    }

    return allowedOrigins.includes(origin) || new URL(origin).hostname === 'localhost';
}

async function readJson(request: Request): Promise<unknown> {
    const text = await request.text();
    if (text.length > maxBodyBytes) {
        throw new Error('too large');
    }

    return JSON.parse(text);
}

// Een IP-adres alleen als sleutel voor de rate limiter; het wordt nergens opgeslagen.
async function isRateLimited(limiter: RateLimit, request: Request) {
    const key = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    const { success } = await limiter.limit({ key });

    return !success;
}

async function handleWaitlist(request: Request, env: Env) {
    if (await isRateLimited(env.WAITLIST_LIMITER, request)) {
        return respond(429, { error: 'rate_limited' });
    }

    const body = (await readJson(request)) as Partial<WaitlistRequest>;

    // Bot: doe alsof het gelukt is, maar sla niets op.
    if (body.website) {
        return respond(204);
    }

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (email.length > maxEmailLength || !emailPattern.test(email)) {
        return respond(400, { error: 'invalid_email' });
    }
    if (!isOneOf(siteLanguages, body.language) || !isOneOf(clickSources, body.source)) {
        return respond(400, { error: 'invalid_request' });
    }

    // Staat het adres er al, dan gebeurt er niets; het antwoord is hetzelfde, zodat niemand kan uitzoeken wie er op de lijst staat.
    await env.DB.prepare(
        'INSERT INTO waitlist (email, language, source, created_at) VALUES (?1, ?2, ?3, ?4) ON CONFLICT(email) DO NOTHING',
    )
        .bind(email, body.language, body.source, new Date().toISOString())
        .run();

    return respond(204);
}

// Een teller per dag, knop en plek op de pagina. Geen IP, geen cookie, geen bezoeker: alleen een aantal.
async function handleClick(request: Request, env: Env) {
    if (await isRateLimited(env.CLICKS_LIMITER, request)) {
        return respond(429, { error: 'rate_limited' });
    }

    const body = (await readJson(request)) as Partial<ClickRequest>;
    if (!isOneOf(clickTargets, body.target) || !isOneOf(clickSources, body.source)) {
        return respond(400, { error: 'invalid_request' });
    }

    const day = new Date().toISOString().slice(0, 10);
    await env.DB.prepare(
        'INSERT INTO clicks (day, target, source, count) VALUES (?1, ?2, ?3, 1) ON CONFLICT(day, target, source) DO UPDATE SET count = count + 1',
    )
        .bind(day, body.target, body.source)
        .run();

    return respond(204);
}

export default {
    async fetch(request, env) {
        const { pathname } = new URL(request.url);
        const routes: Record<string, (request: Request, env: Env) => Promise<Response>> = {
            [apiPaths.waitlist]: handleWaitlist,
            [apiPaths.clicks]: handleClick,
        };
        const handler = routes[pathname];

        if (!handler) {
            return pathname.startsWith('/api/') ? respond(404, { error: 'not_found' }) : env.ASSETS.fetch(request);
        }
        if (request.method !== 'POST') {
            return respond(405, { error: 'method_not_allowed' });
        }
        if (!isAllowedOrigin(request)) {
            return respond(403, { error: 'forbidden' });
        }

        try {
            return await handler(request, env);
        } catch {
            return respond(400, { error: 'invalid_request' });
        }
    },
} satisfies ExportedHandler<Env>;
