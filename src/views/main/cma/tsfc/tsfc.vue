<template>
  <div>
    <!-- 主要区域 -->
    <dv-border-box-10>
      <div class="page-main">
        <!-- 第一行 -->
        <el-row :gutter="30" class="main-one">
          <el-col v-for="item in 4" :key="item" :span="12" class="item">
            <div class="left">
              <line-chart :config="chartConfig[item-1]" />
            </div>
            <div class="right">
              <span>FOL</span>
              <span>EOL</span>
            </div>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <!-- <el-row :gutter="30" class="main-two">
          <el-col v-for="item in ['Stanley系列', 'ML系列']" :key="item" :span="12" class="item">
            <div class="left">
              <dv-border-box-11 :title="item">
                <line-chart />
              </dv-border-box-11>
            </div>
            <div class="right">
              <span>FOL</span>
              <span>EOL</span>
            </div>
          </el-col>
        </el-row>-->
      </div>
    </dv-border-box-10>
  </div>
</template>
<script>
// 导入折线图
import LineChart from "./cpns/LineChart.vue"
// 导入接口文档
import { getDateCodeRunningYieldInfo } from "@/api/tsfc.js"
export default {
  name: "tsfc",
  components: {
    LineChart
  },
  data() {
    return {
      chartConfig: []
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "SFC总良率预览")
    this.$store.commit("fullLoading/SET_FULLLOADING", true)
    this.$store.commit("fullLoading/SET_FULLLOADING", false)
    this.initData()
    // 每5分钟获取一次数据
    // this.dataTiming = setInterval(() => {
    //   this.initData()
    // }, 50000)
  },
  methods: {
    async initData() {
      let requestArr = [this.getDateCodeRunningYieldInfo()]
      await Promise.all(requestArr)
      this.$store.commit("fullLoading/SET_FULLLOADING", false)
    },
    // 获取对应的数据
    async getDateCodeRunningYieldInfo() {
      let res = await getDateCodeRunningYieldInfo()
      console.log("res", res)
      this.chartConfig = res
    }
  },
  beforeDestroy() {
    clearInterval(this.dataTiming)
  }
}
</script>
<style lang="scss" scoped>
::v-deep .border-box-content {
  margin-top: 20px;
  padding: 20px 20px 20px 20px;
}
.page-main {
  margin-top: 10px;
  height: 100%;
  .main-one {
    margin: 0px 0px 20px 0px;
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
  .item {
    display: flex;
    .left {
      width: 870px;
      color: #dd4848;
    }
    .right {
      margin-left: 10px;
      margin-top: 50px;
      span {
        display: block;
        text-align: center;
        width: 60px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        // border: 1px solid red;
        &:nth-child(1) {
          background: rgba(127, 98, 233, 0.5);
        }
        &:nth-child(2) {
          background: rgba(98, 213, 233, 0.5);
          margin-top: 10px;
        }
      }
    }
  }
  .main-two {
    margin-bottom: 20px;
  }
}
</style>
