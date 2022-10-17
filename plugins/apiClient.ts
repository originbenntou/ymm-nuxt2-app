import { Plugin, Context } from "@nuxt/types"

export interface APIClientInterface {
  get (url: string): Promise<any>
}

const APIClientPlugin: Plugin = (ctx: Context, inject) => {
  inject('client', new APIClient(ctx))
}

class APIClient implements APIClientInterface {
  axios
  config
  error

  constructor(ctx: Context) {
    this.axios = ctx.$axios
    this.config = ctx.$config
    this.error = ctx.error
  }

  async get(url: string): Promise<any> {
    return await this.axios.$get(url, {
      headers: {
        'X-API-KEY': this.config.apiKey
      }
    })
  }
}

export default APIClientPlugin
