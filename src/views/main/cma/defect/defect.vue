<template>
  <div class="page-main">
    <div class="bar-chart">
      <h1>hello world</h1>
    </div>
    <div>
      <h2>hello world</h2>
    </div>
  </div>
</template>

<script>
// 导入发送请求的函函數
import { GetDefectYieldInfo } from "@/api/defect.js"
// 导入对应的函数
import { splitArray } from "@/utils"
export default {
  name: "defect",
  data() {
    return {
      // 接口返回的数据
      showData: [],
      total: 10,
      currentPage: 1
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "Top 25 Defect Item")
    this.$store.commit("fullLoading/SET_FULLLOADING", true)
    // this.getDefectYieldInfo()
    this.$store.commit("fullLoading/SET_FULLLOADING", false)
  },

  methods: {
    async getDefectYieldInfo() {
      let res = await GetDefectYieldInfo()
      if (res) {
        this.total = res.length
        this.$store.commit("fullLoading/SET_FULLLOADING", false)
        this.showData = splitArray(res, 3)
        res.forEach((item) => {
          let fails = 0
          let rates = 0
          item.defectNameList.forEach((item) => {
            fails += item.failQty
            rates += parseFloat(item.rate) * 10
          })
          item.defectNameList.push({
            name: "ALL",
            failQty: fails,
            rate: (rates / 10).toFixed(2) + "%"
          })
        })
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
