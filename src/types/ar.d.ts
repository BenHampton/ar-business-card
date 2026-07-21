interface ARSceneEventMap extends HTMLElementEventMap {
    'markerFound': CustomEvent;
    'markerLost': CustomEvent;
    'arjs-video-loaded': CustomEvent;
}

export interface ARScene extends HTMLElement {
    addEventListener<K extends keyof ARSceneEventMap>(
        type: K,
        listener: (ev: ARSceneEventMap[K]) => void
    ): void;
}

// Fired on window, NOT the scene — a real asymmetry in AR.js.
// Encoding it here means you can't get it wrong at the call site.
declare global {
    interface WindowEventMap {
        'arjs-nft-loaded': CustomEvent;
    }
}