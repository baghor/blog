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

Pushing to `master` runs `.github/workflows/deploy.yml`, which generates the site and
publishes it to the `gh-pages` branch. `public/CNAME` holds the custom domain.
