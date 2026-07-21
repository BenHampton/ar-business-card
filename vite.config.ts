import { defineConfig } from 'vite';

export default defineConfig({
    base: '/ar-business-card/',
    build: { target: 'es2020' },
    server: { host: true },   // exposes the dev server on your LAN for phone testing
});