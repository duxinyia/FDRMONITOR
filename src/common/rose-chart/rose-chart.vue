<template>
  <!-- 玫瑰图 -->
  <div class="rose-chart">
    <span class="rose-title">{{ title }}</span>
    <base-echart :options="options" />
  </div>
</template>

<script>
import baseEchart from "@/common/echart"
export default {
  name: "rose-title",
  props: {
    title: {
      type: String,
      default: "標題"
    },
    alloptions: {
      type: Array,
      default: () => []
    }
  },
  components: {
    baseEchart
  },
  computed: {
    options() {
      return {
        // legend: {
        //   top: "bottom"
        // },
        tooltip: {
          trigger: "item"
        },
        series: [
          {
            name: "效率損失",
            type: "pie",
            radius: ["10", "70%"],
            center: ["50%", "50%"],
            roseType: "area",
            label: {
              position: "inside",
              formatter: (params) => params.data.rate,
              fontSize: 15,
              color: "#000"
            },
            labelLine: {
              length: 3,
              length2: 2
            },
            itemStyle: {
              borderRadius: 8
            },
            data: this.alloptions
          },
          {
            name: "效率損失",
            type: "pie",
            radius: ["20", "55%"],
            center: ["50%", "50%"],
            roseType: "area",
            label: {
              fontSize: 13,
              // extraCssText: "width:120px;white-space:pre-wrap",
              formatter: function ({ name }) {
                let newParamsName = ""
                const paramsNameNumber = name.length // 文字总长度
                const provideNumber = 6 //一行显示几个字
                const rowNumber = Math.ceil(paramsNameNumber / provideNumber)
                if (paramsNameNumber > provideNumber) {
                  for (let p = 0; p < rowNumber; p++) {
                    const start = p * provideNumber
                    const end = start + provideNumber
                    const tempStr =
                      p === rowNumber - 1
                        ? name.substring(start, paramsNameNumber)
                        : name.substring(start, end) + "\n"
                    newParamsName += tempStr
                  }
                } else {
                  newParamsName = name
                }
                return newParamsName
              }
            },
            // labelLine: {
            //   length: 3,
            //   length2: 4
            // },
            itemStyle: {
              borderRadius: 8
            },
            data: this.alloptions
          }
        ],
        color: ["#6395f9", "#62daab", "#00FFFF", "#f6c022", "#7FFF00"]
      }
    }
  }
}
</script>
<style scoped>
.rose-title {
  font-size: 20px;
  font-weight: 800;
  /* color: #516b91; */

  margin-bottom: 5px;
}
</style>
