<template>
  <dv-border-box-11 :color="changeBoxColor" :title="`${config.title || ''}系列`">
    <base-echart
      v-loading="isLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中..."
      element-loading-background="rgba(0, 0, 0, 1)"
      height="400px"
      :options="options"
    />
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
  props: {
    config: {
      type: Object,
      default: () => ({ title: "", legends: [], xData: [], showData: [] })
    }
  },
  data() {
    return { isLoading: true }
  },
  watch: {
    config() {
      this.isLoading = false
    }
  },
  computed: {
    changeBoxColor() {
      return this.$store.getters.theme == "dark" ? ["#8aaafb", "#1f33a2"] : ["#05dad4", "#2c97e1"]
    },
    options() {
      let { legends = [], xData = [], showData = [] } = this.config
      return {
        color: ["#9669ff", "#3766f4", "#43cf7c", "#ff8d1a", "#05dad4", "#1f33a2", "#8aaafb", "#05dad4", "#2c97e1"],
        grid: {
          top: 110,
          right: 10,
          left: 60,
          bottom: 45 //图表尺寸大小1
        },
        legend: {
          top: 50,
          left: 10,
          textStyle: {
            color: "#fff",
            fontSize: 14
          },
          data: legends
        },
        tooltip: {
          show: true,
          trigger: "axis", //axis , ite
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
            color: "#fff",
            fontSize: 14,
            rotate: "20" //标签倾斜的角度，旋转的角度是-90到90度
          },
          axisLine: {
            symbol: ["none", "arrow"],
            lineStyle: {
              color: "#fff",
              opacity: 1
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#fff",
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
              color: "#fff",
              fontSize: 16,
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
                color: "#fff",
                opacity: 1
              }
            }
          }
        ],
        series: legends.map((item1, index) => {
          return {
            type: "line",
            symbol: "circle",
            symbolSize: 10,
            smooth: true,
            lineStyle: {
              width: 3
            },
            label: {
              show: true,
              color: "#fff",
              formatter: (params) => params.value + "%"
            },
            name: legends[index],
            data: showData[index]
          }
        })
      }
    }
  }
}
</script>
