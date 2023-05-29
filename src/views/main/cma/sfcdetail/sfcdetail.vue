<template>
  <!-- 主要区域 -->
  <div class="page-main">
    <dv-border-box-12>
      <div class="top-chart">
        <line-chart-1 :config="topLineChartConfig" :title="device" />
      </div>
      <!-- 下面四个图 -->
      <el-carousel height="550px" :interval="10000" indicator-position="none">
        <el-carousel-item v-for="(item, index) in splitArr" :key="index">
          <el-col v-for="(childItem, childIndex) in item" :key="childIndex" :span="12">
            <line-chart-2 :config="allDetails[4 * index + childIndex]" :showTitle="allTypes[4 * index + childIndex]" />
          </el-col>
        </el-carousel-item>
      </el-carousel>
    </dv-border-box-12>
  </div>
</template>
<script>
import { splitArray } from "@/utils"
// 导入5个折线图
import LineChart1 from "./cpns/LineChart1.vue"
import LineChart2 from "./cpns/LineChart2.vue"
// 导入发送请求的函函數
import { getCloseYield, getCloseYieldDetail } from "@/api/cma/sfcdetail.js"
export default {
  name: "sfcdetail",
  components: {
    LineChart1,
    LineChart2
  },
  data() {
    return {
      device: "",
      allTypes: [],
      allDetails: [],
      topLineChartConfig: [], // 上方折线图的数据
      lineChartConfig: [] // 下方折线图的数据
    }
  },
  mounted() {
    this.device = this.$route.query.device
    console.log("this.$route", this.$route)
    this.topLineChartConfig = this.$route.params.topLineChartConfig
    this.$store.commit("fullLoading/SET_TITLE", `${this.device}系列良率`)
    this.$store.commit("fullLoading/SET_FULLLOADING", true)
    this.$store.commit("fullLoading/SET_FULLLOADING", false)
    this.initData()
  },
  computed: {
    // 分割形成不同的数组
    splitArr() {
      return splitArray(this.allTypes, 4)
    }
  },
  methods: {
    async initData() {
      let res = await getCloseYield({ DeviceSeries_V0: this.device })
      console.log("所有的子项目:", res)
      this.allTypes = res
      res.forEach((type, index) => {
        getCloseYieldDetail({ DefectType: type, DeviceSeries_V0: this.device }).then((res1) => {
          console.log("详细的数据为：", res1)
          let tempConfig = {
            legends: [],
            xData: [],
            showData: []
          }
          res1.forEach((item, index) => {
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
    }
    // 获取数据
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
  height: calc(100% - 120px);
  margin-top: 10px;
  .top-chart {
    margin: 0px 0px;
  }
}
</style>
