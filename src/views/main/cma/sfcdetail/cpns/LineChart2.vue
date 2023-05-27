<template>
  <dv-border-box-11
    v-loading="isLoading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="加载中..."
    element-loading-background="rgba(0, 0, 0, 1)"
    :color="changeBoxColor"
    :title="`${showTitle || ''}`"
  >
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
  props: {
    config: {
      type: Object,
      default: () => ({ legends: [], xData: [], showData: [] })
    },
    showTitle: {
      type: String,
      default: "标题"
    }
  },
  data() {
    return { isLoading: true }
  },
  computed: {
    changeBoxColor() {
      return this.$store.getters.theme == "dark" ? ["#8aaafb", "#1f33a2"] : ["#05dad4", "#2c97e1"]
    },
    options() {
      // 设置变量
      let themeColor = this.$store.getters.theme == "dark" ? "#fff" : "#000"
      let { legends = [], xData = [], showData = [] } = this.config
      let baseSerie = {
        type: "line",
        symbol: "circle",
        symbolSize: 5,
        smooth: true, // 设置拆线平滑
        lineStyle: {
          width: 3
        },
        label: {
          show: true,
          color: "#fff",
          formatter: (params) => params.value + "%"
        }
      }
      return {
        color: ["#9669ff", "#3766f4", "#43cf7c", "#ff8d1a"],
        grid: {
          top: 100,
          right: 50,
          left: 80,
          bottom: 40 //图表尺寸大小
        },
        // color: ["#5ad2fa", "#b989f0", "#adf7b7", "#c9dd68"],
        legend: {
          top: 50,
          right: 50,
          textStyle: {
            color: themeColor,
            fontSize: 14
          },
          data: legends
        },
        tooltip: {
          show: true,
          confine: true,
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
          formatter: function (params) {
            var html = params[0].name + "<br>"
            for (var i = 0; i < params.length; i++) {
              html += `<div style="display:flex;justify-content: space-between;">
                  <div> <span style="display:inline-block;margin-right:2px;border-radius:10px;width:10px;height:10px;background:${
                    params[i].color
                  };"></span>   ${params[i].seriesName}</div>
                  <div style="margin-left:10px">${params[i].value || "-"}%</div>
                  </div>`
            }
            return html
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
          data: xData,
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
              show: true,
              symbol: ["none", "arrow"],
              lineStyle: {
                color: themeColor,
                opacity: 1
              }
            }
          }
        ],

        series: legends.map((item, index) => {
          return { ...baseSerie, name: legends[index], data: showData[index] }
        })
      }
    }
  },
  watch: {
    config: {
      handler() {
        this.isLoading = false
      },
      deep: true
    }
  }
}
</script>
