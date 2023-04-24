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
      <el-button class="btn" type="primary" round @click="getSearchData">查詢</el-button>
    </div>

    <el-table
      :data="tableData"
      :cell-style="cellStyle"
      :header-cell-style="{ background: 'transparent', color: '#fff' }"
      height="calc(100% - 75px)"
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
    this.getSelectInfo()
    this.getDefaultData()
    this.$store.commit("fullLoading/SET_TITLE", "SFR/FPDC by LensLot")
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
    async getDefaultData() {
      let res = await GetTbaleInfo({
        DefectType: "SFR",
        Device: "APL007",
        Starttime: this.date.startTime,
        Endtime: this.date.EndTime
      })
      this.tableTitle = res.columns
      this.tableData = handlerTableDate(res.rows)
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
.page-mian {
  height: calc(100% - 120px);
  margin-top: 10px;
  // border: 1px solid red;
}
/* 修改表格的一些样式 */
::v-deep .el-table {
  background: transparent;
  border: 1px solid #1683af;
  margin-top: 20px;
  height: calc(100% - 74.9px);
  // overflow: auto;
}
::v-deep .el-table tr {
  background: transparent;
  color: #fff;
}
::v-deep .el-table th {
  border-right: 1px solid #1683af;
  border-bottom: 1px solid #1683af !important;
}
::v-deep .el-table td {
  border-right: 1px solid #1683af;
  border-bottom: 1px solid #1683af;
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
  .btn {
    margin-left: 20px;
  }
}
.system-select {
  span {
    padding: 0 10px 0 25px;
  }
}
.datePicker {
  span {
    padding: 0 10px 0 25px;
  }
}
::v-deep .el-input--suffix .el-input__inner {
  background-color: rgba(0, 0, 0, 0.3);
  font-size: 16px;
  color: #fff;
  border-color: #409eff;
}
::v-deep .el-select-dropdown {
  background-color: #000c1a;
  .el-select-dropdown__item {
    color: #fff;
    // color: #243d97 !important;
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: #243d97;
  }
  .el-select-dropdown__item.selected {
    background-color: #243d97 !important;
  }
  .popper__arrow:after {
    border-bottom-color: #000c1a !important;
  }
}
</style>
