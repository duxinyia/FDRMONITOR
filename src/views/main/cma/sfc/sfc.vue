<template>
  <!-- 主要区域 -->
  <div class="page-main">
    <!-- 主要区域 -->
    <dv-border-box-12>
      <div class="page-main">
        <!-- 第一个图 -->
        <div class="top-chart">
          <el-carousel height="380px" :interval="10000" indicator-position="none">
            <el-carousel-item>
              <line-chart-1 :config="allYearConfig" />
            </el-carousel-item>
            <el-carousel-item>
              <line-chart-1 :config="yearWeekConfig" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 下面四个图 -->
        <el-carousel height="550px" :interval="10000" indicator-position="none">
          <el-carousel-item v-for="(item, index) in splitArr" :key="index">
            <el-col v-for="(childItem, childIndex) in item" :key="childIndex" :span="12">
              <line-chart-2
                :config="allDetails[4 * index + childIndex]"
                :showTitle="allSeries[4 * index + childIndex].value"
              />
            </el-col>
          </el-carousel-item>
        </el-carousel>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script>
// 导入5个折线图
import LineChart1 from "./cpns/LineChart1.vue"
import LineChart2 from "./cpns/LineChart2.vue"
// 导入发送请求的函函數
import { getMESDeviceInfo, getMESDeviceDetail, getCloseYieldInfo, getCloseYieldInfoTow } from "@/api/cma/sfc.js"
import { splitArray } from "@/utils"
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
      lineChartConfigs: [
        { deviceSeries: "JU" },
        { deviceSeries: "ML" },
        { deviceSeries: "MD" },
        { deviceSeries: "Stanley" }
      ],
      // 12 个月的数据
      allYearConfig: {
        legends: [],
        xData: [],
        showData: []
      },
      // 两月四周的数据
      yearWeekConfig: {
        legends: [],
        xData: [],
        showData: []
      },
      // 所有的子类型
      allSeries: [],
      allDetails: []
    }
  },
  computed: {
    // 分割形成不同的数组
    splitArr() {
      return splitArray(this.allSeries, 4)
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "SFC良率By月")
    this.initData()
  },
  methods: {
    async initData() {
      let requestArr = [this.getCloseYieldInfo(), this.getCloseYieldInfoTow(), this.getMESDeviceInfo()]
      await Promise.all(requestArr)
      this.$store.commit("fullLoading/SET_FULLLOADING", false)
    },
    // 获取所有的子类型
    async getMESDeviceInfo() {
      let res = await getMESDeviceInfo()
      console.log("所有的子类型为:", res)
      this.allSeries = res
      // 根据子类型请求对应的详细数据
      res.forEach((item, index) => {
        getMESDeviceDetail({ serie: item.value }).then((r) => {
          console.log("详细的数据为：", r)
          let tempConfig = {
            legends: [],
            xData: [],
            showData: []
          }
          r &&
            r.forEach((item, index) => {
              let tempData = []
              // 1. 取出legends
              tempConfig.legends.push(item.deviceSeries)
              // 2. 取出xData中的值 但只能取一次
              item.yieldList.forEach((childItem) => {
                if (index == 0) {
                  tempConfig.xData.push(childItem.dateCode)
                }
                // 取出对应的值
                tempData.push(parseFloat(childItem.values.value))
              })
              tempConfig.showData.push(tempData)
            })
          this.$set(this.allDetails, index, tempConfig)
        })
      })
    },
    // 获取 12 个月的 数据
    async getCloseYieldInfo() {
      let res = await getCloseYieldInfo()
      let tempConfig = {
        legends: [],
        xData: [],
        showData: []
      }
      console.log("获取对应的数据获取 12 个月的 数据:", res)
      // this.allYearData = res
      res.forEach((item, index) => {
        let tempData = []
        // 1. 取出legends
        tempConfig.legends.push(item.deviceSeries)
        // 2. 取出xData中的值 但只能取一次
        item.yieldList.forEach((childItem) => {
          if (index == 0) {
            tempConfig.xData.push(childItem.dateCode)
          }
          // 取出对应的值
          tempData.push(parseFloat(childItem.values.value))
        })
        tempConfig.showData.push(tempData)
      })
      this.allYearConfig = tempConfig
    },
    // 获取 良率總覽 Close兩月四周
    async getCloseYieldInfoTow() {
      let res = await getCloseYieldInfoTow()
      let tempConfig = {
        legends: [],
        xData: [],
        showData: []
      }
      console.log("良率總覽 Close兩月四周", res)
      res.forEach((item, index) => {
        let tempData = []
        // 1. 取出legends
        tempConfig.legends.push(item.deviceSeries)
        // 2. 取出xData中的值 但只能取一次
        item.yieldList.forEach((childItem) => {
          if (index == 0) {
            tempConfig.xData.push(childItem.dateCode)
          }
          // 取出对应的值
          tempData.push(parseFloat(childItem.values.value))
        })
        tempConfig.showData.push(tempData)
      })
      this.yearWeekConfig = tempConfig
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
}
</style>
