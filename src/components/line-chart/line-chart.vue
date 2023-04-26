<template>
  <div class="line-chart">
    <p>{{ machinename }}</p>
    <base-echart :options="options" height="180px" />
  </div>
</template>

<script>
// gxl cma 的 ga 和 va 公用这个组件
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "line-chart",
  props: ["lineData", "machinename", "limit"],
  components: {
    baseEchart
  },
  computed: {
    options() {
      return {
        xAxis: {
          type: "category",
          data: this.lineData.xData,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff",
              opacity: 0.2
            }
          },
          axisLabel: {
            color: "#fff",
            showMaxLabel: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#fff",
              type: "dashed",
              opacity: 0
            }
          }
        },
        yAxis: {
          type: "value",
          // 0.198 -> 0.22
          // max: this.limit.maxLimit == 0.198 ? 0.22 : 0.06,
          // min: this.limit.minLimit == 0.132 ? 0.12 : -0.06,
          max: this.changeYMax(this.limit.maxLimit),
          min: this.changeYMin(this.limit.minLimit),
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            },
            symbol: ["none", "arrow"] // 只在末端显示箭头
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#fff",
              type: "dashed",
              opacity: 0.1
            }
          },
          axisLabel: {
            color: "#fff",
            showMaxLabel: false
          }
        },
        grid: {
          borderWidth: 0,
          top: 10,
          left: 50,
          right: 40,
          bottom: 50,
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            data: this.lineData.showData,
            type: "line",
            symbolSize: 5,
            symbol: "circle",
            lineStyle: {
              color: "#5e84e4"
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
                    formatter: "UCL",
                    fontSize: "16",
                    backgroundColor: "none",
                    color: "#fff"
                  },
                  yAxis: this.limit.maxLimit // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
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
                    formatter: "LCL",
                    fontSize: "16",
                    backgroundColor: "none",
                    color: "#fff"
                  },
                  yAxis: this.limit.minLimit // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                }
              ]
            }
          }
        ],
        // 数据量较多时 可采用X Y轴进行缩放
        dataZoom: [
          {
            type: "slider", //slider表示有滑动块的，
            roam: false,
            show: true,
            height: 20, //这里可以设置dataZoom的尺寸
            bottom: 10,
            xAxisIndex: [0], //表示x轴折叠
            start: 0, //数据窗口范围的起始百分比,表示1%
            end: 100 //数据窗口范围的结束百分比,表示20%坐标
          }
        ]
      }
    }
  },
  methods: {
    changeYMax(maxLimit) {
      let tempArr = 0
      // 0.198 -> 0.22 0.05 -> 0.06 0.025 ->0.04 0.5-> 0.6
      switch (maxLimit) {
        case 0.198:
          tempArr = 0.24
          break
        case 0.05:
          tempArr = 0.08
          break
        case 0.025:
          tempArr = 0.06
          break
        case 0.5:
          tempArr = 0.8
          break
        default:
          tempArr = 0.6
          break
      }
      return tempArr
    },
    changeYMin(minLimit) {
      let tempArr = 0
      // 0.132 -> 0.12 -0.05 -> -0.06 -0.025 ->-0.03 -0.5-> -0.6
      switch (minLimit) {
        case 0.132:
          tempArr = 0.11
          break
        case -0.05:
          tempArr = -0.06
          break
        case -0.025:
          tempArr = -0.04
          break
        default:
          tempArr = -0.6
          break
      }
      return tempArr
    }
  }
}
</script>

<style lang="scss" scoped>
.line-chart {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 5px auto;
}
</style>
