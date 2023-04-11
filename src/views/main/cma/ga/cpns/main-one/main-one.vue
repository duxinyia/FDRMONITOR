<template>
  <div class="main-one">
    <div class="container">
      <div class="item">
        <dv-border-box-12 class="inner-box">
          <scat-chart :scats="scats" :machinename="`${machinename} X/Y shift`" :limit="0.025" />
        </dv-border-box-12>
      </div>
      <div class="item">
        <dv-border-box-12 class="inner-box">
          <kline-chart
            :kLineData="kLineDataX"
            :machinename="`${machinename} INSPECTIONX趨勢圖`"
            :limit="{ maxLimit: 0.025, minLimit: -0.025 }"
          />
        </dv-border-box-12>
      </div>
      <div class="item">
        <dv-border-box-12 class="inner-box">
          <kline-chart
            :kLineData="kLineDataY"
            :machinename="`${machinename} INSPECTIONY趨勢圖`"
            :limit="{ maxLimit: 0.025, minLimit: -0.025 }"
          />
        </dv-border-box-12>
      </div>
      <div class="item">
        <dv-border-box-12 class="inner-box">
          <kline-chart
            :kLineData="kLineDataZ"
            :machinename="`${machinename} INSPECTIONTHETA趨勢圖`"
            :limit="{ maxLimit: 0.5, minLimit: -0.5 }"
          />
        </dv-border-box-12>
      </div>
    </div>
  </div>
</template>

<script>
// 导入 k 线图
import KlineChart from "@/components/kline-chart/kline-chart.vue"
// 导入散点图
import ScatChart from "@/components/scat-chat/scat-chat.vue"
export default {
  name: "main-one",
  props: ["scats", "kLineData", "machinename", "kLineDataX", "kLineDataY", "kLineDataZ"],
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
    font-size: 20px;
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
