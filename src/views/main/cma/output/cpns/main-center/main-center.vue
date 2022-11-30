<template>
  <div class="main-center">
    <dv-border-box-11 :color="changeBoxColor" title="年度達成">
      <!-- 第一行 -->
      <el-row :gutter="30">
        <el-col v-for="item in totalArr" :key="item.name" class="item" :span="6">
          <div class="total-info">
            <p class="title">{{ item.name }}</p>
            <p class="number">{{ item.value }}</p>
          </div>
        </el-col>
      </el-row>
      <!-- 第二行 -->
      <div class="center-two">
        <p class="title-info">
          <img class="icon" src="@/assets/images/icon02.png" alt />
          <span class="title">機種產出分佈</span>
        </p>
        <pie-chart :showTitle="false" :seriesData="seriesData" />
      </div>
      <!-- 第三行 -->
      <div class="center-three">
        <p class="title-info">
          <img class="icon" src="@/assets/images/icon02.png" alt />
          <span class="title">未來7天開線數</span>
        </p>
        <line-chart
          height="400px"
          :showTitle="false"
          :config="lineChartConfig"
          title="線體良率明細區:"
        />
      </div>
    </dv-border-box-11>
  </div>
</template>

<script>
// 导入饼图
import PieChart from "./pie-chart/pie-chart.vue"
// 导入折线图
import LineChart from "@/common/line-chart/line-chart.vue"
export default {
  name: "main-center",
  components: {
    PieChart,
    LineChart
  },
  props: ["yearInfo", "seriesData", "lineChartConfig"],
  computed: {
    totalArr() {
      let { targetOut = 0, output, delta, hitRate } = this.yearInfo
      return [
        { name: "年度計劃:", value: parseInt(targetOut).toLocaleString("en-US") },
        { name: "實際:", value: parseInt(output).toLocaleString("en-US") },
        { name: "差異:", value: parseInt(delta).toLocaleString("en-US") },
        { name: "達成率:", value: hitRate }
      ]
    },
    changeBoxColor() {
      return this.$store.getters.theme == "dark" ? ["#8aaafb", "#1f33a2"] : ["#05dad4", "#2c97e1"]
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 70px 20px 20px 20px;
}
::v-deep .dv-border-box-11-title {
  font-size: 30px !important;
  font-weight: bold !important;
}
.main-center {
  .total-info {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: inset 0 0 20px #8b6fff;
    .title {
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .number {
      font-size: 28px;
      font-weight: bold;
      color: #26dac9;
    }
  }
  .center-two {
    margin: 27px 0 27px 0;
    .title-info {
      display: flex;
      align-items: center;
      .icon {
        vertical-align: middle;
      }
      .title {
        margin-left: 5px;
        font-size: 22px;
        font-weight: 700;
        color: #26dac9;
      }
    }
  }
  .center-three {
    .title-info {
      display: flex;
      align-items: center;
      margin: 20px 0 10px 0;
      .icon {
        vertical-align: middle;
      }
      .title {
        margin-left: 5px;
        font-size: 22px;
        font-weight: 700;
        color: #26dac9;
      }
    }
  }
}
</style>
