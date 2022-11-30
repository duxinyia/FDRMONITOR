<template>
  <!-- <dv-border-box-11 :title="`${config.deviceSeries}系列`"> -->
  <dv-border-box-11
    :color="changeBoxColor"
    :title="config.deviceSeries && `${config.deviceSeries}系列`"
  >
    <div class="operation">
      <el-radio-group v-model="radio">
        <el-radio label="all_">全部</el-radio>
        <el-radio label="eol_">EOL</el-radio>
        <el-radio label="fol_">FOL</el-radio>
      </el-radio-group>
    </div>
    <base-echart height="400px" :options="options" />
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
      legends: [], // 所有legend的值
      radio: "all_"
    }
  },
  computed: {
    changeBoxColor() {
      return this.$store.getters.theme == "dark" ? ["#8aaafb", "#1f33a2"] : ["#05dad4", "#2c97e1"]
    },
    options() {
      // 一些基本的配置
      let baseLengend = {
        top: 40,
        textStyle: {
          color: themeColor,
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

      // 设置变量
      let themeColor = this.$store.getters.theme == "dark" ? "#fff" : "#000"
      let tempLegends = [] // 用于每次进来都是全新的 legends
      if (Object.keys(this.config).length > 0) {
        // 不能写死数据，因为不确定 循环数组，取出对应的值
        // 1. 取出eol的值
        this.config.eoL_MowkYieldList.forEach((item, index) => {
          if (index == 0) {
            this.legends = []
            this.xData = []
          }
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
        // 建立关系
        var showDate = this.legends.map((item, index) => {
          return {
            ...baseSerie,
            name: this.legends[index],
            data: this[this.radio + this.legends[index]]
          }
        })
      }
      return {
        color: ["#5ad2fa", "#b989f0", "#adf7b7", "#c9dd68"],
        grid: {
          top: 80,
          right: 10,
          left: 60,
          bottom: 75 //图表尺寸大小
        },
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
            },
            rotate: "30" //标签倾斜的角度，旋转的角度是-90到90度
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
            // position: "left",
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
        series: showDate
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.border-box-content {
  position: relative;
}
.operation {
  position: absolute;
  right: 20px;
  top: 40px;
  z-index: 9999;
}
</style>
