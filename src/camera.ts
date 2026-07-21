import type {ARScene} from "./types/ar.d.ts";

export function showFatal(msg: string): void {
    // Inline styles deliberately: this runs AFTER wiping the DOM, and it's
    // exactly the moment you can't assume the stylesheet loaded.
    document.body.innerHTML =
        `<div style="position:fixed; inset:0; display:flex;
      align-items:center; justify-content:center; padding:24px;
      background:#0a0d0f; color:#fff; text-align:center;
      font-family:system-ui,sans-serif; font-size:18px;
      line-height:1.5;">${msg}</div>`;
}

export function guardCamera(scene: ARScene): void {
    scene.addEventListener('arjs-video-loaded', () => {
        console.info('Camera stream OK');
    });

    // TWO distinct failures. Feature detection only catches the first one,
    // and the second is far more common.
    if (!navigator.mediaDevices?.getUserMedia) {
        showFatal("This browser can't access the camera. Try Chrome or Safari.");
        return;
    }

    // Probe it ourselves. Browsers cache the grant for the session, so AR.js's
    // own request typically reuses it without a second prompt — behaviour
    // varies slightly by browser, but a double prompt is harmless.
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => stream.getTracks().forEach((t) => t.stop()))
        .catch((err: DOMException) => {
            if (err.name === 'NotAllowedError') {
                showFatal('Camera access was denied. Allow camera permission in ' +
                    'your browser settings, then reload.');
            } else {
                showFatal(`No usable camera found (${err.name}).`);
            }
        });
}