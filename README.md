# Blogside (MCnotes starter)

React + Vite dev-blog starter focused on:
- modular post blocks (cards + timeline)
- native dark mode tokens
- fast Ctrl/⌘K search (FlexSearch, lazy-loaded)
- GitHub Actions deploy to GitHub Pages on merge to `main`

## 1) Local dev
```bash
npm install
npm run dev
```

## 2) Add a post
Create a new JSON file in:
`src/content/posts/*.json`

Then run:
```bash
npm run build
```
(`prebuild` generates `src/generated/search-index.json` automatically.)

## 3) Deploy (GitHub Pages)
This repo is configured for GitHub Actions Pages deploy.

### One-time GitHub settings
On GitHub: **Repo → Settings → Pages**
- **Build and deployment** → **Source**: select **GitHub Actions**

Then push/merge into `main`.
The workflow will build + publish `dist/`.

## 4) IMPORTANT: base path
This starter assumes your repo is named **Blogside** and pages URL is:
`https://<user>.github.io/Blogside/`

If you rename the repo, update both:
- `vite.config.ts` -> `base`
- `src/main.tsx` -> `<BrowserRouter basename="...">`

---

Performance notes:
- Search index is lazy-loaded (not on initial render).
- Posts load from JSON via `import.meta.glob` (no runtime fetch).
