<template>
  <div class="page-main">
    <main-one
      :scats="scats"
      :kLineData="kLineData"
      :getKLineHourData="getKLineHourData"
      :machinename="machine"
    />
    <main-two
      :lineData="xLineData"
      :machinename="`${machine} X tilt趨勢圖`"
      :limit="{ maxLimit: 0.05, minLimit: -0.05 }"
    />
    <main-two
      :lineData="yLineData"
      :machinename="`${machine} Y tilt趨勢圖`"
      :limit="{ maxLimit: 0.05, minLimit: -0.05 }"
    />
    <main-two
      :lineData="zLineData"
      :machinename="`${machine} Z height趨勢圖`"
      :limit="{ maxLimit: 0.198, minLimit: 0.132 }"
    />
  </div>
</template>
<script>
// 导入接口请求函数
import { getScatData, getLineData, getKLineData, getKLineHourData } from "@/api/cma/vaga.js"
// 导入第一行
import mainOne from "./main-one/main-one.vue"
// 导入底部区域
import mainTwo from "./main-two/main-two.vue"
export default {
  name: "vacopy",
  components: {
    mainOne,
    mainTwo
  },
  props: {
    machine: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      machines: [],
      scats: [],
      xLineData: {
        xData: [],
        showData: []
      },
      yLineData: {
        xData: [],
        showData: []
      },
      zLineData: {
        xData: [],
        showData: []
      },
      kLineData: {
        xData: [],
        showData: []
      },
      getKLineHourData: {
        xData: [],
        showData: []
      },
      allScats: []
    }
  },
  watch: {
    machine: {
      handler(machinename) {
        console.log("新的值为:", machinename)
        getScatData({ machinename }).then((res) => {
          console.log("res散点图", res)
          this.scats = res
        })
        // x 的
        getLineData({ machinename, ValueItem: "CONFIGURABLETILTRAWX" }).then((res) => {
          console.log("折线图", res)
          res.data.forEach((item) => {
            let [showItem, time] = item
            this.xLineData.showData.push(showItem)
            this.xLineData.xData.push(time)
          })
        })
        // y 的
        getLineData({ machinename, ValueItem: "CONFIGURABLETILTRAWY" }).then((res) => {
          console.log("折线图", res)
          res.data.forEach((item) => {
            let [showItem, time] = item
            this.yLineData.showData.push(showItem)
            this.yLineData.xData.push(time)
          })
        })
        // z 的
        getLineData({ machinename, ValueItem: "INSPECTIONZ" }).then((res) => {
          console.log("折线图", res)
          res.data.forEach((item) => {
            let [showItem, time] = item
            this.zLineData.showData.push(showItem)
            this.zLineData.xData.push(time)
          })
        })

        getKLineData({ machinename }).then((res) => {
          console.log("res箱线图", res)
          res.forEach((item) => {
            this.kLineData.xData.push(item.shift())
            this.kLineData.showData.push(item)
          })
        })
        getKLineHourData({ machinename }).then((res) => {
          res.forEach((item) => {
            this.getKLineHourData.xData.push(item.shift())
            this.getKLineHourData.showData.push(item)
          })
          console.log("VA_Data小時箱線圖", machinename, this.getKLineHourData)
        })
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
}
.page-main {
  height: calc(100% - 110px);
}
</style>
