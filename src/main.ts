import './style.css';
import type {ARScene} from "./types/ar.d.ts";
import { initTracking } from './tracking';
import { guardCamera, showFatal } from './camera';

if (!('AFRAME' in window)) {
    showFatal('AR libraries failed to load.');
    throw new Error('AFRAME missing — check the vendor scripts / copy plugin');
}

const scene = document.querySelector('a-scene') as ARScene | null;
const hud = document.querySelector<HTMLElement>('#hud');
const loader = document.querySelector<HTMLElement>('#loader');

if (!scene || !hud) {
    showFatal('Page failed to initialise.');
} else {
    guardCamera(scene);
    initTracking(scene, hud);

    const model = document.querySelector('[gltf-model]');
    model?.addEventListener('model-error', () => {
        hud.textContent = 'Could not load the 3D model — contact info is below.';
        hud.style.display = 'block';
    });

    // Accessibility: strip the spin entirely for users who ask for less motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        model?.removeAttribute('animation');
    }

    // Descriptors are several seconds of nothing on mobile. Say so.
    window.addEventListener('arjs-nft-loaded', () => loader?.remove());

    // If they never load, don't leave a spinner forever.
    setTimeout(() => {
        if (document.body.contains(loader)) {
            showFatal('Could not load tracking data. Check your connection and reload.');
        }
    }, 20_000);
}