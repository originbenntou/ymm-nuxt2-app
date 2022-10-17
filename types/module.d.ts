import { APIClientInterface } from '~/plugins/apiClient'

declare module 'vue/types/vue' {
  interface Vue {
    $client: APIClientInterface
  }
}

declare module '@nuxt/types' {
  interface Context {
    $client: APIClientInterface
  }
}
