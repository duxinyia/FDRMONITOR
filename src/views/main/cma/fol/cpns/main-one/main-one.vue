<template>
  <el-row class="main-one" :gutter="10">
    <!-- 3d柱状图 -->
    <el-col :span="5">
      <dv-border-box-12>
        <bar-chart :config1="config1" @echartClick="handlerClick" />
      </dv-border-box-12>
    </el-col>
    <!-- 線體狀態看板區 -->
    <el-col :span="7">
      <dv-border-box-13>
        <scroll-chart height="200px" :config="scollConfig2" title="線體狀態看板區:" />
      </dv-border-box-13>
    </el-col>
    <!-- 線體良率明細區 -->
    <el-col :span="7">
      <dv-border-box-13>
        <myscroll-chart
          title="線體良率明細區:"
          carouselHeight="173px"
          :rowNum="5"
          :headers="['線體', '機種', '計劃產出', '實際產出', '達成率', 'DPC', 'LCB', '電性']"
          :widths="[60, 60, 80, 80, 70, 60, 60, 60]"
          :showData="config3"
        >
          <template #default="{ row }">{{ row }} </template>
        </myscroll-chart>
      </dv-border-box-13>
    </el-col>
    <!-- 當日當機Top5 -->
    <el-col :span="5">
      <dv-border-box-12>
        <rank-chart :config="config4" />
      </dv-border-box-12>
    </el-col>
  </el-row>
</template>

<script>
// 轮播图
import scrollChart from "@/components/scroll-chart/scroll-chart.vue"
// 导入排名图
import rankChart from "@/common/rank-chart/rank-chart.vue"
// 导入3d柱状图
import barChart from "@/common/bar-chart/bar-chart.vue"

// 导入自己封装的轮播图
import MyscrollChart from "@/components/myscroll-chart/myscroll-chart.vue"
export default {
  name: "main-one",
  props: ["config1", "config2", "config3", "config4"],
  components: {
    scrollChart,
    rankChart,
    barChart,
    MyscrollChart
  },
  computed: {
    scollConfig2() {
      return {
        header: [
          "機種",
          "MPS需求線數",
          "可線體數",
          "實際開線數",
          "計劃性停線數",
          "異常停線數",
          "差異"
        ],
        headerBGC: "#20316e",
        align: ["center", "center", "center", "center", "center", "center", "center"],
        columnWidth: [44, 98, 65, 80, 100, 80],
        waitTime: 5000,
        carousel: "page",
        data: this.config2
      }
    }
  },
  methods: {
    handlerClick(dataIndex) {
      // 携带对应的数据
      console.log("index", dataIndex, this.config1.details[dataIndex])
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .border-box-content {
  z-index: 99999;
  padding: 20px 20px 20px 20px;
}
.main-one {
  z-index: 100;
  display: flex;
  height: 265px;
  margin: 15px 0 0px 0px;
}
</style>
