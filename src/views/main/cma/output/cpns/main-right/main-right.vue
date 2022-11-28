<template>
  <div class="main-right">
    <el-row>
      <el-col :span="24">
        <dv-border-box-11 title="產出By月達成">
          <!-- <bar-chart height="380px" :showTitle="false" :config1="newConfig1" /> -->
          <dv-capsule-chart :config="dvScrollConfig" style="height:350px" />
        </dv-border-box-11>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <dv-border-box-13 class="box13">
          <!-- <scroll-chart height="390px" :showTitle="false" :config="scrollConfig" /> -->
          <myscroll-chart
            title="周/產出By機種"
            carouselHeight="335px"
            :headers="['月份', '機種', '計劃', '實際', '差異', '達成率']"
            :widths="[60, 80, 100, 100, 100,100]"
            :showData="scrollData"
            :rowNum="8"
          />
        </dv-border-box-13>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入3d柱状图
import barChart from "@/common/bar-chart/bar-chart.vue"
// 导入轮播图
// import scrollChart from "@/components/scroll-chart/scroll-chart.vue"
// 导入自己封装的轮播图
import MyscrollChart from "@/components/myscroll-chart/myscroll-chart.vue"
export default {
  name: "main-right",
  props: ["scrollData", "rightTopData"],
  components: {
    barChart,
    // scrollChart
    MyscrollChart
  },
  computed: {
    dvScrollConfig() {
      let { rightTopData } = this
      return {
        data: rightTopData,
        showValue: true
      }
    }
  },
  data() {
    return {
      config1: [
        {
          name: "7月",
          value: 7
        },
        {
          name: "8月",
          value: 8
        },
        {
          name: "9月",
          value: 9
        },
        {
          name: "10月",
          value: 5
        },
        {
          name: "11月",
          value: 9
        },
        {
          name: "12月",
          value: 5
        }
      ],
      // 3d柱状图处理后的config1的数据
      newConfig1: {
        xAxisData: [],
        seriesData: [],
        seriesData1: [],
        ciolData: [],
        sum: 0,
        bottomData: [],
        topData: []
      },
      scrollConfig: {
        header: ["月份", "機種", "計劃", "實際", "差異", "達成率"],
        rowNum: 8,
        data: [
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"],
          ["Q3", "ML-M", "162", "166", "12", "100%"]
        ],
        index: true,
        columnWidth: [50],
        align: ["center"],
        carousel: "page"
      }
    }
  },
  created() {
    this.handleConfig1()
  },
  methods: {
    handleConfig1() {
      this.config1.forEach((item) => {
        this.newConfig1.xAxisData.push(item.name)
        this.newConfig1.seriesData.push(item.value)
        this.newConfig1.seriesData1.push({ name: "", value: item.value })
        this.newConfig1.ciolData.push({ name: "", value: "0" })
        this.newConfig1.sum += item.value
      })
      this.config1.forEach((item) => {
        this.newConfig1.bottomData.push({ name: "", value: this.newConfig1.sum - item.value })
        this.newConfig1.topData.push({ name: "", value: this.newConfig1.sum })
      })
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
</style>
