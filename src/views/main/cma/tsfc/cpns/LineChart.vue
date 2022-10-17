<template>
  <base-echart height="350px" :options="options" />
</template>

<script>
// 导入基础的图
import BaseEchart from "@/common/echart"
export default {
  name: "LineChart",
  components: {
    BaseEchart
  },
  data() {
    return {
      xData: ["2022-04", "2022-05", "2022-06", "2022-07", "2022-08", "2022-09", "2022-10"],
      juy: [99.54, 99.44, 99.44, 99.58, 99.67, 99.44, 99.54],
      jua: [99.48, 99.48, 99.54, 99.46, 99.1, 99.13, 99.32],
      jug: [99.42, 99.52, 99.54, 99.53, 99.31, 99.4, 99.26]
    }
  },
  computed: {
    options() {
      return {
        grid: {
          top: 80,
          right: 10,
          left: 60,
          bottom: 40 //图表尺寸大小
        },
        legend: [
          // JU-Y
          {
            top: 40,
            right: 300,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 12
            },
            data: ["JU-Y"]
          },
          // JU-A
          {
            top: 40,
            right: 190,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 12
            },
            data: ["JU-A"]
          },
          // JU-G
          {
            top: 40,
            right: 90,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 12
            },
            data: ["JU-G"]
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
          boundaryGap: true,
          color: "#59588D",
          data: this.xData,
          axisLabel: {
            margin: 10,
            color: "#EEEEEE",
            textStyle: {
              fontSize: 14
            }
          },
          axisLine: {
            symbol: ["none", "arrow"],
            lineStyle: {
              color: "#ffffff",
              opacity: 0.8
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#ffffff",
              opacity: 0.3
            }
          }
        },
        yAxis: [
          {
            type: "value",
            min: (value) => Math.ceil(value.min - 1), // 指定最小值
            max: () => 100, // 指定最大值
            // position: "left",
            splitLine: {
              show: false
            },
            axisLabel: {
              color: "#EEEEEE",
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
              symbol: ["none", "arrow"],
              lineStyle: {
                color: "#fff",
                opacity: 0.8
              }
            }
          }
        ],
        series: [
          // 线数据 JU-Y
          {
            name: "JU-Y",
            type: "line",
            //yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            symbolSize: 8,
            smooth: true, // 设置拆线平滑
            itemStyle: {
              normal: {
                color: "#52fea2",
                label: {
                  show: true
                }
              }
            },
            lineStyle: {
              width: 4
            },
            data: this.juy
          },
          // 线数据 JU-A
          {
            name: "JU-A",
            type: "line",
            //yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            symbolSize: 8,
            smooth: true, // 设置拆线平滑
            itemStyle: {
              normal: {
                color: "#1fedeb",
                label: {
                  show: true
                }
              }
            },
            lineStyle: {
              width: 4
            },
            data: this.jua
          },
          // 线数据 JU-G
          {
            name: "JU-G",
            type: "line",
            //yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            symbolSize: 8,
            smooth: true, // 设置拆线平滑
            itemStyle: {
              normal: {
                color: "#f7a35c",
                label: {
                  show: true
                }
              }
            },
            lineStyle: {
              width: 4
            },
            data: this.jug
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
