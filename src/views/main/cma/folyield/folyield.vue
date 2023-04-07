<template>
  <div class="page-main">
    <dv-border-box-12>
      <el-row>
        <el-col :span="12"><line-chart-2 :config="lineChartConfig" /></el-col>
        <el-col :span="12"><line-chart-2 :config="lineChartConfig" /></el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="8"><line-chart-2 :config="lineChartConfig" /></el-col>
        <el-col :span="8"><line-chart-2 :config="lineChartConfig" /></el-col>
        <el-col :span="8"><line-chart-2 :config="lineChartConfig" /></el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="8"><line-chart-2 :config="lineChartConfig" /></el-col>
        <el-col :span="8"><line-chart-2 :config="lineChartConfig" /></el-col>
        <el-col :span="8"><line-chart-2 :config="lineChartConfig" /></el-col>
      </el-row>
    </dv-border-box-12>
  </div>
</template>

<script>
import LineChart2 from "./cpns/LineChart2.vue"
export default {
  name: "folyield",
  props: {},
  components: {
    LineChart2
  },
  data() {
    return {
      lineChartConfig: {
        legends: ["1", "2", "3", "4", "5"],
        xData: [1, 2, 3, 4, 5],
        yData: [
          [1.0, 1.0, 1.0, 1.0, 1.0],
          [1.5, 1.5, 1.5, 1.5, 1.5],
          [1.6, 1.6, 1.6, 1.6, 1.6],
          [2.0, 2.0, 2.0, 2.0, 2.0]
        ]
      },
      config: {
        xData: ["1/1", "1/2", "1/3", "1/4", "1/5", "1/6", "1/7"],
        yData: [
          [120.3, 132.9, 101.2, 134.8, 89.3, 170.2, 160.5],
          [110.4, 112.5, 161.4, 104.2, 160.0, 130.2, 120.2],
          [95, 95, 95, 95, 95, 95, 95]
        ],
        legends: ["D", "N"]
      },
      chartConfigs: {
        deviceSeries: "JU"
      },
      lineChartConfigs: [
        {
          deviceSeries: "JU"
        },
        { deviceSeries: "ML" },
        { deviceSeries: "MD" },
        { deviceSeries: "Stanley" }
      ]
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "FOL Yield Report")
  }
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
}
.page-main {
  height: calc(100% - 120px);
  margin-top: 10px;
}
</style>
