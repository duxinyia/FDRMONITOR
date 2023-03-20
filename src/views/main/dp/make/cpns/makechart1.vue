<template>
  <div
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="加载中"
    element-loading-background="rgba(0, 0, 0, 1)"
  >
    <base-echart :options="options" @echartClick="echartClick" />
  </div>
</template>

<script>
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "makechart1",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    xData: {
      type: Array,
      default: () => []
    },
    targetOuts: {
      type: Array,
      default: () => []
    },
    inPuts: {
      type: Array,
      default: () => []
    },
    isFol: {
      type: Boolean,
      default: false
    },
    isStanley: {
      type: Boolean,
      default: false
    }
  },
  components: {
    baseEchart
  },
  data() {
    return {
      loading: true
    }
  },
  watch: {
    targetOuts() {
      this.loading = false
    }
  },
  computed: {
    options() {
      // 设置变量
      let themeColor = this.$store.getters.theme == "dark" ? "#ccc" : "#000"
      let { xData, targetOuts: yData, inPuts: yData1, title, isFol, isStanley } = this
      let newXData = xData
      let newYData = yData
      let newYData1 = yData1
      if (isFol) {
        if (isStanley) {
          let tempArr1 = xData.slice(4)
          tempArr1.splice(tempArr1.length - 2, 1)
          newXData = tempArr1
          let tempArr2 = yData.slice(4)
          tempArr2.splice(tempArr2.length - 2, 1)
          newYData = tempArr2
          let tempArr3 = yData1.slice(4)
          tempArr3.splice(tempArr3.length - 2, 1)
          newYData1 = tempArr3
        } else {
          let tempArr1 = xData.slice(5)
          tempArr1.splice(tempArr1.length - 2, 1)
          newXData = tempArr1
          let tempArr2 = yData.slice(5)
          tempArr2.splice(tempArr2.length - 2, 1)
          newYData = tempArr2
          let tempArr3 = yData1.slice(5)
          tempArr3.splice(tempArr3.length - 2, 1)
          newYData1 = tempArr3
        }
      } else {
        if (isStanley) {
          let tempArr1 = xData.slice(4)
          tempArr1.splice(tempArr1.length - 2, 1)
          newXData = tempArr1
          let tempArr2 = yData.slice(4)
          tempArr2.splice(tempArr2.length - 2, 1)
          newYData = tempArr2
          let tempArr3 = yData1.slice(4)
          tempArr3.splice(tempArr3.length - 2, 1)
          newYData1 = tempArr3
        } else {
          let tempArr1 = xData.slice(5)
          tempArr1.splice(tempArr1.length - 2, 1)
          newXData = tempArr1
          let tempArr2 = yData.slice(5)
          tempArr2.splice(tempArr2.length - 2, 1)
          newYData = tempArr2
          let tempArr3 = yData1.slice(5)
          tempArr3.splice(tempArr3.length - 2, 1)
          newYData1 = tempArr3
        }
      }
      return {
        title: {
          text: title,
          left: "center",
          textStyle: {
            color: "#369fb5",
            fontWeight: "bold",
            fontSize: 22
          }
        },
        grid: {
          top: 50,
          right: 10,
          left: 70,
          bottom: 30 //图表尺寸大小
        },
        legend: [
          {
            top: 0,
            right: 80,
            textStyle: {
              // color: "#FFFFFF",
              color: themeColor,
              fontSize: 12
            },
            data: ["計劃"]
          },
          {
            top: 0,
            right: 8,
            textStyle: {
              // color: "#FFFFFF",
              color: themeColor,
              fontSize: 12
            },
            data: ["實際"]
          }
        ],
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
          color: "#59588D",
          data: newXData,
          axisLabel: {
            margin: 10,
            // color: "#EEEEEE",
            color: themeColor,
            textStyle: {
              fontSize: 12
            }
          },
          axisLine: {
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
            show: true,
            lineStyle: {
              // color: "#ffffff",
              color: themeColor,
              opacity: 0.5,
              type: "dotted"
            }
          }
        },
        yAxis: [
          {
            min: (value) => Math.ceil(value.min) - 1000, // 指定最小值
            max: (value) => Math.floor(value.max) + 3000, // 指定最大值
            axisLabel: {
              color: themeColor,
              textStyle: {
                fontSize: 14
              }
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
            type: "line",
            name: "計劃",
            data: newYData,
            barWidth: "16",
            itemStyle: {
              normal: {
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
              }
            },
            label: {
              normal: {
                show: true,
                position: "top",
                fontSize: 12,
                fontWeight: "bold",
                // color: "#FFFFFF"
                color: themeColor
              }
            }
          },
          {
            type: "bar",
            name: "實際",
            data: newYData1,
            barWidth: "16",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(48,227,235,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(16,127,212,1)"
                  }
                ])
              }
            },
            label: {
              normal: {
                show: true,
                position: "top",
                fontSize: 12,
                fontWeight: "bold",
                // color: "#FFFFFF"
                color: themeColor
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    echartClick(params) {
      // console.log("params", params)
      this.$emit("barClick", params.data)
    }
  }
}
</script>

<style lang="scss" scoped></style>
