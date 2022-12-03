<template>
  <base-echart :options="options" />
</template>

<script>
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "makechart2",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    chart2Xdata: {
      type: Array,
      default: () => []
    },
    chart2Output: {
      type: Array,
      default: () => []
    },
    chart2TargetOut: {
      type: Array,
      default: () => []
    },
    chart2HitRate: {
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
      let { title, chart2Xdata, chart2Output, chart2TargetOut, chart2HitRate } = this
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
          },
          formatter: function (params) {
            // console.log(params)
            let r1 = ""
            let r2 = ""
            let r3 = ""

            params.forEach((item) => {
              if (item.seriesName == "計劃") {
                r1 = `<div><span style="display: inline-block;width:10px;height:10px;border-radius: 50%;margin-right:5px;background:#4ae794"></span><span>${item.seriesName}:${item.value}</span></div>`
              } else if (item.seriesName == "實際") {
                r2 = `<div><span style="display: inline-block;width:10px;height:10px;border-radius: 50%;margin-right:5px;background:#9b6def"></span><span>${item.seriesName}:${item.value}</span></div>`
              } else {
                r3 = `<div><span style="display: inline-block;width:10px;height:10px;border-radius: 50%;margin-right:5px;background:#27c6e4"></span><span>${
                  item.seriesName
                }:${item.value + "%"}</span></div>`
              }
            })
            return `<div style="color:'#BCE9FC'">
                <div>${params[0].axisValue}</div>
                ${r1}${r2}${r3}

            </div>`
          }
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
          },
          {
            top: 0,
            right: 150,
            textStyle: {
              // color: "#FFFFFF",
              color: themeColor,
              fontSize: 12
            },
            data: ["達成比例"]
          }
        ],
        xAxis: {
          type: "category",
          // boundaryGap: false,
          color: "#59588D",
          data: chart2Xdata,
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
              opacity: 1
            }
          }
        },
        yAxis: [
          {
            // name: "ydata",
            position: "left",
            min: 0, // 指定最小值
            max: (value) => value.max, // 指定最大值
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
          },
          {
            type: "value",
            min: (value) => Math.ceil(value.min), // 指定最小值
            max: (value) => value.max, // 指定最大值
            position: "right",
            splitLine: {
              show: false
            },
            axisLabel: {
              // color: "#EEEEEE",
              color: themeColor,
              textStyle: {
                fontSize: 14
              },
              formatter: function (value) {
                return value + "%"
              }
            },
            axisLine: {
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
            type: "bar",
            name: "計劃",
            data: chart2TargetOut,
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
            data: chart2Output,
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
          },
          {
            name: "達成比例",
            type: "line",
            symbolSize: 8,
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            //smooth: true, // 设置拆线平滑
            itemStyle: {
              normal: {
                color: "#52fea2"
              }
            },
            data: chart2HitRate
          }
        ]
      }
    }
  }
}
</script>
