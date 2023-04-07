<template>
  <dv-border-box-11 :color="changeBoxColor" title="lcb d50">
    <span class="btn" @click="toDetail"></span>
    <base-echart :options="options" />
  </dv-border-box-11>
</template>

<script>
// 导入基础的图
import BaseEchart from "@/common/echart"
export default {
  name: "LineChart2",
  components: {
    BaseEchart
  },
  props: ["config"],
  data() {
    return {
      xData: [],
      legends: []
    }
  },
  computed: {
    changeBoxColor() {
      return this.$store.getters.theme == "dark" ? ["#8aaafb", "#1f33a2"] : ["#05dad4", "#2c97e1"]
    },
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
          // {
          //   data: legends.slice(6),
          //   y: "25",
          //   textStyle: {
          //     color: themeColor, //更改坐标轴文字颜色
          //     fontSize: 14
          //   }
          // },
          {
            data: legends,
            y: "0",
            textStyle: {
              color: themeColor, // 更改坐标轴文字颜色
              fontSize: 14
            },
            top: 30,
            right: 10
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
              fontSize: 20
            },
            data: xData
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true
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
              fontSize: 15,
              // formatter: (params) => {
              //   return params + ""
              // }
              formatter: function (value) {
                return value + "%"
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
  },
  methods: {
    toDetail() {
      if (!this.config.deviceSeries) return
      this.$router.push({
        name: "sfcdetail",
        query: {
          tag: this.config.deviceSeries
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* .btn {
  position: absolute;
  right: 40px;
  top: 36px;
  display: inline-block;
  width: 50px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  border: 1px solid #ccc;
  z-index: 9999;
  cursor: pointer;
} */
.btn {
  position: absolute;
  right: 358px;
  top: 4px;
  display: inline-block;
  width: 218px;
  height: 50px;
  z-index: 9999;
  cursor: pointer;
}
</style>
