<template>
  <!-- 饼图 -->
  <div class="pie-chart">
    <span class="title" v-if="showTitle">{{ title }}</span>
    <div
      v-loading="isLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中..."
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <base-echart :options="options" />
    </div>
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
      default: () => [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" }
      ]
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
    options() {
      return {
        tooltip: {
          trigger: "item",
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
              <div style="width:200px;text-align: center;line-height:2em;font-size:14px;border:1px solid #003b51">
                <div style="display:flex;background:#20316e">
                  <span style="flex:1">top5机台</span>
                  <span style="flex:1">比率</span>
                </div>
              ${tempStr}
              </div>
            `
            // if (params.data.machines.length > 0) {
            //   params.data.machines.forEach((item) => {
            //     tempStr += `
            //     <div style="display:flex;border-bottom: 1px solid #fff;">
            //       <span style="flex:1">${item.machinename || "-"}</span>
            //       <span style="flex:1">${item.totalRate}</span>
            //     </div>`
            //   })
            // }
            // return `
            //   <div style="width:200px;border: 1px solid #fff;text-align: center;">
            //     <div style="display:flex;border-bottom: 1px solid #fff;background:#20316e">
            //       <span style="flex:1">top5机台</span>
            //       <span style="flex:1">比率</span>
            //     </div>
            //   ${tempStr}
            //   </div>
            // `
          }
        },
        series: [
          {
            name: "效率损失",
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
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
              formatter: (params) => params.data.rate,
              fontSize: 15,
              color: "#000"
            }
          },
          {
            name: "效率损失",
            type: "pie",
            radius: "70%",
            center: ["50%", "50%"],
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
// @import "@/assets/scss/variables.scss";
.title {
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
  // color: $title-color;
  color: var(--chart-title);
  padding-left: 5px;
  border-left: 4px solid var(--chart-slip);
  // border-left: 4px solid #bb98fa;
}
</style>
