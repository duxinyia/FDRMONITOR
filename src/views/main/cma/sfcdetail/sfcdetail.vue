<template>
  <div>
    <page-header :title="title" />
    <!-- 主要区域 -->
    <div class="page-main">
      <!-- 第一个图 -->
      <dv-border-box-10>
        <div class="top-chart">
          <line-chart-1 :title="title" />
        </div>
        <!-- 下面四个图 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <line-chart-2 />
          </el-col>
          <el-col :span="12">
            <line-chart-3 />
          </el-col>
        </el-row>
        <el-row :gutter="20" class="three-main">
          <el-col :span="12">
            <line-chart-4 />
          </el-col>
          <el-col :span="12">
            <line-chart-5 />
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <line-chart-2 />
          </el-col>
          <el-col :span="12">
            <line-chart-3 />
          </el-col>
        </el-row>
        <el-row :gutter="20" class="three-main">
          <el-col :span="12">
            <line-chart-4 />
          </el-col>
          <el-col :span="12">
            <line-chart-5 />
          </el-col>
        </el-row>
      </dv-border-box-10>
    </div>
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
  name: "sfcdetail",
  components: {
    PageHeader,
    LineChart1,
    LineChart2,
    LineChart3,
    LineChart4,
    LineChart5
  },
  data() {
    return {
      title: ""
    }
  },
  computed: {},
  mounted() {
    console.log("tttt", this.$route)
    this.title = this.$route.params.title
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
