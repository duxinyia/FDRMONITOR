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
      // 表头名称
      tableTitle: [
        { lable: "Project", prop: "1" },
        { lable: "AA MC", prop: "2" },
        { lable: "AA Para", prop: "3" },
        { lable: "Total In", prop: "4" },
        { lable: "Total Rate", prop: "5" },
        { lable: "A", prop: "a" },
        { lable: "B", prop: "a" },
        { lable: "C", prop: "a" },
        { lable: "D", prop: "a" },
        { lable: "E", prop: "a" },
        { lable: "F", prop: "a" },
        { lable: "G", prop: "a" },
        { lable: "H", prop: "a" },
        { lable: "A", prop: "a" },
        { lable: "B", prop: "a" },
        { lable: "C", prop: "a" },
        { lable: "D", prop: "a" },
        { lable: "E", prop: "a" },
        { lable: "F", prop: "a" },
        { lable: "G", prop: "a" },
        { lable: "H", prop: "a" },
        { lable: "Input", prop: "a" },
        { lable: "Rate", prop: "a" }
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
      tableData: [
        {
          1: "MW-E",
          2: "AA1301",
          3: "Para A",
          4: "1760",
          5: "0.02%",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "0.12%",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "1.12%",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "6",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "6",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "6",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "6",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "6",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "6",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "6",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "6",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "6",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "6",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "6",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "6",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "6",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "6",
          a: "6"
        },
        {
          1: "1",
          2: "2",
          3: "3",
          4: "5",
          5: "6",
          a: "6"
        }
      ]
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "SFR不良率 by AA MC")
  },
  methods: {
    getSearchData() {
      console.log(111)
    },
    cellStyle({ row, column, columnIndex }) {
      if (row[column.property].includes("%")) {
        if (parseFloat(row[column.property]) < 0.1) {
          return {
            background: "green"
          }
        } else if (parseFloat(row[column.property]) >= 0.1 && parseFloat(row[column.property]) <= 0.3) {
          return {
            background: "yellow",
            color: "#000"
          }
        } else
          return {
            background: "red"
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
