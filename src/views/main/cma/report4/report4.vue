<template>
  <div class="page-mian">
    <div class="queryArea">
      <div class="datePicker">
        <span>Start Date:</span>
        <el-date-picker v-model="date.startDate" type="date" placeholder="請選擇日期"> </el-date-picker>
        <span>Start Time:</span>
        <el-time-picker v-model="date.startTime" placeholder="請選擇時間"> </el-time-picker>
        <span>End Date:</span>
        <el-date-picker v-model="date.EndDate" type="date" placeholder="請選擇日期"> </el-date-picker>
        <span>End Time:</span>
        <el-time-picker v-model="date.EndTime" placeholder="請選擇時間"> </el-time-picker>
      </div>
      <el-button class="btn" type="primary" round @click="getSearchData">Search</el-button>
    </div>

    <el-table
      :data="tableData"
      :cell-style="cellStyle"
      :header-cell-style="{ background: 'transparent', color: '#fff' }"
    >
      <el-table-column
        v-for="(item, index) in tableTitle"
        :key="index"
        :prop="item.prop"
        :label="item.lable"
        align="center"
        min-width="50px"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "report1",
  props: {},
  components: {},
  data() {
    return {
      //查詢參數
      date: {
        startDate: "",
        startTime: "",
        EndDate: "",
        EndTime: ""
      },

      // 表头名称
      tableTitle: [
        { lable: "Project", prop: "1" },
        { lable: "Machine", prop: "2" },
        { lable: "Sensor Lot", prop: "3" },
        { lable: "Lens Lot", prop: "4" },
        { lable: "Input", prop: "5" },
        { lable: "Fail Rate", prop: "a" }
      ],
      // 表格数据
      tableData: [
        {
          1: "MW-E",
          2: "AA1301",
          3: "K3063Y003-01",
          4: "MWC121826E123C",
          5: "899",
          a: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "K3063Y003-01",
          4: "MWC121826E123C",
          5: "899",
          a: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "K3063Y003-01",
          4: "MWC121826E123C",
          5: "899",
          a: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "K3063Y003-01",
          4: "MWC121826E123C",
          5: "899",
          a: "0.43%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "K3063Y003-01",
          4: "MWC121826E123C",
          5: "899",
          a: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "K3063Y003-01",
          4: "MWC121826E123C",
          5: "899",
          a: "0.68%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "K3063Y003-01",
          4: "MWC121826E123C",
          5: "899",
          a: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "K3063Y003-01",
          4: "MWC121826E123C",
          5: "899",
          a: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "K3063Y003-01",
          4: "MWC121826E123C",
          5: "899",
          a: "0.00%"
        }
      ]
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "SFR/FPDC by LensLot")
  },
  methods: {
    getSearchData() {
      console.log(111)
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
