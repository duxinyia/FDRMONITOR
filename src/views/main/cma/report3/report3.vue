<template>
  <div class="page-mian">
    <div class="select-two">
      <div class="system-select" v-for="item in selectData" :key="item.name">
        <span>{{ item.name }}:</span>
        <el-select
          style="width: 230px; height: 34px"
          :popper-append-to-body="false"
          v-model="item.value"
          placeholder="請選擇"
          @change="handlerChange(item.name)"
        >
          <!-- @change="handlerChange(item.name)" -->
          <el-option v-for="item in options[item.name]" :key="item.value" :label="item.value" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="dateSelect">
        <span>datetime:</span>
        <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="datetime" placeholder="請選擇時間">
        </el-date-picker>
      </div>

      <el-button icon="el-icon-search" class="btn" type="primary" round @click="getSearchData">查詢</el-button>
    </div>
    <el-table
      :data="tableData1"
      :cell-style="cellStyle1"
      :header-cell-style="headerCellStyle1"
      v-loading="isLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中..."
      element-loading-background="rgba(0, 0, 0, 1)"
    >
      <el-table-column
        v-for="(item, index) in tableTitle1"
        :key="index"
        :prop="item.id"
        :label="item.capital"
        align="center"
        min-width="50px"
        show-overflow-tooltip
      >
        <!-- <el-table-colum>

          </el-table-colum> -->
      </el-table-column>
    </el-table>
    <el-table
      id="exportTable"
      :data="tableData2"
      :cell-style="cellStyle2"
      :header-cell-style="{ background: 'transparent', color: '#fff' }"
      class="table2"
      height="calc(100% - 366px)"
    >
      <el-table-column
        v-for="(item, index) in tableTitle2"
        :key="index"
        :prop="item.id"
        :label="item.capital"
        align="center"
        min-width="50px"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { GetDefectType, GetDeviceSeriers, ToolingType, Supply, GetTbale1Info, GetTbale2Info } from "@/api/cma/report3"
