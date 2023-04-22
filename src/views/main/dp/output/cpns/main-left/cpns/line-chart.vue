<template>
  <!-- top5 好看的折线图
        参考地址:https://www.isqqw.com/viewer?id=15996
  -->
  <div class="line-chart">
    <base-echart :options="options" height="380px" />
  </div>
</template>
<script>
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "line-chart",
  props: ["progressConfig"],
  components: {
    baseEchart
  },
  computed: {
    options() {
      let xData = this.progressConfig.map((item) => item.name)
      let yData = this.progressConfig.map((item) => item.value)
      return {
        grid: {
          top: "5%",
          left: "-10%",
          bottom: "3%",
          right: "1%",
          containLabel: true
        },
        tooltip: {
          trigger: "item"
        },
        animation: false,
        xAxis: [
          {
            type: "category",
            data: xData,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              // textStyle: {
              color: "#fff",
              // },
              margin: 30
            },
            interval: 1
          }
        ],
        yAxis: [
          {
            show: false,
            type: "value"
          }
        ],
        series: [
          {
            name: "上部圆",
            type: "pictorialBar",
            silent: true,
            symbolSize: [40, 10],
            symbolOffset: [0, -6],
            symbolPosition: "end",
            z: 12,
            label: {
              normal: {
                show: true,
                position: "top",
                fontSize: 15,
                fontWeight: "bold",
                color: "#5BFCF4"
              }
            },
            color: "#5BFCF4",
            data: yData
          },
          {
            name: "底部圆",
            type: "pictorialBar",
            silent: true,
            symbolSize: [40, 10],
            symbolOffset: [0, 7],
            z: 12,
            color: "#5BFCF4",
            data: yData
          },
          {
            name: "内层波浪",
            type: "pictorialBar",
            silent: true,
            symbolSize: [50, 15],
            symbolOffset: [0, 12],
            z: 10,
            itemStyle: {
              normal: {
                color: "transparent",
                borderColor: "#5BFCF4",
                borderType: "solid",
                borderWidth: 8
              }
            },
            data: yData
          },
          {
            name: "外层波浪",
            type: "pictorialBar",
            silent: true,
            symbolSize: [70, 20],
            symbolOffset: [0, 18],
            z: 10,
            itemStyle: {
              // normal: {
              color: "transparent",
              borderColor: "rgba(91,252,244,0.5)",
              borderType: "solid",
              borderWidth: 5
              // }
            },
            data: yData
          },
          {
            name: "设备数量",
            type: "bar",
            barWidth: "40",
            barGap: "10%", // Make series be overlap
            barCateGoryGap: "10%",
            itemStyle: {
              // normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
                {
                  offset: 0,
                  color: "rgba(210,210,210,0.3)"
                },
                {
                  offset: 1,
                  color: "#5BFCF4"
                }
              ]),
              opacity: 0.8
              // }
            },
            data: yData
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
