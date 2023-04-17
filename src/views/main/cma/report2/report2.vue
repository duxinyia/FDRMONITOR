<template>
  <div class="page-mian">
    <el-form :model="ruleForm" :rules="rules" class="elForm" ref="ruleForm" label-width="150px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="Device" prop="device">
            <el-select v-model="ruleForm.device" placeholder="请选择">
              <el-option
                v-for="item in deviceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Lottype" prop="lottype">
            <el-select v-model="ruleForm.lottype" placeholder="请选择">
              <el-option
                v-for="item in lottypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Tester" prop="tester">
            <el-select v-model="ruleForm.tester" multiple placeholder="请选择">
              <el-option
                v-for="item in testerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Test station" prop="testStation">
            <el-select v-model="ruleForm.testStation" multiple placeholder="请选择">
              <el-option
                v-for="item in testStation"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="Test StartTime" prop="startTime">
            <el-date-picker v-model="ruleForm.startTime" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Test EndTime" prop="endTime">
            <el-date-picker v-model="ruleForm.endTime" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Material Vendor" prop="materialVendor">
            <el-select v-model="ruleForm.materialVendor" placeholder="请选择">
              <el-option
                v-for="item in vendorOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Process" prop="process">
            <el-select v-model="ruleForm.process" multiple placeholder="请选择">
              <el-option
                v-for="item in processOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item style="float: right; margin-right: 80px">
          <el-button type="primary" size="mini" @click="submitForm('ruleForm')">查询</el-button>
          <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
      :header-cell-style="{ background: 'transparent', color: '#fff' }"
    >
      <el-table-column
        v-for="(item, index) in tableCols"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      >
      </el-table-column>
    </el-table> -->
    <el-table
      :data="tableData"
      border
      style="width: 100%; margin-top: 20px"
      :header-cell-style="headerCellStyle"
    >
      <template v-for="item in tableHeader">
        <table-column
          v-if="item.children && item.children.length"
          :key="item.id"
          :coloumn-header="item"
          width="100px"
        >
        </table-column>
        <el-table-column
          v-else
          :key="item.id"
          :label="item.label"
          :prop="item.prop"
          align="center"
          width="100px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import TableColumn from "./tableColumn"
