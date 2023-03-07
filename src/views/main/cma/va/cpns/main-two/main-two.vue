<template>
  <div class="main-two">
    <line-chart />
    <!-- <kline-chart /> -->
  </div>
</template>

<script>
// import klineChart from "../main-one/cpns/kline-chart.vue"
// 导入散点图
import LineChart from "./cpns/line-chart.vue"

export default {
  name: "main-two",
  components: {
    LineChart
    // klineChart
  }
}
</script>

<style lang="scss" scoped>
.main-two {
  /* width: 500px; */
  margin-top: 10px;
  border: 1px solid blanchedalmond;
}
</style>
