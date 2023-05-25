<template>
  <div class="page-mian">
    <!-- 选择下拉框+搜索按钮 -->
    <div class="select-two">
      <div class="system-select" v-for="item in selectData" :key="item.name">
        <span>{{ item.name }}:</span>
        <el-select
          v-if="item.type == 'select'"
          :popper-append-to-body="false"
          v-model="item.value"
          placeholder="請選擇"
        >
          <el-option
            v-for="optionsItem in options[item.name]"
            :key="optionsItem.id"
            :label="optionsItem.id"
            :value="optionsItem.value"
          >
          </el-option>
        </el-select>

        <el-date-picker
          v-if="item.type == 'datetime'"
          :clearable="false"
          v-model="item.value"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="選擇日期時間"
        >
        </el-date-picker>
      </div>
      <el-button class="btn" icon="el-icon-search" type="primary" round @click="getSearchData"
        >查詢</el-button
      >
    </div>
    <el-table
      :data="tabData"
      :header-cell-style="{
        'font-size': '16px',
        color: '#fff',
        'font-weight': 700
      }"
      :cell-style="cellStyle"
      height="calc(100% - 102px)"
      v-loading="isLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中..."
      element-loading-background="rgba(0, 0, 0, 1)"
    >
      <!--height="calc(100% - 20.9px) " 如果没有下拉框换成这个-->
      <el-table-column
        v-for="(taT, index) in tableTitle"
        :key="index"
        :width="taT.name == 'Lens Vendor' ? '110' : ''"
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
import moment from "moment"
// 导入点击搜索数据
import { GetReport1Search, GetDefectTypeInfo, GetDeviceSeriersInfo } from "@/api/cma/report1"
export default {
  name: "report1",
  props: {},
  components: {},
  data() {
    return {
      isLoading: false,
      // 标题
      title: "SFR BY AAMC",
      // 表头名称
      tableTitle: [],
      // 下拉框值
      selectData: [
        { name: "DefectType", value: "", type: "select" },
        { name: "DeviceSeriers", value: "", type: "select" },
        { name: "datetime", value: "", type: "datetime" }
      ],
      // 两个下拉框的选项
      options: {
        DefectType: [],
        DeviceSeriers: []
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
    this.$store.commit("fullLoading/SET_TITLE", this.title)
    // console.log(this.tabData)
  },
  mounted() {
    this.getselectData()
  },

  watch: {
    // tableTitle: {
    //   immediate: true,
    //   handler(newData) {
    //     this.isLoading = !newData[0] ? true : false
    //   }
    // }
  },
  methods: {
    // 获取下拉框数据
    async getselectData() {
      let inputValue = this.selectData
      let res = await GetDefectTypeInfo()
      // console.log(res)
      this.options["DefectType"] = res
      res.forEach((item) => {
        if (item.selected) {
          inputValue[0].value = item.value
        }
      })
      let res1 = await GetDeviceSeriersInfo()
      this.options["DeviceSeriers"] = res1
      res1.forEach((item) => {
        if (item.selected) {
          inputValue[1].value = item.value
        }
      })
      inputValue[2].value = moment().format("YYYY-MM-DD HH:mm:ss")
      this.getData(inputValue)
    },

    // 点击搜索按钮
    getSearchData() {
      let inputValue = this.selectData
      this.title = inputValue[0].value == "FPDC" ? "FPDC BY AAMC" : "SFR BY AAMC"
      this.$store.commit("fullLoading/SET_TITLE", this.title)
      this.getData(inputValue)
    },
    // 获取数据
    async getData(inputD) {
      this.isLoading = true
      let type = inputD[0].value
      let seriers = inputD[1].value
      let t = inputD[2].value
      this.tabData = []
      let res = await GetReport1Search(type, seriers, t)
      this.tableTitle = res.columns
      // console.log("res===", res)
      this.tableData = res.rows
      this.tableData.forEach((item) => {
        this.objKey = {}
        item.forEach((key) => {
          this.objKey[key.columnID] = key.value
        })
        this.tabData.push(this.objKey)
      })
      this.isLoading = false
    },
    // 单元格样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let property = column.property
      if (row[property] && String(row[property]).includes("%")) {
        if (parseFloat(row[property]) < 0.1) {
          return { background: "#9acd32", color: "#000" }
        } else if (parseFloat(row[property]) >= 0.1 && parseFloat(row[property]) <= 0.3) {
          return { background: "#ffff00", color: "#000" }
        } else {
          return { background: "#ff80ff", color: "#000" }
        }
      } else {
        return { background: "transparent" }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-mian {
  box-sizing: border-box;
  height: calc(100% - 120px);
  margin-top: 10px;
}

/* 修改表格的一些样式 */
::v-deep .el-table {
  background: transparent;
  border-left: 0px solid #fff;
  border-bottom: 2px solid #1683af;
  margin-top: 20px;
  // height: calc(100% - 74.9px);
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
  border-top: 1px solid #fff !important;
}
::v-deep .el-table td {
  // border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
}
::v-deep .el-table tr:first-child th {
  border-top: 0px solid #fff !important;
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
  padding: 10px 0px;
  height: 80px;
  // opacity: 0.8;
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
::v-deep .el-select .el-input .el-select__caret {
  color: rgba(128, 128, 128, 1);
}
.system-select {
  align-items: center;
  margin-top: 8px;
  span {
    font-size: 16px;
    padding: 0 10px 0 25px;
  }
}
::v-deep .el-scrollbar {
  width: 238px;
}
::v-deep .el-input--suffix .el-input__inner {
  z-index: 100;
  border: 0px solid #fff;
  border-radius: 4px;
  background: rgba(255, 255, 255, 1);
  font-size: 16px;
  color: rgba(128, 128, 128, 1);
}

// 下拉框的另外样式
// ::v-deep .el-select-dropdown {
//   background-color: #000c1a;
//   .el-select-dropdown__item {
//     color: #fff;
//     // color: #243d97 !important;
//   }
//   .el-select-dropdown__item.hover,
//   .el-select-dropdown__item:hover {
//     background-color: #243d97;
//   }
//   .el-select-dropdown__item.selected {
//     background-color: #243d97 !important;
//   }
//   .popper__arrow:after {
//     border-bottom-color: #000c1a !important;
//   }
// }
</style>
