<template>
  <div class="page-mian">
    <div class="showContorl">
      <el-button
        class="showButton"
        :icon="isShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
        circle
        @click="Show"
      ></el-button>
    </div>
    <el-collapse-transition>
      <div v-show="isShow">
        <el-form :model="ruleForm" :rules="rules" class="elForm" ref="ruleForm" label-width="150px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="Device:" prop="DeviceNo">
                <el-select
                  :popper-append-to-body="false"
                  v-model="ruleForm.DeviceNo"
                  placeholder="請選擇"
                  @change="handlerDeviceChange"
                >
                  <el-option v-for="item in deviceOptions" :key="item.value" :label="item.value" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Lottype:" prop="LotType">
                <el-select :popper-append-to-body="false" v-model="ruleForm.LotType" placeholder="請選擇">
                  <el-option v-for="item in lottypeOptions" :key="item.value" :label="item.value" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Tester:" prop="Tester">
                <el-select
                  :popper-append-to-body="false"
                  v-model="ruleForm.Tester"
                  multiple
                  collapse-tags
                  placeholder="請選擇"
                  @change="handlerTesterChange"
                >
                  <el-option v-for="item in testerOptions" :key="item.value" :label="item.value" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Test station:" prop="TestStation">
                <el-select
                  :popper-append-to-body="false"
                  v-model="ruleForm.TestStation"
                  multiple
                  collapse-tags
                  placeholder="請選擇"
                >
                  <el-option v-for="item in testStationOptions" :key="item.value" :label="item.value" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="TestTime:" prop="DateCode">
                <el-date-picker
                  style="width: 238px; height: 34px"
                  v-model="ruleForm.DateCode"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="選擇日期時間"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Material:" prop="Material">
                <el-select
                  :popper-append-to-body="false"
                  v-model="ruleForm.Material"
                  placeholder="請選擇"
                  @change="handlerMaterialChange"
                >
                  <el-option v-for="item in materialOptions" :key="item.value" :label="item.value" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Material Vendor:" prop="MaterialVendor">
                <el-select :popper-append-to-body="false" v-model="ruleForm.MaterialVendor" placeholder="請選擇">
                  <el-option v-for="item in vendorOptions" :key="item.value" :label="item.value" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Process:" prop="Process">
                <el-select
                  :popper-append-to-body="false"
                  v-model="ruleForm.Process"
                  multiple
                  collapse-tags
                  placeholder="請選擇"
                >
                  <el-option v-for="item in processOptions" :key="item.value" :label="item.value" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item style="float: right; margin-right: 80px">
              <el-button class="btn" icon="el-icon-search" type="primary" size="mini" @click="submitForm('ruleForm')"
                >查詢</el-button
              >
              <el-button class="btn" icon="el-icon-refresh-right" size="mini" @click="resetForm('ruleForm')"
                >重置</el-button
              >
              <el-button class="btn" icon="el-icon-upload2" type="primary" size="mini" @click="exportXlsx"
                >导出</el-button
              >
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </el-collapse-transition>
    <!-- 是否需要动态显示什么列 tableCols:列数据 -->
    <ces-tooltip :tableCols="tableHeader" />
    <el-table
      :data="tableData"
      border
      id="exportTable"
      ref="table"
      style="width: 100%; margin-top: 20px"
      :height="isShow ? '690px' : '900px'"
      :header-cell-style="headerCellStyle"
      class="table"
      v-loading="isLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中..."
      element-loading-background="rgba(0, 0, 0, 1)"
    >
      <el-table-column
        v-for="(item, index) in tableHeader"
        :key="index"
        :label="item.capital"
        :prop="item.id"
        align="center"
        min-width="150px"
        show-overflow-tooltip
      >
        <el-table-column
          v-for="(child, index) in item.chileColumn"
          :key="index"
          :prop="child.id"
          :label="child.capital"
          align="center"
          min-width="150px"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- <div class="detail" v-if="String(scope.row[child.id]).includes('%')">
              <el-popover :append-to-body="false" placement="bottom" width="500" trigger="click">
                <el-table
                  :data="gridData"
                  border
                  height="200px"
                  :header-cell-style="{ background: 'transparent', color: '#fff' }"
                >
                  <el-table-column width="200" property="sn" align="center" label="SN"></el-table-column>
                  <el-table-column width="300" property="name" align="center" label="不良名称"></el-table-column>
                </el-table>
                <span slot="reference">{{ scope.row[child.id] }}</span>
              </el-popover>
            </div>
            <div v-else> -->
            {{ scope.row[child.id] }}
            <!-- </div> -->
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  GetDeviceInfo,
  GetLotTypeInfo,
  GetTesterInfo,
  GetTestStationInfo,
  GetMaterialInfo,
  GetMaterialVendorInfo,
  GetProcessInfo,
  getTableDate
} from "@/api/cma/report2"
import cesTooltip from "@/components/ces-tooltip/ces-tooltip.vue"
import { handlerTableDate } from "@/utils/handlerTableData"
export default {
  name: "report2",
  components: { cesTooltip },
  data() {
    return {
      isLoading: false,
      isShow: true,
      tableData: [],
      tableHeader: [],
      rules: {
        // device: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
      },
      deviceOptions: [],
      lottypeOptions: [],
      testerOptions: [],
      testStationOptions: [],
      vendorOptions: [],
      processOptions: [],
      materialOptions: [],
      ruleForm: {
        DeviceNo: "",
        LotType: "",
        Tester: [],
        TestStation: [],
        DateCode: this.$moment().format("YYYY-MM-DD"),
        MaterialVendor: "",
        Process: [],
        Material: ""
      },
      gridData: [
        {
          sn: "DNM3062000K81QDC1X",
          name: "GetDPFileFromMIS（10003-0009）"
        },
        {
          sn: "DNM3062000K81QDC1X",
          name: "GetDPFileFromMIS（10003-0009）"
        },
        {
          sn: "DNM3062000K81QDC1X",
          name: "GetDPFileFromMIS（10003-0009）"
        },
        {
          sn: "DNM3062000K81QDC1X",
          name: "GetDPFileFromMIS（10003-0009）"
        },
        {
          sn: "DNM3062000K81QDC1X",
          name: "GetDPFileFromMIS（10003-0009）"
        },
        {
          sn: "DNM3062000K81QDC1X",
          name: "GetDPFileFromMIS（10003-0009）"
        }
      ]
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "Yield Loss Track(VCM)")
    // this.GetDeviceInfo()
    // this.GetLotTypeInfo()
  },
  mounted() {
    this.initData()
  },
  methods: {
    //获取Device下拉框数据
    async GetDeviceInfo() {
      let res = await GetDeviceInfo()
      this.deviceOptions = res
      res.forEach((item) => {
        if (item.selected) {
          this.ruleForm.DeviceNo = item.id
        }
      })
      await this.DefaultSelected(this.ruleForm.DeviceNo)
    },

    //页面加载需要加载所有的选项默认值
    async DefaultSelected(val) {
      // 与device有绑定关系的下拉框选中的值都要清空
      this.ruleForm.Tester = []
      this.ruleForm.TestStation = []
      this.ruleForm.Material = ""
      this.ruleForm.MaterialVendor = ""
      this.ruleForm.Process = []

      //获取Tester下拉框数据
      let res1 = await GetTesterInfo({ DeviceNo: val })
      this.testerOptions = res1
      res1.forEach((item) => {
        if (item.selected) {
          this.ruleForm.Tester.push(item.id)
        }
      })

      // 获取Test station下拉框数据
      if (this.ruleForm.Tester) {
        let res2 = await GetTestStationInfo({ DeviceNo: val, Tester: this.ruleForm.Tester })
        this.testStationOptions = res2
        res2.forEach((item) => {
          if (item.selected) {
            this.ruleForm.TestStation.push(item.id)
          }
        })
      }

      //获取Material下拉框数据
      let res3 = await GetMaterialInfo({ DeviceNo: val })
      this.materialOptions = res3
      res3.forEach((item) => {
        if (item.selected) {
          this.ruleForm.Material = item.id
        }
      })

      //获取Material Vendor下拉框数据，material有值的时候才能获取数据
      if (this.ruleForm.Material) {
        let res4 = await GetMaterialVendorInfo({ DeviceNo: val, Material: this.ruleForm.Material })
        this.vendorOptions = res4
        res4.forEach((item) => {
          if (item.selected) {
            this.ruleForm.MaterialVendor = item.id
          }
        })
      }

      //获取Process下拉框数据
      let res5 = await GetProcessInfo({ DeviceNo: val })
      this.processOptions = res5
      res5.forEach((item) => {
        if (item.selected) {
          this.ruleForm.Process.push(item.id)
        }
      })
    },

    //获取Lottype下拉框数据
    async GetLotTypeInfo() {
      let res = await GetLotTypeInfo()
      this.lottypeOptions = res
      res.forEach((item) => {
        if (item.selected) {
          this.ruleForm.LotType = item.id
        }
      })
    },

    //监听Device下拉框数据变化
    async handlerDeviceChange(val) {
      this.DefaultSelected(this.ruleForm.DeviceNo)
    },

    //监听Tester下拉框数据变化
    async handlerTesterChange(val) {
      this.ruleForm.TestStation = []
      let res = await GetTestStationInfo({ DeviceNo: this.ruleForm.DeviceNo, Tester: val })
      this.testStationOptions = res
      res.forEach((item) => {
        if (item.selected) {
          this.ruleForm.TestStation.push(item.id)
        }
      })
    },

    //监听Material下拉框数据变化,改变Material Vendor下拉框的选项
    async handlerMaterialChange(val) {
      this.ruleForm.MaterialVendor = ""
      let res = await GetMaterialVendorInfo({ DeviceNo: this.ruleForm.DeviceNo, Material: val })
      this.vendorOptions = res
      res.forEach((item) => {
        if (item.selected) {
          this.ruleForm.MaterialVendor = item.id
        }
      })
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 页面加载默认参数访问接口获取数据
    async initData() {
      let requestArr = [this.GetDeviceInfo(), this.GetLotTypeInfo()]
      await Promise.all(requestArr)
      this.getDefaultData()
    },

    async getDefaultData() {
      this.tableHeader = []
      this.isLoading = true
      let res = await getTableDate(this.ruleForm)
      this.tableData = []
      this.tableHeader = res.columns
      this.tableData = handlerTableDate(res.rows)
      this.isLoading = false
    },

    // 查询
    async submitForm() {
      this.tableHeader = []
      this.isLoading = true
      this.tableHeader = []
      this.tableData = []
      let res = await getTableDate(this.ruleForm)

      this.tableHeader = res.columns
      this.tableData = handlerTableDate(res.rows)
      this.isLoading = false
    },
    // 重置
    // resetForm(formName) {
    //   this.$refs[formName].resetFields()
    // },
    // 导出表格为xlsx
    exportXlsx() {
      let workbook = this.$xlsx.utils.table_to_book(document.getElementById("exportTable")) //需要在table上定义一个id
      try {
        this.$xlsx.writeFile(workbook, "模板.xlsx")
      } catch (e) {
        console.log("e", e)
      }
    },
    headerCellStyle() {
      return {
        "font-size": "16px",
        color: "#fff",
        "font-weight": 700
      }
    },
    Show() {
      this.isShow = !this.isShow
    }
  },
  beforeUpdate() {
    this.$nextTick(() => {
      //在数据加载完，重新渲染表格,防止显示隐藏表格列出现闪动的问题
      this.$refs["table"].doLayout()
    })
  }
}
</script>

<style lang="scss" scoped>
/* ::v-deep .el-table__body-wrapper {
  &::-webkit-scrollbar {
    // 整个滚动条
    width: 5; // 纵向滚动条的宽度
    background: rgba(213, 215, 220, 0.3);
    border: none;
  }
  &::-webkit-scrollbar-track {
    // 滚动条轨道
    border: none;
  }
} */
/* ::-webkit-scrollbar {
  width: 25px;
  height: 15px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px #333;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: red;
} */
</style>
<style lang="scss" scoped>
::v-deep .el-table__header-wrapper {
  padding-right: 20px;
}
::v-deep ::-webkit-scrollbar {
  display: block;
  height: 15px;
}
::v-deep ::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 2px #333; */
  border-radius: 5px;
}
::v-deep ::-webkit-scrollbar-thumb {
  /* border-radius: 5px; */
  background: #3b4e92;
}
::v-deep .el-table__body-wrapper {
  // height: 640px !important;
}
.page-mian {
  height: calc(100% - 120px);
  margin-top: 10px;
}

