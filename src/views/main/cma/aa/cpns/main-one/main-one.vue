<template>
  <div class="main-one">
    <dv-border-box-12>
      <myscroll-chart
        title="膠針到期預警"
        carouselHeight="220px"
        :headers="['設備名稱', 'A1', 'A2', 'A3', 'A4']"
        :widths="[120, 50, 50, 50, 50]"
        :showData="config1"
      />
    </dv-border-box-12>
    <dv-border-box-13>
      <pie-chart title="當日良率損失TOP5" :alloptions="config2" />
    </dv-border-box-13>
    <dv-border-box-12>
      <div
        class="item-wrapper"
        v-loading="numLoading"
        element-loading-spinner="el-icon-loading"
        element-loading-text="加载中"
        element-loading-background="rgba(0, 0, 0, 1)"
      >
        <div v-for="(item, index) in config3" :key="item.id" class="num-item">
          <!-- 普通版本 -->
          <span class="des">{{ item.des }}</span>
          <span v-if="index == 3" class="number">{{ item.number }}</span>
          <countTo
            v-else
            :startVal="0"
            class="number"
            :endVal="item.number"
            :duration="5000"
          ></countTo>
        </div>
      </div>
    </dv-border-box-12>
    <dv-border-box-13>
      <!-- 排名轮播表 -->
      <ranking-rotation-chart title="當日效率損失TOP5" :config="config4" />
    </dv-border-box-13>
    <dv-border-box-12>
      <myscroll-chart
        title="當日產出/達成率/一次良率/統計"
        carouselHeight="220px"
        :headers="['機種', '計劃', '實際', '達成率', '一次良率']"
        :widths="[60, 60, 60, 80, 100]"
        :showData="config5"
      />
    </dv-border-box-12>
  </div>
</template>
<script>
// 导入数字滚动组件
import countTo from "vue-count-to"
// 导入echarts中的饼图
import pieChart from "./cpns/pie-chart.vue"
// 导入改装排名轮播表
import rankingRotationChart from "@/components/ranking-rotation-chart/ranking-rotation-chart"
// 导入自己封装的轮播图
import MyscrollChart from "@/components/myscroll-chart/myscroll-chart.vue"
export default {
  name: "main-one",
  props: ["config1", "config2", "config3", "config4", "config5"],
  data() {
    return {
      numLoading: true
    }
  },
  components: {
    countTo,
    pieChart,
    rankingRotationChart,
    MyscrollChart
  },
  watch: {
    config3: {
      handler() {
        this.numLoading = false
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
.main-one {
  display: flex;
  margin: 30px 0 20px 0;
  // 小圆点的样式
  ::v-deep .dot {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    vertical-align: middle;
  }
  ::v-deep .border-box-content {
    padding: 20px;
  }
  .item-wrapper {
    // 没用环形图的
    height: 272px;
    display: flex;
    flex-wrap: wrap;
    .num-item {
      display: flex;
      flex-direction: column;
      text-align: center;
      width: 48%;
      border-radius: 10px;
      background: var(--chart3-item-bg);
      align-items: center;
      margin-bottom: 10px;
      &:nth-child(2n + 1) {
        margin-right: 10px;
      }
      &:nth-child(n + 7) {
        margin-bottom: 0;
      }
      .des {
        display: inline-block;
        margin-top: 4px;
        flex: 1;
        font-weight: 900;
        color: var(--chart3-item-des);
      }
      .number {
        display: inline-block;
        color: var(--chart3-item-num);
        line-height: 100%;
        flex: 1;
        font-size: 25px;
      }
    }
  }
}
</style>
