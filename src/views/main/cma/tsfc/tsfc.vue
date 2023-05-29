<template>
  <div class="page-main">
    <!-- 主要区域 -->
    <dv-border-box-12>
      <!-- 使用轮播图来展示数据 -->
      <el-carousel style="height: 100%" indicator-position="none" :interval="15 * 10000" ref="carousel" arrow="never">
        <el-carousel-item v-for="(item, index) in splitArr" :key="index">
          <div class="chart-container">
            <div v-for="(childItem, childIndex) in item" :key="childIndex" class="chart-item">
              <line-chart :config="allShowData[4 * index + childIndex]" />
              <div class="btns">
                <div @click="toDetail">EOL</div>
                <div @click="toDetail">FOL</div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </dv-border-box-12>
    <!-- 自定义两个切换按钮 -->
    <change-switch
      :leftConfig="{ left: '25px', top: '15px' }"
      :rightConfig="{ right: '25px', top: '15px' }"
      @directionChange="handleDirection"
    />
  </div>
</template>
<script>
// 导入折线图
import LineChart from "./cpns/LineChart.vue"
// 获取所有的子系列的
import { getMESDeviceInfo } from "@/api/cma/sfc.js"
// 导入接口
import { getDeviceSeries } from "@/api/cma/tsfc.js"
import { splitArray } from "@/utils"
// 导入左右切换的组件
import ChangeSwitch from "@/components/change-switch/change-switch.vue"
export default {
  name: "tsfc",
  components: {
    LineChart,
    ChangeSwitch
  },
  data() {
    return {
      allDevice: [],
      allShowData: []
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "SFC良率Daily")
    this.initData()
  },
  computed: {
    // 分割形成不同的数组
    splitArr() {
      return splitArray(this.allDevice, 4)
    }
  },
  methods: {
    async initData() {
      let requestArr = [this.getMESDeviceInfo()]
      await Promise.all(requestArr)
    },
    // 获取所有的机台数据
    async getMESDeviceInfo() {
      let res = await getMESDeviceInfo()
      this.allDevice = res
      console.log("所有的机台数据为:", res)
      // 根据不同机台请求不同的数据
      res.forEach(async (item, index) => {
        let detailRes = await getDeviceSeries({ device: item.value })
        console.log("返回的数据为子系列:", detailRes)
        let tempConfg = { title: detailRes.deviceSeries, xData: [], legends: [], showData: [] }
        // 我们需要取出x轴的数据 xData    showData
        detailRes.yieldList.forEach((item2, twoIndex) => {
          let tempShowData = []
          // 这里取出 legends
          tempConfg.legends.push(item2.device.customName)
          // 当前legends 对应
          item2.dateValues.forEach((childItem) => {
            if (twoIndex == 0) {
              // 取出x轴的数据
              tempConfg.xData.push(childItem.dateCode)
            }
            tempShowData.push(parseFloat(childItem.values.value))
          })
          tempConfg.showData.push(tempShowData)
        })
        this.$set(this.allShowData, index, tempConfg)
      })
    },
    // 去详情页面
    toDetail() {
      console.log("toDetail")
      this.$router.push({
        name: "folyield"
      })
    },
    //
    handleDirection(direction) {
      direction == "left" ? this.$refs.carousel.prev() : this.$refs.carousel.next()
    }
  },
  beforeDestroy() {
    clearInterval(this.dataTiming)
  }
}
</script>
<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
}
::v-deep .el-carousel__container {
  height: 100%;
}
.page-main {
  height: calc(100% - 120px);
  margin-top: 10px;
  position: relative;
}
.chart-container {
  height: 100%;
  display: grid;
  margin-top: 5px;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 20px;
  .chart-item {
    position: relative;
    .btns {
      position: absolute;
      top: 40px;
      right: 40px;
      display: flex;
      div {
        height: 25px;
        width: 60px;
        text-align: center;
        line-height: 25px;
        border-radius: 20px;
        margin-left: 10px;
        cursor: pointer;
        background: linear-gradient(134.15deg, rgba(84, 93, 241, 1) 0%, rgba(75, 177, 250, 1) 100%);
      }
    }
  }
}
</style>
