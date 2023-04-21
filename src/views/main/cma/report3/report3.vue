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
      <div class="dateSelect">
        <span>date:</span>
        <el-date-picker v-model="DateCode" value-format="yyyy-MM-dd" type="date" placeholder="選擇日期時間">
        </el-date-picker>
      </div>

      <el-button class="btn" type="primary" round @click="getSearchData">Search</el-button>
    </div>
    <el-table :data="tableData1" :cell-style="cellStyle1" :header-cell-style="headerCellStyle1" height="250px">
      <el-table-column
        v-for="(item, index) in tableTitle1"
        :key="index"
        :prop="item.id"
        :label="item.capital"
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
        :prop="item.id"
        :label="item.capital"
        align="center"
        min-width="50px"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { GetTbale1Info, GetTbale2Info } from "@/api/cma/report3"
import { handlerTableDate } from "@/utils/handlerTableData"
export default {
  name: "report1",
  props: {},
  components: {},
  data() {
    return {
      // 表头名称
      tableTitle1: [],
      tableTitle2: [],

      // 下拉框值
      selectData: [
        { name: "DefectType", value: "" },
        { name: "DeviceSeries", value: "" },
        { name: "Suppy", value: "" }
      ],
      DateCode: "",
      // 两个下拉框的选项
      options: {
        DefectType: [
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
      tableData1: [],
      tableData2: [],
      num: 0,
      testData: []
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "SFR不良率 by AA MC")
  },
  methods: {
    async getSearchData() {
      // this.tableTitle1 = [
      //   { capital: "MW", id: "a" },
      //   { capital: "MW", id: "a" },
      //   { capital: "MW", id: "a" },
      //   { capital: "MW", id: "a" },
      //   { capital: "ABC", id: "a" },
      //   { capital: "EE", id: "a" },
      //   { capital: "EE", id: "a" },
      //   { capital: "EE", id: "a" }
      // ]
      let res1 = await GetTbale1Info({
        DefectType: "SFR",
        DeviceSeriers: "MW",
        Supply: "",
        datetime: "2023-04-17"
      })
      this.tableTitle1 = res1.columns
      this.tableData1 = []
      this.tableData1 = handlerTableDate(res1.rows)
      // console.log(this.tableData1)
      let res2 = await GetTbale2Info({
        DefectType: "SFR",
        DeviceSeriers: "MW",
        Supply: "",
        datetime: "2023-04-17"
      })
      this.tableTitle2 = res2.columns
      this.tableData2 = handlerTableDate(res2.rows)
      // this.caculateColSpan()
    },
    cellStyle1({ row, column, columnIndex }) {},
    cellStyle2({ row, column, columnIndex }) {
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
      // console.log("tableTitle1的值", this.testData.length, this.tableTitle1)
      // let num = 1
      // for (let i = 0; i < this.testData.length - 1; i++) {
      //   if (this.tableTitle1[i].capital === this.tableTitle1[i + 1].capital) {
      //     num += 1
      //     console.log("一样的", i, num)
      //     // this.testData[i].colSpan++
      //   } else {
      //     // this.testData[i].colSpan = num
      //     this.$set(this.testData, i, { ...this.testData[i], colSpan: num })
      //     console.log("不一样", num, i, this.testData[i].colSpan)
      //     num = 1
      //   }
      //   if (i === this.testData.length - 2) {
      //     console.log("最后一个了", num)
      //     this.$set(this.testData, i, { ...this.testData[i], colSpan: num })
      //   }
      //   //  else {
      //   //   // 跳过已经重复的数据
      //   //   i += this.testData[i].colSpan - 1
      //   //   break
      //   // }
      //   // 循环到最后，停止循环
      //   // if (j === this.testData.length - 1) {
      //   //   i = j
      //   // }
      // }
      // console.log("处理后的值", this.testData)

      for (let i = 0; i < this.tableTitle1.length - 1; i++) {
        for (let j = i + 1; j < this.tableTitle1.length; j++) {
          if (this.tableTitle1[i].capital === this.tableTitle1[j].capital) {
            this.tableTitle1[i].colSpan++
            this.tableTitle1[j].colSpan = 0
          } else {
            // 跳过已经重复的数据
            i += this.tableTitle1[i].colSpan - 1
            break
          }
          // 循环到最后，停止循环
          if (j === this.tableTitle1.length - 1) {
            i = j
          }
        }
      }
    },
    /**
     * 表头合并控制
     */
    // headerCellStyle1({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex === 0) {
    //     if (columnIndex > 0) {
    //       // console.log("column.id", this.tableTitle1[columnIndex])
    //       this.$nextTick(() => {
    //         if (document.getElementsByClassName(column.id).length !== 0) {
    //           console.log("this.tableTitle1", this.tableTitle1)
    //           document
    //             .getElementsByClassName(column.id)[0]
    //             .setAttribute("colSpan", this.tableTitle1[columnIndex].colSpan)
    //         }
    //       })
    //       // 被合并的列隐藏
    //       if (this.tableTitle1[columnIndex].colSpan === 0) {
    //         return { display: "none" }
    //       } else {
    //         return { background: "transparent", color: "#fff" }
    //       }
    //     }
    //   } else if (rowIndex === 1) {
    //     return { background: "transparent", color: "red" }
    //   }
    // }

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
      // row[0].colSpan = 4 //第3个表头占4格
      // row[5].colSpan = 8
      // row[13].colSpan = 8
      // row[21].colSpan = 2
      // if ([1, 2, 3].includes(columnIndex)) {
      //   //隐藏表头
      //   row[columnIndex].colSpan = 0
      //   return "display: none"
      // }
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
.dateSelect {
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
