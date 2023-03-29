<template>
  <div class="scatl-chat">
    <p class="title">{{ machinename }} X/Y tilt</p>
    <base-echart :options="options" height="200px" />
  </div>
</template>

<script>
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "scat-chat",
  props: ["scats", "machinename"],
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
          // data: xAxisData,
          min: -0.06, //取最小值为最小刻度
          max: 0.06, //取最大值为最大刻度
          splitNumber: 5,
          nameTextStyle: {
            color: "rgba(0,0,0,0.65)",
            align: "right",
            verticalAlign: "top",
            padding: [8, 12, 0, 0]
          },
          axisLine: {
            lineStyle: {
              color: "yellow",
              opacity: 0.6
            }
          },
          axisLabel: {
            color: "#fff",
            showMaxLabel: false
          },
          splitLine: {
            lineStyle: {
              color: "#fff",
              type: "dashed",
              opacity: 0.5
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          name: "项目数量",
          min: -0.06, //取最小值为最小刻度
          max: 0.06, //取最大值为最大刻度
          nameTextStyle: {
            color: "rgba(0,0,0,0.65)",
            align: "left",
            verticalAlign: "center"
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "yellow",
              opacity: 0.6
            }
          },
          axisLabel: {
            color: "#fff"
          },
          splitLine: {
            lineStyle: {
              color: "#fff",
              type: "dashed",
              opacity: 0.5
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            type: "scatter",
            data: this.scats,
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
            markLine: {
              symbol: "none",
              data: [
                {
                  silent: false, //鼠标悬停事件  true没有，false有
                  lineStyle: {
                    //警戒线的样式  ，虚实  颜色
                    type: "solid",
                    color: "#00b050",
                    width: 3
                  },
                  label: {
                    position: "end",
                    formatter: ""
                  },
                  yAxis: 0.05 // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                },
                {
                  silent: false, //鼠标悬停事件  true没有，false有
                  lineStyle: {
                    //警戒线的样式  ，虚实  颜色
                    type: "solid",
                    color: "#00b050",
                    width: 3
                  },
                  label: {
                    position: "end",
                    formatter: ""
                  },
                  xAxis: 0.05 // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                },
                {
                  silent: false, //鼠标悬停事件  true没有，false有
                  lineStyle: {
                    //警戒线的样式  ，虚实  颜色
                    type: "solid",
                    color: "#00b050",
                    width: 3
                  },
                  label: {
                    position: "end",
                    formatter: "",
                    fontSize: "8"
                  },
                  xAxis: -0.05,
                  yAxis: -0.05 // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                },
                {
                  silent: false, //鼠标悬停事件  true没有，false有
                  lineStyle: {
                    //警戒线的样式  ，虚实  颜色
                    type: "solid",
                    color: "#00b050",
                    width: 3
                  },
                  label: {
                    position: "end",
                    formatter: "",
                    fontSize: "8"
                  },
                  xAxis: -0.05 // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
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
