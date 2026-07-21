import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    base: '/ar-business-card/',
    build: { target: 'es2020' },
    server: {
        host: true,
        allowedHosts: true, // allow ngrok NOT for Production use
    },   // exposes the dev server on your LAN for phone testing
    plugins: [
        // A-Frame and AR.js are browser-global classic scripts, not modules —
        // they don't survive bundling (Step 03 explains). Importing them means
        // betting on side-effect ordering that breaks silently across versions,
        // so we rejected the idiomatic path ON PURPOSE: this plugin emits the
        // pinned files into vendor/ for both dev and dist/, every build, with
        // no human in the loop. Boring and deterministic beats clever here.
        // If the aframe filename differs: ls node_modules/aframe/dist
        viteStaticCopy({
            targets: [
                { src: 'node_modules/aframe/dist/aframe-v1.6.0.min.js',
                    dest: 'vendor', rename: { stripBase: true, name: 'aframe.min.js' } },
                { src: 'node_modules/@ar-js-org/ar.js/aframe/build/aframe-ar-nft.js',
                    dest: 'vendor', rename: { stripBase: true } },
            ],
        }),
    ],
});