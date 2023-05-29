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
      :fol_process="fol_process"
      :eol_process="eol_process"
      :others_tests="others_tests"
      :others_fol1s="others_fol1s"
    />
    <main-two
      :dpcs="dpcs"
      :lcbs="lcbs"
      :sfrs="sfrs"
      :vcms="vcms"
      :fol_cosmetic="fol_cosmetic"
      :eol_cosmetic="eol_cosmetic"
      :fol_process="fol_process"
      :eol_process="eol_process"
      :others_tests="others_tests"
      :others_fol1s="others_fol1s"
      :others_fol2s="others_fol2s"
      :others_eols="others_eols"
      :xData="xData"
      :totalNum="totalNum"
    />
  </div>
</template>

<script>
// 导入第一行
import mainOne from "./cpns/childtwo/main-one.vue"
// 导入底部区域
import mainTwo from "./cpns/childtwo/main-two.vue"
// 导入发送请求的函數
import { GetDefectYieldInfo } from "@/api/cma/defect.js"
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
      xData: [],
      OverallYield: [],
      TargetYield: [],
      dpcs: [],
      lcbs: [],
      sfrs: [],
      vcms: [],
      fol_cosmetic: [],
      eol_cosmetic: [],
      fol_process: [],
      eol_process: [],
      others_tests: [],
      others_fol1s: [],
      others_fol2s: [],
      others_eols: [],
      totalNum: []
    }
  },
  created() {
    this.getDefectYieldInfo()
  },
  methods: {
    async getDefectYieldInfo() {
      let res = await GetDefectYieldInfo({ isMw: true })
      console.log("top25的数据true", res)
      // 只要MW 和 BWI 的数据
      let tempArr = res.filter((item) => {
        return item.device.includes("MW") || item.device.includes("BW")
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
          } else if (item.name == "LCB") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.lcbs.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "SFR") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.sfrs.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "VCM") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.vcms.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "FOL Cosmetic") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.fol_cosmetic.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "EOL Cosmetic") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.eol_cosmetic.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "FOL Process") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.fol_process.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "EOL Process") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.eol_process.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "Others-Test") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.others_tests.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "Others-FOL1") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.others_fol1s.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "Others-FOL2") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.others_fol2s.push({ rate: item1.rate, qty: item1.failQty })
          } else if (item1.name == "Others-EOL") {
            total += item1.failQty
            rate += parseFloat(item1.rate) * 100
            this.others_eols.push({ rate: item1.rate, qty: item1.failQty })
          }
        })
        this.totalNum.push({ total, rate: (rate / 100).toFixed(2) + "%" })
      })
      this.isLoading = false
    }
  }
}
</script>
