<template>
  <!--
  双条柱状图
  参考: https://www.isqqw.com/echartsdetail?id=18619
 -->
  <div class="two-bar-chart">
    <p class="title">{{ title }}</p>
    <base-echart :options="options" />
  </div>
</template>

<script>
// 导入基础模板
import baseEchart from "@/common/echart"
// 对应的数据
// const yData = [5.1, 3.2, 6.1, 4.1, 2.7, 4.2]
// const yData1 = [5.1, 3.2, 6.1, 4.1, 2.7, 4.2]
export default {
  name: "two-bar-chart",
  components: {
    baseEchart
  },
  props: {
    title: {
      type: String,
      default: "線體狀態看板區:"
    },
    config: {}
  },
  data() {
    return {
      // x轴的数据
      xData: [
        `需求線數\n(a)`,
        "可開線體數\n(b)",
        "實際開線數\n(c)",
        "備用纖體\n(d=b-c-f)",
        "多開纖體\n(e=c-a)",
        "異常纖體\n(f)"
      ]
    }
  },
  computed: {
    options() {
      const { xData } = this
      const { yData, yData1 } = this.config
      return {
        grid: {
          top: 30,
          right: 10,
          left: 20,
          bottom: 80 //图表尺寸大小
        },
        legend: [
          {
            top: 0,
            right: 80,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 12
            },
            data: ["MD-X"]
          },
          {
            top: 0,
            right: 8,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 12
            },
            data: ["ML-X"]
          }
        ],
        xAxis: {
          type: "category",
          color: "#59588D",
          data: xData,
          axisLabel: {
            margin: 10,
            color: "#EEEEEE",
            textStyle: {
              fontSize: 12
            }
            // 坐标轴刻度标签换行处理
            // formatter: function (params) {
            //   let newParams = params
            //   console.log("====", newParams.indexOf("("))

            //   return newParams
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
            min: 0,
            max: 7,
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
            type: "bar",
            name: "MD-X",
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
            name: "ML-X",
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
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "@/assets/scss/variables.scss";
.two-bar-chart {
  .title {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 5px;
    color: $title-color;
    // color: var(--chart-title);
    padding-left: 5px;
    // border-left: 4px solid var(--chart-slip);
    border-left: 4px solid #bb98fa;
  }
}
</style>
