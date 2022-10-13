<template>
  <section>
    <div>
      <LineChart :chart-data="chartData" :chart-options="chartOptions" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import randomColor from "randomcolor"
import { Prefecture, API_ENDPOINT } from "~/components/Prefecture.vue"
import LineChart from "~/components/LineChart.vue"


type ComponentDataType = {
  selected: Array<Prefecture>
  chartData: any
  chartOptions: any
}

export default Vue.extend({
  name: 'PopulationComponent',
  components: { LineChart },
  data(): ComponentDataType {
    return {
      selected: [],
      chartData: {
        labels: [],
        datasets: []
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
    }
  },
  watch: {
    // eslint-disable-next-line vue/no-arrow-functions-in-watch
    selected(value) {
      this.chartData = {
        labels: [],
        datasets: []
      }
      value.forEach(async (v: any) => {
        const res = await this.$axios.$get(`/population/composition/perYear?prefCode=${v.prefCode}&cityCode=`, {
          headers: {"X-API-KEY": this.$config.apiKey}
        })

        const labels = res.data.result.data[0].data.map((d: any) => {
          return d.year
        })
        this.chartData.labels = labels

        const values = res.data.result.data[0].data.map((d: any) => {
          return d.value
        })
        this.chartData.datasets.push({
          label: `${v.prefName}`,
          backgroundColor: randomColor(),
          data: values
        })
      })
    }
  },
  mounted() {
    this.selected = this.$store.state.selected
  },
})
</script>
