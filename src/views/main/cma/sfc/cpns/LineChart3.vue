<template>
  <dv-border-box-11 :title="`${config.deviceSeries}系列`">
    <span class="btn" @click="toDetail">详情</span>
    <base-echart :options="options" />
  </dv-border-box-11>
</template>

<script>
// 导入基础的图
import BaseEchart from "@/common/echart"
export default {
  name: "LineChart3",
  components: {
    BaseEchart
  },
  props: ["config"],
  data() {
    return {
      xData: [],
      // Stanley: [],
      legends: ["ML-M", "ML-K", "ML-B"],
      // mdx: [],
      // jux: [],
      // mlx: [],
      // mwx: []
      mlm: [],
      mlk: [],
      mlb: []
    }
  },
  computed: {
    options() {
      // console.log("config======", this.config)
      // 处理对应的数据
      if (Object.keys(this.config).length > 0) {
        this.config.mowkYieldList.forEach((item) => {
          let { dateCode, mesYieldList } = item
          // 取出时间
          this.xData.push(dateCode)
          // 取出剩下的 值
          mesYieldList.forEach((item1) => {
            if (item1.owner == "ML-M") {
              this.mlm.push(parseFloat(item1.yield))
            } else if (item1.owner == "ML-K") {
              this.mlk.push(parseFloat(item1.yield))
            } else if (item1.owner == "ML-B") {
              this.mlb.push(parseFloat(item1.yield))
            }
          })
        })
      }
      return {
        grid: {
          top: 80,
          right: 50,
          left: 80,
          bottom: 40 //图表尺寸大小
        },
        legend: [
          // ML-M
          {
            top: 50,
            right: 380,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 12
            },
            data: ["ML-M"]
          },
          // ML-K
          {
            top: 50,
            right: 300,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 12
            },
            data: ["ML-K"]
          },
          // ML-B
          {
            top: 50,
            right: 190,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 12
            },
            data: ["ML-B"]
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
              symbol: ["none", "arrow"],
              lineStyle: {
                color: "#fff",
                opacity: 1
              }
            }
          }
        ],
        series: [
          // 线数据 ML-M
          {
            name: "ML-M",
            type: "line",
            //yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            symbolSize: 8,
            smooth: true, // 设置拆线平滑
            itemStyle: {
              normal: {
                color: "#52fea2"
              }
            },
            lineStyle: {
              width: 4
            },
            label: {
              show: true,
              formatter: (params) => params.value + "%"
            },
            data: this.mlm
          },
          // 线数据 ML-K
          {
            name: "ML-K",
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
            data: this.mlk
          },
          // 线数据 ML-B
          {
            name: "ML-B",
            type: "line",
            //yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            symbolSize: 8,
            smooth: true, // 设置拆线平滑
            itemStyle: {
              normal: {
                color: "#f7a35c"
              }
            },
            lineStyle: {
              width: 4
            },
            label: {
              show: true,
              formatter: (params) => params.value + "%"
            },
            data: this.mlb
          }
        ]
      }
    }
  },
  methods: {
    toDetail() {
      console.log("toDetail")
      this.$router.push({
        name: "sfcdetail",
        params: {
          title: "ML系列良率"
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
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
}
</style>
