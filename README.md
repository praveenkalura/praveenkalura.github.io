# praveenkalura

Personal website of Dr. Praveen Kalura.

This repository is a Vite + React site deployed to GitHub Pages. The editable source lives in `src/`, and GitHub Actions generates the production build from that source.

## Editing Content

- Main content: `src/data/content.js`
- Image URLs: `src/data/images.js`
- User-managed static images: `public/images/`

To use a local image, place it in `public/images/` and reference it with a path such as `/images/profile.jpg`.

## Local preview

```bash
npm install
npm run dev
```

Then open the localhost URL printed by Vite.

## Publication Metrics

Publication DOIs and citation counts live in `src/data/content.js`. Citation counts are pulled from Dr. Praveen Kalura's Google Scholar profile and were last checked on the `citationUpdated` date in each publication entry.

Google Scholar does not expose an official public browser API, so this static site refreshes citations at build time through SerpAPI's Google Scholar endpoint when a server-side `SERPAPI_API_KEY` is available:

```bash
SERPAPI_API_KEY=your_key npm run refresh:scholar
```

`npm run build` runs the same refresh step automatically and skips it when no key is configured, keeping API keys out of the deployed browser bundle.

## GitHub Pages

Push to `main`. The GitHub Pages workflow installs dependencies, builds the Vite app, and publishes the generated `dist/` folder.
