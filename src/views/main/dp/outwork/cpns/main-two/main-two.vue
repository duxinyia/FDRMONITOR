<template>
  <div class="main-two">
    <div v-for="(item, index) in 3" class="container" :key="index">
      <dv-border-box-12>
        <!-- <p class="title">{{ title[index] }}</p> -->
        <base-echart :options="options" height="210px" />
      </dv-border-box-12>
    </div>
  </div>
</template>
<script>
import baseEchart from "@/common/echart"
export default {
  name: "main-two",
  props: ["title", "config"],
  components: {
    baseEchart
  },
  data() {
    return {}
  },
  computed: {
    options() {
      // 设置变量
      let { xData, legends, yData } = this.config

      // console.log("legends.slice(5)", legends.slice(5))
      // console.log("legends.slice(0, 5)", legends.slice(0, 5))
      return {
        title: {
          text: "SMT製造部出勤率",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 20
          }
        },
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
          borderWidth: 0,
          top: 60,
          left: "12%",
          right: "3%",
          bottom: "10%",
          textStyle: {
            color: "#fff"
          }
        },
        // legend: [
        //   {
        //     itemWidth: 15,
        //     itemHeight: 15,
        //     itemGap: 40,
        //     textStyle: { color: "#fff", fontSize: 18 },
        //     icon: "stack",
        //     right: "5%", // 调整位置
        //     top: -5
        //   },
        // ],
        tooltip: {
          show: true,
          trigger: "axis", //axis , item
          backgroundColor: "rgba(0, 49, 85, 1)",
          borderColor: "rgba(0, 151, 251, 1)",
          borderWidth: 1,
          borderRadius: 0,
          textStyle: {
            color: "#BCE9FC",
            fontSize: 14,
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
                color: "#fff",
                width: 1
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: true
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: "#fff",
              fontSize: 16
            },
            data: xData
          }
        ],
        yAxis: [
          {
            type: "value",
            min: function (value) {
              return Math.floor(value.min)
            },

            max: function (value) {
              return Math.ceil(value.max)
            },
            splitLine: {
              show: false
            },
            axisLine: {
              show: true, //隐藏X轴轴线
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
              fontSize: 16,
              formatter: function (value) {
                return value.toFixed(1) + "%"
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
            data: yData[0],
            smooth: true,
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff",
                fontSize: 16
              },
              formatter: function (params) {
                return params.value + "%"
              }
            }
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px 20px 20px 20px !important;
}
.main-two {
  display: grid;
  // grid-template-rows: 50% 50%;
  grid-template-columns: 33% 33% 33%;
  gap: 10px;

  .container {
    flex: 1;
  }
}
</style>