import { handlerTableDate } from "@/utils/handlerTableData"
export default {
  name: "report3",
  props: {},
  components: {},
  data() {
    return {
      isLoading: false,
      // 表头名称
      tableTitle1: [],
      tableTitle2: [],
      datetime: this.$moment().format("YYYY-MM-DD HH:mm:ss"),
      // 下拉框值
      selectData: [
        { name: "DeviceSeries", value: "" },
        { name: "DefectType", value: "" },
        { name: "ToolingType", value: "" },
        { name: "Supplier", value: "" }
      ],

      // 两个下拉框的选项
      options: {
        DefectType: [],
        DeviceSeries: [],
        ToolingType: [],
        Supplier: []
      },
      date: "256",
      // 表格数据
      tableData1: [],
      tableData2: [],
      num: 0,
      testData: [],
      title: ""
    }
  },

  created() {
    this.initData()
    this.$store.commit("fullLoading/SET_TITLE", "SFR BY Lens Tooling")
  },
  // computed: {
  //   selectData() {
  //     return [
  //       { name: "DeviceSeries", value: "" },
  //       { name: "DefectType", value: "" },
  //       { name: "ToolingType", value: "" },
  //       { name: "Supplier", value: "" }
  //     ]
  //   }
  // },
  watch: {
    selectData: {
      handler(newValue) {
        if (newValue[1].value && newValue[2].value) {
          let firstTitle = this.options.DefectType.find((item) => item.id == newValue[1].value)
          // console.log("firstTitle", firstTitle.value)
          let twoTitle = this.options.ToolingType.find((item) => item.id == newValue[2].value)
          this.$store.commit("fullLoading/SET_TITLE", `${firstTitle.value} BY ${twoTitle.value} Tooling`)
        }
      },
      deep: true
    }
  },
  methods: {
    async getSelectInfo() {
      let res1 = await GetDefectType()
      // console.log("res1", res1)
      this.options.DefectType = res1
      res1.forEach((item) => {
        if (item.selected) {
          this.selectData[1].value = item.id
        }
      })
      let res2 = await GetDeviceSeriers()
      this.options.DeviceSeries = res2
      res2.forEach((item) => {
        if (item.selected) {
          this.selectData[0].value = item.id
        }
      })
      let res3 = await ToolingType()
      this.options.ToolingType = res3
      // console.log("res", this.options.ToolingType)
      res3.forEach((item) => {
        if (item.selected) {
          this.selectData[2].value = item.id
          // console.log(this.selectData[2])
        }
      })
      let res4 = await Supply({
        DeviceSeriers: this.selectData[0].value,
        ToolingType: this.selectData[2].value
      })
      this.options.Supplier = res4
      res4.forEach((item) => {
        if (item.selected) {
          this.selectData[3].value = item.id
        }
      })
      // console.log("全部完了")
    },
    // 监听DeviceSeriers变化
    async handlerChange(item) {
      // console.log("改变了", item)
      if (item == "DeviceSeries" || item == "ToolingType") {
        let res4 = await Supply({
          DeviceSeriers: this.selectData[0].value,
          ToolingType: this.selectData[2].value
        })
        this.options.Supplier = res4
        res4.forEach((item) => {
          if (item.selected) {
            this.selectData[3].value = item.id
          }
        })
      }
    },
    //页面加载默认参数访问接口获取数据
    async initData() {
      let requestArr = [this.getSelectInfo()]
      await Promise.all(requestArr)
      this.getDefaultData()
    },

    async getDefaultData() {
      let res1 = await GetTbale1Info({
        DefectType: this.selectData[1].value,
        DeviceSeriers: this.selectData[0].value,
        ToolingType: this.selectData[2].value,
        Supply: this.selectData[3].value,
        datetime: this.datetime
      })
      this.tableTitle1 = res1.columns
      this.tableData1 = []
      this.tableData1 = handlerTableDate(res1.rows)
      // console.log(this.tableData1)
      let res2 = await GetTbale2Info({
        DefectType: this.selectData[1].value,
        DeviceSeriers: this.selectData[0].value,
        ToolingType: this.selectData[2].value,
        Supply: this.selectData[3].value,
        datetime: this.datetime
      })
      this.tableTitle2 = res2.columns
      this.tableData2 = handlerTableDate(res2.rows)
      this.caculateColSpan()
    },

    async getSearchData() {
      this.isLoading = true
      // this.$store.commit("fullLoading/SET_TITLE", `${this.selectData[0].value} BY ${this.selectData[2].value} Tooling`)
      let res1 = await GetTbale1Info({
        DefectType: this.selectData[1].value,
        DeviceSeriers: this.selectData[0].value,
        ToolingType: this.selectData[2].value,
        Supply: this.selectData[3].value,
        datetime: this.datetime
      })
      this.tableTitle1 = res1.columns
      this.tableData1 = []
      this.tableData1 = handlerTableDate(res1.rows)
      // console.log(this.tableData1)
      let res2 = await GetTbale2Info({
        DefectType: this.selectData[1].value,
        DeviceSeriers: this.selectData[0].value,
        ToolingType: this.selectData[2].value,
        Supply: this.selectData[3].value,
        datetime: this.datetime
      })
      this.tableTitle2 = res2.columns
      this.tableData2 = handlerTableDate(res2.rows)
      this.caculateColSpan()
      this.isLoading = false
    },
    cellStyle1({ row, column, columnIndex, rowIndex }) {
      if (column.label == "Spec.") {
        if (rowIndex == 0) {
          return {
            background: "#ff80ff",
            color: "#000"
          }
        }
        if (rowIndex == 1) {
          return {
            background: "#ffff00",
            color: "#000"
          }
        }
        if (rowIndex == 2) {
          return {
            background: "#9acd32",
            color: "#000"
          }
        }
      }
    },
    cellStyle2({ row, column, columnIndex, rowIndex }) {
      if (String(row[column.property]).includes("%")) {
        if (parseFloat(row[column.property]) < 0.1) {
          return {
            background: "#9acd32",
            color: "#000"
          }
        } else if (parseFloat(row[column.property]) >= 0.1 && parseFloat(row[column.property]) <= 0.3) {
          return {
            background: "#ffff00",
            color: "#000"
          }
        } else
          return {
            background: "#ff80ff",
            color: "#000"
          }
      }
    },

    /**
     * 表头初始化数据及合并表头计算
     */
    caculateColSpan() {
      let obj = {}
      this.testData = []
      this.tableTitle1.forEach((ele) => {
        ele.colSpan = 1
        obj["colSpan"] = 0
        this.testData.push(obj)
      })
      let num = 1
      for (let i = 0; i < this.testData.length - 1; i++) {
        if (this.tableTitle1[i].capital === this.tableTitle1[i + 1].capital) {
          num += 1
        } else {
          this.$set(this.testData, i, { ...this.testData[i], colSpan: num })
          num = 1
        }
        if (i === this.testData.length - 2) {
          this.$set(this.testData, i + 1, { ...this.testData[i + 1], colSpan: num })
        }
      }
    },
    /**
     * 表头合并控制
     */
    headerCellStyle1({ row, column, rowIndex, columnIndex }) {
      if (this.testData[columnIndex]) {
        this.$nextTick(() => {
          if (document.getElementsByClassName(column.id).length !== 0) {
            document.getElementsByClassName(column.id)[0].setAttribute("colSpan", this.testData[columnIndex].colSpan)
          }
        })
        // 被合并的列隐藏
        if (this.testData[columnIndex].colSpan === 0) {
          return { display: "none" }
        } else return { background: "transparent", color: "#fff" }
      }
    },
    // 导出表格为xlsx
    exportXlsx() {
      console.log("导出")
      let workbook = this.$xlsx.utils.table_to_book(document.getElementById("exportTable")) //需要在table上定义一个id
      try {
        this.$xlsx.writeFile(workbook, "表格.xlsx")
      } catch (e) {
        console.log("e", e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-mian {
  height: calc(100% - 120px);
  margin-top: 10px;
}
/* 修改表格的一些样式 */
::v-deep .el-table {
  background: transparent;
  border-bottom: 2px solid #1683af;
  margin-top: 20px;
}
// 表头
::v-deep .el-table__header {
  // box-sizing: border-box;
  border: 2px solid rgba(160, 190, 250, 1) !important;
}
::v-deep .el-table__body-wrapper {
  border-left: 2px solid #1683af;
  border-right: 2px solid #1683af !important;
}
::v-deep .el-table thead {
  background: linear-gradient(90deg, rgba(36, 57, 73, 1) 0%, rgba(80, 126, 163, 1) 100%) !important;
  // border: 10px solid rgba(160, 190, 250, 1) !important;
}
::v-deep .el-table th.el-table__cell,
::v-deep.el-table thead.is-group th.el-table__cell {
  border-bottom: 0px solid #fff !important;
  background: unset;
}
.table2 {
  ::v-deep .el-table__body-wrapper {
    height: 560px !important;
  }
}

::v-deep .el-table tr {
  background: transparent;
  color: #fff;
}
::v-deep .el-table thead th {
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff !important;
}
::v-deep .el-table thead th:last-child {
  border-right: 0px solid #fff;
}
::v-deep .el-table td {
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
}
::v-deep .el-table td:last-child {
  border-right: 0px solid #fff;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background: transparent;
}
::v-deep .el-table .el-table__cell {
  padding: 5px 0px;
}
::v-deep .el-table th.el-table__cell > .cell {
  padding: 0px;
}
::v-deep .el-table::before,
.el-table::after {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
// 输入框的样式
.select-two {
  display: flex;
  height: 80px;
  padding: 10px 0px;
  border-radius: 4px;
  background: linear-gradient(90deg, rgba(36, 57, 73, 1) 0%, rgba(80, 126, 163, 1) 100%);
  border: 2px solid rgba(160, 190, 250, 1);
  .btn {
    font-size: 14px;
    width: 88px;
    height: 34px;
    border-radius: 95px;
    background: rgba(0, 143, 253, 1);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    margin-left: 72px;
    padding-left: 18px;
    padding-top: 9px;
    margin-top: 11px;
  }
}
.system-select,
.dateSelect {
  align-items: center;
  margin-top: 8px;
  span {
    font-size: 16px;
    padding: 0 10px 0 25px;
  }
}
::v-deep .el-scrollbar {
  width: 230px;
}
::v-deep .el-input--suffix .el-input__inner {
  border-radius: 4px;
  background: rgba(255, 255, 255, 1);
  font-size: 16px;
  color: rgba(128, 128, 128, 1);
  border: 0px solid #fff;
}
::v-deep .el-select .el-input .el-select__caret {
  color: rgba(128, 128, 128, 1);
}
</style>
