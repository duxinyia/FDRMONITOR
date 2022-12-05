<template>
  <!-- 主要区域 -->
  <div class="page-main">
    <el-row :gutter="10">
      <el-col :span="7">
        <main-left :progressConfig="progressConfig" :scrollData="leftScrollData" />
      </el-col>
      <el-col :span="10">
        <main-center
          :yearInfo="yearInfo"
          :seriesData="seriesData"
          :lineChartConfig="lineChartConfig"
        />
      </el-col>
      <el-col :span="7">
        <main-right :scrollData="rightScrollData" :rightTopData="rightTopData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入各子组件
import { MainLeft, MainCenter, MainRight } from "./cpns"
// 导入发送请求的函数
import {
  getYearOutputInfo,
  getYearOutputInfoCollection,
  getMPSOpenLineInfo,
  getDateCodeOutputInfo
} from "@/api/output.js"
export default {
  components: {
    MainLeft,
    MainCenter,
    MainRight
  },
  data() {
    return {
      config1: {},
      dataTiming: null,
      // 年度达成的一些信息
      yearInfo: {},
      // 饼图的配置
      seriesData: [],
      // 折线图的一些数据
      lineChartConfig: {
        legends: [],
        xData: [],
        yData: []
      },
      // 左上的数据
      progressConfig: [],
      // 左下的数据
      leftScrollData: [],
      // 右上的数据
      rightTopData: [],
      // 右下的数据
      rightScrollData: []
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "產出可視化平台")
    this.$store.commit("fullLoading/SET_FULLLOADING", true)
    this.initData()
    // 每5分钟获取一次数据
    // this.dataTiming = setInterval(() => {
    //   this.initData()
    // }, this.$globalData.CYCLE_TIME)
  },
  methods: {
    // 获取数据
    async initData() {
      let requestArr = [
        this.getYearOutputInfo(),
        this.getYearOutputInfo1(),
        this.getYearOutputInfoCollection(),
        this.getMPSOpenLineInfo(),
        this.getDateCodeOutputInfo(),
        this.getDateCodeOutputInfo1()
      ]
      await Promise.all(requestArr)
      this.$store.commit("fullLoading/SET_FULLLOADING", false)
    },
    // 获取左上的数据
    async getYearOutputInfo() {
      let res = await getYearOutputInfo({ DateTag: "quarter" })
      console.log("获取左上的数据", res)
      res.forEach((item) => {
        let { dateCode, output } = item
        this.progressConfig.push({ name: dateCode, value: parseInt(output) })
      })
    },
    // 获取右上的数据
    async getYearOutputInfo1() {
      let res = await getYearOutputInfo({ DateTag: "month" })
      // console.log("获取右上的数据", res)
      res.forEach((item) => {
        let { dateCode, output } = item
        this.rightTopData.push({ name: dateCode, value: parseInt(output) })
      })
    },
    // 获取中间饼图和统计区域的数据
    // 获取年度的统计数据
    async getYearOutputInfoCollection() {
      let res = await getYearOutputInfoCollection()
      // console.log("获取年度的统计数据", res)
      this.yearInfo = res.yearInfo
      // 组合饼图的数据
      res.deviceSeriesPie.forEach((item) => {
        let { owner, output } = item
        this.seriesData.push({ name: owner, value: parseInt(output) })
      })
    },
    // 获取中间折线图部分
    async getMPSOpenLineInfo() {
      let res = await getMPSOpenLineInfo()
      if (res) {
        // 生成对应的折线图的 数据
        res.forEach((item) => {
          // 取到各项的名称
          this.lineChartConfig.legends.push(item.keyName)
          let tempArr = []
          let tempArr2 = []
          item.value.forEach((item1) => {
            // 取到对应的值
            tempArr.push(item1.value)
            tempArr2.push(item1.keyName.slice(5))
          })
          this.lineChartConfig.yData.push(tempArr)
          this.lineChartConfig.xData = tempArr2
        })
      }
    },
    // 获取左下的数据
    async getDateCodeOutputInfo() {
      let res = await getDateCodeOutputInfo({ DateTag: "quarter" })
      // console.log("获取左下的数据", res)
      res.forEach((item) => {
        // 取出对应的值
        let { owner, targetOut, output, delta, hitRate, dateCode } = item
        //
        let code = dateCode.split("-")[1]
        this.leftScrollData.push([code, owner, targetOut, output, delta, hitRate])
      })
    },
    // 获取左右下的数据
    async getDateCodeOutputInfo1() {
      let res = await getDateCodeOutputInfo({ DateTag: "month" })
      // console.log("获取右下的数据", res)
      res.forEach((item) => {
        let { owner, targetOut, output, delta, hitRate, dateCode } = item
        let code = dateCode.split("-")[1]
        this.rightScrollData.push([code, owner, targetOut, output, delta, hitRate])
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.dataTiming)
  }
}
</script>

<style lang="scss" scoped>
.page-main {
  margin-top: 20px;
}
</style>
