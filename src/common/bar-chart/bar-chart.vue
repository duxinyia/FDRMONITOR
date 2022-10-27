<template>
  <!--
  柱状图:
  参考:https://www.isqqw.com/echartsdetail?id=15050
 -->
  <div
    class="bar-chart"
    v-loading="isLoading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="加载中"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <p class="title" v-if="showTitle">{{ title }}</p>
    <base-echart :options="options" @echartClick="handlerClick" :height="height" />
  </div>
</template>

<script>
// 导入基础模板
import baseEchart from "@/common/echart"
// 修改这个值
// let data1 = [
//   {
//     name: "濾芯預警",
//     value: 7
//   },
//   {
//     name: "Table預警",
//     value: 8
//   },
//   {
//     name: "Nozzle預警",
//     value: 9
//   },
//   {
//     name: "膠閥預警",
//     value: 5
//   }
// ]

// let xAxisData = []
// let seriesData = []
// let seriesData1 = []
// let ciolData = []
// let sum = 0
// let bottomData = []
// let topData = []

// data1.forEach((item) => {
//   xAxisData.push(item.name)
//   seriesData.push(item.value)
//   seriesData1.push({ name: "", value: item.value })
//   ciolData.push({ name: "", value: "0" })
//   sum += item.value
// })
// data1.forEach((item) => {
//   bottomData.push({ name: "", value: sum - item.value })
//   topData.push({ name: "", value: sum })
// })
export default {
  name: "bar-chart",
  props: {
    title: {
      type: String,
      default: "配件到期提示區:"
    },
    config1: {},
    height: {
      type: String,
      default: "190px"
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  components: {
    baseEchart
  },
  data() {
    return {
      isLoading: true,
      ciolColor1: [
        "rgba(8, 177, 255, 1)",
        "rgba(0, 255, 136,   1)",
        // "rgba(8, 177, 255, 1)",
        "rgba(224, 102, 255,1)",
        "rgba(251, 171, 88,   1)",
        "rgba(8, 177, 255, 1)",
        "rgba(251, 171, 88,   1)",
        "rgba(8, 177, 255, 1)",
        "rgba(251, 171, 88,   1)"
      ],
      ciolColor0: [
        "rgba(107, 255, 243,  1)",
        "rgba(97,253,196,  1)",
        // "rgba(107, 255, 243,  1)",
        "rgba(224, 102, 255,1)",
        "rgba(253, 221, 97,  1)",

        "rgba(8, 177, 255, 0.8)",
        "rgba(251, 171, 88, 0.8)",
        "rgba(8, 177, 255, 0.8)",
        "rgba(251, 171, 88, 0.8)"
      ],
      bottomColor0: [
        "rgba(8, 177, 255, 0.8)",
        "rgba(0, 255, 136, 0.8)",

        // "rgba(8, 177, 255, 0.8)",
        "rgba(224, 102, 255, 0.8)",
        "rgba(251, 171, 88, 0.8)",

        "rgba(8, 177, 255, 0.8)",
        "rgba(251, 171, 88, 0.8)",
        "rgba(8, 177, 255, 0.8)",
        "rgba(251, 171, 88, 0.8)"
      ],
      bottomColor1: [
        "rgba(107, 255, 243, 0.8)",
        "rgba(100,253,212,0.8)",

        // "rgba(107, 255, 243, 0.8)",
        "rgba(224, 102, 255,0.8)",
        "rgba(253, 227, 100,0.8)",

        "rgba(107, 255, 243, 0.8)",
        "rgba(253, 227, 100,0.8)",
        "rgba(107, 255, 243, 0.8)",
        "rgba(253, 227, 100,0.8)"
      ],
      header0: [
        "rgba(8, 177, 255, 1)",
        "rgba(0, 255, 136, 1)",

        // "rgba(8, 177, 255, 1)",
        "rgba(224, 102, 255, 1)",
        "rgba(251, 171, 88, 1)",

        "rgba(8, 177, 255, 1)",
        "rgba(251, 171, 88, 1)",
        "rgba(8, 177, 255, 1)",
        "rgba(251, 171, 88, 1)"
      ],
      header1: [
        "rgba(107, 255, 243, 1)",
        "rgba(100,253,212,1)",

        // "rgba(107, 255, 243, 1)",
        "rgba(224, 102, 255,1)",
        "rgba(253, 227, 100,1)",

        "rgba(107, 255, 243, 1)",
        "rgba(253, 227, 100,1)",
        "rgba(107, 255, 243, 1)",
        "rgba(253, 227, 100,1)"
      ],
      bottom: [
        "rgba(31, 194, 252, 0.4)",
        "rgba(0, 255, 136, 0.4)",
        // "rgba(31, 194, 252, 0.4)",
        "rgba(224, 102, 255, 0.4)",
        "rgba(253, 179, 88, 0.4)",
        "rgba(31, 194, 252, 0.4)",
        "rgba(253, 179, 88, 0.4)",
        "rgba(31, 194, 252, 0.4)",
        "rgba(253, 179, 88, 0.4)",
        "rgba(31, 194, 252, 0.4)",
        "rgba(253, 179, 88, 0.4)"
      ]
    }
  },
  watch: {
    config1: {
      handler() {
        this.isLoading = false
      }
    }
  },
  computed: {
    options() {
      const { ciolColor1, ciolColor0, bottomColor0, bottomColor1, header0, header1, bottom } = this
      let { xAxisData, ciolData, seriesData, seriesData1, topData, bottomData } = this.config1
      return {
        backgroundColor: "#000",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          formatter: function (params) {
            let tempStr = ""
            if (Array.isArray(params[3].data.details) && params[3].data.details.length > 0) {
              params[3].data.details.forEach((item, index) => {
                let flag = item.remainTime.includes("-")
                tempStr += `
                <div style="font-size:14px;padding:0 10px;display:flex;justify-content: space-between;background:${
                  index % 2 == 0 ? "#003b51" : "#0a2732"
                }">
                  <span style="margin-right:20px">${item.machine}</span>
                  <span style="color:${flag ? "#f40" : ""}">${item.remainTime}</span>
                </div>`
              })
            } else {
              tempStr = "暂无详情"
            }
            return `
              <div style="font-size:14px;line-height:2.2em;">
                <div style="display:flex;justify-content: space-between;background:#20316e;padding:0 10px">
                  <span>機台名稱</span>
                  <span>持續時間</span>
                </div>
                ${tempStr}
              </div>
            `
          },
          // position: function (point, params, dom) {
          //   return [point[0] + 30, point[1] + 30]
          // },
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0 // x坐标位置
            var y = 0 // y坐标位置

            // 当前鼠标位置
            var pointX = point[0]
            var pointY = point[1]

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0]
            var boxHeight = size.contentSize[1]

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5
            } else {
              // 左边放的下
              x = pointX - boxWidth
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5
            } else {
              // 上边放得下
              y = pointY - boxHeight
            }

            return [x, y]
          },
          extraCssText: "z-index:2"
        },
        grid: {
          top: 20,
          left: "",
          right: "",
          bottom: 30
        },
        xAxis: {
          offset: 10,
          data: xAxisData,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: 12
            }
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        series: [
          //'最低下的圆片',
          {
            name: "最低下的圆片",
            stack: "a",
            type: "effectScatter",
            symbolSize: [40, 12],
            symbolOffset: [0, 0],
            z: 22,
            itemStyle: {
              normal: {
                color: (params) => {
                  return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 1,
                      color: ciolColor0[params.dataIndex]
                    },
                    {
                      offset: 0,
                      color: ciolColor1[params.dataIndex]
                    }
                  ])
                }
              }
            },
            data: ciolData
          },
          //下半截柱状图
          {
            name: "下半截柱状图",
            stack: "a",
            type: "bar",
            barWidth: 32,
            z: 2,
            barGap: "-100%",
            itemStyle: {
              normal: {
                color: (params) => {
                  return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 1,
                      color: bottomColor1[params.dataIndex]
                    },
                    {
                      offset: 0,
                      color: bottomColor0[params.dataIndex]
                    }
                  ])
                }
              }
            },
            data: seriesData1
          },
          //替代柱状图 默认不显示颜色，是最下方柱图的value值 - 20'
          {
            name: "替代柱状图 默认不显示颜色，是最下方柱图的value值 - 20",
            // stack: '',
            type: "bar",
            barWidth: 32,
            barGap: "-100%",
            // stack: '广告',
            itemStyle: {
              color: "transparent"
            },
            data: seriesData
          },
          //头部1
          {
            name: "头部1",
            stack: "a",
            type: "pictorialBar",
            symbolSize: [32, 10],
            symbolOffset: [0, -6],
            z: 22,
            itemStyle: {
              normal: {
                color: (params) => {
                  return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 1,
                      color: header1[params.dataIndex]
                    },
                    {
                      offset: 0,
                      color: header0[params.dataIndex]
                    }
                  ])
                }
              }
            },
            symbolPosition: "end",
            label: {
              formatter: "{c}",
              color: "#fff",
              offset: [0, -5],
              show: true,
              position: "top",
              fontSize: 18,
              fontWeight: 400,
              fontFamily: "zcool-gdh"
            },
            data: seriesData1
          },
          //头部2
          {
            name: "头部2",
            stack: "a",
            type: "pictorialBar",
            symbolSize: [32, 10],
            symbolOffset: [0, -6],
            symbolPosition: "end",
            z: 22,
            itemStyle: {
              normal: {
                color: (params) => {
                  return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 1,
                      color: header1[params.dataIndex]
                    },
                    {
                      offset: 0,
                      color: header0[params.dataIndex]
                    }
                  ])
                }
              }
            },
            data: topData
          },
          //底色
          {
            name: "底色",
            stack: "a",
            type: "bar",
            barWidth: 66,
            z: 2,
            barGap: "-100%",
            // stack: '',
            symbolPosition: "end",
            itemStyle: {
              normal: {
                color: function (params) {
                  return bottom[params.dataIndex]
                }
              }
            },
            data: bottomData
          }
        ]
      }
    }
  },
  methods: {
    handlerClick(params) {
      let { dataIndex } = params
      // 根据不同的 params 跳转不同的路由
      this.$emit("echartClick", dataIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.bar-chart {
  z-index: 100;
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
