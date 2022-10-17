<template>
  <!-- top5 好看的折线图
        参考地址:https://www.isqqw.com/viewer?id=15337
  -->
  <div class="line-chart">
    <p class="title" v-if="showTitle">{{ title }}</p>
    <base-echart :options="options" height="350px" />
  </div>
</template>
<script>
var data1 = [620, 580, 610, 640, 810, 800, 830]
var data2 = [210, 220, 290, 200, 205, 240, 230]
var data3 = [700, 840, 710, 690, 590, 640, 720]
var data4 = [400, 400, 400, 500, 400, 420, 470]
var data5 = [600, 620, 640, 620, 470, 530, 520]
var xData = ["11-1", "11-2", "11-3", "11-4", "11-5", "11-6", "11-7"]
var cp = ["JU-X", "MD-X", "ML-X", "ML-2X", "Stanley"]
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "line-chart",
  props: {
    title: {
      type: String,
      default: "默认标题"
    },
    config: {},
    height: {
      type: String,
      default: "350px"
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  components: {
    baseEchart
  },
  computed: {
    options() {
      return {
        grid: {
          borderWidth: 0,
          top: 50,
          left: "6%",
          right: "6%",
          bottom: "10%",
          textStyle: {
            color: "#fff"
          }
        },
        legend: {
          // top: "3%",
          textStyle: {
            fontSize: 20,
            fontFamily: "MicrosoftYaHeiUI",
            color: "#FFFFFF"
          }
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
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true, //隐藏X轴轴线
              symbol: ["none", "arrow"],
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: "#fff",
              fontSize: 20
            },
            data: xData
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true
            },
            axisLine: {
              show: true, //隐藏X轴轴线
              symbol: ["none", "arrow"],
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: "#fff",
              fontSize: 20,
              formatter: (params) => {
                return params + ""
              }
            },
            splitArea: {
              show: false
            }
          }
        ],
        series: [
          {
            name: cp[0],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: "top",
                  formatter: (params) => {
                    return params.value + "%"
                  },
                  textStyle: {
                    fontSize: 12,
                    color: "#fff"
                  }
                },
                color: "rgba(255, 196, 53, 1)",
                barBorderRadius: 0
              }
            },
            lineStyle: {
              normal: {
                width: 4,
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#F0B62A" // 0% 处的颜色
                    },

                    {
                      offset: 1,
                      color: "#FFC12B" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            },
            data: data1
          },
          {
            name: cp[1],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: "top",
                  formatter: (params) => {
                    return params.value + "%"
                  },
                  textStyle: {
                    fontSize: 12,
                    color: "#fff"
                  }
                },
                color: "#00CC99",
                barBorderRadius: 0
              }
            },
            lineStyle: {
              normal: {
                width: 4,
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#00CC99" // 0% 处的颜色
                    },

                    {
                      offset: 1,
                      color: "#00CC99" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            },
            data: data2
          },
          {
            name: cp[2],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: "top",
                  formatter: (params) => {
                    return params.value + "%"
                  },
                  textStyle: {
                    fontSize: 12,
                    color: "#fff"
                  }
                },
                color: "#33CCFF",
                barBorderRadius: 0
              }
            },
            lineStyle: {
              normal: {
                width: 4,
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#33CCFF" // 0% 处的颜色
                    },

                    {
                      offset: 1,
                      color: "#33CCFF" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            },
            data: data3
          },
          {
            name: cp[3],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: "top",
                  formatter: (params) => {
                    return params.value + "%"
                  },
                  textStyle: {
                    fontSize: 12,
                    color: "#fff"
                  }
                },
                color: "#9933FF",
                barBorderRadius: 0
              }
            },
            lineStyle: {
              normal: {
                width: 4,
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#9933FF" // 0% 处的颜色
                    },

                    {
                      offset: 1,
                      color: "#9933FF" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            },
            data: data4
          },
          {
            name: cp[4],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: "top",
                  formatter: (params) => {
                    return params.value + "%"
                  },
                  textStyle: {
                    fontSize: 12,
                    color: "#fff"
                  }
                },
                color: "#FF6633",
                barBorderRadius: 0
              }
            },
            lineStyle: {
              normal: {
                width: 4,
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#FF6633" // 0% 处的颜色
                    },

                    {
                      offset: 1,
                      color: "#FF6633" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            },
            data: data5
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.rank-echart {
  .title {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 5px;
    color: $title-color;
    padding-left: 5px;
    border-left: 4px solid #bb98fa;
  }
}
</style>
