<template>
  <div class="line-chart">
    <base-echart :options="options" height="170px" />
  </div>
</template>

<script>
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "line-chart",
  components: {
    baseEchart
  },
  computed: {
    options() {
      return {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            color: "#fff",
            showMaxLabel: false
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            color: "#fff",
            showMaxLabel: false
          }
        },
        grid: {
          borderWidth: 0,
          top: 10,
          left: 50,
          right: 10,
          bottom: 30,
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            data: [-15, 15, 15, 218, 135, 147, 260],
            type: "line",
            lineStyle: {
              color: "yellow"
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
