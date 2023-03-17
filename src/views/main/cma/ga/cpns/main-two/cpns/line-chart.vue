<template>
  <div class="line-chart">
    <p>VA1302 X tilt趨勢圖</p>
    <base-echart :options="options" height="160px" />
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
          left: 30,
          right: 30,
          bottom: 20,
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            data: [-15, 15, 15, 218, 135, 147, 260],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: "#0f0"
            },
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

<style lang="scss" scoped>
.line-chart {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 5px auto;
}
</style>
