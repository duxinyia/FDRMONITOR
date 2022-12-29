<template>
  <!-- 饼图:https://www.isqqw.com/viewer?id=16192 -->
  <div class="pie-chart">
    <!-- <p class="title">{{ title }}</p> -->
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
  data() {
    return {
      // color: [
      //   "rgba(220, 145, 255, 1)",
      //   "rgba(245, 154, 108, 1)",
      //   "rgba(139, 111, 255, 1)",
      //   "rgba(120, 187, 255, 1)",
      //   "rgba(124, 168, 255, 1)"
      // ]
    }
  },
  computed: {
    options() {
      let { seriesData } = this
      // 设置变量
      let themeColor = this.$store.getters.theme == "dark" ? "#fff" : "#000"
      return {
        color: [
          "#5ad2fa",
          "#b989f0",
          "#adf7b7",
          "#c9dd68",
          "33ffcc",
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
            orient: "vertical",
            left: "74%",
            align: "auto",
            top: "5%",
            itemWidth: 20, // 图例图形宽度
            itemHeight: 16,
            itemGap: 20,
            textStyle: {
              color: themeColor,
              align: "left",
              verticalAlign: "middle",
              rich: {
                name: {
                  color: themeColor,
                  fontSize: 16,
                  width: 100,
                  padding: [0, 0, 0, 10]
                },
                value: {
                  color: themeColor,
                  fontSize: 18,
                  fontFamily: "DIN",
                  fontWeight: 500
                }
              }
            },
            x: "left"
          }
        ],
        tooltip: {
          show: true
        },
        series: [
          {
            type: "pie",
            radius: ["90%", "45%"],
            center: ["45%", "50%"],
            hoverAnimation: true,
            z: 10,
            label: {
              show: false
            },
            data: this.seriesData,
            labelLine: {
              show: false
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
