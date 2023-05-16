<template>
  <div class="bar-chart">
    <base-echart :options="options" :height="height" />
  </div>
</template>
<script>
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "bar-chart",
  props: ["barData", "height"],
  components: {
    baseEchart
  },
  computed: {
    options() {
      return {
        // 标题
        title: {
          text: "World Population",
          textStyle: { color: "#fff" }
        },
        // 颜色
        color: ["#5ad2fa", "#adf7b7", "#FF7F00", "#836FFF", "#4876FF", "#EE5C42"],
        grid: {
          borderWidth: 0,
          top: 60,
          left: "6%",
          right: "7%",
          bottom: "10%",
          textStyle: {
            color: "#fff"
          }
        },
        // 图例
        legend: [
          {
            align: "auto",
            // orient: "vertical",
            icon: "square",
            // left: "right",
            // top: "center",
            itemWidth: 20, // 图例图形宽度
            itemHeight: 16,
            itemGap: 20,
            textStyle: {
              color: "#fff"
            }
          }
        ],
        tooltip: {},
        // 柱状图数据
        dataset: {
          source: this.barData
        },
        // x轴
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true, //显示X轴轴线
              // 轴线两边的箭头，只在末端显示箭头
              symbol: ["none", "arrow"],
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            // 是否显示分隔线
            splitLine: {
              show: false
            },
            // 是否显示坐标轴刻度
            axisTick: {
              show: false
            },
            // 是否显示分隔区域
            splitArea: {
              show: false
            },
            // 坐标轴刻度标签
            axisLabel: {
              interval: 0,
              color: "#fff",
              fontSize: 20
            }
            // data: xData
          }
        ],
        // y轴
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true
            },
            axisLine: {
              show: true, //显示y轴轴线
              symbol: ["none", "arrow"],
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: "#fff",
              fontSize: 20
              // formatter: (params) => {
              //   return params + ""
              // }
            },
            // 是否显示分隔区域
            splitArea: {
              show: false
            }
          }
        ],
        series: [
          { type: "bar" },
          { type: "bar" },
          { type: "bar" },
          { type: "bar" },
          { type: "bar" }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
