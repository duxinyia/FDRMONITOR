<template>
  <div class="page-mian">
    <div class="queryArea">
      <div class="system-select" v-for="item in selectData" :key="item.name">
        <span>{{ item.name }}:</span>
        <el-select :popper-append-to-body="false" v-model="item.value" placeholder="請選擇">
          <el-option v-for="item in options[item.name]" :key="item.value" :label="item.value" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="datePicker">
        <span>Start Time:</span>
        <el-date-picker
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="date.startTime"
          placeholder="請選擇時間"
        >
        </el-date-picker>
        <span>End Time:</span>
        <el-date-picker
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="date.EndTime"
          placeholder="請選擇時間"
        >
        </el-date-picker>
      </div>
      <el-button icon="el-icon-search" class="btn" type="primary" round @click="getSearchData">查詢</el-button>
      <el-button icon="el-icon-upload2" class="btn btnExp" type="primary" round @click="exportXlsx">导出</el-button>
    </div>

    <el-table
      id="exportTable"
      :data="tableData"
      :cell-style="cellStyle"
      :header-cell-style="{ background: 'transparent', color: '#fff' }"
      height="calc(100% - 102px)"
    >
      <el-table-column
        v-for="(item, index) in tableTitle"
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
import { GetDefectType, GetDevice, GetTbaleInfo } from "@/api/cma/report4"
import { handlerTableDate } from "@/utils/handlerTableData"

export default {
  name: "report1",
  props: {},
  components: {},
  data() {
    return {
      //查詢參數
      date: {
        startTime: this.$moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss"),
        EndTime: this.$moment().format("YYYY-MM-DD HH:mm:ss")
      },
      selectData: [
        { name: "Device", value: "" },
        { name: "DefectType", value: "" }
      ],
      // 两个下拉框的选项
      options: {
        DefectType: [],
        Device: []
      },
      // 表头名称
      tableTitle: [],
      // 表格数据
      tableData: []
    }
  },
  created() {
    this.initData()
    this.$store.commit("fullLoading/SET_TITLE", "Defect BY Lens Lot")
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
      let res2 = await GetDevice()
      this.options.Device = res2
      res2.forEach((item) => {
        if (item.selected) {
          this.selectData[0].value = item.id
        }
      })
    },
    //页面加载默认参数访问接口获取数据
    async initData() {
      let requestArr = [this.getSelectInfo()]
      await Promise.all(requestArr)
      this.getDefaultData()
    },
    async getDefaultData() {
      let res = await GetTbaleInfo({
        DefectType: this.selectData[1].value,
        Device: this.selectData[0].value,
        Starttime: this.date.startTime,
        Endtime: this.date.EndTime
      })
      this.tableTitle = res.columns
      this.tableData = handlerTableDate(res.rows)
    },

    // 导出表格为xlsx
    exportXlsx() {
      console.log()
      let workbook = this.$xlsx.utils.table_to_book(document.getElementById("exportTable")) //需要在table上定义一个id
      try {
        this.$xlsx.writeFile(workbook, `${this.$moment().format("YYYY/MM/DD HH:mm:ss")}表格.xlsx`)
      } catch (e) {
        console.log("e", e)
      }
    },

    async getSearchData() {
      let res = await GetTbaleInfo({
        DefectType: this.selectData[1].value,
        Device: this.selectData[0].value,
        Starttime: this.date.startTime,
        Endtime: this.date.EndTime
      })
      this.tableTitle = res.columns
      this.tableData = handlerTableDate(res.rows)
    },
    cellStyle({ row, column, columnIndex }) {
      if (columnIndex == 5) {
        if (parseFloat(row[column.property]) > 0.3) {
          return {
            color: "red"
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
}
.page-mian {
  height: calc(100% - 120px);
  margin-top: 10px;
  // border: 1px solid red;
}
/* 修改表格的一些样式 */
::v-deep .el-table {
  background: transparent;
  border-bottom: 2px solid #1683af;
  margin-top: 20px;
  height: calc(100% - 74.9px);
  // overflow: auto;
}
// 表头
::v-deep .el-table__header-wrapper {
  border: 2px solid rgba(160, 190, 250, 1) !important;
}
::v-deep .el-table thead {
  background: linear-gradient(90deg, rgba(36, 57, 73, 1) 0%, rgba(80, 126, 163, 1) 100%) !important;
}
::v-deep .el-table th.el-table__cell,
::v-deep.el-table thead.is-group th.el-table__cell {
  border-bottom: 0px solid #fff !important;
  background: unset;
}
::v-deep .el-table tr {
  background: transparent;
  color: #fff;
}
::v-deep .el-table__body-wrapper {
  border-left: 2px solid #1683af;
  border-right: 2px solid #1683af !important;
}
::v-deep .el-table th {
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
}
::v-deep .el-table td {
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
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
.queryArea {
  display: flex;
  padding: 10px 0px;
  height: 80px;
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
  .btnExp {
    margin-left: 12px;
  }
}
.system-select,
.datePicker {
  align-items: center;
  margin-top: 8px;
  span {
    font-size: 16px;
    padding: 0 10px 0 25px;
  }
}
::v-deep .el-select .el-input .el-select__caret {
  color: rgba(128, 128, 128, 1);
}
::v-deep .el-scrollbar {
  width: 238px;
}
::v-deep .el-input--suffix .el-input__inner {
  border: 0px solid #fff;
  border-radius: 4px;
  background: rgba(255, 255, 255, 1);
  font-size: 16px;
  color: rgba(128, 128, 128, 1);
}
</style>
