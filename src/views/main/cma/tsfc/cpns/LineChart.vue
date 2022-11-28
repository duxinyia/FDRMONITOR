<template>
  <!-- <dv-border-box-11 :title="`${config.deviceSeries}系列`"> -->
  <dv-border-box-11 :title="config.deviceSeries && `${config.deviceSeries}系列`">
    <base-echart height="350px" :options="options" />
  </dv-border-box-11>
</template>

<script>
// 导入基础的图
import BaseEchart from "@/common/echart"
export default {
  name: "LineChart",
  components: {
    BaseEchart
  },
  props: ["config"],
  data() {
    return {
      xData: [], // x轴的数据
      legends: [] // 所有legend的值
    }
  },
  computed: {
    options() {
      if (Object.keys(this.config).length > 0) {
        // 不能写死数据，因为不确定 循环数组，取出对应的值
        console.log("=======", this.config)
        // 1. 取出eol的值
        this.config.eoL_MowkYieldList.forEach((item, index) => {
          // 取出 对应的 legend
          this.legends.push(item.device.customName)
          // 给当前实例动态显示值
          this["eol_" + item.device.customName] = []
          item.dateValues.forEach((item1) => {
            if (index == 0) {
              // 取出x轴的数据
              this.xData.push(item1.dateCode)
            }
            // 取出对应的值 先只考虑eol的值
            this["eol_" + item.device.customName].push(parseInt(item1.values.value))
          })
        })
        // 2. 取出fol的值
        this.config.foL_MowkYieldList.forEach((item, index) => {
          // 给当前实例动态显示值
          this["fol_" + item.device.customName] = []
          item.dateValues.forEach((item1) => {
            // 取出对应的值 先只考虑eol的值
            this["fol_" + item.device.customName].push(parseInt(item1.values.value))
          })
        })
        // 3.取出所有的值
        this.config.alL_MowkYieldList.forEach((item, index) => {
          // 给当前实例动态显示值
          this["all_" + item.device.customName] = []
          item.dateValues.forEach((item1) => {
            // 取出对应的值 先只考虑eol的值
            this["all_" + item.device.customName].push(parseInt(item1.values.value))
          })
        })
        console.log("=======", this)
      }
      // 一些基本的配置
      let baseLengend = {
        top: 40,
        textStyle: {
          color: "#FFFFFF",
          fontSize: 12
        }
      }
      let baseSerie = {
        type: "line",
        symbolSize: 8,
        smooth: true, // 设置拆线平滑
        lineStyle: {
          width: 4
        },
        label: {
          show: true,
          formatter: (params) => params.value + "%"
        }
      }
      return {
        grid: {
          top: 80,
          right: 10,
          left: 60,
          bottom: 25 //图表尺寸大小
        },
        legend: {
          top: 50,
          right: 50,
          textStyle: {
            color: "#fff",
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
            color: "#EEEEEE",
            textStyle: {
              fontSize: 14
            }
          },
          axisLine: {
            symbol: ["none", "arrow"],
            lineStyle: {
              color: "#ffffff",
              opacity: 0.8
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#ffffff",
              opacity: 0.3
            }
          }
        },
        yAxis: [
          {
            type: "value",
            min: (value) => value.min, // 指定最小值
            max: (value) => value.max, // 指定最大值
            // position: "left",
            splitLine: {
              show: false
            },
            axisLabel: {
              color: "#EEEEEE",
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
                color: "#fff",
                opacity: 0.8
              }
            }
          }
        ],
        series: this.legends.map((item, index) => {
          return {
            ...baseSerie,
            name: this.legends[index],
            data: this["all" + this.legends[index]]
          }
        })
        // [
        //   ({ ...baseSerie, name: this.legends[0], data: this["all" + this.legends[0]] },
        //   { ...baseSerie, name: this.legends[1], data: this["all" + this.legends[1]] },
        //   { ...baseSerie, name: this.legends[2], data: this["all" + this.legends[2]] })
        // ]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
