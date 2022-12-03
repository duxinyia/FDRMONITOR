<template>
  <base-echart :options="options" />
</template>

<script>
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "makechart3",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    xData: {
      type: Array,
      default: () => []
    },
    maxWips: {
      type: Array,
      default: () => []
    },
    minWips: {
      type: Array,
      default: () => []
    },
    wips: {
      type: Array,
      default: () => []
    }
  },
  components: {
    baseEchart
  },
  computed: {
    options() {
      // 设置变量
      let themeColor = this.$store.getters.theme == "dark" ? "#fff" : "#000"
      let { xData, maxWips, wips, title, minWips } = this
      // let newXData = xData.length >= 6 ? xData.slice(5) : xData
      // let newXData = xData
      // let newWips = wips.length >= 6 ? wips.slice(5) : wips
      // let newMinWips = minWips.length >= 6 ? minWips.slice(5) : minWips
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
          top: 40,
          right: 40,
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
            right: 210,
            textStyle: {
              // color: "#FFFFFF",
              color: themeColor,
              fontSize: 12
            },
            data: ["實際"]
          },
          {
            top: 0,
            right: 130,
            textStyle: {
              // color: "#FFFFFF",
              color: themeColor,
              fontSize: 12
            },
            data: ["WIP上限"]
          },
          {
            top: 0,
            right: 40,
            textStyle: {
              // color: "#FFFFFF",
              color: themeColor,
              fontSize: 12
            },
            data: ["WIP下限"]
          }
        ],
        xAxis: {
          type: "category",
          boundaryGap: false,
          color: "#59588D",
          data: xData,
          axisLabel: {
            margin: 10,
            // color: "#EEEEEE",
            color: themeColor,
            textStyle: {
              fontSize: 12
            }
            // rotate: "45"
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
              opacity: 1
            }
          }
        },
        yAxis: [
          {
            min: (value) => Math.ceil(value.min), // 指定最小值
            max: (value) => Math.floor(value.max), // 指定最大值
            axisLabel: {
              // color: "#EEEEEE",
              color: themeColor,
              textStyle: {
                fontSize: 14
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
                opacity: 1
              }
            }
          }
        ],
        series: [
          {
            type: "line",
            name: "WIP上限",
            data: maxWips,
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
                ]),
                areaStyle: {
                  //区域填充样式
                  color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(109, 101, 197, 0.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(109, 101, 197, 0.5)"
                    }
                  ])
                }
              }
            }
          },
          {
            type: "line",
            name: "WIP下限",
            data: minWips,
            barWidth: "16",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(78, 243, 156,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(78, 243, 156,1)"
                  }
                ]),
                areaStyle: {
                  //区域填充样式
                  color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(78, 243, 156, 0.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(78, 243, 156, 0.5)"
                    }
                  ])
                }
              }
            }
          },
          {
            type: "line",
            name: "實際",
            data: wips,
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
                ]),
                areaStyle: {
                  //区域填充样式
                  color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(35, 205, 241, 0.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(35, 205, 241, 0.5)"
                    }
                  ])
                }
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
  }
}
</script>
