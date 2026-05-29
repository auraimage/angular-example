# AuraImage Angular Example

A minimal Angular app that uploads images to AuraImage and displays
transformed variants. Uses Angular 19, standalone components, signals,
TypeScript, and Tailwind CSS v4.

## Prerequisites

- **Node.js** 20 or later
- An **AuraImage account** — [sign up](https://auraimage.ai) if you don't have one
- The [AuraImage Node.js example](https://github.com/auraimage/node-example)
  running at `http://localhost:3001`

## Quick start

```bash
# 1. Clone and navigate
git clone https://github.com/auraimage/angular-example
cd angular-example

# 2. Make sure the Node.js example is running
cd ../node-example && npm run dev

# 3. Install dependencies
npm install

# 4. Start the dev server
npm start
```

Open `http://localhost:4200`. You should see a "Server: Connected" indicator,
a file input, and an upload area.

## How it works

1. On page load, the app pings `GET /api/health` (proxied to the Node.js
   example) and shows a connection status
2. Pick an image from your computer
3. The app requests a signed upload token from `POST /api/upload-token`
4. `@auraimage/sdk/client` uploads the image directly to the AuraImage CDN
   with the token
5. The CDN returns a URL — the app shows three transform presets
   (thumbnail, medium, full) as labeled cards with copyable URL snippets

The Angular dev server uses `proxy.conf.json` to forward `/api/*` to
`http://localhost:3001`, so no CORS configuration is needed on the frontend.

## Project structure

```
angular-example/
├── index.html                # HTML entry point
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── angular.json              # Angular CLI config
├── proxy.conf.json           # API proxy to Node.js backend
├── postcss.config.js         # Tailwind CSS v4 PostCSS plugin
├── LICENSE
├── README.md
└── src/
    ├── main.ts               # Bootstrap with standalone component
    ├── styles.css            # Tailwind CSS import
    └── app/
        ├── app.component.ts   # Upload + display logic (Angular signals)
        ├── app.component.html # Template with @if / @for control flow
        ├── app.component.css  # Component styles
        ├── app.config.ts      # Application config
        └── api.ts             # Health check + upload token helpers
```

## Links

- [AuraImage docs](https://auraimage.ai/docs)
- [Dashboard](https://app.auraimage.ai)
- [SDK on npm](https://www.npmjs.com/package/@auraimage/sdk)
