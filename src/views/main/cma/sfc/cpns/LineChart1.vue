<template>
  <dv-border-box-11 :color="changeBoxColor" title="SFC 良率">
    <base-echart height="350px" :options="options" />
  </dv-border-box-11>
</template>

<script>
// 导入基础的图
import BaseEchart from "@/common/echart"
export default {
  name: "LineChart1",
  components: {
    BaseEchart
  },
  props: ["config"],
  computed: {
    changeBoxColor() {
      return this.$store.getters.theme == "dark" ? ["#8aaafb", "#1f33a2"] : ["#05dad4", "#2c97e1"]
    },
    options() {
      // 设置变量
      let themeColor = this.$store.getters.theme == "dark" ? "#fff" : "#000"
      let { legends = [], xData = [], showData = [] } = this.config
      let baseSerie = {
        type: "line",
        symbol: "circle",
        symbolSize: 15,
        smooth: true, // 设置拆线平滑
        lineStyle: {
          width: 5
        },
        label: {
          show: true,
          formatter: (params) => params.value + "%"
        }
      }
      return {
        color: ["#9669ff", "#3766f4", "#43cf7c", "#ff8d1a"],
        grid: {
          top: 95,
          right: 50,
          left: 80,
          bottom: 40 //图表尺寸大小
        },
        legend: {
          top: 50,
          right: 50,
          textStyle: {
            color: themeColor,
            fontSize: 14
          },
          data: legends
        },
        tooltip: {
          show: true,
          trigger: "axis", //axis , item
          backgroundColor: "RGBA(0, 49, 85, 1)",
          borderColor: "rgba(0, 151, 251, 1)",
          borderWidth: 1,
          borderRadius: 0,
          textStyle: {
            color: "#BCE9FC",
            fontSize: 16,
            align: "left"
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          color: "#59588D",
          data: xData,
          axisLabel: {
            margin: 10,
            color: themeColor,
            textStyle: {
              fontSize: 16
            }
          },
          axisLine: {
            symbol: ["none", "arrow"],
            symbolOffset: [0, 10],
            lineStyle: {
              color: themeColor,
              opacity: 1
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: themeColor,
              opacity: 1
            }
          }
        },
        yAxis: [
          {
            type: "value",
            min: (value) => value.min, // 指定最小值
            max: (value) => value.max, // 指定最大值
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: themeColor,
              textStyle: {
                fontSize: 16
              },
              formatter: function (value) {
                return value + "%"
              }
            },
            axisLine: {
              show: true,
              symbol: ["none", "arrow"],
              symbolOffset: [0, 10],
              lineStyle: {
                color: themeColor,
                opacity: 1
              }
            }
          }
        ],
        series: legends.map((item, index) => {
          return { ...baseSerie, name: legends[index], data: showData[index] }
        })
      }
    }
  }
}
</script>
