<template>
  <div class="kline-chart">
    <p>{{ machinename }}</p>
    <base-echart :options="options" height="200px" />
  </div>
</template>

<script>
// gxl 由于 cma 的 ga 和 va 采用的都是这个组件 就抽到一起了
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "kline-chart",
  props: ["kLineData", "machinename", "limit"],
  components: {
    baseEchart
  },
  computed: {
    options() {
      let { xData } = this.kLineData
      return {
        dataset: [
          {
            source: this.kLineData.showData
          },
          {
            transform: {
              type: "boxplot",
              config: { itemNameFormatter: (params) => xData[params.value] }
            }
          },
          {
            fromDatasetIndex: 1,
            fromTransformResult: 1
          }
        ],
        grid: {
          left: 0,
          right: 10,
          bottom: 30,
          top: 10,
          containLabel: true
        },
        xAxis: {
          type: "category",
          nameGap: 30,
          splitArea: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            },
            symbol: ["none", "arrow"] // 只在末端显示箭头
          },
          axisLabel: {
            color: "#fff",
            showMaxLabel: false
          },
          splitLine: {
            lineStyle: {
              color: "#fff",
              type: "dashed",
              opacity: 0.1
            }
          }
        },
        yAxis: {
          type: "value",
          // min: 0.12,
          // max: 0.21,
          max: this.changeYMax(this.limit.maxLimit),
          min: this.changeYMin(this.limit.minLimit),
          // min: "dataMin", //取最小值为最小刻度
          // max: "dataMax", //取最大值为最大刻度
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            },
            symbol: ["none", "arrow"] // 只在末端显示箭头
          },
          axisLabel: {
            color: "#fff",
            showMaxLabel: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#eee",
              type: "dashed",
              opacity: 0.1
            }
          },
          splitArea: {
            show: false
          }
        },
        series: [
          {
            name: "boxplot",
            type: "boxplot",
            datasetIndex: 1,
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
                  yAxis: this.limit.minLimit // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
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
                  yAxis: this.limit.maxLimit // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                }
              ]
            }
          },
          {
            name: "outlier",
            type: "scatter",
            datasetIndex: 2
          }
        ],
        // 数据量较多时 可采用X Y轴进行缩放
        dataZoom: [
          {
            type: "slider", //slider表示有滑动块的，
            roam: false,
            show: true,
            xAxisIndex: [0], //表示x轴折叠
            height: 20, //这里可以设置dataZoom的尺寸
            bottom: 10,
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
      // 0.198 -> 0.21  0.025 ->0.04 0.5-> 0.6
      switch (maxLimit) {
        case 0.198:
          tempArr = 0.21
          break
        case 0.025:
          tempArr = 0.05
          break
        case 0.5:
          tempArr = 0.7
          break
        default:
          tempArr = 0.6
          break
      }
      return tempArr
    },
    changeYMin(minLimit) {
      let tempArr = 0
      // 0.132 -> 0.12  -0.025 ->-0.03 -0.5-> -0.6
      switch (minLimit) {
        case 0.132:
          tempArr = 0.12
          break
        case -0.025:
          tempArr = -0.04
          break
        case -0.5:
          tempArr = -0.6
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
.kline-chart {
  text-align: center;
}
</style>
