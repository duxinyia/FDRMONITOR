<template>
  <div class="main-center">
    <dv-border-box-11 title="年度達成">
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
          <img class="icon" src="@/assets/images/icon02.png" alt="" />
          <span class="title">機種產出分佈</span>
        </p>
        <pie-chart :showTitle="false" />
      </div>
      <!-- 第三行 -->
      <div class="center-three">
        <p class="title-info">
          <img class="icon" src="@/assets/images/icon02.png" alt="" />
          <span class="title">未來7天開線數</span>
        </p>
        <!-- <scroll-chart
          height="400px"
          :showTitle="false"
          :config="scrollConfig"
          title="線體良率明細區:"
        /> -->
        <line-chart
          height="400px"
          :showTitle="false"
          :config="scrollConfig"
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
// 导入轮播图
// import scrollChart from "@/components/scroll-chart/scroll-chart.vue"

export default {
  name: "main-center",
  components: {
    PieChart,
    LineChart
    // scrollChart
  },
  data() {
    return {
      totalArr: [
        { name: "年度計劃:", value: "134,000" },
        { name: "實際:", value: "124,000" },
        { name: "差異:", value: "124,000" },
        { name: "達成率:", value: "124,000" }
      ],
      scrollConfig: {
        header: ["季度", "機種", "計劃", "實際", "差異", "達成率"],
        rowNum: 8,
        data: [
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"]
        ],
        index: true,
        columnWidth: [50],
        align: ["center"],
        carousel: "page"
      }
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
