<template>
  <div class="main-right">
    <el-row>
      <el-col :span="24">
        <dv-border-box-11 :color="changeBoxColor" title="產出By月達成">
          <!-- <div class="progress-container">
            <div class="progress-item" v-for="item in rightTopData" :key="item.name">
              <div class="info">
                <span class="name">{{item.name}}</span>
                <span>{{item.value}}</span>
              </div>
              <div class="progress">
                <span class="speed" :style="changeSpeedStyle(item)">{{item.hitRate}}</span>
              </div>
            </div>
          </div>-->
          <rank-chart :config="rightTopData" />
        </dv-border-box-11>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <dv-border-box-13 class="box13">
          <myscroll-chart
            title="月/產出By機種"
            carouselHeight="375px"
            :headers="['月份', '機種', '計劃', '實際', '差異', '達成率']"
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
  name: "main-right",
  props: ["scrollData", "rightTopData"],
  components: {
    MyscrollChart,
    RankChart
  },
  computed: {
    dvScrollConfig() {
      let { rightTopData } = this
      return {
        data: rightTopData,
        showValue: true
      }
    },
    changeBoxColor() {
      return this.$store.getters.theme == "dark" ? ["#8aaafb", "#1f33a2"] : ["#05dad4", "#2c97e1"]
    }
  },
  methods: {
    changeSpeedStyle(item) {
      // console.log("item", item)
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

/* .progress-container {
  height: 380px;
  .progress-item {
    margin-bottom: 18px;
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
      .name {
        font-size: 18px;
        font-weight: bold;
      }
    }
    .progress {
      height: 25px;
      border: 1px solid #fff;
      .speed {
        display: inline-block;
        width: 100px;
        height: 100%;
        line-height: 25px;
        text-align: right;
        background: #383b86;
      }
    }
  }
} */
</style>
