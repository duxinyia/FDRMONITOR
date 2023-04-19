<template>
  <div class="page-mian">
    <div class="select-two">
      <div class="system-select" v-for="item in selectData" :key="item.name">
        <span>{{ item.name }}:</span>
        <el-select clearable :popper-append-to-body="false" v-model="item.value" placeholder="請選擇">
          <el-option v-for="item in options[item.name]" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button class="btn" type="primary" round @click="getSearchData">Search</el-button>
    </div>
    <el-table
      :row-style="{ height: '30px' }"
      :data="tabData"
      :header-cell-style="{ background: '#3a5588' }"
      :cell-style="cellStyle"
      height="calc(100% - 74.9px)"
    >
      <el-table-column
        v-for="(taT, index) in tableTitle"
        :key="index"
        :width="taT.name === 'Lens Vendor' ? '90' : ''"
        :prop="taT.id"
        align="center"
        :label="taT.name"
      >
        <el-table-column
          v-show="taT.chileColumn"
          v-for="(c, index) in taT.chileColumn"
          :key="index"
          :prop="c.id"
          align="center"
          :label="c.name"
        >
          <el-table-column
            v-show="c.chileColumn"
            v-for="(s, index) in c.chileColumn"
            :key="index"
            :prop="s.id"
            align="center"
            :label="s.name"
          ></el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 导入点击搜索数据
import { GetReport1Search } from "@/api/cma/report1"
export default {
  name: "report1",
  props: {},
  components: {},
  data() {
    return {
      // 表头名称
      tableTitle: [],
      // 下拉框值
      selectData: [
        { name: "DeviceSeries", value: "" },
        { name: "Suppy", value: "" }
      ],
      // 两个下拉框的选项
      options: {
        DeviceSeries: [
          {
            value: "MW-X",
            label: "MW-X"
          },
          {
            value: "MW-F",
            label: "MW-F"
          },
          {
            value: "MW-E",
            label: "MW-E"
          },
          {
            value: "MW-X4",
            label: "MW-X4"
          },
          {
            value: "MW-X5",
            label: "MW-X5"
          },
          {
            value: "MW-X6",
            label: "MW-X6"
          },
          {
            value: "MW-X7",
            label: "MW-X7"
          },
          {
            value: "MW-X8",
            label: "MW-X8"
          },
          {
            value: "MW-X9",
            label: "MW-X9"
          }
        ],
        Suppy: [
          {
            value: "Genius",
            label: "Genius"
          },
          {
            value: "Genius2",
            label: "Genius2"
          },
          {
            value: "Genius3",
            label: "Genius3"
          },
          {
            value: "Genius4",
            label: "Genius4"
          },
          {
            value: "Genius5",
            label: "Genius5"
          }
        ]
      },
      // 从后端拿到的表格数据
      tableData: [
        // [
        //   { columnID: "0", value: "www" },
        //   { columnID: "1", value: "www1" },
        //   { columnID: "2", value: "www2" },
        //   { columnID: "3-0", value: "0.02%" },
        //   { columnID: "3-1", value: "0.10%" },
        //   { columnID: "3-2-0", value: "2.02%" },
        //   { columnID: "3-2-1", value: "www6" },
        //   { columnID: "3-2-2", value: "www7" },
        //   { columnID: "3-2-3", value: "www8" },
        //   { columnID: "3-3-0", value: "wwww9" },
        //   { columnID: "3-3-1", value: "www10" }
        // ]
      ],
      // 自己组成的新的表格数据
      tabData: [],
      // objKey+objValue=tabData
      objKey: {}
      // objValue: {}
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "SFR不良率 by AA MC")
    this.getData()
  },
  methods: {
    getSearchData() {
      let inputValue = this.selectData
      this.getData(inputValue[0].value, inputValue[1].value)
    },
    async getData(devSer = "", spy = "") {
      this.tabData = []
      let res = await GetReport1Search(devSer, spy)
      this.tableTitle = res.columns
      console.log("res===", res)
      this.tableData = res.rows
      this.tableData.forEach((item) => {
        this.objKey = {}
        item.forEach((key) => {
          this.objKey[key.columnID] = key.value
        })
        this.tabData.push(this.objKey)
      })
    },

    cellStyle({ row, column, rowIndex, columnIndex }) {
      let property = column.property
      if (row[property] && row[property].includes("%")) {
        if (parseFloat(row[property]) < 0.1) {
          return { background: "#9acd32" }
        } else if (parseFloat(row[property]) >= 0.1 && parseFloat(row[property]) <= 0.3) {
          return { background: "#ffff00", color: "#000" }
        } else {
          return { background: "#ff0000" }
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
  // height: calc(100% - 74.9px);
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
::v-deep .el-scrollbar {
  width: 240px;
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
