// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'motion-v/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    // The page only uses the native `content.get()` API, so the v3 compatibility layer
    // (`queryCollection()`, `<MDC>`, ...) is turned off.
    v3Composables: false,
    // The only page is prerendered with its data in the payload, so the browser never queries
    // content: `server-only` skips shipping the content manifest, snapshot and client runtime.
    mode: 'server-only'
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  prerender: {
    routes: [
      '/'
    ]
  }
})
