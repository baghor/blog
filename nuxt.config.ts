// Static site: `npm run generate` writes it to .output/public for GitHub Pages
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · Ineza Irene Baghor',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Ineza Irene Baghor, software engineer in Kigali and founder of Invaincu Ltd. Building fast, robust web products with Laravel, Vue and Nuxt.',
        },
        { name: 'theme-color', content: '#0b1220' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap',
        },
      ],
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
})
