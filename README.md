# Grandline Talent

## [Open the Grandline Talent website ↗](https://hwangsukjoo101.github.io/grandline-talent/)

React JavaScript website built with Vite and Tailwind CSS. No login is required to visit.

## Local development

Install Node.js 22 or newer and pnpm. Then:

```sh
git clone https://github.com/hwangsukjoo101/grandline-talent.git
cd grandline-talent
pnpm install
pnpm dev
```

Open the local URL printed by Vite. React Fast Refresh updates the page while you edit.

## Build and publish

Run `pnpm build` to build the website into `docs/`. Run `pnpm preview` to preview that build locally. Commit source and the rebuilt `docs/` folder to `main`; GitHub Pages publishes from `main → /docs`.

## Source

- `src/main.jsx`: React root
- `src/App.jsx`: presentation, contact dropdown, challenge filtering and practice dialog
- `src/challenges.js`: challenge data
- `src/style.css`: Tailwind import and responsive deep navy styling
- `vite.config.js`: React, Tailwind, and GitHub Pages build configuration
