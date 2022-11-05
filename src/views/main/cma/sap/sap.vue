<template>
  <!-- 主要区域 -->
  <div class="page-main">
    <!-- 第一个图 -->
    <dv-border-box-10>
      <div class="top-chart">
        <el-carousel height="380px" :interval="10000" indicator-position="none">
          <el-carousel-item>
            <line-chart-1 :config="config2" />
          </el-carousel-item>
          <el-carousel-item>
            <line-chart-1 :config="config1" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 下面四个图 -->
      <el-carousel height="550px" :interval="10000" indicator-position="none">
        <el-carousel-item>
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
        </el-carousel-item>
        <el-carousel-item>
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
        </el-carousel-item>
      </el-carousel>
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
// import { getMaintainInfo, getDeviceInfo, getMachineTop5, getProductInfo } from "@/api/fol.js"
export default {
  name: "sap",
  components: {
    LineChart1,
    LineChart2,
    LineChart3,
    LineChart4,
    LineChart5
  },
  data() {
    return {
      config1: {
        xData: [
          "2021-Sep",
          "2021-Oct",
          "2021-Nov",
          "2021-Dec",
          "2022-Jan",
          "2022-Feb",
          "2022-Mar",
          "2022-Apr",
          "2022-May",
          "2022-Jun",
          "2022-Ju",
          "2022-Aug",
          "2022-Sep"
        ],
        mdx: [
          96.84, 98.82, 96.8, 98.8, 97.82, 95.84, 98.68, 98.69, 98.68, 98.69, 98.68, 98.69, 98.69
        ],
        jux: [
          94.77, 97.76, 97.71, 95.77, 97.43, 94.73, 98.73, 98.43, 98.73, 98.43, 98.73, 98.43, 98.69
        ],
        mlx: [
          98.58, 98.59, 98.61, 97.57, 98.69, 96.68, 98.73, 98.43, 98.73, 98.69, 98.68, 98.69, 98.69
        ],
        mwx: [
          96.5, 96.58, 98.31, 98.37, 98.56, 98.37, 97.71, 95.77, 97.43, 94.73, 94.73, 98.73, 98.43
        ]
      },
      config2: {
        xData: ["2022-05", "2022-06", "2022-07", "2022-08", "2022-09", "2022-10"],
        mdx: [96.84, 98.82, 96.8, 98.8, 97.82, 95.84],
        jux: [94.77, 97.76, 97.71, 95.77, 97.43, 94.73],
        mlx: [98.58, 98.59, 98.61, 97.57, 98.69, 96.68],
        mwx: [96.5, 96.58, 98.31, 98.37, 98.56, 98.37]
      }
    }
  },
  computed: {},
  mounted() {
    console.log("改变了SAP良率")
    this.$store.commit("fullLoading/SET_TITLE", "SAP良率")
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
  .top-chart {
    margin: 0px 0px;
  }
  .three-main {
    margin-top: 0px;
  }
}
</style>
