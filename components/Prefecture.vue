<template>
  <nav class="prefecture">
    <h2>都道府県</h2>
    <ul class="prefecture-list">
      <li
        v-for="(prefecture, index) of prefectures"
        :key="index"
        class="prefecture-list-item"
      >
        <label class="prefecture-list-item-checkbox">
          <input type="checkbox" @change="update(prefecture)" />
          <span>{{ prefecture.prefName }}</span>
        </label>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export const API_ENDPOINT = 'https://opendata.resas-portal.go.jp/api/v1'
export type Prefecture = {
  prefCode: string
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
      selected: [],
    }
  },
  async fetch(): Promise<void> {
    const res = await this.$client.get('/prefectures')
    res.result.forEach((data: Prefecture) => {
      this.prefectures.push(data)
    })
  },
  mounted() {
    this.selected = this.$store.state.selected
  },
  methods: {
    update(prefecture: string) {
      this.selected.includes(prefecture)
        ? this.$store.commit('remove', { value: prefecture })
        : this.$store.commit('add', { value: prefecture })
    },
  },
})
</script>

<style lang="scss" scoped>
.prefecture-list {
  overflow: hidden;
}
.prefecture-list-item {
  float: left;
  margin-right: 1rem;
}
</style>
