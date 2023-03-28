<template>
  <div class="line-chart">
    <p>{{ machinename }}</p>
    <base-echart :options="options" height="180px" />
  </div>
</template>

<script>
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
          max: this.limit.maxLimit == 0.198 ? 0.22 : 0.06,
          min: this.limit.minLimit == 0.132 ? 0.12 : -0.06,
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
            symbolSize: 0,
            symbol: "circle",
            // itemStyle: {
            //   color: "#0f0"
            // },
            lineStyle: {
              color: "#5e84e4"
            },
            markLine: {
              symbol: "none",

              /*symbol:"none",               //去掉警戒线最后面的箭头
                           label:{
                               position:"end"   ,       //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束


                           },*/
              data: [
                {
                  silent: false, //鼠标悬停事件  true没有，false有
                  lineStyle: {
                    //警戒线的样式  ，虚实  颜色
                    type: "solid",
                    color: "#00b050"
                  },
                  label: {
                    position: "end",
                    formatter: "UCL",
                    fontSize: "16",
                    backgroundColor: "none",
                    color: "#fff"
                  },
                  yAxis: this.limit.maxLimit || 0.05 // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                },
                {
                  silent: false, //鼠标悬停事件  true没有，false有
                  lineStyle: {
                    //警戒线的样式  ，虚实  颜色
                    type: "solid",
                    color: "#00b050"
                  },
                  label: {
                    position: "end",
                    formatter: "LCL",
                    fontSize: "16",
                    backgroundColor: "none",
                    color: "#fff"
                  },
                  yAxis: this.limit.minLimit || -0.05 // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
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
            end: 20 //数据窗口范围的结束百分比,表示20%坐标
          }
        ]
      }
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
