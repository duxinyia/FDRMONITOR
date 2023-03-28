<template>
  <div class="main-one">
    <div class="container">
      <div class="item">
        <dv-border-box-12 class="inner-box">
          <scat-chart :scats="scats" :machinename="machinename" />
        </dv-border-box-12>
      </div>
      <div class="item">
        <dv-border-box-12 class="inner-box">
          <kline-chart :kLineData="kLineData" :machinename="machinename" />
        </dv-border-box-12>
      </div>
      <div class="item">
        <dv-border-box-12 class="inner-box">
          <kline-chart :kLineData="getKLineHourData" :machinename="machinename" />
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
  props: ["scats", "kLineData", "machinename", "getKLineHourData"],
  components: {
    ScatChart,
    KlineChart
  }
}
</script>
<style lang="scss">
.inner-box {
  .border-box-content {
    font-weight: bold;
    font-size: 23px;
    padding: 15px 10px 10px 10px !important;
  }
}
</style>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 10px;
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
