// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@/assets/css/main.css',
  ],

  routeRules:{
    '/profile': { ssr: false },
    '/edit-business': { ssr: false },
    '/PostBussines': { ssr: false },
    '/payment': {ssr: false}
  },

  app: {
    head: {
      title: 'Grupo Negocios & más',
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.jpg" }],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Busca y encuentra ese negocio que necesitas en Grupo Negocios & más, El buscador de negocios que te ofrece la mejor selección de opciones.' },
      ],
      script: [
        {
          src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD4T85-FkXl586zyEpYLy32ipUyGAvLSAs',
          defer: true
        }
      ]
    },
  },

  modules: [
    'nuxt-icons',
    'nuxt-viewport',
    'nuxt-swiper',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    'nuxt-schema-org',
    '@nuxt/image'
  ],

  viewport: {
    breakpoints: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
    defaultBreakpoints: {
      desktop: 'lg',
      mobile: 'xs',
      tablet: 'md',
    },
    fallbackBreakpoint: 'lg'
  },

  postcss: {
    plugins: {
      'tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      API: process.env.BASE_URL,
      PUBLISH_KEY: process.env.PUBLISH_KEY
    }
  },
  
  build: {
    transpile: ['@vuepic/vue-datepicker', 'swiper']
  },

  vite: {
    build: {
      rollupOptions: {
        treeshake: true,
        output: {
          experimentalMinChunkSize: 50000,
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
          chunkFileNames: '_nuxt/chunks/[name]-[hash].js',
          entryFileNames: '_nuxt/entries/[name]-[hash].js',
          assetFileNames: '_nuxt/assets/[name]-[hash].[ext]',
        },
      },
    },
  },

  experimental: {
    renderJsonPayloads: false
  },
  
  schemaOrg: {
    reactive: true,
  },

  compatibilityDate: '2025-03-17'
})