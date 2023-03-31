<template>
  <div class="main-two">
    <dv-border-box-12>
      <line-chart :lineData="lineData" :machinename="machinename" :limit="limit" />
    </dv-border-box-12>
  </div>
</template>

<script>
// 导入散点图
import LineChart from "@/components/line-chart/line-chart.vue"
export default {
  name: "main-two",
  props: ["lineData", "machinename", "limit"],
  components: {
    LineChart
  }
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 8px !important;
}
.main-two {
  margin-top: 5px;
}
</style>
