<template>
  <div>
    <page-header title="SFC总良率预览" />
    <!-- 主要区域 -->
    <dv-border-box-10>
      <div class="page-main">
        <!-- 第一行 -->
        <el-row :gutter="30" class="main-one">
          <el-col v-for="item in topConfigArr" :span="8" :key="item.id">
            <dv-border-box-10>
              <div class="wrapper">
                <div class="output">
                  <span>{{ item.today }}</span>
                  <span>当日投入</span>
                </div>
                <div class="poor">
                  <span class="special">{{ item.poor }}</span>
                  <span>不良品</span>
                </div>
                <div class="chart">
                  <dv-water-level-pond
                    :config="{ data: [`${item.pond}`], shape: 'round' }"
                    style="width: 100px; height: 150px"
                  />
                </div>
              </div>
            </dv-border-box-10>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="30">
          <el-col v-for="item in names" :key="item" :span="8">
            <dv-border-box-11 :title="item">
              <line-chart />
            </dv-border-box-11>
          </el-col>
        </el-row>
      </div>
    </dv-border-box-10>
  </div>
</template>
<script>
// 导入头部
import PageHeader from "@/components/page-header/index.vue"
// 导入水位球
import WaterBall from "./cpns/WaterBall.vue"
// 导入折线图
import LineChart from "./cpns/LineChart.vue"
export default {
  name: "tsfc",
  components: {
    PageHeader,
    WaterBall,
    LineChart
  },
  data() {
    return {
      topConfigArr: [
        { id: 1, today: 3400, poor: 240, good: 0.98, pond: 50 },
        { id: 2, today: 3500, poor: 240, good: 0.98, pond: 65 },
        { id: 3, today: 3600, poor: 240, good: 0.98, pond: 60 }
      ],
      names: ["FOL", "EOL", "Tatal"]
    }
  },
  computed: {
    // options() {
    //   // console.log("data", data)
    //   // return ""
    // }
  },
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
    }
  },
  beforeDestroy() {
    clearInterval(this.dataTiming)
  }
}
</script>
<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px 20px 20px 20px;
}
.page-main {
  height: 100%;
  .main-one {
    margin: 50px 0px 50px 0px;
    .wrapper {
      display: flex;
      .output,
      .poor {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        span {
          &:nth-child(1) {
            color: yellow;
            font-size: 25px;
            font-weight: bold;
            margin-bottom: 20px;
            letter-spacing: 5px;
          }
          &:nth-child(2) {
            font-size: 28px;
            font-weight: bold;
          }
        }
        .special {
          font-weight: bold !important;
          font-size: 28px !important;
          color: red !important;
        }
      }
      // .output {
      //   span {
      //     &:nth-child(1) {
      //       color: yellow;
      //       font-size: 25px;
      //       font-weight: bold;
      //       margin-bottom: 20px;
      //     }
      //     &:nth-child(2) {
      //       font-size: 28px;
      //       font-weight: bold;
      //     }
      //   }
      // }
      .chart {
        flex: 1;
      }
    }
  }
}
</style>
