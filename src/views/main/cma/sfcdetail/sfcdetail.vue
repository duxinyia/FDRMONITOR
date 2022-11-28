<template>
  <!-- 主要区域 -->
  <div class="page-main">
    <!-- 第一个图 -->
    <dv-border-box-10>
      <div class="top-chart">
        <line-chart-1 :title="tag" />
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
    </dv-border-box-10>
  </div>
</template>
<script>
// 导入5个折线图
import LineChart1 from "./cpns/LineChart1.vue"
import LineChart2 from "./cpns/LineChart2.vue"
import LineChart3 from "./cpns/LineChart3.vue"
import LineChart4 from "./cpns/LineChart4.vue"
import LineChart5 from "./cpns/LineChart5.vue"
// 导入发送请求的函函數
import { getCloseNGYieldInfo } from "@/api/sfcdetail.js"
export default {
  name: "sfcdetail",
  components: {
    LineChart1,
    LineChart2,
    LineChart3,
    LineChart4,
    LineChart5
  },
  data() {
    return {
      tag: ""
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
  .three-main {
    margin-top: 0px;
  }
}
</style>
