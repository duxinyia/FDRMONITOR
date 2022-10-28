<template>
  <dv-border-box-11 title="SFR">
    <base-echart :options="options" />
  </dv-border-box-11>
</template>

<script>
// 导入基础的图
import BaseEchart from "@/common/echart"
export default {
  name: "LineChart4",
  components: {
    BaseEchart
  },
  data() {
    return {
      xData: ["2022-05", "2022-06", "2022-07", "2022-08", "2022-09", "2022-10"],
      defGoal: [0.3, 0.5, 0.2, 0.4, 0.2, 0.7]
    }
  },
  computed: {
    options() {
      return {
        grid: {
          top: 80,
          right: 50,
          left: 80,
          bottom: 40 //图表尺寸大小
        },

        legend: [
          // Def Goal
          {
            top: 50,
            right: 380,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 12
            },
            data: ["Def Goal"]
          }
        ],

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
            lineStyle: {
              color: "#ffffff",
              opacity: 0.3
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
            min: () => 0, // 指定最小值
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
              lineStyle: {
                color: "#fff",
                opacity: 0.3
              }
            }
          }
        ],

        series: [
          // 线数据 Def Goal
          {
            name: "Def Goal",
            type: "line",
            //yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            symbolSize: 8,
            smooth: true, // 设置拆线平滑
            itemStyle: {
              normal: {
                color: "#1fedeb"
              }
            },
            lineStyle: {
              width: 4
            },
            label: {
              show: true,
              formatter: (params) => params.value + "%"
            },
            data: this.defGoal
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
