import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            src: fileURLToPath(new URL('./src', import.meta.url)),
            shared: fileURLToPath(new URL('./shared', import.meta.url)),
        },
    },
    // Lokaal draait de Worker (wachtlijst en tellers) apart met `npm run dev:api`; de dev server stuurt /api daarheen.
    server: {
        proxy: { '/api': 'http://localhost:8787' },
    },
});
