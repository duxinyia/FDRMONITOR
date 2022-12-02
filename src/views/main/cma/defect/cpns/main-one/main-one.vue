<template>
  <div class="main-one">
    <base-echart :options="options" height="380px" />
  </div>
</template>

<script>
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "main-one",
  props: [
    "legends",
    "OverallYield",
    "TargetYield",
    "dpcs",
    "lcbs",
    "sfrs",
    "fol_cosmetic",
    "eol_cosmetic",
    "fol_others",
    "eol_others",
    "fol_process",
    "eol_process"
  ],
  components: {
    baseEchart
  },
  computed: {
    options() {
      // 设置变量
      let themeColor = this.$store.getters.theme == "dark" ? "#fff" : "#000"
      // 总数据列表
      let dataList = {
        xName: this.legends,
        data: [
          {
            name: "DPC",
            data: this.dpcs.map((item) => {
              return parseFloat(item.rate)
            })
          },
          {
            name: "LCB",
            data: this.lcbs.map((item) => {
              return parseFloat(item.rate)
            })
          },
          {
            name: "SFR",
            data: this.sfrs.map((item) => {
              return parseFloat(item.rate)
            })
          },
          {
            name: "FOL Cosmetic",
            data: this.fol_cosmetic.map((item) => {
              return parseFloat(item.rate)
            })
          },
          {
            name: "EOL Cosmetic",
            data: this.eol_cosmetic.map((item) => {
              return parseFloat(item.rate)
            })
          },
          {
            name: "FOL Others",
            data: this.fol_others.map((item) => {
              return parseFloat(item.rate)
            })
          },
          {
            name: "EOL Others",
            data: this.eol_others.map((item) => {
              return parseFloat(item.rate)
            })
          },
          {
            name: "FOL Process",
            data: this.fol_process.map((item) => {
              return parseFloat(item.rate)
            })
          },
          {
            name: "EOL Process",
            data: this.eol_process.map((item) => {
              return parseFloat(item.rate)
            })
          }
        ]
      }
      // 颜色列表
      let colorList = [
        "#2166EB",
        "#9BC3FF",
        "#F53577",
        "#B18BC7",
        "#9BC5BD",
        "#E3AC4C",
        "#EE6D58",
        "#9B41D0",
        "#4CCBE3",
        "#726899"
      ]

      let series = []
      let legendData = []
      dataList.data &&
        dataList.data.forEach((item, index) => {
          legendData.push(item.name)
          series.push({
            name: item.name,
            barWidth: 24,
            type: "bar",
            stack: "x",
            data: item.data
            // 高亮时放大
            // emphasis: {
            //   disabled: true,
            //   itemStyle: {
            //     color: colorList[index],
            //     borderColor: colorList[index],
            //     borderWidth: 10
            //   }
            // }
          })
        })
      // 总数
      series.push({
        type: "bar",
        zlevel: -1,
        barWidth: 24,
        barGap: "-100%",
        itemStyle: {
          color: "transparent"
        },
        emphasis: {
          disabled: true
        },
        label: {
          show: true,
          position: "top",
          textStyle: { color: "#333" },
          distance: 10
          // formatter: (params) => {
          //   return `${changeNumberToStr(params.value)}人`
          // }
        }
        // data: dataList.total
      })
      return {
        color: colorList,
        // backgroundColor: "#fff",
        legend: {
          data: legendData,
          textStyle: {
            align: "right",
            color: "#fff"
          },
          right: "2%",
          top: "2%"
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "#fff",
          borderRadius: 5,
          confine: true, // 是否将tooltip框限制在图表的区域内
          extraCssText:
            "box-shadow: 8px 10px 15px 0px rgba(0, 0, 0, 0.34);padding: 12px 16px;z-index: 2;width: 160px;",
          textStyle: {
            color: "#000",
            fontSize: 10
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          position: (point, params, dom, rect, size) => {
            //其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
            let x = point[0] //
            let y = point[1]
            let boxWidth = size.contentSize[0]
            let boxHeight = size.contentSize[1]
            return [x - boxWidth / 2 - 5, y - boxHeight - 30]
          }
          // formatter: function (params) {
          //   return `<div class="tooltip-div">${
          //     params.name || "-"
          //   }（人）<div style='margin-top: 8px;'>${
          //     params.seriesName || "-"
          //   }</div><div style='color: ${params.color};margin-top: 8px;'>${
          //     changeNumberToStr(params.data) || "-"
          //   }</div></div>`
          // }
        },
        grid: {
          left: 5,
          right: 8,
          top: 30,
          bottom: "1%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: dataList.xName,
          axisLabel: {
            textStyle: {
              fontSize: 14,
              color: themeColor
            }
          },
          axisLine: {
            symbol: ["none", "arrow"],
            symbolOffset: [0, 10],
            lineStyle: {
              color: themeColor,
              opacity: 1
            }
          }
        },
        yAxis: {
          type: "value",
          nameTextStyle: {
            fontSize: 14,
            padding: [0, 50, 0, 0],
            color: themeColor
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: themeColor,
              fontSize: 14
            }
          },
          axisLine: {
            symbol: ["none", "arrow"],
            symbolOffset: [0, 10],
            lineStyle: {
              color: themeColor,
              opacity: 1
            }
          }
        },
        series: series
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-one {
  margin-bottom: 15px;
}
</style>
