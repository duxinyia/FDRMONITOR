<template>
  <!-- 主要区域 -->
  <div class="page-main">
    <el-row :gutter="10">
      <el-col :span="7">
        <main-left />
      </el-col>
      <el-col :span="10">
        <main-center />
      </el-col>
      <el-col :span="7">
        <main-right />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入各子组件
import { MainLeft, MainCenter, MainRight } from "./cpns"
// 导入发送请求的函数
import { GetKeyStationRunningInfo } from "@/api/output2.js"
export default {
  components: {
    MainLeft,
    MainCenter,
    MainRight
  },
  data() {
    return {
      config1: {},
      dataTiming: null
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "產出可視化平台")
    this.$store.commit("fullLoading/SET_FULLLOADING", true)
    this.initData()
    // 每5分钟获取一次数据
    this.dataTiming = setInterval(() => {
      this.initData()
    }, this.$globalData.CYCLE_TIME)
  },
  methods: {
    async initData() {
      // let requestArr = [this.GetKeyStationRunningInfo()]
      // await Promise.all(requestArr)
      this.$store.commit("fullLoading/SET_FULLLOADING", false)
    },
    async GetKeyStationRunningInfo() {
      this.config1 = await GetKeyStationRunningInfo()
      console.log("outputD", this.config1)
    }
  },
  beforeDestroy() {
    clearInterval(this.dataTiming)
  }
}
</script>

<style lang="scss" scoped>
.page-main {
  margin-top: 10px;
  // height: 100%;
}
</style>
