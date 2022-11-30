<template>
  <!-- 主要区域 -->
  <div class="page-main">
    <!-- 主要区域 -->
    <dv-border-box-10>
      <div class="page-main">
        <!-- 第一个图 -->
        <div class="top-chart">
          <el-carousel height="380px" :interval="10000" indicator-position="none">
            <el-carousel-item>
              <line-chart-1 :config="topLineChartConfig" :isYear="false" />
            </el-carousel-item>
            <el-carousel-item>
              <line-chart-1 :config="topLineChartConfig" :isYear="true" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 下面四个图 -->
        <el-carousel height="550px" :interval="10000" indicator-position="none">
          <el-carousel-item>
            <el-row :gutter="10">
              <el-col v-for="item in 4" :key="item" :span="12">
                <line-chart-2 :config="lineChartConfigs[item - 1]" />
              </el-col>
              <!-- <el-col :span="12">
                <line-chart-2 :config="lineChartConfigs[1]" />
              </el-col>-->
            </el-row>
            <!-- <el-row :gutter="10" class="three-main">
              <el-col :span="12">
                <line-chart-2 :config="lineChartConfigs[2]" />
              </el-col>
              <el-col :span="12">
                <line-chart-2 :config="lineChartConfigs[3]" />
              </el-col>
            </el-row>-->
          </el-carousel-item>
        </el-carousel>
      </div>
    </dv-border-box-10>
  </div>
</template>
<script>
// 导入5个折线图
import LineChart1 from "./cpns/LineChart1.vue"
import LineChart2 from "./cpns/LineChart2.vue"
// 导入发送请求的函函數
import { getCloseYieldInfo } from "@/api/sfc.js"
export default {
  name: "sfc",
  components: {
    LineChart1,
    LineChart2
  },
  data() {
    return {
      // 上方折线图的数据
      topLineChartConfig: [],
      // 下方系列的数据
      lineChartConfigs: [{}, {}, {}, {}]
    }
  },
  computed: {},
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "SFC良率")
    this.$store.commit("fullLoading/SET_FULLLOADING", true)
    this.$store.commit("fullLoading/SET_FULLLOADING", false)
    this.initData()
    // 每5分钟获取一次数据
    // this.dataTiming = setInterval(() => {
    //   this.initData()
    // }, 50000)
  },
  methods: {
    async initData() {
      let requestArr = [this.getCloseYieldInfo()]
      await Promise.all(requestArr)
      this.$store.commit("fullLoading/SET_FULLLOADING", false)
    },
    async getCloseYieldInfo() {
      let res = await getCloseYieldInfo()
      // console.log("res======", res.deviceSeriesInfos)
      // 取出  系列 2月4周 月份
      this.topLineChartConfig = res.deviceSeriesInfos
      // 先做系列的
      this.lineChartConfigs = res.deviceInfos
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
