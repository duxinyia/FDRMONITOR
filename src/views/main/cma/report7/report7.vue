<template>
  <div class="page-mian">
    <!-- 选择下拉框+搜索按钮 -->
    <el-row class="select-two">
      <!-- <div > -->
      <!-- <div class="system-select" v-for="item in selectData" :key="item.name"> -->
      <el-form
        class="system-select"
        v-for="item in selectData"
        :key="item.name"
        label-position="right"
        label-width="90px"
        :model="item"
      >
        <el-col class="inputStyle" v-if="item.type == 'input'" :span="5">
          <el-form-item :label="item.name">
            <el-input placeholder="請輸入內容" v-model="item.value" clearable> </el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="item.type == 'select'" :span="5">
          <el-form-item :label="item.name">
            <el-select :popper-append-to-body="false" v-model="item.value" placeholder="請選擇">
              <el-option
                v-for="optionsItem in options[item.key]"
                :key="optionsItem.id"
                :label="optionsItem.value"
                :value="optionsItem.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" v-if="item.type == 'datetime'">
          <el-form-item :label="item.name">
            <el-date-picker
              :clearable="false"
              v-model="item.value"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="選擇日期時間"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form>
      <!-- </div> -->
      <el-col :span="1">
        <el-button class="btn" type="primary" round @click="getSearchData">查詢</el-button>
      </el-col>
      <!-- </div> -->
    </el-row>
    <div
      v-loading="isLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中"
      element-loading-background="rgba(0, 0, 0, 1)"
    >
      <ces-table
        tableHeight="860px"
        :tableData="tabData"
        :tableCols="tableTitle"
        :header-cell-style="{
          background: '#131540',
          color: '#fff',
          'font-weight': 700
        }"
      >
      </ces-table>
    </div>
  </div>
</template>

<script>
import moment from "moment"
// 导入点击搜索数据
import { GetReport7TableData, GetProductNoInfo } from "@/api/cma/report7"
export default {
  name: "report7",
  props: {},
  components: {},
  data() {
    return {
      isLoading: false,
      // 表头名称
      tableTitle: [],
      // 下拉框值
      selectData: [
        { name: "機種:", value: "", type: "select", key: "ProductNo" },
        { name: "母批:", value: "", type: "input", key: "MotherLot" },
        { name: "料號:", value: "", type: "input", key: "DeviceNo" },
        { name: "開始時間:", value: "", type: "datetime", key: "Starttime" },
        { name: "結束時間:", value: "", type: "datetime", key: "Endtime" }
      ],
      // 下拉框的选项
      options: {
        ProductNo: []
      },
      // 从后端拿到的表格数据
      tableData: [
        [
          { columnID: "0", value: "www" },
          { columnID: "1", value: "www1" },
          { columnID: "2", value: "www2" },
          { columnID: "3", value: "0.02%" },
          { columnID: "4", value: "0.10%" },
          { columnID: "5", value: "2.02%" },
          { columnID: "6", value: "www6" },
          { columnID: "7", value: "www7" },
          { columnID: "8", value: "www8" }
        ]
      ],
      // 自己组成的新的表格数据
      tabData: [],
      // objKey+objValue=tabData
      objKey: {}
      // objValue: {}
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "查询报表")
  },
  mounted() {
    this.getselectData()
  },

  watch: {},
  methods: {
    // 获取下拉框数据
    async getselectData() {
      let inputValue = this.selectData
      let res = await GetProductNoInfo()
      this.options["ProductNo"] = res
      res.forEach((item) => {
        if (item.selected) {
          inputValue[0].value = item.value
        }
      })
      this.getData()
    },

    // 点击搜索按钮
    getSearchData() {
      this.getData()
    },
    // 获取数据
    async getData() {
      this.isLoading = true
      let ruleForm = {}
      this.selectData.forEach((item) => {
        ruleForm[item.key] = item.value
      })
      let res = await GetReport7TableData(ruleForm)
      console.log("res===", res)
      this.tableTitle = res.columns
      this.tabData = []
      // this.tableData = res.rows
      this.tableData.forEach((item) => {
        this.objKey = {}
        item.forEach((key) => {
          this.objKey[key.columnID] = key.value
        })
        this.tabData.push(this.objKey)
      })
      this.isLoading = false
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

// 输入框的样式
.select-two {
  padding: 15px 0 0 0;
  background: #131540;
  border: 1px solid #1683af;
  border-radius: 4px;
  .btn {
    margin-left: 20px;
  }
}
::v-deep .el-col-5 {
  width: 17.83333%;
}
::v-deep .el-form-item__label {
  font-size: 16px;
  color: #fff;
}

.system-select {
}
::v-deep .el-select-dropdown {
  width: 238px;
}
.inputStyle {
  display: flex;
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
