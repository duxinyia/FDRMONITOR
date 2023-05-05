<template>
  <!-- 主要区域 -->
  <div class="page-main">
    <el-row :gutter="10">
      <el-col :span="14">
        <dv-border-box-12>
          <div
            class="total-wrapper"
            v-loading="tableLoading"
            element-loading-spinner="el-icon-loading"
            element-loading-text="加载中"
            element-loading-background="rgba(0, 0, 0, 1)"
          >
            <div v-for="item in getShowValues" :key="item.id" class="total-container">
              <div class="name">{{ item.name }}</div>
              <div class="number">{{ item.value }}</div>
            </div>
          </div>
        </dv-border-box-12>

        <div style="margin: 8px 0px">
          <dv-border-box-12>
            <make-chart-1
              :title="chart1Ttitle"
              :xData="xData"
              :targetOuts="targetOuts"
              :inPuts="inPuts"
              :isFol="isFol"
              :isStanley="isStanley"
              @barClick="barClick"
            />
          </dv-border-box-12>
        </div>
        <div style="margin-bottom: 8px">
          <dv-border-box-12>
            <make-chart-2
              :title="chart2Ttitle"
              :chart2Xdata="chart2Xdata"
              :chart2Output="chart2Output"
              :chart2TargetOut="chart2TargetOut"
              :chart2HitRate="chart2HitRate"
              @changeLoading="changeLoading"
            />
          </dv-border-box-12>
        </div>

        <dv-border-box-12>
          <make-chart-3
            :title="chart3Ttitle"
            :xData="chart3Config.chat3Xdata"
            :maxWips="chart3Config.chat3MaxWips"
            :minWips="chart3Config.chat3MinWips"
            :wips="chart3Config.chat3Wips"
            :isFol="isFol"
            :isStanley="isStanley"
            :chart3Loading="chart2Loading"
          />
        </dv-border-box-12>
      </el-col>
      <el-col :span="10">
        <div
          v-loading="leftLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-text="加载中"
          element-loading-background="rgba(0, 0, 0, 1)"
        >
          <ces-table :tableData="tableData" :tableCols="tableCols">
            <template #wip="{ row }">
              <div class="lamp-contaienr">
                <span class="lamp" :style="changewipStyle(row)"></span>
                <span>{{ row.wip || 0 }}</span>
              </div>
            </template>
          </ces-table>
          <div class="ct">
            <span class="name">CT(WIP总和/Pack站计划)</span>
            <span class="number">{{ ctNum }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// 导入子组件
import MakeChart1 from "./cpns/makechart1.vue"
import MakeChart2 from "./cpns/makechart2.vue"
import MakeChart3 from "./cpns/makechart3.vue"
// 导入请求函数
import { GetRunningInfo, GetStationTimeSpanOutputInfo, getStationTimeSpanWIPInfo } from "@/api/cma/make.js"
export default {
  name: "make",
  components: {
    MakeChart1,
    MakeChart2,
    MakeChart3
  },
  data() {
    return {
      // 表格列配置
      tableCols: [
        {
          prop: "",
          label: `${this.$route.params.customName} 產能達成狀況`,
          childColumn: [
            { prop: "station", label: "站位", width: "180" },
            { prop: "targetOut", label: "計劃" },
            { prop: "outPut", label: "實際" },
            { prop: "hitRate", label: "達成率", width: "100" },
            { prop: "processYield", label: "良率", width: "100" },
            { prop: "wip", label: "WIP" },
            { prop: "maxWip", label: "上限" },
            { prop: "minWip", label: "下限" }
          ]
        }
      ],
      // 表格的数据
      tableData: [],
      // x 轴的标题
      xData: [],
      targetOuts: [],
      inPuts: [],
      maxWips: [],
      minWips: [],
      wips: [],
      chart1Ttitle: "",
      chart2Ttitle: "",
      chart3Ttitle: "",
      tableLabel: "",
      headValues: [0, 0, 0, 0],
      Opno: "",
      // 左边中间图表的数据
      chart2Xdata: [],
      chart2Output: [],
      chart2TargetOut: [],
      chart2HitRate: [],
      ctNum: 0,
      isFol: false,
      isStanley: false,
      tableLoading: true,
      leftLoading: true,
      chart2Loading: true,
      // 表格三的配置文件
      chart3Config: {
        chat3MaxWips: [],
        chat3MinWips: [],
        chat3Wips: [],
        chat3Xdata: []
      }
    }
  },
  computed: {
    getShowValues() {
      let { headValues } = this
      return [
        { id: 1, name: "當日計畫", value: headValues[0] || 0 },
        { id: 2, name: "實際", value: headValues[1] || 0 },
        { id: 3, name: "差異", value: headValues[3] || 0 },
        { id: 4, name: "達成率", value: headValues[2] || "0%" }
      ]
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "By時段產出看板")
    console.log(this.$route)
    this.GetRunningInfo(this.$route.params)
    let { customName, ProductArea } = this.$route.params
    // 获取到 Stanley 和 ProductArea 的值， 用于判断是否是 FOL 过来的
    this.isFol = ProductArea == "FOL"
    this.isStanley = customName == "Stanley"
    // 各个表格的标题
    this.chart1Ttitle = `${customName} 產出達成狀況`
    this.tableLabel = `${customName} 產能達成狀況`
  },
  methods: {
    // 获取右边表格的数据
    async GetRunningInfo(params) {
      let result = await GetRunningInfo(params)
      let {
        productAreaInfo: { targetOut, outPut, hitRate, delta },
        stationInfo
      } = result
      this.headValues = [targetOut, outPut, hitRate, delta]
      // 取消loading 效果
      this.tableLoading = false
      // 取出 stationInfo 的最后一项的 opNo
      this.Opno = stationInfo[stationInfo.length - 1].opNo
      // 取出最后一项的名称
      this.chart2Ttitle = `${stationInfo[stationInfo.length - 1].station} 時段產出`
      this.chart3Ttitle = `${stationInfo[stationInfo.length - 1].station} 站位WIP狀況`
      // 取出最后一项的 pack 计划
      let packPlan = stationInfo[stationInfo.length - 1].targetOut
      this.GetStationTimeSpanOutputInfo({ ...this.$route.params, Opno: this.Opno })

      // 获取 左边最下面的数据
      this.getStationTimeSpanWIPInfo({ ...this.$route.params, Opno: this.Opno })
      // 循环取出头部区域
      let totalWip = 0
      stationInfo.forEach((item) => {
        // station x轴的数据 outPut 输入的值
        let { station, outPut, targetOut, maxWip, minWip, wip, opNo } = item
        //
        this.xData.push(station)
        // 第一个需要的数据
        this.targetOuts.push({ opNo, station, value: targetOut })
        this.inPuts.push({ opNo, station, value: outPut })
        // 第二个 需要的数据
        this.maxWips.push(maxWip)
        this.minWips.push(minWip)
        this.wips.push(wip)
        totalWip += Number(wip)
      })
      this.ctNum = packPlan == 0 ? 0 : (totalWip / packPlan).toFixed(2)
      // 取出表格的数据
      this.tableData = stationInfo
      this.leftLoading = false
    },
    // 获取左边中间区域的数据
    async GetStationTimeSpanOutputInfo(params) {
      let result = await GetStationTimeSpanOutputInfo(params)
      console.log("获取左边中间区域的数据", result)
      this.chart2Xdata = []
      this.chart2Output = []
      this.chart2TargetOut = []
      this.chart2HitRate = []
      // 需要生成 x轴的值 三种y的值
      result.dateValues.forEach((item) => {
        let {
          dateCode,
          values: {
            value: { targetOut, output, hitRate }
          }
        } = item
        this.chart2Xdata.push(dateCode.split(" ")[1].slice(0, 5))
        this.chart2Output.push(output)
        this.chart2TargetOut.push(targetOut)
        this.chart2HitRate.push(parseInt(hitRate))
      })
      this.$store.commit("fullLoading/SET_FULLLOADING", false)
    },
    // 获取左边最下面区域数据
    async getStationTimeSpanWIPInfo(params) {
      let result = await getStationTimeSpanWIPInfo(params)
      this.chart3Config = {
        chat3MaxWips: [],
        chat3MinWips: [],
        chat3Wips: [],
        chat3Xdata: []
      }
      console.log("获取左边最下面区域数据", result)
      // 取出对应的值
      result.dateValues.forEach((item) => {
        this.chart3Config.chat3Xdata.push(this.$moment(item.dateCode).subtract(2, "hours").format("HH:mm"))
        this.chart3Config.chat3MaxWips.push(item.values.value.maxWip)
        this.chart3Config.chat3MinWips.push(item.values.value.minWip)
        this.chart3Config.chat3Wips.push(item.values.value.wip)
      })
    },
    // 处理 表一 的点击事件
    barClick({ opNo: Opno, station }) {
      this.Opno = Opno
      // 修改第二个图的名称和一些字段
      this.chart2Ttitle = `${station} 時段產出`
      this.GetStationTimeSpanOutputInfo({ ...this.$route.params, Opno })
      // 修改第三个图的名称和字段
      this.chart3Ttitle = `${station} 站位WIP狀況`
      this.getStationTimeSpanWIPInfo({ ...this.$route.params, Opno })
    },
    getRowClass() {
      return "background:transparent !important;color:#1adafb;'font-size':'30px'"
    },
    changewipStyle(row) {
      console.log("row", row)
      if (row.wip && row.wip > row.maxWip) {
        return { color: "red" }
      } else if (row.wip && row.wip < row.minWip) {
        return { color: "yellow" }
      } else {
        return { color: "transparent" }
      }
    },
    changeLoading() {
      this.chart2Loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-col-10 {
  height: 925px !important;
  overflow: auto;
}
::v-deep .border-box-content {
  padding: 10px;
}
::v-deep .dv-border-box-13 {
  padding: 10px;
}
.page-main {
  margin-top: 10px;
  .total-wrapper {
    display: flex;
    justify-content: space-evenly;
    margin: 10px 0px;
    .total-container {
      width: 150px;
      height: 80px;
      margin-right: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .name {
        font-size: 25px;
        font-weight: 700;
        margin-bottom: 10px;
        color: var(--make-base-text);
      }
      .number {
        font-size: 28px;
        font-weight: 700;
        color: #26dac9;
      }
      &:nth-child(1) {
        box-shadow: inset 0 0 20px #2ddae9;
      }
      &:nth-child(2) {
        box-shadow: inset 0 0 20px #1797d9;
      }
      &:nth-child(3) {
        box-shadow: inset 0 0 20px #2ddae9;
      }
      &:nth-child(4) {
        box-shadow: inset 0 0 20px #1797d9;
      }
    }
  }
}
.ct {
  margin-top: 5px;
  height: 38px;
  line-height: 38px;
  color: var(--make-base-text);
  .name {
    display: inline-block;
    text-align: center;
    width: 548px;
    border: 1px solid #147aa4;
    background: rgba(79, 129, 189, 0.2);
  }
  .number {
    text-align: center;
    display: inline-block;
    width: 80px;
    border: 1px solid #147aa4;
    border-left: none;
    background: rgba(79, 129, 189, 0.2);
  }
}
.lamp-contaienr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  .lamp {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;

    animation: fade 2s infinite;
  }
}
@keyframes fade {
  0% {
    box-shadow: inset 0 0 5px currentColor;
  }
  50% {
    box-shadow: inset 0 0 10px currentColor;
  }
  100% {
    box-shadow: inset 0 0 5px currentColor;
  }
}
</style>
