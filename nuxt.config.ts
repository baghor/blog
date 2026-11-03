// Static site: `npm run generate` writes it to .output/public for GitHub Pages
// Published on GitHub Pages at baghor.github.io/Irene-Portfolio/
const baseURL = '/Irene-Portfolio/'
const siteUrl = `https://baghor.github.io${baseURL}`
const shareTitle = 'Ineza Irene Baghor · Software Engineer'
const shareDescription =
  'Software engineer in Kigali and founder of Invaincu Ltd, engineering fast, robust web products with Laravel, Vue and Nuxt.'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · Ineza Irene Baghor',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Ineza Irene Baghor, software engineer in Kigali and founder of Invaincu Ltd, engineering fast, robust web products with Laravel, Vue and Nuxt.',
        },
        { name: 'theme-color', content: '#ffffff' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Ineza Irene Baghor' },
        { property: 'og:url', content: siteUrl },
        { property: 'og:title', content: shareTitle },
        { property: 'og:description', content: shareDescription },
        { property: 'og:image', content: `${siteUrl}og-image.jpg` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Ineza Irene Baghor, Software Engineer and Founder of Invaincu Ltd' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      /*
       * Runs before the first paint: picks the saved theme (else the system one)
       * so dark mode never flashes white. `js` lets the scroll animations hide
       * content until it is revealed; if the app never starts, it is removed.
       */
      script: [
        {
          innerHTML:
            "(function(){var d=document.documentElement,t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t;d.classList.add('js');setTimeout(function(){if(!window.__motion)d.classList.remove('js')},4000)})()",
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: `${baseURL}favicon.svg` },
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
