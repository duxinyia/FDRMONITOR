<template>
  <div class="page-mian">
    <dv-border-box-12>
      <!-- 搜索区域 -->
      <el-form inline :model="formData">
        <el-form-item label="DefectType">
          <el-input v-model="formData.DefectType" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="DeviceSeriers">
          <el-input v-model="formData.DeviceSeriers" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="datetime">
          <!-- <el-input v-model="formData.datetime" placeholder="时间"></el-input> -->
          <el-date-picker
            :clearable="false"
            v-model="item.value"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="選擇日期時間"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
    </dv-border-box-12>
    <ces-table :tableData="tableData" :tableCols="tableCols"> </ces-table>
    <!-- 选择下拉框+搜索按钮 -->
    <!-- <div class="select-two">
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
      <el-button class="btn" type="primary" round @click="getSearchData">查詢</el-button>
    </div>
    <el-table
      :data="tabData"
      :header-cell-style="{ background: '#131540', color: '#fff', 'font-weight': 700 }"
      :cell-style="cellStyle"
      height="calc(100% - 74.9px)"
      v-loading="isLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中..."
      element-loading-background="rgba(0, 0, 0, 1)"
    >
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
    </el-table> -->
  </div>
</template>

<script>
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
      formData: { DefectType: "", DeviceSeriers: "", datetime: "" },
      // 两个下拉框的选项
      options: {
        DefectType: [],
        DeviceSeriers: []
      },
      tableCols: [],
      // 从后端拿到的表格数据
      tableData: [],
      // 自己组成的新的表格数据
      tabData: [],
      objKey: {}
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", this.title)
    this.getselectData()
  },
  methods: {
    // 获取下拉框数据
    async getselectData() {
      let inputValue = this.selectData
      let res = await GetDefectTypeInfo()
      console.log("res", res)
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
      inputValue[2].value = this.$moment().format("YYYY-MM-DD HH:mm:ss")
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
      console.log("res列数据", res)
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
::v-deep .border-box-content {
  padding: 20px;
}
.page-mian {
  height: calc(100% - 120px);
  margin-top: 10px;
  /* border: 1px solid red; */
}

/* 修改表格的一些样式 */
/* ::v-deep .el-table {
  background: transparent;
  border: 1px solid #1683af;
  margin-top: 20px;
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
  padding: 10px 0px;
  background: #131540;
  border: 1px solid #1683af;
  border-radius: 4px;
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
} */
</style>
