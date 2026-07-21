import type {ARScene} from "./types/ar.d.ts";

export function initTracking(scene: ARScene, hud: HTMLElement): void {
    // Events bubble to the scene — listen there, not on the marker node.
    // This survives swapping <a-nft> for <a-marker> and back.
    scene.addEventListener('markerFound', () => {
        hud.style.display = 'none';
    });

    scene.addEventListener('markerLost', () => {
        hud.textContent = 'Card lost — point back at it';
        hud.style.display = 'block';
    });
}