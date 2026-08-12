# AuraImage Angular Example

[![Images powered by AuraImage](https://img.shields.io/badge/Images%20powered%20by-AuraImage-0b0b0b?style=flat-square)](https://auraimage.ai)

A minimal Angular app that uploads images to AuraImage and displays
transformed variants. Uses Angular 19, standalone components, signals,
TypeScript, and Tailwind CSS v4.

---

## Prerequisites

- **Node.js** 20 or later — check with `node --version`
- An **AuraImage account** — [sign up here](https://auraimage.ai)
- The [AuraImage Node.js example](https://github.com/auraimage/node-example)
  set up and running (it's the backend that signs upload tokens)

---

## Quick start

### Step 1 — Make sure the Node.js example is running

This Angular app needs a backend to sign upload tokens. If you haven't already,
clone and start the Node.js example in a **separate terminal**:

```bash
git clone https://github.com/auraimage/node-example
cd node-example
cp .env.example .env
# Edit .env with your AURAIMAGE_SECRET_KEY and AURAIMAGE_PROJECT_NAME
npm install
npm run dev
```

Leave that terminal open. Verify it's working:

```bash
curl http://localhost:3001/api/health
```

Expected: `{ "status": "ok" }`.

### Step 2 — Clone this Angular app

Open a **new terminal** (keep the Node.js server running):

```bash
git clone https://github.com/auraimage/angular-example
cd angular-example
```

### Step 3 — Install

```bash
npm install
```

### Step 4 — Start

```bash
npm start
```

### Step 5 — Try it

Open `http://localhost:4200` in your browser. You should see:

1. A page titled **"AuraImage Angular Example"**
2. A green **"Server: Connected"** indicator
3. A file input button

Pick an image. You'll see:

- **"Uploading..."** while uploading
- Three cards showing your image at different sizes:
  - **Thumbnail 200w WebP** — cropped, WebP
  - **Medium 600w AVIF** — medium, AVIF format
  - **Full 1200w** — full resolution
- Each card shows the exact CDN URL used

---

## What if something goes wrong?

| Problem | What to check |
|---|---|
| Red "Server: Not running" | Node.js server isn't running or not on port 3001 |
| "Upload failed" | Secret key is invalid, revoked, or project name is wrong |
| Build errors | Run `npm install` again, make sure Node.js 20+ |
| Port 4200 in use | Angular will prompt for another port — use it |

---

## How it works

1. On load, the app pings `/api/health` (proxied via `proxy.conf.json` to
   `localhost:3001`)
2. When you pick a file, it calls `POST /api/upload-token` for a signed token
3. `@auraimage/sdk/client` uploads the image straight to the CDN
4. Three transform presets display as labeled cards

---

## Project structure

```
angular-example/
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── angular.json              # Angular CLI config
├── proxy.conf.json           # API proxy to Node.js backend
├── postcss.config.js         # Tailwind CSS v4 PostCSS plugin
├── LICENSE
├── README.md
└── src/
    ├── index.html            # HTML entry
    ├── main.ts               # Bootstrap standalone component
    ├── styles.css            # Tailwind CSS import
    └── app/
        ├── app.component.ts   # Upload + display (Angular signals)
        ├── app.component.html # Template with @if / @for control flow
        ├── app.component.css
        ├── app.config.ts      # Application providers
        └── api.ts             # fetch() helpers
```

---

## Links

- [AuraImage docs](https://auraimage.ai/docs)
- [Dashboard](https://app.auraimage.ai)
- [@auraimage/sdk on npm](https://www.npmjs.com/package/@auraimage/sdk)

---

Images powered by [AuraImage](https://auraimage.ai) — the image CDN that
installs itself. Set it up in any project with `npx aura init`, or from your
AI agent with [Agent Skills](https://github.com/auraimage/skills) and the
[MCP server](https://github.com/auraimage/mcp-server).

### Contributing

This repository is generated from the AuraImage monorepo, so pull requests
opened here are overwritten on the next sync. Please
[open an issue](https://github.com/auraimage/skills/issues) instead — bugs
in this example are fixed upstream and mirrored back within minutes.
