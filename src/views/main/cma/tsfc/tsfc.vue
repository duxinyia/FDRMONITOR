<template>
  <div class="page-main">
    <!-- 主要区域 -->
    <dv-border-box-10>
      <el-row :gutter="30" class="main-one">
        <el-col v-for="item in 4" :key="item" :span="12" class="chart-item">
          <line-chart :config="chartConfig[item - 1]" />
          <div class="btns">
            <el-button @click="toDetail" type="success" size="mini">EOL</el-button>
            <el-button @click="toDetail" type="success" size="mini">FOL</el-button>
          </div>
        </el-col>
      </el-row>
    </dv-border-box-10>
  </div>
</template>
<script>
// 导入折线图
import LineChart from "./cpns/LineChart.vue"
// 获取所有的子系列的
import { getMESDeviceInfo } from "@/api/cma/sfc.js"
// 导入接口
import { getDateCodeRunningYieldInfo, getDeviceSeries } from "@/api/cma/tsfc.js"
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
    this.$store.commit("fullLoading/SET_TITLE", "SFC良率Daily")
    this.initData()
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
    },

    toDetail() {
      console.log("toDetail")
      this.$router.push({
        name: "folyield"
      })
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

.chart-item {
  position: relative;
  .btns {
    position: absolute;
    top: 40px;
    left: 40px;
  }
}
</style>
