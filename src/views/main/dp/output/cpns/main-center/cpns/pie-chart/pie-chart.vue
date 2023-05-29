<template>
  <!-- 饼图:https://www.isqqw.com/viewer?id=16192 -->
  <div class="pie-chart">
    <base-echart :options="options" height="300px" />
  </div>
</template>

<script>
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "pie-chart",
  components: {
    baseEchart
  },
  props: ["seriesData"],
  computed: {
    options() {
      let { seriesData } = this
      let legend = []
      seriesData.forEach((item) => {
        legend.push(item.name)
      })
      return {
        // color: ["#fc8251", "#5470c6", "#91cd77", "#ef6567", "#f9c956", "#75bedc"],
        color: [
          "#5ad2fa",
          "#b989f0",
          "#adf7b7",
          "#c9dd68",
          "#33ffcc",
          "#FFC125",
          "#FF7F00",
          "#836FFF",
          "#4876FF",
          "#EE5C42"
        ],
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 5,
          containLabel: true
        },
        legend: [
          {
            align: "auto",
            orient: "vertical",
            icon: "square",
            left: "right",
            top: "center",
            itemWidth: 20, // 图例图形宽度
            itemHeight: 16,
            itemGap: 20,
            textStyle: {
              color: "#fff"
            }
            // data: legend
          }
          // {
          //   orient: "vertical",
          //   icon: "square",
          //   left: "right",
          //   top: "center",
          //   itemWidth: 20, // 图例图形宽度
          //   itemHeight: 16,
          //   itemGap: 20,
          //   textStyle: {
          //     color: "#fff",
          //     padding: [0, -100, 0, -60]
          //   }
          // }
        ],
        tooltip: {
          show: true
        },
        series: [
          {
            type: "pie",
            radius: ["90%", "45%"],
            center: ["45%", "50%"],
            emphasis: {
              scale: false
            },
            // hoverAnimation: true,
            z: 10,
            label: {
              show: false
            },
            //重点
            // label: {
            //   normal: {
            //     formatter: "{d}%",
            //     textStyle: {
            //       fontWeight: "normal",
            //       fontSize: 15
            //     }
            //   }
            // },
            //饼图图形上的文本标签，可用于说明图形的一些数据信息
            // label: {
            //   // 文字本身的描边宽度
            //   textBorderWidth: 0,
            //   backgroundColor: "none",
            //   color: "#fff",
            //   // {b}：数据名。{d}：百分比。
            //   formatter: "{b}: ({d}%)",
            //   fontWeight: "normal",
            //   fontSize: 15
            // },
            data: this.seriesData,
            // 提示线
            labelLine: {
              length: 100,
              show: true
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pie-chart {
  width: 100%;
  height: 300px;
}
</style>
