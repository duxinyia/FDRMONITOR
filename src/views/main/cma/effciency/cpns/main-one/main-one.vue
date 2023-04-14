<template>
  <div class="main-one">
    <dv-border-box-12>
      <base-echart :options="options" />
    </dv-border-box-12>
  </div>
</template>

<script>
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "main-one",
  props: {},
  components: {
    baseEchart
  },
  data() {
    return {
      chart2Xdata: [1, 2, 3, 4, 5, 6],
      chart2TargetOut: [99, 98, 95, 90, 89, 85]
    }
  },
  computed: {
    options() {
      // 设置变量
      let themeColor = this.$store.getters.theme == "dark" ? "#fff" : "#000"
      let { chart2Xdata, chart2TargetOut } = this
      return {
        grid: {
          top: 40,
          right: 50,
          left: 70,
          bottom: 30 //图表尺寸大小
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

        legend: [
          {
            top: 0,
            right: 80,
            textStyle: {
              color: themeColor,
              fontSize: 12
            },
            data: ["計劃"]
          }
        ],
        xAxis: {
          type: "category",
          color: "#59588D",
          data: chart2Xdata,
          axisLabel: {
            margin: 10,
            color: themeColor,
            fontSize: 12
          },
          axisLine: {
            lineStyle: {
              color: themeColor,
              opacity: 1
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: themeColor,
              opacity: 0.5,
              type: "dotted"
            }
          }
        },
        yAxis: [
          {
            position: "left",
            axisLabel: {
              color: themeColor,
              fontSize: 14
            },
            axisLine: {
              lineStyle: {
                color: themeColor,
                opacity: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: themeColor,
                opacity: 0.5,
                type: "dotted"
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            name: "計劃",
            data: chart2TargetOut,
            barWidth: "16",
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(184,123,255,1)"
                },
                {
                  offset: 1,
                  color: "rgba(45,57,178,1)"
                }
              ])
            },
            label: {
              show: true,
              position: "top",
              fontSize: 12,
              fontWeight: "bold",
              color: themeColor
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
}
.main-one {
  height: 270px;
}
</style>
