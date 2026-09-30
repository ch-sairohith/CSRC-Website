# CSRC Website

React client and Express API in one repo.

- `client` — Vite + React, dev server on port 5173
- `server` — Express API on port 5000

In development, the Vite server proxies `/api` to Express, so the browser talks to one origin.

## Setup

```bash
npm install
cp server/.env.example server/.env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the API and the React app |
| `npm run build` | Builds the client into `client/dist` |
| `npm start` | Serves the API and the built client |

## Production

```bash
npm run build
NODE_ENV=production npm start
```

The API then serves the built site and the `/api` routes from port 5000.
