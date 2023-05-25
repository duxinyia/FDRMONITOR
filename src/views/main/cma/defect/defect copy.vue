<template>
  <div
    class=""
    v-loading="isLoading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="加载中..."
    element-loading-background="rgba(0, 0, 0, 1)"
  >
    <main-one
      :legends="xData"
      :dpcs="dpcs"
      :lcbs="lcbs"
      :sfrs="sfrs"
      :fol_cosmetic="fol_cosmetic"
      :eol_cosmetic="eol_cosmetic"
      :fol_others="fol_others"
      :eol_others="eol_others"
      :OverallYield="OverallYield"
      :TargetYield="TargetYield"
      :fol_process="fol_process"
      :eol_process="eol_process"
    />
    <main-two
      :dpcs="dpcs"
      :lcbs="lcbs"
      :sfrs="sfrs"
      :fol_cosmetic="fol_cosmetic"
      :eol_cosmetic="eol_cosmetic"
      :fol_others="fol_others"
      :eol_others="eol_others"
      :xData="xData"
      :OverallYield="OverallYield"
      :TargetYield="TargetYield"
      :fol_process="fol_process"
      :eol_process="eol_process"
      :totalNum="totalNum"
    />
  </div>
</template>

<script>
// 导入第一行
import mainOne from "./cpns/main-one/main-one.vue"
// 导入底部区域
import mainTwo from "./cpns/main-two/main-two.vue"
// 导入发送请求的函數
import { GetDefectYieldInfo, GetDefectYieldInfoMw } from "@/api/cma/defect.js"
export default {
  name: "defect",
  components: {
    mainOne,
    mainTwo
  },
  props: {
    isMw: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: true,
      // 接口返回的数据
      showData: [],
      xData: [],
      OverallYield: [],
      TargetYield: [],
      dpcs: [],
      lcbs: [],
      sfrs: [],
      fol_cosmetic: [],
      eol_cosmetic: [],
      fol_others: [],
      eol_others: [],
      fol_process: [],
      eol_process: [],
      totalNum: []
    }
  },
  created() {
    this.getDefectYieldInfo()
  },
  methods: {
    async getDefectYieldInfo() {
      let res = await GetDefectYieldInfo({ isMw: this.isMw })
      console.log("top25的数据", res)
      let tempArr = res.filter((item) => {
        return !item.device.includes("MW")
      })
      console.log("tempArr", tempArr)
      // 1. 取出x轴的数据
      tempArr.forEach((item) => {
        let { device, overallYield, targetYield } = item
        // 取出x轴的数据
        this.xData.push(device)
        this.OverallYield.push(overallYield)
        this.TargetYield.push(targetYield)
        // 也需要求和和rate
        let total = 0
        let rate = 0
        // 取出dpc 和 lcb这些
        item.defectNameList.forEach((item1) => {
          if (item1.name == "DPC") {
            total += item1.failQty
            this.dpcs.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "LCB") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.lcbs.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "SFR") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.sfrs.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "FOL Cosmetic") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.fol_cosmetic.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "EOL Cosmetic") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.eol_cosmetic.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "FOL Others") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.fol_others.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "EOL Others") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.eol_others.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "FOL Process") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.fol_process.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "EOL Process") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.eol_process.push({ rate: item1.rate, qty: item1.failQty })
          }
        })
        this.totalNum.push({ total, rate: (rate / 100).toFixed(2) + "%" })
      })
      this.isLoading = false
    }
  }
}
</script>
