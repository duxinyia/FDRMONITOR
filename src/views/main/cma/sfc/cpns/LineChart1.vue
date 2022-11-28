<template>
  <dv-border-box-11 title="SFC 良率">
    <base-echart height="350px" :options="options" />
  </dv-border-box-11>
</template>

<script>
// 导入基础的图
import BaseEchart from "@/common/echart"
export default {
  name: "LineChart1",
  components: {
    BaseEchart
  },
  props: ["config", "isYear"],
  data() {
    return {
      legends: [],
      xData: []
    }
  },
  computed: {
    options() {
      this.config.forEach((item, index) => {
        // 取出 legend
        this.legends.push(item.deviceSeries)
        // 给实例新增属性 方便动态赋值
        this[item.deviceSeries] = []
        if (this.isYear) {
          // 12 个月的情况
          item.monthYieldList.forEach((item1) => {
            if (index == 0) {
              // 取出 x轴的值和数据
              this.xData.push(item1.dateCode)
            }
            // 赋值操作
            this[item.deviceSeries].push(parseFloat(item1.values.value))
          })
        } else {
          // 2月四周的情况
          item.monthWeekYieldList.forEach((item1) => {
            if (index == 0) {
              // 取出 x轴的值和数据
              this.xData.push(item1.dateCode)
            }
            // 赋值操作
            this[item.deviceSeries].push(parseFloat(item1.values.value))
          })
        }
      })
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
          top: 95,
          right: 50,
          left: 80,
          bottom: 40 //图表尺寸大小
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
              fontSize: 18,
              fontWeight: "bold"
            }
          },
          axisLine: {
            symbol: ["none", "arrow"],
            symbolOffset: [0, 10],
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
              color: "#fff",
              opacity: 0.8
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
            axisTick: {
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
            axisLine: {
              symbol: ["none", "arrow"],
              symbolOffset: [0, 10],
              lineStyle: {
                color: "#fff",
                opacity: 1
              }
            }
          }
        ],
        series: [
          { ...baseSerie, name: this.legends[0], data: this[this.legends[0]] },
          { ...baseSerie, name: this.legends[1], data: this[this.legends[1]] },
          { ...baseSerie, name: this.legends[2], data: this[this.legends[2]] },
          { ...baseSerie, name: this.legends[3], data: this[this.legends[3]] }
        ]
      }
    }
  }
}
</script>
