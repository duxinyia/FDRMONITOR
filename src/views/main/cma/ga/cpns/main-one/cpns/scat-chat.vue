<template>
  <div class="scatl-chat">
    <p class="title">VA1301 X/Y tilt</p>
    <base-echart :options="options" height="200px" />
  </div>
</template>

<script>
// 散点数据
var nameList = ["散点1", "散点2", "散点3", "散点4", "散点5"]
var xList = [0.1, 0.1, -0.1, -0.1]
var yList = [0.1, 0.1, -0.1, -0.1]
let center = [0, 0] //中心点

// 数据转换
const marksData = nameList.map((item, index) => ({
  name: item,
  value: [xList[index], yList[index]]
}))
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "scat-chat",
  components: {
    baseEchart
  },
  computed: {
    options() {
      return {
        tooltip: {
          axisPointer: {
            show: true,
            type: "shadow",
            lineStyle: {
              type: "dashed",
              width: 1
            },
            label: {
              backgroundColor: "#fff"
            }
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 0,
          top: 10,
          containLabel: true
        },
        xAxis: {
          type: "value",
          name: "人均项目数",
          splitNumber: 5,
          nameTextStyle: {
            color: "rgba(0,0,0,0.65)",
            align: "right",
            verticalAlign: "top",
            padding: [8, 12, 0, 0]
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            color: "#fff",
            showMaxLabel: false
          },
          splitLine: {
            lineStyle: {
              color: "#eee",
              type: "dashed"
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          name: "项目数量",
          nameTextStyle: {
            color: "rgba(0,0,0,0.65)",
            align: "left",
            verticalAlign: "center"
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            color: "#fff"
          },
          splitLine: {
            lineStyle: {
              color: "#eee",
              type: "dashed"
            }
          }
        },
        series: [
          {
            type: "scatter",
            data: marksData,
            symbolSize: 10,
            label: {
              show: false
            },
            itemStyle: {
              shadowBlur: 2,
              shadowColor: "rgba(120, 36, 50, 0.5)",
              shadowOffsetY: 1,
              color: "#5B8FF9"
            },
            emphasis: {
              scale: 1.5
            },
            // 中心点交集象限轴
            markLine: {
              silent: true, // 是否不响应鼠标事件
              precision: 2, // 精度
              symbol: "none",
              lineStyle: {
                type: "solid",
                color: "#fcfcfc"
              },
              label: {
                show: false
              },
              data: [
                {
                  xAxis: center[0]
                },
                {
                  yAxis: center[1]
                }
              ]
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scatl-chat {
  text-align: center;
}
</style>
