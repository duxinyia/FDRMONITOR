<template>
  <div class="page-mian">
    <!-- 选择下拉框+搜索按钮 -->
    <el-row class="select-two">
      <!-- <div > -->
      <!-- <div class="system-select" v-for="item in selectData" :key="item.name"> -->
      <el-form
        ref="ruleForm"
        class="system-select"
        v-for="item in selectData"
        :key="item.name"
        label-position="right"
        label-width="91px"
        :model="item"
      >
        <el-col class="inputStyle" v-if="item.type == 'input'" :span="5">
          <el-form-item :label="item.name" :prop="item.key">
            <el-input placeholder="請輸入內容" v-model="item.value" clearable> </el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="item.type == 'select'" :span="5">
          <el-form-item :label="item.name" :prop="item.key">
            <el-select
              style="width: 150px; height: 34px"
              :popper-append-to-body="false"
              v-model="item.value"
              placeholder="請選擇"
            >
              <el-option
                v-for="optionsItem in options[item.key]"
                :key="optionsItem.id"
                :label="optionsItem.value"
                :value="optionsItem.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" v-if="item.type == 'datetime'">
          <el-form-item :label="item.name" :prop="item.key">
            <el-date-picker
              v-model="item.value"
              :picker-options="pickerOptions"
              type="datetimerange"
              start-placeholder="開始時間"
              end-placeholder="結束時間"
              :default-time="['06:00:00', '06:00:00']"
            />
            <!-- <el-date-picker
              :clearable="false"
              v-model="item.value"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="選擇日期時間"
              default-time="06:00:00"
              :picker-options="item.option"
            >
            </el-date-picker> -->
          </el-form-item>
        </el-col>
      </el-form>
      <!-- </div> -->
      <!-- :type="!disabled ? 'primary' : 'info'"  :disabled="disabled"-->

      <el-col :span="1" style="display: flex">
        <el-button icon="el-icon-search" class="btn" type="primary" round @click="getSearchData"
          >查詢</el-button
        >
        <el-button
          class="btn btnExp"
          icon="el-icon-upload2"
          round
          type="primary"
          @click="exportXlsx"
          >導出</el-button
        >
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
        id="exportTable"
        tableHeight="830px"
        :tableData="tabData"
        :tableCols="tableTitle"
        :header-cell-style="{
          'font-size': '14px',
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
  computed: {
    // 控制查询按钮是否能点击
    // disabled() {
    //   return [0, 1, 3].every((index) => this.selectData[index].value) ||
    //     [0, 2, 3].every((index) => this.selectData[index].value)
    //     ? false
    //     : true
    // }
  },
  watch: {},
  data() {
    return {
      choiceDate: null,
      //将日期时间选择器控制在只能选择7天以内
      pickerOptions: {
        //onPick：是选中日期时的回调函数，可以在这里对选中的日期进行处理{maxDate：后选中日期；minDate：第一个选中的日期}
        onPick: ({ maxDate, minDate }) => {
          // 把选择的第一个日期赋值给一个变量。
          this.choiceDate = minDate.getTime()
          // 如果你选择了两个日期了，就把那个变量置空
          if (maxDate) this.choiceDate = ""
        },
        disabledDate: (time) => {
          // 如果选择了一个日期
          if (this.choiceDate) {
            // 7天的时间戳
            const one = 7 * 24 * 3600 * 1000
            // 当前日期 - one = 7天之前
            const minTime = this.choiceDate - one
            // 当前日期 + one = 7天之后
            const maxTime = this.choiceDate + one
            return (
              time.getTime() < minTime ||
              time.getTime() > maxTime ||
              // 限制不能选择今天及以后
              time.getTime() > Date.now()
            )
          } else {
            // 如果没有选择日期，就要限制不能选择今天及以后
            return time.getTime() > Date.now()
          }
        }
      },

      isLoading: false,
      // 表头名称
      tableTitle: [],
      // 下拉框值
      selectData: [
        { name: "機種:", value: "", type: "select", key: "DeviceNo" },
        { name: "母批:", value: "", type: "input", key: "MotherLot" },
        { name: "料號:", value: "", type: "input", key: "ProductNo" },
        { name: "時間範圍:", value: "", type: "datetime", key: "times" }
        // {
        //   name: "開始時間:",
        //   value: "",
        //   type: "datetime",
        //   key: "Starttime",
        //   option: "pickerOptions"
        // },
        // {
        //   name: "結束時間:",
        //   value: "",
        //   type: "datetime",
        //   key: "Endtime",
        //   option: "pickerOptionsend"
        // }
      ],
      // 下拉框的选项
      options: {
        // 机种
        DeviceNo: []
      },
      // 从后端拿到的表格数据
      tableData: [],
      // 自己组成的新的表格数据
      tabData: []
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "查詢報表")
  },
  mounted() {
    this.getselectData()
  },

  methods: {
    // 获取下拉框数据
    async getselectData() {
      this.tabData = []
      let inputValue = this.selectData
      let res = await GetProductNoInfo()
      this.options["DeviceNo"] = res
      res.forEach((item) => {
        if (item.selected) {
          inputValue[0].value = item.id
        }
      })
    },

    // 点击搜索按钮
    getSearchData() {
      this.getData()
    },

    // 获取数据
    async getData() {
      this.isLoading = true
      let ruleForm = { Starttime: "", Endtime: "" }
      this.selectData.forEach((item) => {
        if (item.key === "times") {
          let value = new Map([
            ["Starttime", item.value[0]],
            ["Endtime", item.value[1]]
          ])
          item.value &&
            value.forEach((valueItem, key) => {
              this.$set(ruleForm, key, moment(valueItem).format("YYYY-MM-DD HH:mm:ss"))
            })
        } else {
          ruleForm[item.key] = item.value
        }
      })

      let res = await GetReport7TableData(ruleForm)
      // console.log("res===", res)
      this.tableTitle = res.columns
      this.tabData = []
      this.tableData = res.rows
      this.tableData.forEach((item) => {
        let objKey = {}
        item.forEach((key) => {
          objKey[key.columnID] = key.value
        })
        this.tabData.push(objKey)
      })
      this.isLoading = false
    },
    // 导出表格为xlsx
    exportXlsx() {
      let workbook = this.$xlsx.utils.table_to_book(document.getElementById("exportTable")) //需要在table上定义一个id
      try {
        this.$xlsx.writeFile(workbook, "工單查詢報表.xlsx")
      } catch (e) {
        console.log("error", e)
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
// 时间选择器样式
::v-deep .el-range-editor.el-input__inner {
  border: 0px solid #fff;
  border-radius: 4px;
  background: linear-gradient(134.15deg, rgba(21, 71, 150, 1) 0%, rgba(75, 177, 250, 1) 100%);
  font-size: 12px;
}
::v-deep .el-date-editor .el-range-input {
  font-size: 14px;
  color: #fff !important;
}
::v-deep .el-range-editor .el-range-input {
  background: transparent;
}
/* 修改表格的一些样式 */
::v-deep .el-table {
  background: transparent;
  border: 1px solid #1683af;
  margin-top: 20px;
  // height: calc(100% - 74.9px);
  // overflow: auto;
}
// 表头
::v-deep .el-table__header {
  border: 2px solid rgba(160, 190, 250, 1) !important;
}
::v-deep .el-table__body {
  border-left: 2px solid #1683af;
  border-right: 2px solid #1683af;
}
::v-deep .el-table th.el-table__cell,
::v-deep.el-table thead.is-group th.el-table__cell {
  border-bottom: 0px solid #fff !important;
  background: unset;
}
::v-deep .el-table thead {
  background: linear-gradient(90deg, rgba(36, 57, 73, 1) 0%, rgba(80, 126, 163, 1) 100%) !important;
}

// 输入框的样式
.select-two {
  padding: 15px 0 0 0;
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
    margin-left: 195px;
    padding-left: 18px;
    padding-top: 9px;
    margin-top: 3px;
  }
  .btnExp {
    margin-left: 12px;
  }
}
::v-deep .el-select .el-input .el-select__caret {
  color: #fff;
}
.system-select {
  align-items: center;
  margin-top: 8px;
  span {
    font-size: 14px;
    padding: 0 10px 0 25px;
  }
}

::v-deep .el-col-5 {
  width: 17.83333%;
}
::v-deep .el-form-item__label {
  font-size: 16px;
  color: #fff;
}

::v-deep .el-select-dropdown {
  width: 148px;
}
.inputStyle {
  display: flex;
}

::v-deep .el-input--suffix .el-input__inner {
  z-index: 100;
  border: 0px solid #fff;
  border-radius: 4px;
  background: linear-gradient(134.15deg, rgba(21, 71, 150, 1) 0%, rgba(75, 177, 250, 1) 100%);
  font-size: 12px;
  color: #fff;
}
</style>
