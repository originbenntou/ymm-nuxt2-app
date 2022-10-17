export default {
  ssr: true,
  target: 'server',
  head: {
    title: 'ゆめみフロントエンドコーディング試験',
    htmlAttrs: {
      lang: 'ja-JP',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [{ src: '@assets/style.scss' }],

  plugins: ['@plugins/apiClient.ts'],

  components: true,

  buildModules: ['@nuxt/typescript-build'],

  modules: ['@nuxtjs/axios'],

  publicRuntimeConfig: {
    apiKey:
      process.env.NODE_ENV === 'production'
        ? process.env.API_KEY
        : process.env.API_KEY,
  },
  privateRuntimeConfig: {
    apiKey:
      process.env.NODE_ENV === 'production'
        ? process.env.API_KEY
        : process.env.API_KEY,
  },

  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? process.env.API_ENDPOINT
        : process.env.API_ENDPOINT,
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
      },
    },
    retry: { retries: 3 },
  },

  build: {},
}
