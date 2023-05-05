<template>
  <!-- top5 好看的折线图
        参考地址:https://www.isqqw.com/viewer?id=15337
  -->
  <div class="line-chart">
    <p class="title" v-if="showTitle">{{ title }}</p>
    <base-echart :options="options" height="350px" />
  </div>
</template>
<script>
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "line-chart",
  props: ["title", "config", "height", "showTitle"],
  components: {
    baseEchart
  },
  computed: {
    options() {
      // 设置变量
      let themeColor = this.$store.getters.theme == "dark" ? "#fff" : "#000"
      let {
        xData,
        legends,
        yData: [data0, data1, data2, data3, data4, data5, data6, data7, data8, data9]
      } = this.config
      // console.log("legends.slice(5)", legends.slice(5))
      // console.log("legends.slice(0, 5)", legends.slice(0, 5))
      return {
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
          borderWidth: 0,
          top: 60,
          left: "6%",
          right: "7%",
          bottom: "10%",
          textStyle: {
            color: "#fff"
          }
        },
        legend: [
          {
            data: legends,
            y: "0",
            textStyle: {
              color: themeColor, // 更改坐标轴文字颜色
              fontSize: 14
            }
          }
        ],
        tooltip: {
          show: true,
          trigger: "axis", //axis , item
          backgroundColor: "rgba(0, 49, 85, 1)",
          borderColor: "rgba(0, 151, 251, 1)",
          borderWidth: 1,
          borderRadius: 0,
          textStyle: {
            color: "#BCE9FC",
            fontSize: 16,
            align: "left"
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true, //隐藏X轴轴线
              symbol: ["none", "arrow"],
              lineStyle: {
                color: themeColor,
                width: 1
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: themeColor,
              fontSize: 16
            },
            data: xData
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                opacity: 0.5,
                type: "dotted"
              }
            },
            axisLine: {
              show: true, //隐藏X轴轴线
              symbol: ["none", "arrow"],
              lineStyle: {
                color: themeColor,
                width: 1
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: themeColor,
              fontSize: 16,
              formatter: (params) => {
                return params + ""
              }
            },
            splitArea: {
              show: false
            }
          }
        ],
        series: [
          {
            name: legends[0],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            data: data0
          },
          {
            name: legends[1],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            data: data1
          },
          {
            name: legends[2],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            data: data2
          },
          {
            name: legends[3],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            data: data3
          },
          {
            name: legends[4],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            data: data4
          },
          {
            name: legends[5],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            data: data5
          },
          {
            name: legends[6],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            data: data6
          },
          {
            name: legends[7],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            data: data7
          },
          {
            name: legends[8],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            data: data8
          },
          {
            name: legends[9],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            data: data9
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-echart {
  .title {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 5px;
    color: var(--chart-title);
    padding-left: 5px;
    border-left: 4px solid var(--chart-slip);
  }
}
</style>