export default {
  name: "report1",
  props: {},
  components: {
    TableColumn
  },
  data() {
    return {
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2%",
          amount3: 10
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2%",
          amount3: 17
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15
        }
      ],
      tableHeader: [
        {
          prop: "id",
          label: "Tester"
        },
        {
          prop: "name",
          label: "Tester Station"
        },
        {
          prop: "id",
          label: "TestItem"
        },
        {
          prop: "name",
          label: "Material"
        },
        {
          prop: "id",
          label: "Material Vendor"
        },
        {
          prop: "name",
          label: "Test Date"
        },
        {
          prop: "id",
          label: "Input"
        },
        {
          prop: "name",
          label: "Fail rate"
        },
        {
          prop: "",
          label: "数值",
          children: [
            {
              prop: "amount1",
              label: "数值 1（元）"
              // children: [
              //   {
              //     prop: "amount2",
              //     label: "数值 2（元）"
              //   },
              //   {
              //     prop: "amount3",
              //     label: "数值 3（元）"
              //   }
              // ]
            },
            {
              prop: "amount2",
              label: "数值 2（元）"
            },
            {
              prop: "amount3",
              label: "数值 3（元）"
            }
          ]
        },
        {
          prop: "",
          label: "数值",
          children: [
            {
              prop: "amount1",
              label: "1（元）"
            },
            {
              prop: "amount2",
              label: "2（元）"
            },
            {
              prop: "amount3",
              label: "3（元）"
            }
          ]
        },
        {
          prop: "",
          label: "数值",
          children: [
            {
              prop: "amount1",
              label: "数值 1（元）"
            },
            {
              prop: "amount2",
              label: "数值 2（元）"
            },
            {
              prop: "amount3",
              label: "数值 3（元）"
            }
          ]
        },
        {
          prop: "",
          label: "数值",
          children: [
            {
              prop: "amount1",
              label: "数值 1（元）"
            },
            {
              prop: "amount2",
              label: "数值 2（元）"
            },
            {
              prop: "amount3",
              label: "数值 3（元）"
            }
          ]
        },
        {
          prop: "",
          label: "数值",
          children: [
            {
              prop: "amount1",
              label: "数值 1（元）"
            },
            {
              prop: "amount2",
              label: "数值 2（元）"
            },
            {
              prop: "amount3",
              label: "数值 3（元）"
            }
          ]
        },
        {
          prop: "",
          label: "数值",
          children: [
            {
              prop: "amount1",
              label: "数值 1（元）"
            },
            {
              prop: "amount2",
              label: "数值 2（元）"
            },
            {
              prop: "amount3",
              label: "数值 3（元）"
            }
          ]
        },
        {
          prop: "",
          label: "数值",
          children: [
            {
              prop: "amount1",
              label: "数值 1（元）"
            },
            {
              prop: "amount2",
              label: "数值 2（元）"
            },
            {
              prop: "amount3",
              label: "数值 3（元）"
            }
          ]
        },
        {
          prop: "",
          label: "数值",
          children: [
            {
              prop: "amount1",
              label: "数值 1（元）"
            },
            {
              prop: "amount2",
              label: "数值 2（元）"
            },
            {
              prop: "amount3",
              label: "数值 3（元）"
            }
          ]
        },
        {
          prop: "",
          label: "数值",
          children: [
            {
              prop: "amount1",
              label: "数值 1（元）"
            },
            {
              prop: "amount2",
              label: "数值 2（元）"
            },
            {
              prop: "amount3",
              label: "数值 3（元）"
            }
          ]
        },
        {
          prop: "",
          label: "数值",
          children: [
            {
              prop: "amount1",
              label: "数值 1（元）"
            },
            {
              prop: "amount2",
              label: "数值 2（元）"
            },
            {
              prop: "amount3",
              label: "数值 3（元）"
            }
          ]
        }
      ],
      rules: {
        // device: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
      },
      deviceOptions: [
        {
          value: "MW-E",
          label: "MW-E"
        },
        {
          value: "MW-F",
          label: "MW-F"
        },
        {
          value: "BWI",
          label: "BWI"
        }
      ],
      lottypeOptions: [
        {
          value: "ALL",
          label: "ALL"
        },
        {
          value: "MP",
          label: "MP"
        },
        {
          value: "ENG",
          label: "ENG"
        }
      ],
      testerOptions: [
        {
          value: "ALL",
          label: "ALL"
        },
        {
          value: "mp",
          label: "z-cal test"
        },
        {
          value: "ENG",
          label: "MFG_UP_Test"
        }
      ],
      testStation: [
        {
          value: "Zebra_UP",
          label: "Zebra_UP"
        },
        {
          value: "Zebra_Last",
          label: "Zebra_Last"
        },
        {
          value: "VCM1",
          label: "VCM1"
        }
      ],
      vendorOptions: [
        {
          value: "ALL",
          label: "ALL"
        },
        {
          value: "Alps",
          label: "Alps"
        },
        {
          value: "MTM",
          label: "MTM"
        }
      ],
      processOptions: [
        {
          value: "ALL",
          label: "VCM Attch"
        },
        {
          value: "Alps",
          label: "Jet Solding"
        }
      ],
      ruleForm: {
        device: "",
        lottype: "",
        tester: "",
        testStation: "",
        startTime: "",
        endTime: "",
        materialVendor: "",
        process: ""
      }
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "CMA的第二个报表")
  },
  methods: {
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
    // 查询
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("ruleForm", this.ruleForm)
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    headerCellStyle({ row, column, columnIndex }) {
      if (column.label.includes("数值")) {
        // console.log(column)
        return {
          background: "pink",
          color: "#fff"
        }
      } else
        return {
          background: "skyblue",
          color: "#fff"
        }
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  /* display: block !important; */
  width: 20px;
  height: 10px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px #333;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: red;
}
</style>

<style lang="scss" scoped>
.page-mian {
  height: calc(100% - 120px);
  margin-top: 10px;
}
/* 修改表格的一些样式 */
::v-deep .el-table {
  background: transparent;
  border: 1px solid #1683af;
  font-size: 13px !important;
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

// 查询区域样式
.elForm {
  border: 1px solid #1683af;
  padding-top: 10px;
}
::v-deep .el-form-item__label {
  font-size: 14px;
  color: #fff;
}
::v-deep .el-input--suffix .el-input__inner {
  background: transparent;
  color: #fff;
}
// ::-webkit-scrollbar {
//   display: none;
// }
</style>
