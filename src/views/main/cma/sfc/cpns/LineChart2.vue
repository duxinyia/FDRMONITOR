<template>
  <dv-border-box-11 :color="changeBoxColor" :title="`${showTitle || ''}系列`">
    <span class="btn" @click="toDetail"></span>
    <base-echart :options="options" />
  </dv-border-box-11>
</template>

<script>
// 导入基础的图
import BaseEchart from "@/common/echart"
export default {
  name: "LineChart2",
  components: {
    BaseEchart
  },
  // props: ["config", "showTitle"],
  props: {
    config: {
      type: Object,
      default: () => ({ legends: [], xData: [], showData: [] })
    },
    showTitle: {
      type: String,
      default: "标题"
    }
  },
  computed: {
    changeBoxColor() {
      return this.$store.getters.theme == "dark" ? ["#8aaafb", "#1f33a2"] : ["#05dad4", "#2c97e1"]
    },
    options() {
      // 设置变量
      let themeColor = this.$store.getters.theme == "dark" ? "#fff" : "#000"
      // if (this.config) {
      //   this.config.forEach((item, index) => {
      //     let tempData = []
      //     // 1. 取出legends
      //     this.chartConfig.legends.push(item.deviceSeries)
      //     // 2. 取出xData中的值 但只能取一次
      //     item.yieldList.forEach((childItem) => {
      //       if (index == 0) {
      //         this.chartConfig.xData.push(childItem.dateCode)
      //       }
      //       // 取出对应的值
      //       tempData.push(parseFloat(childItem.values.value))
      //     })
      //     this.chartConfig.showData.push(tempData)
      //   })
      // }
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
          top: 80,
          right: 50,
          left: 80,
          bottom: 40 //图表尺寸大小
        },
        // color: ["#5ad2fa", "#b989f0", "#adf7b7", "#c9dd68"],
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
            // color: "#EEEEEE",
            color: themeColor,
            textStyle: {
              fontSize: 14
            }
          },
          axisLine: {
            symbol: ["none", "arrow"],
            lineStyle: {
              // color: "#ffffff",
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
              // color: "#ffffff",
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
            axisLabel: {
              // color: "#EEEEEE",
              color: themeColor,
              textStyle: {
                fontSize: 16
              },
              formatter: function (value) {
                return value + "%"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              symbol: ["none", "arrow"],
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
  },
  methods: {
    toDetail() {
      if (!this.config.deviceSeries) return
      this.$router.push({
        name: "sfcdetail",
        query: {
          tag: this.config.deviceSeries
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  position: absolute;
  right: 358px;
  top: 4px;
  display: inline-block;
  width: 218px;
  height: 50px;
  z-index: 9999;
  cursor: pointer;
}
</style>