/* 修改表格的一些样式 */
::v-deep .el-table {
  background: transparent;
  border-left: 0px solid #fff;
  // border-bottom: 2px solid #1683af;
  // font-size: 13px !important;
  height: calc(100% - 270px);
}
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
  border-bottom: 2px solid #1683af;
  border-left: 2px solid #1683af;
  border-right: 2px solid #1683af !important;
}
::v-deep .el-table th {
  border-right: 1px solid #fff;
  border-top: 1px solid #fff !important;
}
::v-deep .el-table tr:first-child th {
  border-top: 0px solid #fff !important;
}
::v-deep .el-table td {
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
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
.el-button--mini {
  font-size: 14px;
}
.detail {
  cursor: pointer;
}
// ::v-deep .el-popper {
//   background-color: #000c1a;
//   .popper__arrow:after {
//     border-bottom-color: #000c1a;
//   }
// }
::v-deep .el-select .el-input .el-select__caret {
  color: rgba(128, 128, 128, 1);
}
// 查询区域样式
.elForm {
  border: 2px solid rgba(160, 190, 250, 1);
  border-radius: 4px;
  margin-top: 10px;
  padding-top: 10px;
  background: linear-gradient(90deg, rgba(36, 57, 73, 1) 0%, rgba(80, 126, 163, 1) 100%);
  // max-height: 0;
  transition: 100px 0.3s linear;
}
::v-deep .el-form-item__label {
  font-size: 16px;
  color: #fff;
}
::v-deep .el-input--suffix .el-input__inner {
  z-index: 100;
  border: 0px solid #fff;
  border-radius: 4px;
  background: rgba(255, 255, 255, 1);
  font-size: 16px;
  color: rgba(128, 128, 128, 1);
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 150px;
  height: 34px;
}
::v-deep .el-scrollbar {
  width: 238px;
}
//滚动条位置
::v-deep .el-table__body-wrapper is-scrolling-left {
  height: 628px !important;
  // height: 597px;
}

// 控制查詢區域顯示隱藏
.showContorl {
  display: flex;
  justify-content: center;
  .el-button {
    background-color: transparent;
    color: #3762ff;
    border: 2px solid #3762ff;
    padding: 6px;
  }
}
::v-deep .el-icon-arrow-up {
  font-weight: 600;
}
::v-deep .el-icon-arrow-down {
  font-weight: 600;
}

.table {
  transition: height 0.01s;
}

::v-deep .el-table__body-wrapper {
  // height: 100%;
}
// 按钮
.btn {
  font-size: 14px;
  width: 88px;
  height: 34px;
  border-radius: 95px;
  color: #fff;
  background: rgba(0, 143, 253, 1);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  border: 0px solid #fff;
}
</style>
