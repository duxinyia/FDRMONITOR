<template>
  <div class="scatl-chat">
    <p class="title">这是标题</p>
    <base-echart :options="options" height="280px" />
  </div>
</template>

<script>
// 散点数据
var nameList = ["散点1", "散点2", "散点3", "散点4", "散点5"]
var xList = [0.12, -0.73, 0.5, 0.25, 0.35]
var yList = [0.5, 0.6, 0.3, 0.4, 0.5]
let center = [2, 90] //中心点

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
              backgroundColor: "#555"
            }
          },
          position: function (point, params, dom, rect, size) {
            // 提示框位置
            let x = 0
            let y = 0
            if (point[0] + size.contentSize[0] + 10 > size.viewSize[0]) {
              x = point[0] - size.contentSize[0] - 10
            } else {
              x = point[0] + 10
            }
            if (point[1] + size.contentSize[1] + 10 > size.viewSize[1]) {
              y = point[1] - size.contentSize[1] - 10
            } else {
              y = point[1] + 10
            }
            return [x, y]
          },
          formatter: (params) => {
            console.log(params)
            const { name, value } = params
            return `
            <div style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:12px;">${name}</div>
            <div style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:4px;">项目数量：${value[1]}个</div>
                        <div style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;">人均项目数量：${value[0]}个</div>
         `
          },
          extraCssText:
            "opacity: 0.8;background-color:#050F1B;padding:16px;box-shadow: 1px 6px 15px 1px rgba(0,0,0,0.13);border-radius: 4px;filter: blur(undefinedpx);border:none;"
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 30,
          top: 5,
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
              color: "#fff",
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
  .title {
  }
}
</style>
