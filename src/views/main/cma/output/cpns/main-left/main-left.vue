<template>
  <div class="main-left">
    <el-row>
      <el-col :span="24">
        <dv-border-box-11 title="產出By季度達成">
          <div class="progress-container">
            <div v-for="item in progressConfig" :key="item.name">
              <div class="number">{{item.value}}</div>
              <p class="name">{{item.name}}</p>
            </div>
          </div>
        </dv-border-box-11>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <dv-border-box-13 class="box13">
          <myscroll-chart
            title="季度/產出By系列"
            carouselHeight="335px"
            :headers="['季度', '機種', '計劃', '實際', '差異', '達成率']"
            :widths="[60, 80, 100, 100, 100,100]"
            :showData="scrollData"
            :rowNum="8"
          />
        </dv-border-box-13>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入自己封装的轮播图
import MyscrollChart from "@/components/myscroll-chart/myscroll-chart.vue"
export default {
  name: "main-left",
  props: ["progressConfig", "scrollData"],
  components: {
    MyscrollChart
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
  .number {
    width: 120px;
    height: 120px;
    background: red;
    border-radius: 50%;
  }
  /* .name {
  } */
}
</style>
