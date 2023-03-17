<template>
  <div class="main-two">
    <dv-border-box-12>
      <line-chart />
    </dv-border-box-12>
  </div>
</template>

<script>
// 导入散点图
import LineChart from "./cpns/line-chart.vue"
export default {
  name: "main-two",
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
  margin-top: 10px;
}
</style>
