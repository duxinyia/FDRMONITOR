<template>
  <div class="main-one">
    <div class="container">
      <div class="item">
        <dv-border-box-12 class="inner-box">
          <scat-chart />
        </dv-border-box-12>
      </div>
      <div class="item">
        <dv-border-box-12>
          <kline-chart />
        </dv-border-box-12>
      </div>
      <div class="item">
        <dv-border-box-12>
          <kline-chart />
        </dv-border-box-12>
      </div>
    </div>
  </div>
</template>

<script>
// 导入 k 线图
import KlineChart from "./cpns/kline-chart.vue"
// 导入散点图
import ScatChart from "./cpns/scat-chat.vue"
export default {
  name: "main-one",
  components: {
    ScatChart,
    KlineChart
  }
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 10px;
}
.inner-box {
  .border-box-content {
    padding: 10px !important;
  }
}
.main-one {
  .container {
    display: flex;
    .item {
      flex: 1;
    }
  }
}
</style>
