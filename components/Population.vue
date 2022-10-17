<template>
  <section>
    <LineChart
      style="box-sizing: border-box"
      :chart-data="chartData"
      :chart-options="chartOptions"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import randomColor from 'randomcolor'
import { Prefecture } from '~/components/Prefecture.vue'
import LineChart from '~/components/LineChart.vue'

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
        datasets: [],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  watch: {
    // eslint-disable-next-line vue/no-arrow-functions-in-watch
    selected(value) {
      this.chartData = {
        labels: [],
        datasets: [],
      }
      value.forEach(async (v: any) => {
        const res = await this.$client.get(
          `/population/composition/perYear?prefCode=${v.prefCode}&cityCode=-`
        )

        this.chartData.labels = res.result.data[0].data.map((d: any) => {
          return d.year
        })

        const values = res.result.data[0].data.map((d: any) => {
          return d.value
        })
        this.chartData.datasets.push({
          label: `${v.prefName}`,
          backgroundColor: randomColor(),
          data: values,
        })
      })
    },
  },
  mounted() {
    this.selected = this.$store.state.selected
  },
})
</script>
