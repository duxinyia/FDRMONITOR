<template>
  <div>
    <page-header title="製造層" />
    <!-- 主要区域 -->
    <div class="page-main">
      <el-row :gutter="10">
        <el-col :span="14">
          <dv-border-box-12>
            <div class="total-wrapper">
              <div v-for="item in totalArr" :key="item.id" class="total-container">
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
              />
            </div>
          </dv-border-box-12>
          <dv-border-box-12>
            <div class="chart-container">
              <make-chart-2 :title="chart2Ttitle" />
            </div>
          </dv-border-box-12>
          <dv-border-box-12>
            <div class="chart-container">
              <make-chart-3 :title="chart3Ttitle" :xData="xData" :maxWips="maxWips" :wips="wips" />
            </div>
          </dv-border-box-12>
        </el-col>

        <el-col :span="10">
          <el-table
            :header-cell-style="getRowClass"
            :data="tableData"
            :highlight-current-row="true"
            style="width: 100%; margin-top: 4px"
          >
            <el-table-column align="center" class="table-head" :label="tableLabel">
              <!-- "station": "Material incoming",//站位
                "opNo": "0016",//站位代碼
                "targetOut": 118500,//計劃產出（目標產出）
                "inPut": 0,//投入
                "outPut": 0,//產出
                "setUp": 0,//setup不良
                "fail": 0,//不良數
                "wip": "",//WIP
                "minWip": 0,//最小WIP
                "maxWip": 0,//最大WIP
                "hitRate": "0.00%",//達成率
                "processYield": "100.00%",//不含setup良率
                "overallYield": "100.00%"//含setup良率 -->
              <el-table-column align="center" prop="station" width="180px" label="站位">
              </el-table-column>
              <el-table-column align="center" prop="targetOut" label="計劃"> </el-table-column>
              <el-table-column align="center" prop="inPut" label="實際"> </el-table-column>
              <el-table-column align="center" prop="hitRate" width="100px" label="達成率">
              </el-table-column>
              <el-table-column align="center" prop="processYield" width="100px" label="良率">
              </el-table-column>
              <el-table-column align="center" prop="wip" label="WIP"> </el-table-column>
              <el-table-column align="center" prop="maxWip" label="上限"> </el-table-column>
              <el-table-column align="center" prop="minWip" label="下限"> </el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// 导入头部
import PageHeader from "@/components/page-header/index.vue"
// 导入子组件
import MakeChart1 from "./cpns/makechart1.vue"
import MakeChart2 from "./cpns/makechart2.vue"
import MakeChart3 from "./cpns/makechart3.vue"
// 导入请求函数
import { GetRunningInfo } from "@/api/make.js"
export default {
  name: "make",
  components: {
    PageHeader,
    MakeChart1,
    MakeChart2,
    MakeChart3
  },
  data() {
    return {
      totalArr: [
        { id: 1, name: "當日計畫", value: "134,000" },
        { id: 2, name: "實際", value: "134,000" },
        { id: 3, name: "差異", value: "134,000" },
        { id: 4, name: "達成率", value: "134,000" }
      ],
      // 表格的数据
      tableData: [],
      // x 轴的标题
      xData: [],
      targetOuts: [],
      inPuts: [],
      maxWips: [],
      wips: [],
      chart1Ttitle: "",
      chart2Ttitle: "",
      chart3Ttitle: "",
      tableLabel: ""
    }
  },
  mounted() {
    // SET_FULLLOADING
    this.$store.commit("fullLoading/SET_FULLLOADING", true)
    console.log("hhhh", this.$route)
    this.GetRunningInfo(this.$route.params)
    let { customName } = this.$route.params
    // 各个表格的标题
    this.chart1Ttitle = `${customName} 產出達成狀況`
    this.chart2Ttitle = `${customName} AA時段產出`
    this.chart3Ttitle = `${customName} 站位WIP狀況`
    this.tableLabel = `${customName}產能達成狀況`
  },
  methods: {
    getRowClass() {
      return "background:transparent !important;color:#1adafb;'font-size':'30px'"
    },
    async GetRunningInfo(params) {
      let result = await GetRunningInfo(params)
      console.log("result", result)
      let { stationInfo } = result
      this.$store.commit("fullLoading/SET_FULLLOADING", false)
      // 循环取出头部区域
      stationInfo.forEach((item) => {
        // station x轴的数据 inPut 输入的值
        let { station, inPut, targetOut, maxWip, wip } = item
        //
        this.xData.push(station)
        // 第一个需要的数据
        this.targetOuts.push(targetOut)
        this.inPuts.push(inPut)
        // 第二个 需要的数据
        this.maxWips.push(maxWip)
        this.wips.push(wip)
      })
      // 取出表格的数据
      this.tableData = stationInfo
    }
  }
}
</script>

<style lang="scss" scoped>
//整个table的背景颜色
::v-deep .el-table {
  background-color: transparent;
  color: white;
  font-size: 17px;
}
::v-deep .el-table__cell {
  padding: 7px 0;
}

//表格整行的颜色
::v-deep .el-table tr {
  background-color: transparent !important;
}
::v-deep .el-table tbody tr:hover > td {
  background-color: transparent !important;
}

::v-deep .el-table td.el-table__cell,
.el-table--border th.el-table__cell,
.el-table__fixed-right-patch,
.el-table--border .el-table__cell,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed,
.el-table--border,
.el-table--group,
.el-table--border th.el-table__cell,
.el-table__fixed-right-patch {
  border-bottom: 1px solid #1683af;
  border-right: 1px solid #1683af;
}
::v-deep .el-table--border,
.el-table--group {
  border: 1px solid #1683af;
}
::v-deep .el-table--border th.el-table__cell,
.el-table__fixed-right-patch {
  border-bottom: 1px solid #1683af;
}
::v-deep .el-table--border .el-table__cell,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: 1px solid #1683af;
}
::v-deep .border-box-content {
  padding: 10px;
}
::v-deep .dv-border-box-13 {
  padding: 10px 10px;
}
::v-deep .el-table--border::after,
.el-table--group::after,
.el-table::before {
  content: "";
  position: absolute;
  background-color: transparent;
  z-index: 1;
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
      }
      .number {
        font-size: 28px;
        font-weight: 700;
        color: #26dac9;
      }
      &:nth-child(1) {
        // box-shadow: inset 0 0 20px #ffff00; #6152cf
        box-shadow: inset 0 0 20px #2ddae9;
      }
      &:nth-child(2) {
        // box-shadow: inset 0 0 20px #00ff00;
        box-shadow: inset 0 0 20px #1797d9;
      }
      &:nth-child(3) {
        // box-shadow: inset 0 0 20px #ff0000;
        box-shadow: inset 0 0 20px #2ddae9;
      }
      &:nth-child(4) {
        // box-shadow: inset 0 0 20px #8b6fff;
        box-shadow: inset 0 0 20px #1797d9;
      }
    }
  }
}
</style>
