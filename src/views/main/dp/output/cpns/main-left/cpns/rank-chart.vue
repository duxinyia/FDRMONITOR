<template>
  <!-- top5 好看的排位图 dp
        参考地址:https://www.isqqw.com/echartsdetail?id=16405
  -->
  <div
    class="rank-echart"
    v-loading="isLoading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="加载中"
    element-loading-background="rgba(0, 0, 0, 1)"
  >
    <p class="title" v-if="isShowTitle">{{ title }}</p>
    <base-echart :options="options" height="370px" />
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
    config: {},
    isShowTitle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  watch: {
    config: {
      handler() {
        this.isLoading = false
      }
    }
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
      // 根据不同的theme 显示不同的颜色
      let rightText = this.$store.getters.theme == "dark" ? "#fff" : "#000"
      return {
        grid: {
          left: "",
          right: 8,
          bottom: 0,
          top: 10,
          containLabel: false
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "#303133",
          extraCssText: "padding:5px;border:none;color:#fff",
          formatter: (params) => {
            // console.log("params", params)
            let { output = "", targetOut = "" } = params.data
            return `
              <div>
                <div style="background:#0a2732;padding:5px">计划产出: ${targetOut}</div>
                <div style="background:#003b51;padding:5px">实际产出: ${output}</div>
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
              // textStyle: {
              color: rightText,
              fontSize: "16",
              // },
              align: "left",
              padding: [0, 0, 20, 8],
              verticalAlign: "bottom",
              lineHeight: 30
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
              // textStyle: {
              color: "#fff",
              fontSize: "16",
              // },
              align: "right",
              padding: [0, 8, 20, 8],
              verticalAlign: "bottom",
              lineHeight: 30,
              formatter: function (value) {
                // `{a|${value}}`
                return `${value}`
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
              // normal: {
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
              // }
            },
            z: 2,
            barWidth: 20,
            data: values
          },
          {
            name: "XXX",
            type: "pictorialBar",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==",
            symbolSize: [80, 80],
            symbolOffset: [35, 0],
            z: 10086,
            itemStyle: {
              // normal: {
              color: "#0A74FF"
              // }
            },
            data: getSymbolData(values)
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 20,
            barGap: "-100%",
            data: values,
            itemStyle: {
              // normal: {
              color: "#fff",
              barBorderRadius: 30
              // }
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
.rank-echart {
  margin-top: 10px;
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
}
</style>
