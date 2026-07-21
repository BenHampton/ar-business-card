# Augmented Reality Business Card

- Github Repo: https://github.com/AR-js-org

- Raw Hiro marker: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png

- NFT-Marker-Creator: https://ar-js-org.github.io/NFT-Marker-Creator/

- Generator: https://carnaux.github.io/NFT-Marker-Creator/#/

- Free glb: https://poly.pizza/
    - Chicken by jeremy [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/1YE8U35HXsI)

# Start Locally
- `npx live-server --port=3000`
- `npx ngrok http 3000`


# Project Tree
```ignorelang
ar-business-card/
├─ index.html              # markup only — the scene, HUD, fallback
├─ src/
│  ├─ main.ts              # entry point; wires the modules together
│  ├─ tracking.ts          # markerFound/markerLost → HUD state
│  ├─ camera.ts            # getUserMedia probe, guards, showFatal
│  └─ styles.css           # imported by main.ts; Vite bundles + hashes it
├─ types/
│  └─ ar.d.ts              # hand-written declarations for the AR surface
├─ public/
│  └─ assets/              # descriptors + .glb — copied verbatim, NOT bundled
│     ├─ card.fset
│     ├─ card.fset3
│     ├─ card.iset
│     └─ card-model.glb
├─ design/
│  └─ card.png             # source artwork — never loaded at runtime
├─ .github/workflows/
│  └─ deploy.yml
├─ vite.config.ts
├─ tsconfig.json
├─ package.json
├─ README.md
├─ LICENSE
└─ .gitignore
```