<template>
  <div class="page-main">
    <main-one
      :scats="scats"
      :kLineDataX="kLineDataX"
      :kLineDataY="kLineDataY"
      :kLineDataZ="kLineDataZ"
      :machinename="machine"
    />
    <main-two
      :lineData="xLineData"
      :machinename="`${machine} X shift趨勢圖`"
      :limit="{ maxLimit: 0.025, minLimit: -0.025 }"
    />
    <main-two
      :lineData="yLineData"
      :machinename="`${machine} Y shift趨勢圖`"
      :limit="{ maxLimit: 0.025, minLimit: -0.025 }"
    />
    <main-two
      :lineData="zLineData"
      :machinename="`${machine} Rotation趨勢圖`"
      :limit="{ maxLimit: 0.5, minLimit: -0.5 }"
    />
    <main-two
      :lineData="fourLineData"
      :machinename="`${machine} INSPECTIONWIDTH趨勢圖`"
      :limit="{ maxLimit: 0.65, minLimit: 0.45 }"
    />
  </div>
</template>
<script>
// 导入接口请求函数
import { getScatData, getLineData, getKLineHourData } from "@/api/cma/vaga.js"
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
      fourLineData: {
        xData: [],
        showData: []
      },
      kLineDataX: {
        xData: [],
        showData: []
      },
      kLineDataY: {
        xData: [],
        showData: []
      },
      kLineDataZ: {
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
        getScatData({ machinename, isGa: true }).then((res) => {
          console.log("res散点图", res)
          this.scats = res
        })
        // x 的
        getLineData({ machinename, ValueItem: "INSPECTIONX", isGa: true }).then((res) => {
          console.log("折线图", res)
          res.data.forEach((item) => {
            let [showItem, time] = item
            this.xLineData.showData.push(showItem)
            this.xLineData.xData.push(time)
          })
        })
        // y 的
        getLineData({ machinename, ValueItem: "INSPECTIONY", isGa: true }).then((res) => {
          console.log("折线图", res)
          res.data.forEach((item) => {
            let [showItem, time] = item
            this.yLineData.showData.push(showItem)
            this.yLineData.xData.push(time)
          })
        })
        // z 的
        getLineData({ machinename, ValueItem: "INSPECTIONTHETA", isGa: true }).then((res) => {
          console.log("折线图INSPECTIONZ", res)
          res.data.forEach((item) => {
            let [showItem, time] = item
            this.zLineData.showData.push(showItem)
            this.zLineData.xData.push(time)
          })
        })
        // 23-05-16 新增
        getLineData({ machinename, ValueItem: "INSPECTIONWIDTH", isGa: true }).then((res) => {
          console.log("折线图INSPECTIONWIDTH", res)
          res &&
            res.data.forEach((item) => {
              let [showItem, time] = item
              this.fourLineData.showData.push(showItem)
              this.fourLineData.xData.push(time)
            })
        })
        // 获取ga看板的箱线图  INSPECTIONX  INSPECTIONY  INSPECTIONTHETA
        getKLineHourData({ machinename, ValueItem: "INSPECTIONX", isGa: true }).then((res) => {
          console.log("res箱线图X", res)
          res.forEach((item) => {
            this.kLineDataX.xData.push(item.shift())
            this.kLineDataX.showData.push(item)
          })
        })
        getKLineHourData({ machinename, ValueItem: "INSPECTIONY", isGa: true }).then((res) => {
          console.log("res箱线图Y", res)
          res.forEach((item) => {
            this.kLineDataY.xData.push(item.shift())
            this.kLineDataY.showData.push(item)
          })
        })
        getKLineHourData({ machinename, ValueItem: "INSPECTIONTHETA", isGa: true }).then((res) => {
          console.log("res箱线图Z", res)
          res.forEach((item) => {
            this.kLineDataZ.xData.push(item.shift())
            this.kLineDataZ.showData.push(item)
          })
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
  height: 100%;
  overflow-y: auto;
}
</style>
