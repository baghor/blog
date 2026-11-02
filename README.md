# Ineza Irene Baghor · Portfolio

Personal site, built with [Nuxt 4](https://nuxt.com) and generated as a static site.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # static site in .output/public
```

## Add a project

Add an entry to `app/data/projects.ts`. It appears under Projects on the home page
and gets its own page at `/projects/<slug>`.

## Deploy

The site is live at https://baghor.github.io/Irene-Portfolio/, served by GitHub Pages from the
`test` branch of [baghor/Irene-Portfolio](https://github.com/baghor/Irene-Portfolio).

To publish, run `npm run generate` and commit the contents of `.output/public` to that branch.
`baseURL` in `nuxt.config.ts` must match the address, and `public/.nojekyll` must stay, or GitHub
drops the `_nuxt` folder.
