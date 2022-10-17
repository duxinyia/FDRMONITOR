<template>
  <base-echart :options="options" />
</template>

<script>
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "makechart2",
  props: {},
  components: {
    baseEchart
  },
  computed: {
    options() {
      let xData = [
        "06:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
        "22:00",
        "00:00",
        "02:00",
        "04:00",
        "06:00"
      ]
      let yData = [5.1, 3.2, 6.1, 4.1, 2.7, 4.2, 5.1, 3.2, 6.1, 4.1, 2.7, 4.2]
      let yData1 = [5.1, 3.2, 6.1, 4.1, 2.7, 4.2, 5.1, 3.2, 6.1, 4.1, 2.7, 4.2]
      return {
        title: {
          text: "ML-K AA時段產出",
          left: "center",
          textStyle: {
            color: "#369fb5",
            fontWeight: "bold",
            fontSize: 22
          }
        },
        grid: {
          top: 40,
          right: 30,
          left: 30,
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
          },
          {
            top: 0,
            right: 150,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 12
            },
            data: ["ML-X"]
          }
        ],
        xAxis: {
          type: "category",
          // boundaryGap: false,
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
            // name: "ydata",
            position: "left",
            min: 0, // 指定最小值
            max: 10, // 指定最大值
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
          },
          {
            type: "value",
            // name: "ML-X",
            min: 0, // 指定最小值
            max: 10, // 指定最大值
            position: "right",
            splitLine: {
              show: false
            },
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
            }
          }
        ],
        series: [
          {
            type: "bar",
            name: "計劃",
            data: yData,
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
            data: yData1,
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
          },
          {
            name: "ML-X",
            type: "line",
            symbolSize: 8,
            //smooth: true, // 设置拆线平滑
            itemStyle: {
              normal: {
                color: "#52fea2"
              }
            },
            data: [5, 3, 6, 4, 2, 4, 5, 3, 6, 4, 2, 4]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
