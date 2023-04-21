<template>
  <!-- 主要区域 -->
  <div class="page-main">
    <el-row :gutter="10">
      <el-col :span="7">
        <main-left :progressConfig="progressConfig" :scrollData="leftScrollData" />
      </el-col>
      <el-col :span="10">
        <main-center :yearInfo="yearInfo" :seriesData="seriesData" :lineChartConfig="lineChartConfig" />
      </el-col>
      <el-col :span="7">
        <main-right :scrollData="rightScrollData" :rightTopData="rightTopData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入各子组件
import MainLeft from "./cpns/main-left/main-left.vue"
import MainCenter from "./cpns/main-center/main-center.vue"
import MainRight from "./cpns/main-right/main-right.vue"
// 导入发送请求的函数
import {
  getYearOutputInfo,
  getYearOutputInfoCollection,
  getMPSOpenLineInfo,
  getDateCodeOutputInfo
} from "@/api/dp/output.js"
export default {
  name: "output1",
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
      progressConfig: {
        names: [],
        values: [],
        formatValues: []
      },
      // 左下的数据
      leftScrollData: [],
      // 右上的数据
      rightTopData: {
        names: [],
        values: [],
        formatValues: []
      },
      // 右下的数据
      rightScrollData: []
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "產出可視化平台")
    this.initData()
    // 每 120000（2分钟）获取一次数据
    this.dataTiming = setInterval(() => {
      this.clearValue()
      this.initData()
    }, 120000)
  },
  methods: {
    // 清空数据
    clearValue() {
      // 饼图的配置
      ;(this.seriesData = []),
        // 折线图的一些数据
        (this.lineChartConfig = {
          legends: [],
          xData: [],
          yData: []
        }),
        // 左上的数据
        (this.progressConfig = {
          names: [],
          values: [],
          formatValues: []
        }),
        // 左下的数据
        (this.leftScrollData = []),
        // 右上的数据
        (this.rightTopData = {
          names: [],
          values: [],
          formatValues: []
        }),
        // 右下的数据
        (this.rightScrollData = [])
    },
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
    },
    // 获取左上的数据
    async getYearOutputInfo() {
      let res = await getYearOutputInfo({ DateTag: "quarter" })
      console.log("获取左上的数据", res)
      res.forEach((item) => {
        let { dateCode, output, hitRate, targetOut } = item
        // 取出name
        this.progressConfig.names.push(dateCode)
        // this.progressConfig.values.push(parseInt(output))
        this.progressConfig.values.push({
          value: parseInt(output),
          output: parseInt(output),
          targetOut: parseInt(targetOut)
        })
        // this.progressConfig.formatValues.push(hitRate)
        this.progressConfig.formatValues.push({ value: hitRate, detail: hitRate })
      })
    },
    // 获取右上的数据
    async getYearOutputInfo1() {
      let res = await getYearOutputInfo({ DateTag: "month" })
      console.log("获取右上的数据", res)
      // 取出当前月，判断是否小于6
      let month = this.$moment().format("M")
      // console.log("month", month)
      // let tempArr = month <= 6 ? res.slice(0, 6) : res.slice(6)
      let tempArr = res.slice(6)
      tempArr.forEach((item) => {
        let { dateCode, output, hitRate, targetOut } = item
        this.rightTopData.names.push(dateCode)
        this.rightTopData.values.push({
          value: parseInt(output),
          output: parseInt(output),
          targetOut: parseInt(targetOut)
        })
        this.rightTopData.formatValues.push(hitRate)
      })
    },
    // 获取中间饼图和统计区域的数据
    // 获取年度的统计数据
    async getYearOutputInfoCollection() {
      let res = await getYearOutputInfoCollection()
      console.log("获取年度的统计数据", res)
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
      console.log("获取中间折线图数据", res)
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
      console.log("获取左下的数据", res)
      this.leftScrollData = []
      res.forEach((item) => {
        // 取出对应的值
        let { owner, targetOut, output, delta, hitRate, dateCode } = item
        //
        let code = dateCode.split("-")[1]
        this.leftScrollData.push([code, owner, targetOut, output, delta, hitRate])
      })
    },
    // 获取右下的数据
    async getDateCodeOutputInfo1() {
      let res = await getDateCodeOutputInfo({ DateTag: "month" })
      console.log("获取右下的数据", res)
      this.rightScrollData = []
      try {
        res.forEach((item) => {
          let { owner, targetOut, output, delta, hitRate = "-", dateCode } = item
          let code = dateCode.split("-")[1]
          this.rightScrollData.push([code, owner, targetOut, output, delta, hitRate])
        })
      } catch (error) {
        console.log("error", error)
      }
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
