<template>
  <section>
    <h2>都道府県</h2>
    <ul class="">
      <li v-for="(prefecture, index) of prefectures" :key="index">
        <label>
          <input type="checkbox" @change="update(prefecture)" >
          <span>{{ prefecture.prefName }}</span>
        </label>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from "vue"


export const API_ENDPOINT = "https://opendata.resas-portal.go.jp/api/v1"
export type Prefecture = {
  prefCode: string,
  prefName: string
}

type ComponentDataType = {
  prefectures: Array<Prefecture>
  selected: Array<string>
}

export default Vue.extend({
  name: 'PrefectureComponent',
  data(): ComponentDataType {
    return {
      prefectures: [],
      selected: []
    }
  },
  async fetch(): Promise<void> {
    const res = await this.$axios.get("/prefectures", {
      headers: {"X-API-KEY": this.$config.apiKey}
    })
    res.data.result.forEach((data: Prefecture) => {
      this.prefectures.push(data)
    })
  },
  mounted() {
    this.selected = this.$store.state.selected
  },
  methods: {
    update(prefecture: string) {
      this.selected.includes(prefecture)
        ? this.$store.commit("remove", { value: prefecture })
        : this.$store.commit("add", { value: prefecture })
    }
  }
})
</script>
