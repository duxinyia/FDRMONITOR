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
      let { xData, maxWips, wips, title } = this
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
          right: 10,
          left: 50,
          bottom: 30 //图表尺寸大小
        },
        legend: [
          {
            top: 0,
            right: 80,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 12
            },
            data: ["WIP上限"]
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
        xAxis: {
          type: "category",
          boundaryGap: false,
          color: "#59588D",
          data: xData,
          axisLabel: {
            margin: 10,
            color: "#EEEEEE",
            textStyle: {
              fontSize: 12
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
                color: "#FFFFFF"
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
