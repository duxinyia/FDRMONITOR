<template>
  <dv-border-box-11 :color="changeBoxColor" :title="`${config.deviceSeries}系列`">
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
      // 设置颜色数组，方便取值
      // let colors = ["#5ad2fa", "#b989f0", "#adf7b7", "#3759f0"]
      // 处理对应的数据
      if (Object.keys(this.config).length > 0) {
        // 取出 legend 的值
        this.config.monthWeekYieldList.forEach((item, index) => {
          // 取出lengds
          this.legends.push(item.device)
          // 给实例新增属性
          this[item.device] = []
          item.dateValues.forEach((item1) => {
            if (index == 0) {
              // 取出x轴的数据
              this.xData.push(item1.dateCode)
            }
            // 取出剩下的数据
            this[item.device].push(parseFloat(item1.values.value))
          })
        })
      }
      // 一些基本的配置
      let baseLengend = {
        top: 50,
        textStyle: {
          // color: "#FFFFFF",
          color: themeColor,
          fontSize: 12
        }
      }
      let baseSerie = {
        type: "line",
        symbol: "circle",
        symbolSize: 15,
        smooth: true, // 设置拆线平滑
        lineStyle: {
          width: 5
        },
        label: {
          show: true,
          formatter: (params) => params.value + "%"
        }
      }
      return {
        color: ["#9669ff", "#3766f4", "#43cf7c", "#ff8d1a"],
        grid: {
          top: 80,
          right: 50,
          left: 80,
          bottom: 40 //图表尺寸大小
        },
        // color: ["#5ad2fa", "#b989f0", "#adf7b7", "#c9dd68"],
        legend: {
          top: 50,
          right: 50,
          textStyle: {
            // color: "#fff",
            color: themeColor,
            fontSize: 14
          },
          data: this.legends
        },
        tooltip: {
          show: true,
          trigger: "axis", //axis , item
          backgroundColor: "RGBA(0, 49, 85, 1)",
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
        xAxis: {
          type: "category",
          boundaryGap: true,
          color: "#59588D",
          data: this.xData,
          axisLabel: {
            margin: 10,
            // color: "#EEEEEE",
            color: themeColor,
            textStyle: {
              fontSize: 14
            }
          },
          axisLine: {
            symbol: ["none", "arrow"],
            lineStyle: {
              // color: "#ffffff",
              color: themeColor,
              opacity: 1
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              // color: "#ffffff",
              color: themeColor,
              opacity: 1
            }
          }
        },
        yAxis: [
          {
            type: "value",
            min: (value) => value.min, // 指定最小值
            max: (value) => value.max, // 指定最大值
            splitLine: {
              show: false
            },
            axisLabel: {
              // color: "#EEEEEE",
              color: themeColor,
              textStyle: {
                fontSize: 16
              },
              formatter: function (value) {
                return value + "%"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              symbol: ["none", "arrow"],
              lineStyle: {
                // color: "#fff",
                color: themeColor,
                opacity: 1
              }
            }
          }
        ],
        series: this.legends.map((item, index) => {
          return {
            ...baseSerie,
            name: this.legends[index],
            data: this[this.legends[index]]
          }
        })
      }
    }
  },
  methods: {
    toDetail() {
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
