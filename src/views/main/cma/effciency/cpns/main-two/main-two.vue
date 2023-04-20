<template>
  <el-row class="main-two">
    <el-col :span="8">
      <dv-border-box-11 title="By周設備效率Top5" style="height: 320px">
        <base-echart :options="options" />
      </dv-border-box-11>
      <dv-border-box-11 title="By周設備效率損失Top5" style="height: 320px">
        <el-row class="dot-container" v-for="item in 5" :key="item">
          <el-col :span="5">DT23&nbsp;&nbsp;89.2%</el-col>
          <el-col class="dot-item" :span="3" :offset="4"><span></span></el-col>
          <el-col class="dot-item" :span="3"><span></span></el-col>
          <el-col class="dot-item" :span="3"><span></span></el-col>
          <el-col class="dot-item" :span="3"><span></span></el-col>
          <el-col class="dot-item" :span="3"><span></span></el-col>
        </el-row>
      </dv-border-box-11>
    </el-col>
    <el-col :span="8" style="height: 100%">
      <base-echart :options="options1" />
    </el-col>
    <el-col :span="8">
      <dv-border-box-11 title="By天設備效率Top5" style="height: 320px">
        <base-echart :options="options" />
      </dv-border-box-11>
      <dv-border-box-11 title="By天設備效率損失Top5" style="height: 320px">
        <el-row class="dot-container" v-for="item in 5" :key="item">
          <el-col :span="5">DT23&nbsp;&nbsp;89.2%</el-col>
          <el-col class="dot-item" :span="3" :offset="4"><span></span></el-col>
          <el-col class="dot-item" :span="3"><span></span></el-col>
          <el-col class="dot-item" :span="3"><span></span></el-col>
          <el-col class="dot-item" :span="3"><span></span></el-col>
          <el-col class="dot-item" :span="3"><span></span></el-col>
        </el-row>
      </dv-border-box-11>
    </el-col>
  </el-row>
</template>

<script>
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "main-two",
  props: {},
  components: {
    baseEchart
  },
  data() {
    return {
      chart2Xdata: [1, 2, 3, 4, 5],
      chart2Output: [86, 89, 78, 85, 87],
      chart2TargetOut: [90, 92, 91, 95, 93]
    }
  },
  computed: {
    options() {
      // 设置变量
      let themeColor = this.$store.getters.theme == "dark" ? "#fff" : "#000"
      let { chart2Xdata, chart2Output, chart2TargetOut } = this
      return {
        grid: {
          top: 30,
          right: 20,
          left: 30,
          bottom: 50 //图表尺寸大小
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
        legend: [
          {
            top: 0,
            right: 80,
            textStyle: {
              color: themeColor,
              fontSize: 12
            },
            data: ["計劃"]
          },
          {
            top: 0,
            right: 8,
            textStyle: {
              color: themeColor,
              fontSize: 12
            },
            data: ["實際"]
          }
        ],
        xAxis: {
          type: "category",
          color: "#59588D",
          data: chart2Xdata,
          axisLabel: {
            margin: 10,
            color: themeColor,

            fontSize: 12
          },
          axisLine: {
            lineStyle: {
              color: themeColor,
              opacity: 1
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: themeColor,
              opacity: 0.5,
              type: "dotted"
            }
          }
        },
        yAxis: [
          {
            position: "left",
            //min: 0, // 指定最小值
            //max: (value) => Math.floor(value.max) + 3000, // 指定最大值
            axisLabel: {
              color: themeColor,

              fontSize: 14
            },
            axisLine: {
              lineStyle: {
                color: themeColor,
                opacity: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: themeColor,
                opacity: 0.5,
                type: "dotted"
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            name: "計劃",
            data: chart2TargetOut,
            barWidth: "16",
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(184,123,255,1)"
                },
                {
                  offset: 1,
                  color: "rgba(45,57,178,1)"
                }
              ])
            },
            label: {
              show: true,
              position: "top",
              fontSize: 12,
              fontWeight: "bold",
              color: themeColor
            }
          },
          {
            type: "bar",
            name: "實際",
            data: chart2Output,
            barWidth: "16",
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(48,227,235,1)"
                },
                {
                  offset: 1,
                  color: "rgba(16,127,212,1)"
                }
              ])
            },
            label: {
              show: true,
              position: "top",
              fontSize: 12,
              fontWeight: "bold",
              color: themeColor
            }
          }
        ]
      }
    },
    options1() {
      let Data = [
        {
          name: "流动性紧缺",
          value: "37"
        }
      ]
      return {
        color: ["#12B796", "#1DADFF", "#3F89FF", "#02D8FF"],
        legend: {
          icon: "circle",
          x: "center",
          bottom: "40",
          itemWidth: 12,
          itemHeight: 12,
          align: "left",
          itemGap: 24,
          textStyle: {
            fontSize: 14,
            color: "#0172AB"
          }
        },
        series: [
          {
            type: "pie",
            radius: ["35%", "45%"],
            center: ["50%", "50%"],
            hoverAnimation: true,
            selectedMode: "single",
            selectedOffset: 10,
            clockwise: true,
            data: Data,
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 6
            },
            labelLine: {
              length: 30,
              length2: 40
            },
            label: {
              align: "left",
              // formatter: "{a|{d}%}\n {b|{b} }",
              padding: [20, 0, 0, 0],
              color: "#fff"
            }
          },
          {
            // 短刻度节点线
            type: "gauge",
            startAngle: 270, // 270
            endAngle: -89.9999,
            center: ["50%", "50%"],
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            radius: "56%",
            splitNumber: "60", // 42
            axisLine: {
              show: false,
              lineStyle: {
                color: [
                  [1, "#1755ff"] // 01ADF8 1755ff
                ],
                width: 10
              }
            },
            splitLine: {
              length: 12,
              lineStyle: {
                width: 2,
                color: "#01ADF8",
                distance: 10
              }
            },
            detail: {
              show: false
            }
          },
          {
            // 长刻度节点线
            type: "gauge",
            startAngle: 270, // 270
            endAngle: -89.9999,
            center: ["50%", "50%"],
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            radius: "58%",
            splitNumber: "12",
            axisLine: {
              show: false,
              lineStyle: {
                color: [
                  [1, "#1755ff"] // 01ADF8 1755ff
                ],
                width: 10
              }
            },
            splitLine: {
              length: 14,
              lineStyle: {
                width: 2,
                color: "#00ADF9",
                distance: 10
              }
            },
            detail: {
              show: false
            }
          },
          {
            name: "项目总数",
            type: "pie",
            radius: ["0%", "0%"],
            itemStyle: {
              color: "transparent"
            },
            label: {
              position: "inside",
              formatter: `{data|{c}%}\n{serie|{a}}`,
              rich: {
                data: {
                  fontWeight: "400",
                  fontSize: 30,
                  color: `#FFA951`,
                  lineHeight: 40,
                  textBorderColor: `transparent`,
                  textBorderWidth: 0
                },
                serie: {
                  fontSize: 22,
                  color: `#504F4F`,
                  textBorderColor: `transparent`,
                  textBorderWidth: 0
                }
              }
            },
            labelLine: {
              show: false
            },
            data: [100]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 60px 20px 20px 20px;
}
.main-two {
  margin-top: 20px;
}
.dot-container {
  margin-top: 10px;
  margin-bottom: 20px;
  .dot-item {
    span {
      display: inline-block;
      width: 25px;
      height: 25px;
      background: #309eed;
      border-radius: 50%;
    }
  }
}
</style>
