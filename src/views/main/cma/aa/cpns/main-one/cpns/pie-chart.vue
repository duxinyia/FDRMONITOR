<template>
  <!-- 饼图 -->
  <div class="pie-chart">
    <span class="title" v-if="showTitle">{{ title }}</span>
    <div
      v-if="alloptions.length > 0"
      v-loading="isLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中..."
      element-loading-background="rgba(0, 0, 0, 1)"
    >
      <base-echart :options="options" />
    </div>
    <div v-else class="nodata">暂无数据...</div>
  </div>
</template>
<script>
import baseEchart from "@/common/echart"
export default {
  name: "pie-chart",
  props: {
    title: {
      type: String,
      default: "標題"
    },
    alloptions: {
      type: Array,
      default: () => []
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  components: {
    baseEchart
  },
  data() {
    return {
      isLoading: true
    }
  },
  watch: {
    alloptions: {
      handler(newVal) {
        if (Array.isArray(newVal) && newVal.length > 0) {
          this.isLoading = false
        } else {
          this.isLoading = false
        }
      }
    }
  },
  computed: {
    // store 中的 theme dark light -> 判断对应的值
    options() {
      return {
        tooltip: {
          trigger: "item",
          backgroundColor: "#303133",
          extraCssText: "padding:5px;border:none;color:#fff",
          formatter: (params) => {
            let tempStr = ""
            if (params.data.machines.length > 0) {
              params.data.machines.forEach((item, index) => {
                tempStr += `
                <div style="display:flex;background:${index % 2 == 0 ? "#003b51" : "#0a2732"}">
                  <span style="flex:1">${item.machinename || "-"}</span>
                  <span style="flex:1">${item.totalRate}</span>
                </div>`
              })
            }
            return `
              <div style="width:200px;text-align: center;line-height:2em;font-size:14px;border:1px solid #003b51;padding:0px">
                <div style="display:flex;background:#20316e">
                  <span style="flex:1">top5机台</span>
                  <span style="flex:1">比率</span>
                </div>
              ${tempStr}
              </div>
            `
          }
        },
        series: [
          {
            name: "效率损失",
            type: "pie",
            radius: "75%",
            center: ["50%", "55%"],
            data: this.alloptions,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label: {
              position: "inside",
              textBorderWidth: 0,
              formatter: (params) => params.data.rate,
              fontSize: 15,
              color: "#000"
            }
          },
          {
            name: "效率损失",
            type: "pie",
            radius: "75%",
            center: ["50%", "55%"],
            data: this.alloptions,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label: {
              position: "outside",
              fontSize: 13,
              textBorderWidth: 0,
              backgroundColor: "none",
              color: "#fff",
              formatter: function ({ name }) {
                let newParamsName = ""
                const paramsNameNumber = name.length // 文字总长度
                const provideNumber = 8 //一行显示几个字
                const rowNumber = Math.ceil(paramsNameNumber / provideNumber)
                if (paramsNameNumber > provideNumber) {
                  for (let p = 0; p < rowNumber; p++) {
                    const start = p * provideNumber
                    const end = start + provideNumber
                    const tempStr =
                      p === rowNumber - 1 ? name.substring(start, paramsNameNumber) : name.substring(start, end) + "\n"
                    newParamsName += tempStr
                  }
                } else {
                  newParamsName = name
                }
                return newParamsName
              }
            }
          }
        ],
        // 饼图各个样色
        color: ["#6395f9", "#62daab", "#00FFFF", "#f6c022", "#7FFF00"]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.pie-chart {
  .title {
    display: flex;
    align-items: center;
    font-size: 20px;
    line-height: 1em;
    font-weight: 600;
    margin-bottom: 5px;
    color: var(--chart-title);
    &::before {
      content: "";
      display: inline-block;
      margin-right: 5px;
      width: 4px;
      height: 0.9em;
      line-height: 0.9em;
      border-radius: 2px;
      background: var(--chart-slip);
    }
  }
  .nodata {
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 8px;
    height: 250px;
  }
}
</style>
