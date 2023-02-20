<template>
  <!-- 主要区域 -->
  <div class="page-main">
    <el-row :gutter="10">
      <el-col :span="14">
        <dv-border-box-12>
          <div class="total-wrapper">
            <div v-for="item in getShowValues" :key="item.id" class="total-container">
              <div class="name">{{ item.name }}</div>
              <div class="number">{{ item.value }}</div>
            </div>
          </div>
        </dv-border-box-12>
        <dv-border-box-12>
          <div class="chart-container">
            <make-chart-1
              :title="chart1Ttitle"
              :xData="xData"
              :targetOuts="targetOuts"
              :inPuts="inPuts"
              :isFol="isFol"
              :isStanley="isStanley"
              @barClick="barClick"
            />
          </div>
        </dv-border-box-12>
        <dv-border-box-12>
          <div class="chart-container">
            <make-chart-2
              :title="chart2Ttitle"
              :chart2Xdata="chart2Xdata"
              :chart2Output="chart2Output"
              :chart2TargetOut="chart2TargetOut"
              :chart2HitRate="chart2HitRate"
            />
          </div>
        </dv-border-box-12>
        <dv-border-box-12>
          <div class="chart-container">
            <make-chart-3
              :title="chart3Ttitle"
              :xData="chart2Xdata"
              :maxWips="maxWips"
              :minWips="minWips"
              :wips="wips"
              :isFol="isFol"
              :isStanley="isStanley"
            />
          </div>
        </dv-border-box-12>
      </el-col>
      <el-col :span="10">
        <el-table
          :header-cell-style="getRowClass"
          :data="tableData"
          :highlight-current-row="true"
          style="margin-top: 4px"
        >
          <el-table-column align="center" class="table-head" :label="tableLabel">
            <el-table-column
              align="center"
              prop="station"
              width="180px"
              show-overflow-tooltip
              label="站位"
            ></el-table-column>
            <el-table-column align="center" prop="targetOut" label="計劃"></el-table-column>
            <el-table-column align="center" prop="inPut" label="實際"></el-table-column>
            <el-table-column
              align="center"
              prop="hitRate"
              width="100px"
              label="達成率"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="processYield"
              width="100px"
              label="良率"
            ></el-table-column>
            <el-table-column align="center" prop="wip" label="WIP"></el-table-column>
            <el-table-column align="center" prop="maxWip" label="上限"></el-table-column>
            <el-table-column align="center" prop="minWip" label="下限"></el-table-column>
          </el-table-column>
        </el-table>
        <div class="ct">
          <span class="name">CT(WIP总和/Pack站计划)</span>
          <span class="number">{{ ctNum }}</span>
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
import { GetRunningInfo, GetStationTimeSpanOutputInfo } from "@/api/make.js"
export default {
  name: "make",
  components: {
    MakeChart1,
    MakeChart2,
    MakeChart3
  },
  data() {
    return {
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
      // preTime: "",
      ctNum: 0,
      isFol: false,
      isStanley: false
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
    // this.preTime = preTime
    // 各个表格的标题
    this.chart1Ttitle = `${customName} 產出達成狀況`
    this.chart3Ttitle = `${customName} 站位WIP狀況`
    this.tableLabel = `${customName} 產能達成狀況`
  },
  methods: {
    // 获取右边表格的数据
    async GetRunningInfo(params) {
      let result = await GetRunningInfo(params)
      // console.log("result", result)
      let {
        productAreaInfo: { targetOut, outPut, hitRate, delta },
        stationInfo
      } = result
      this.headValues = [targetOut, outPut, hitRate, delta]
      // 取出 stationInfo 的最后一项的 opNo
      this.Opno = stationInfo[stationInfo.length - 1].opNo
      // 取出最后一项的名称
      this.chart2Ttitle = `${stationInfo[stationInfo.length - 1].station} 時段產出`
      // 取出最后一项的 pack 计划
      let packPlan = stationInfo[stationInfo.length - 1].targetOut
      this.GetStationTimeSpanOutputInfo({ ...this.$route.params, Opno: this.Opno })
      // 循环取出头部区域
      let totalWip = 0
      stationInfo.forEach((item) => {
        // station x轴的数据 inPut 输入的值
        let { station, inPut, targetOut, maxWip, minWip, wip, opNo } = item
        //
        this.xData.push(station)
        // 第一个需要的数据
        this.targetOuts.push({ opNo, station, value: targetOut })
        this.inPuts.push({ opNo, station, value: inPut })
        // 第二个 需要的数据
        this.maxWips.push(maxWip)
        this.minWips.push(minWip)
        this.wips.push(wip)
        totalWip += Number(wip)
      })
      this.ctNum = packPlan == 0 ? 0 : (totalWip / packPlan).toFixed(2)
      // 取出表格的数据
      this.tableData = stationInfo
    },
    // 获取左边中间区域的数据
    async GetStationTimeSpanOutputInfo(params) {
      let result = await GetStationTimeSpanOutputInfo(params)
      this.chart2Xdata = []
      this.chart2Output = []
      this.chart2TargetOut = []
      this.chart2HitRate = []
      // console.log("result====", result)
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
    // 处理 表一 的点击事件
    barClick({ opNo: Opno, station }) {
      this.Opno = Opno
      this.chart2Ttitle = `${station} 時段產出`
      this.GetStationTimeSpanOutputInfo({ ...this.$route.params, Opno })
    },
    getRowClass() {
      return "background:transparent !important;color:#1adafb;'font-size':'30px'"
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-col-10 {
  height: 925px !important;
  overflow: auto;
}
//整个table的背景颜色
::v-deep .el-table {
  font-size: 15px !important;
  /* color: #000; */
  color: var(--make-base-text);
  border: 1px solid #1683af;
  background-color: transparent !important; //主体框透明透明
}
::v-deep .cell {
  padding: 0px !important;
}
::v-deep .el-table th {
  padding: 7px 0 !important;
  background-color: transparent;
  border-right: 1px solid #1683af;
  border-bottom: 1px solid #1683af !important;
}
::v-deep .el-table td {
  padding: 7px 0 !important;
  border-right: 1px solid #1683af;
  border-bottom: 1px solid #1683af;
}
::v-deep .el-table tr {
  background-color: transparent !important; //每一行透明
}
::v-deep .el-table::before,
.el-table::after {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
::v-deep .el-table tbody tr:hover > td {
  background-color: transparent !important;
}
::v-deep .border-box-content {
  padding: 10px;
}
::v-deep .dv-border-box-13 {
  padding: 10px 10px;
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
</style>
