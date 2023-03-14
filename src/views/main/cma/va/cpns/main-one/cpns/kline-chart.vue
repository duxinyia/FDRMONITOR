<template>
  <div class="kline-chart">
    <p>VA1302 X/Y tilt</p>
    <base-echart :options="options" height="200px" />
  </div>
</template>

<script>
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "kline-chart",
  components: {
    baseEchart
  },
  computed: {
    options() {
      return {
        xAxis: {
          boundaryGap: 0,
          gridIndex: 0,
          data: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
          splitLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff"
            }
          }
        },
        grid: {
          left: 30,
          right: 10,
          bottom: 20,
          top: 10
        },
        tooltip: {
          trigger: "axis",
          formatter: function (p) {
            if (p.seriesType === "line") return ""
            return `${p[0].name}<br/>${p[0].marker}中位数：${
              (p[0].value[1] + p[0].value[2]) / 2
            }次<br/>${p[0].marker}上四分位数：${p[0].value[1]}次<br/>${p[0].marker}下四分位数：${
              p[0].value[2]
            }次<br/>${p[0].marker}上极限：${p[0].value[4]}次<br/>${p[0].marker}下极限：${
              p[0].value[3]
            }次`
          }
        },
        yAxis: {
          max: 140,
          min: 0,
          splitNumber: 7,
          axisTick: {
            show: true
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            type: "candlestick",
            itemStyle: {
              // color: "#FCB618",
              // color0: "#FCB618",
              color: "#2e6099",
              color0: "#2e6099",
              borderColor: "#fff",
              borderColor0: "#fff"
            },
            data: [
              [55, 45, 38, 60],
              [85, 65, 62, 90],
              [110, 90, 85, 120],
              [45, 75, 40, 80],
              [90, 105, 85, 110],
              [85, 65, 62, 90],
              [60, 75, 55, 80],
              [98, 110, 90, 120]
            ]
          },
          {
            name: "时段01",
            type: "line",
            data: [50, 75, 100, 60, 97, 75, 67, 104],
            symbolSize: 0,
            lineStyle: {
              color: "#fff",
              width: 1
            },
            z: 10
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.kline-chart {
  text-align: center;
}
</style>
