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
        { name: 'theme-color', content: '#ffffff' },
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
