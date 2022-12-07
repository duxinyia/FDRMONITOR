<template>
  <div class="main-left">
    <el-row>
      <el-col :span="24">
        <dv-border-box-11 :color="changeBoxColor" title="產出By季度達成">
          <!-- <div class="progress-container">
            <div v-for="item in progressConfig" :key="item.name">
              <div class="number">
                <span class="content">{{ item.value }}</span>
              </div>
              <p class="name">{{ item.name }}</p>
            </div>
          </div>-->
          <line-chart :progressConfig="progressConfig" />
        </dv-border-box-11>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <dv-border-box-13 class="box13">
          <myscroll-chart
            title="季度/產出By系列"
            carouselHeight="375px"
            :headers="['季度', '機種', '計劃', '實際', '差異', '達成率']"
            :widths="[60, 80, 100, 100, 100, 100]"
            :showData="scrollData"
            :rowNum="8"
          />
        </dv-border-box-13>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入折线图
import LineChart from "./cpns/line-chart.vue"
// 导入自己封装的轮播图
import MyscrollChart from "@/components/myscroll-chart/myscroll-chart.vue"
export default {
  name: "main-left",
  props: ["progressConfig", "scrollData"],
  components: {
    LineChart,
    MyscrollChart
  },
  computed: {
    changeBoxColor() {
      return this.$store.getters.theme == "dark" ? ["#8aaafb", "#1f33a2"] : ["#05dad4", "#2c97e1"]
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 60px 20px 20px 20px;
}
::v-deep .dv-border-box-11-title {
  font-size: 20px !important;
  font-weight: bold !important;
}
::v-deep .dv-border-box-13 .border-box-content {
  padding: 20px;
}
.progress-container {
  height: 380px;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  text-align: center;
  .number {
    position: relative;
    width: 140px;
    height: 140px;
    /* background: #00f0ff; */
    border: 1px solid red;
    /* border-radius: 50%; */
    .content {
      position: absolute;
      letter-spacing: 6px;
      font-weight: bold;
      font-size: 18px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      color: #26dac9;
    }
    /* &::after {
      position: absolute;
      left: 50%;
      top: 50%;
      content: "";
      width: 90%;
      height: 90%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background: #293564;
    } */
  }
  .name {
    margin-top: 6px;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
