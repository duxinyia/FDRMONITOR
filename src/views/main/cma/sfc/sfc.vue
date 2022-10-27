<template>
  <div>
    <page-header title="SFC良率" />
    <!-- 主要区域 -->
    <dv-border-box-10>
      <div class="page-main">
        <!-- 第一个图 -->
        <div class="top-chart">
          <el-carousel height="380px" interval="10000" indicator-position="none">
            <el-carousel-item>
              <line-chart-1 />
            </el-carousel-item>
            <el-carousel-item>
              <line-chart-1 />
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 下面四个图 -->
        <el-carousel height="550px" interval="10000" indicator-position="none">
          <el-carousel-item>
            <el-row :gutter="10">
              <el-col :span="12">
                <line-chart-2 @click="toDetail('DPC')" />
              </el-col>
              <el-col :span="12">
                <line-chart-3 />
              </el-col>
            </el-row>
            <el-row :gutter="10" class="three-main">
              <el-col :span="12">
                <line-chart-4 />
              </el-col>
              <el-col :span="12">
                <line-chart-5 />
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </div>
    </dv-border-box-10>
  </div>
</template>
<script>
// 导入头部
import PageHeader from "@/components/page-header/index.vue"
// 导入5个折线图
import LineChart1 from "./cpns/LineChart1.vue"
import LineChart2 from "./cpns/LineChart2.vue"
import LineChart3 from "./cpns/LineChart3.vue"
import LineChart4 from "./cpns/LineChart4.vue"
import LineChart5 from "./cpns/LineChart5.vue"
// 导入发送请求的函函數
// import { getMaintainInfo, getDeviceInfo, getMachineTop5, getProductInfo } from "@/api/fol.js"
export default {
  name: "sfc",
  components: {
    PageHeader,
    LineChart1,
    LineChart2,
    LineChart3,
    LineChart4,
    LineChart5
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {
    this.$store.commit("fullLoading/SET_FULLLOADING", true)
    this.$store.commit("fullLoading/SET_FULLLOADING", false)
    // this.initData()
    // 每5分钟获取一次数据
    // this.dataTiming = setInterval(() => {
    //   this.initData()
    // }, 50000)
  },
  methods: {
    async initData() {
      let requestArr = [
        // this.getMaintainInfo(),
        // this.getDeviceInfo(),
        // this.getMachineTop5(),
        // this.getProductInfo()
      ]
      await Promise.all(requestArr)
      this.$store.commit("fullLoading/SET_FULLLOADING", false)
    },
    toDetail(name) {
      console.log("name", name)
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
  height: 100%;
  .top-chart {
    margin: 0px 0px;
  }
  .three-main {
    margin-top: 0px;
  }
}
</style>
