<template>
  <div class="page-mian">
    <div class="select-two">
      <div class="system-select" v-for="item in selectData" :key="item.name">
        <span>{{ item.name }}:</span>
        <el-select :popper-append-to-body="false" v-model="item.value" placeholder="請選擇">
          <el-option v-for="item in options[item.name]" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button class="btn" type="primary" round @click="getSearchData">Search</el-button>
    </div>
    <el-table :data="tableData1" :cell-style="cellStyle1" :header-cell-style="headerCellStyle1">
      <el-table-column
        v-for="(item, index) in tableTitle1"
        :key="index"
        :prop="item.prop"
        :label="item.lable"
        align="center"
        min-width="50px"
      >
        <!-- <el-table-colum>

          </el-table-colum> -->
      </el-table-column>
    </el-table>
    <el-table
      :data="tableData2"
      :cell-style="cellStyle2"
      :header-cell-style="{ background: 'transparent', color: '#fff' }"
      class="table2"
      height="600px"
    >
      <el-table-column
        v-for="(item, index) in tableTitle2"
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
      // 表头名称
      tableTitle1: [
        { lable: "MW-X Genius", prop: "1" },
        { lable: "MW-X Genius", prop: "2" },
        { lable: "MW-X Genius", prop: "3" },
        { lable: "MW-X Genius", prop: "4" },
        { lable: "Spec.", prop: "5" },
        { lable: "SFR Fail Rate", prop: "6" },
        { lable: "SFR Fail Rate", prop: "7" },
        { lable: "SFR Fail Rate", prop: "8" },
        { lable: "SFR Fail Rate", prop: "9" },
        { lable: "SFR Fail Rate", prop: "10" },
        { lable: "SFR Fail Rate", prop: "11" },
        { lable: "SFR Fail Rate", prop: "12" },
        { lable: "SFR Fail Rate", prop: "13" },
        { lable: "SFR Input Qty", prop: "14" },
        { lable: "SFR Input Qty", prop: "15" },
        { lable: "SFR Input Qty", prop: "16" },
        { lable: "SFR Input Qty", prop: "17" },
        { lable: "SFR Input Qty", prop: "18" },
        { lable: "SFR Input Qty", prop: "19" },
        { lable: "SFR Input Qty", prop: "20" },
        { lable: "SFR Input Qty", prop: "21" },
        { lable: "近兩小時SFR F/R", prop: "22" },
        { lable: "近兩小時SFR F/R", prop: "23" }
      ],
      tableTitle2: [
        { lable: "Project", prop: "1" },
        { lable: "AA MC", prop: "2" },
        { lable: "AA Para", prop: "3" },
        { lable: "Total In", prop: "4" },
        { lable: "Total Rate", prop: "5" },
        { lable: "A", prop: "6" },
        { lable: "B", prop: "7" },
        { lable: "C", prop: "8" },
        { lable: "D", prop: "9" },
        { lable: "E", prop: "10" },
        { lable: "F", prop: "11" },
        { lable: "G", prop: "12" },
        { lable: "H", prop: "13" },
        { lable: "A", prop: "14" },
        { lable: "B", prop: "15" },
        { lable: "C", prop: "16" },
        { lable: "D", prop: "17" },
        { lable: "E", prop: "18" },
        { lable: "F", prop: "19" },
        { lable: "G", prop: "20" },
        { lable: "H", prop: "21" },
        { lable: "Input", prop: "22" },
        { lable: "Rate", prop: "23" }
      ],

      // 下拉框值
      selectData: [
        { name: "DeviceSeries", value: "" },
        { name: "Suppy", value: "" }
      ],
      // 两个下拉框的选项
      options: {
        DeviceSeries: [
          {
            value: "选项1",
            label: "MW-X"
          },
          {
            value: "选项2",
            label: "MW-X2"
          },
          {
            value: "选项3",
            label: "MW-X3"
          },
          {
            value: "选项4",
            label: "MW-X4"
          },
          {
            value: "选项5",
            label: "MW-X5"
          }
        ],
        Suppy: [
          {
            value: "选项1",
            label: "Genius"
          },
          {
            value: "选项2",
            label: "Genius2"
          },
          {
            value: "选项3",
            label: "Genius3"
          },
          {
            value: "选项4",
            label: "Genius4"
          },
          {
            value: "选项5",
            label: "Genius5"
          }
        ]
      },
      date: "256",
      // 表格数据
      tableData1: [
        {
          1: "",
          2: "",
          3: "",
          4: "",
          5: "0.40%",
          6: "",
          7: "",
          8: "",
          9: "",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "",
          15: "",
          16: "",
          17: "",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: ""
        },
        {
          1: "",
          2: "",
          3: "",
          4: "",
          5: "0.15%",
          6: "2",
          7: "",
          8: "",
          9: "",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "15.38%",
          15: "",
          16: "",
          17: "",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: ""
        },
        {
          1: "",
          2: "",
          3: "",
          4: "",
          5: "0.00%",
          6: "7",
          7: "8",
          8: "12",
          9: "8",
          10: "1",
          11: "8",
          12: "1",
          13: "1",
          14: "53.85%",
          15: "61.54%",
          16: "92.31%",
          17: "61.54%",
          18: "7.69%",
          19: "61.54%",
          20: "7.69%",
          21: "7.69%",
          22: "",
          23: ""
        },
        {
          1: "",
          2: "",
          3: "",
          4: "",
          5: "YieldLoss",
          6: "0.08%",
          7: "0.00%",
          8: "0.00%",
          9: "0.00%",
          10: "0.00%",
          11: "0.00%",
          12: "0.00%",
          13: "0.00%",
          14: "",
          15: "",
          16: "",
          17: "",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: ""
        },
        {
          1: "",
          2: "",
          3: "",
          4: "",
          5: "Tool Qty",
          6: "8901",
          7: "345",
          8: "1812",
          9: "139",
          10: "1",
          11: "4981",
          12: "1",
          13: "",
          14: "",
          15: "",
          16: "",
          17: "",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: ""
        },
        {
          1: "",
          2: "",
          3: "",
          4: "",
          5: "Tool Rate",
          6: "55.01%",
          7: "2.13%",
          8: "11.20%",
          9: "0.88%",
          10: "0.01%",
          11: "30.78%",
          12: "0.01%",
          13: "",
          14: "",
          15: "",
          16: "",
          17: "",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: ""
        }
      ],
      tableData2: [
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.00%",
          6: "0.00%",
          7: "0.00%",
          8: "0.00%",
          9: "0.00%",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.00%",
          6: "0.00%",
          7: "0.00%",
          8: "0.00%",
          9: "0.00%",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.00%",
          6: "0.00%",
          7: "0.00%",
          8: "0.00%",
          9: "0.00%",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.16%",
          6: "0.16%",
          7: "0.00%",
          8: "0.00%",
          9: "0.00%",
          10: "",
          11: "",
          12: "0.00%",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "1.47%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.00%",
          6: "0.00%",
          7: "",
          8: "0.00%",
          9: "",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "1.67%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.00%",
          6: "0.00%",
          7: "0.00%",
          8: "0.00%",
          9: "0.00%",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.00%",
          6: "0.00%",
          7: "0.00%",
          8: "0.00%",
          9: "0.00%",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.00%",
          6: "0.00%",
          7: "0.00%",
          8: "0.00%",
          9: "0.00%",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.00%",
          6: "0.00%",
          7: "0.00%",
          8: "0.00%",
          9: "0.00%",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.24%",
          6: "0.38%",
          7: "0.00%",
          8: "0.00%",
          9: "",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.00%",
          6: "0.00%",
          7: "0.00%",
          8: "0.00%",
          9: "",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.00%",
          6: "0.00%",
          7: "0.00%",
          8: "0.00%",
          9: "0.00%",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.00%",
          6: "0.00%",
          7: "0.00%",
          8: "0.00%",
          9: "0.00%",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.00%",
          6: "0.00%",
          7: "0.00%",
          8: "0.00%",
          9: "0.00%",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.00%",
          6: "0.00%",
          7: "0.00%",
          8: "0.00%",
          9: "0.00%",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.00%",
          6: "0.00%",
          7: "0.00%",
          8: "0.00%",
          9: "0.00%",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "0.00%"
        },
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.00%",
          6: "0.00%",
          7: "0.00%",
          8: "0.00%",
          9: "0.00%",
          10: "",
          11: "",
          12: "",
          13: "",
          14: "1689",
          15: "53",
          16: "17",
          17: "1",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "291",
          23: "0.00%"
        }
      ],
      num: 0
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "SFR不良率 by AA MC")
  },
  methods: {
    getSearchData() {
      console.log(111)
    },
    cellStyle1({ row, column, columnIndex }) {},
    cellStyle2({ row, column, columnIndex }) {
      if (row[column.property].includes("%")) {
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

    headerCellStyle1({ row, column, rowIndex, columnIndex }) {
      // if (columnIndex < 22 && row[columnIndex + 1].label == row[columnIndex].label) {
      //   this.num += 1
      //   console.log("满足条件", this.num)
      //   return {
      //     background: "transparent",
      //     color: "#fff"
      //   }
      // } else {
      //   // this.num = 0
      //   return {
      //     background: "transparent",
      //     color: "red"
      //   }
      // }

      row[3].colSpan = 4 //第3个表头占4格
      row[5].colSpan = 8
      row[13].colSpan = 8
      row[21].colSpan = 2
      if ([0, 1, 2, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 22].includes(columnIndex)) {
        //隐藏表头
        row[columnIndex].colSpan = 0
        return "display: none"
      }
      return {
        background: "transparent",
        color: "#fff"
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
.select-two {
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
