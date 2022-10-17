<template>
  <!-- top5 好看的排位图
        参考地址:https://www.isqqw.com/echartsdetail?id=16405
  -->
  <div class="rank-echart">
    <p class="title">{{ title }}</p>
    <base-echart :options="options" />
  </div>
</template>

<script>
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "rank-chart",
  components: {
    baseEchart
  },
  props: {
    title: {
      type: String,
      default: "當日當機Top5:"
    },
    config: {}
  },
  methods: {
    getSymbolData(data) {
      let arr = []
      for (var i = 0; i < data.length; i++) {
        arr.push({
          value: data[i].value,
          symbolPosition: "end"
        })
      }
      return arr
    }
  },
  computed: {
    options() {
      const { getSymbolData } = this
      const { names, values, formatValues } = this.config
      return {
        grid: {
          left: "",
          right: 8,
          bottom: 40,
          top: 10,
          containLabel: false
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          formatter: function (params) {
            let tempStr = ""
            params[0].data.detail.forEach((item) => {
              tempStr += `
                <div style="display:flex;border-bottom: 1px solid #fff;">
                  <span style="flex:1">${item.machinename}</span>
                  <span style="flex:1">${item.rate}</span>
                  <span style="flex:1">${(item.keeptime / 60).toFixed(2) + " Min"}</span>
                </div>`
            })
            return `
              <div style="width:230px;text-align: center;border: 1px solid #fff;">
                <div style="display:flex;border-bottom: 1px solid #fff;">
                  <span style="flex:1">機台名稱</span>
                  <span style="flex:1">比率</span>
                  <span style="flex:1">持續時間</span>
                </div>
                ${tempStr}
              </div>
            `
          }
        },
        xAxis: {
          show: false,
          type: "value"
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12"
              },
              align: "left",
              padding: [0, 0, 3, 8],
              verticalAlign: "bottom",
              lineHeight: 30,
              formatter: function (value) {
                return `{a|${value}}`
              },
              rich: {
                a: {
                  // color: "#00BAFF",
                  color: "#fff",
                  fontSize: "14",
                  // fontFamily: "PingFangSC-Regular",
                  padding: [0, 0, 7, 0]
                }
              }
            },
            data: names
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12"
              },
              align: "right",
              padding: [0, 8, 0, 0],
              verticalAlign: "bottom",
              lineHeight: 36,
              formatter: function (value) {
                return `{a|${value}}`
              },
              rich: {
                a: {
                  // color: "#00BAFF",
                  color: "#fff",
                  fontSize: "14",
                  // fontFamily: "PingFangSC-Regular",
                  padding: [0, 0, 7, 0]
                }
              }
            },
            data: formatValues
          }
        ],
        series: [
          {
            name: "值",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgb(10, 116, 255,1)"
                  },
                  {
                    offset: 1,
                    color: "rgb(127,237,241,1)"
                  }
                ])
              }
            },
            z: 2,
            barWidth: 10,
            data: values
          },
          {
            name: "XXX",
            type: "pictorialBar",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==",
            symbolSize: [60, 60],
            symbolOffset: [30, 0],
            z: 10086,
            itemStyle: {
              normal: {
                color: "#0A74FF"
              }
            },
            data: getSymbolData(values)
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 10,
            barGap: "-100%",
            data: values[0],
            itemStyle: {
              normal: {
                color: "#004298",
                barBorderRadius: 30
              }
            },
            z: 1
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.rank-echart {
  .title {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 5px;
    color: $title-color;
    padding-left: 5px;
    border-left: 4px solid #bb98fa;
  }
}
</style>
