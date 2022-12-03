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
      color: [
        "rgba(220, 145, 255, 1)",
        "rgba(245, 154, 108, 1)",
        "rgba(139, 111, 255, 1)",
        "rgba(120, 187, 255, 1)",
        "rgba(124, 168, 255, 1)"
      ]
    }
  },
  computed: {
    options() {
      let { seriesData } = this
      return {
        // backgroundColor: "#000",
        color: this.color,
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 5,
          containLabel: true
        },
        legend: [
          {
            // type: "scroll",
            orient: "vertical",
            left: "74%",
            align: "auto",
            top: "5%",
            itemWidth: 20, // 图例图形宽度
            itemHeight: 16,
            itemGap: 20,
            textStyle: {
              color: "#fff",
              align: "left",
              verticalAlign: "middle",
              rich: {
                name: {
                  color: "#fff",
                  fontSize: 16,
                  width: 100,
                  padding: [0, 0, 0, 10]
                },
                value: {
                  color: "rgba(29, 145, 245, 1)",
                  fontSize: 18,
                  fontFamily: "DIN",
                  fontWeight: 500
                }
              }
            },
            // data: this.seriesData.slice(8),
            // formatter: (name) => {
            //   if (this.seriesData.length) {
            //     const item = this.seriesData.filter((item) => item.name === name)[0]
            //     return `{name|${name} }{value| ${item.value}}`
            //   }
            // },
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
            itemStyle: {
              normal: {
                borderWidth: 5,
                borderColor: "#fff"
              }
            },
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
