<template>
  <base-echart :options="options" @echartClick="echartClick" />
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
  computed: {
    // 需要通过变量来判断是否 是 fol 还是 sta
    options() {
      let { xData, targetOuts: yData, inPuts: yData1, title, isFol, isStanley } = this
      let newXData = xData
      let newYData = yData
      let newYData1 = yData1
      // EOL-> Stanley -> 前四个和倒数第二个 否则去掉 前五个和倒数第二个
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

      // let newXData = xData.length >= 6 ? xData.slice(5) : xData
      // let newYData = yData.length >= 6 ? yData.slice(5) : yData
      // let newYData1 = yData1.length >= 6 ? yData1.slice(5) : yData1

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
          bottom: 50 //图表尺寸大小
        },
        legend: [
          {
            top: 0,
            right: 80,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 12
            },
            data: ["計劃"]
          },
          {
            top: 0,
            right: 8,
            textStyle: {
              color: "#FFFFFF",
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
            color: "#EEEEEE",
            textStyle: {
              fontSize: 14
            },
            rotate: "45"
            // 坐标轴刻度标签换行处理
            // formatter: function (params) {
            //   console.log("params", params)
            //   // 1. 超过五个字符的需要换行 2. 有空格的在空格出换行 3.
            //   return "h"
            // }
          },
          axisLine: {
            lineStyle: {
              color: "#ffffff",
              opacity: 0.3
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#ffffff",
              opacity: 0.3
            }
          }
        },
        yAxis: [
          {
            min: (value) => Math.ceil(value.min), // 指定最小值
            max: (value) => Math.floor(value.max), // 指定最大值
            axisLabel: {
              color: "#EEEEEE",
              textStyle: {
                fontSize: 14
              }
            },
            axisLine: {
              lineStyle: {
                color: "#ffffff",
                opacity: 0.3
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#ffffff",
                opacity: 0.3
              }
            }
          }
          // {
          //   type: "value",
          //   name: "ML-X",
          //   min: 0,
          //   max: 100,
          //   axisLabel: {
          //     formatter: "{value} %"
          //   }
          // }
        ],
        series: [
          {
            type: "bar",
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
                color: "#FFFFFF"
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
                color: "#FFFFFF"
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    echartClick(params) {
      console.log("params", params)
      this.$emit("barClick", params.data)
    }
  }
}
</script>

<style lang="scss" scoped></style>
