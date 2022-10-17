<template>
  <div :id="id" ref="echartDivRef" :class="classname" :style="{ width, height }"></div>
</template>

<script>
export default {
  name: "base-echart",
  props: {
    id: {
      type: String,
      default: "chart"
    },
    classname: {
      type: String,
      default: "container"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "250px"
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      myChart: null
    }
  },
  watch: {
    options: {
      handler(newOption) {
        this.myChart.setOption(newOption, true)
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(this.$el, null, { renderer: "canvas" })
      this.myChart.off("click")
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(this.options)
      this.myChart.on("click", (params) => {
        this.$emit("echartClick", params)
      })
    }
  },
  beforeDestroy() {
    this.myChart.dispose()
    this.myChart = null
  }
}
</script>
