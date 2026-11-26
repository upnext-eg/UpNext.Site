import { apiPaths } from 'shared/siteApi';
import type { ClickSource, ClickTarget, WaitlistRequest } from 'shared/siteApi';

export type WaitlistResult = 'ok' | 'invalidEmail' | 'rateLimited' | 'failed';

// Aanmelden voor de wachtlijst bij de Worker (worker/index.ts). Een adres dat er al op staat geeft ook 'ok'.
export async function joinWaitlist(request: WaitlistRequest): Promise<WaitlistResult> {
    try {
        const response = await fetch(apiPaths.waitlist, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });

        if (response.ok) {
            return 'ok';
        }
        if (response.status === 429) {
            return 'rateLimited';
        }
        if (response.status === 400) {
            const body = (await response.json().catch(() => null)) as { error?: string } | null;

            return body?.error === 'invalid_email' ? 'invalidEmail' : 'failed';
        }

        return 'failed';
    } catch {
        return 'failed';
    }
}

// Tel een klik op Download of een store-knop. Fire-and-forget: een mislukte telling mag de bezoeker nooit merken.
// keepalive: de telling gaat ook door als de klik naar een andere pagina leidt (straks de echte store).
export function trackClick(target: ClickTarget, source: ClickSource) {
    fetch(apiPaths.clicks, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, source }),
        keepalive: true,
    }).catch(() => {});
}
