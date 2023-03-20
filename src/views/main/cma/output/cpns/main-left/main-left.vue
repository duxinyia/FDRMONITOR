<template>
  <div class="main-left">
    <el-row>
      <el-col :span="24">
        <dv-border-box-11 :color="changeBoxColor" title="產出By季度達成">
          <rank-chart :config="progressConfig" />
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
// 导入柱状图
import RankChart from "./cpns/rank-chart.vue"
// 导入自己封装的轮播图
import MyscrollChart from "@/components/myscroll-chart/myscroll-chart.vue"
export default {
  name: "main-left",
  props: ["progressConfig", "scrollData"],
  components: {
    MyscrollChart,
    RankChart
  },
  computed: {
    changeBoxColor() {
      return this.$store.getters.theme == "dark" ? ["#8aaafb", "#1f33a2"] : ["#05dad4", "#2c97e1"]
    }
  },
  methods: {
    changeSpeedStyle(item) {
      let width = parseInt(item.hitRate) > 100 ? "100%" : `${parseInt(item.hitRate)}%`
      return {
        width
      }
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
</style>
