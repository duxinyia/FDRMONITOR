<template>
  <div class="page-main">
    <!-- 主要区域 -->
    <dv-border-box-10>
      <el-row :gutter="30" class="main-one">
        <el-col v-for="item in 4" :key="item" :span="12">
          <line-chart :config="chartConfig[item - 1]" />
        </el-col>
      </el-row>
    </dv-border-box-10>
  </div>
</template>
<script>
// 导入折线图
import LineChart from "./cpns/LineChart.vue"
// 导入接口文档
import { getDateCodeRunningYieldInfo } from "@/api/tsfc.js"
export default {
  name: "tsfc",
  components: {
    LineChart
  },
  data() {
    return {
      chartConfig: [
        { deviceSeries: "" },
        { deviceSeries: "" },
        { deviceSeries: "" },
        { deviceSeries: "" }
      ]
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "SFC总良率预览")
    this.initData()
    // 每5分钟获取一次数据
    // this.dataTiming = setInterval(() => {
    //   this.initData()
    // }, 50000)
  },
  methods: {
    async initData() {
      this.$store.commit("fullLoading/SET_FULLLOADING", true)
      let requestArr = [this.getDateCodeRunningYieldInfo()]
      await Promise.all(requestArr)
      this.$store.commit("fullLoading/SET_FULLLOADING", false)
    },
    // 获取对应的数据
    async getDateCodeRunningYieldInfo() {
      let res = await getDateCodeRunningYieldInfo()
      console.log("获取对应的数据", res)
      if (res.length > 0) {
        this.chartConfig = res
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.dataTiming)
  }
}
</script>
<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px 20px 20px 20px;
}
.page-main {
  margin-top: 25px;
}
</style>
