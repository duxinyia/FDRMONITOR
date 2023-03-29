<template>
  <!-- 主要区域 -->
  <div class="page-main">
    <!-- 第一个图 -->
    <dv-border-box-10>
      <div class="top-chart">
        <line-chart-1 :config="topLineChartConfig" :title="tag" />
      </div>
      <!-- 下面四个图 -->
      <el-row :gutter="20">
        <el-col v-for="item in 4" :key="item" :span="12">
          <line-chart-2 :config="lineChartConfig[item - 1]" />
        </el-col>
      </el-row>
    </dv-border-box-10>
  </div>
</template>
<script>
// 导入5个折线图
import LineChart1 from "./cpns/LineChart1.vue"
import LineChart2 from "./cpns/LineChart2.vue"
// 导入发送请求的函函數
import { getCloseNGYieldInfo } from "@/api/cma/sfcdetail.js"
export default {
  name: "sfcdetail",
  components: {
    LineChart1,
    LineChart2
  },
  data() {
    return {
      tag: "",
      topLineChartConfig: [], // 上方折线图的数据
      lineChartConfig: [] // 下方折线图的数据
    }
  },
  computed: {},
  mounted() {
    this.tag = this.$route.query.tag
    this.$store.commit("fullLoading/SET_TITLE", `${this.tag}系列良率`)
    this.$store.commit("fullLoading/SET_FULLLOADING", true)
    // this.$store.commit("fullLoading/SET_FULLLOADING", false)
    this.initData()
    // 每5分钟获取一次数据
    // this.dataTiming = setInterval(() => {
    //   this.initData()
    // }, 50000)
  },
  methods: {
    async initData() {
      let requestArr = [
        this.getCloseNGYieldInfo()
        // this.getMaintainInfo(),
        // this.getDeviceInfo(),
        // this.getMachineTop5(),
        // this.getProductInfo()
      ]
      await Promise.all(requestArr)
      this.$store.commit("fullLoading/SET_FULLLOADING", false)
    },
    // 获取数据
    async getCloseNGYieldInfo() {
      let res = await getCloseNGYieldInfo({ tag: this.tag })
      console.log("返回的值为:", res)
      // 获取上方折线图的数据
      this.topLineChartConfig = res.deviceInfos
      // 下方折线图的数据
      this.lineChartConfig = res.deviceNGInfos
    }
  },
  beforeDestroy() {
    clearInterval(this.dataTiming)
  }
}
</script>
<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 10px 20px 18px 20px;
}
.page-main {
  .top-chart {
    margin: 0px 0px;
  }
}
</style>
