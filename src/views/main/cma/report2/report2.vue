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
              <el-form-item label="Device" prop="device">
                <el-select :popper-append-to-body="false" v-model="ruleForm.device" placeholder="請選擇">
                  <el-option v-for="item in deviceOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Lottype" prop="lottype">
                <el-select :popper-append-to-body="false" v-model="ruleForm.lottype" placeholder="請選擇">
                  <el-option v-for="item in lottypeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Tester" prop="tester">
                <el-select
                  :popper-append-to-body="false"
                  v-model="ruleForm.tester"
                  multiple
                  collapse-tags
                  placeholder="請選擇"
                >
                  <el-option v-for="item in testerOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Test station" prop="testStation">
                <el-select
                  :popper-append-to-body="false"
                  v-model="ruleForm.testStation"
                  multiple
                  collapse-tags
                  placeholder="請選擇"
                >
                  <el-option v-for="item in testStation" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="Test StartTime" prop="startTime">
                <el-date-picker v-model="ruleForm.startTime" type="datetime" placeholder="選擇日期時間">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Test EndTime" prop="endTime">
                <el-date-picker v-model="ruleForm.endTime" type="datetime" placeholder="選擇日期時間"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Material Vendor" prop="materialVendor">
                <el-select :popper-append-to-body="false" v-model="ruleForm.materialVendor" placeholder="請選擇">
                  <el-option v-for="item in vendorOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Process" prop="process">
                <el-select
                  :popper-append-to-body="false"
                  v-model="ruleForm.process"
                  multiple
                  collapse-tags
                  placeholder="請選擇"
                >
                  <el-option v-for="item in processOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item style="float: right; margin-right: 80px">
              <el-button type="primary" size="mini" @click="submitForm('ruleForm')">查詢</el-button>
              <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </el-collapse-transition>

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
      :height="isShow ? '690px' : '900px'"
      class="table"
    >
      <!--  -->
      <el-table-column
        v-for="(item, index) in tableHeader"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        align="center"
        min-width="110px"
        show-overflow-tooltip
      >
        <el-table-column
          v-show="item.children"
          v-for="(child, index) in item.children"
          :key="index"
          :prop="child.prop"
          :label="child.label"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div class="detail" v-if="scope.row[child.prop].includes('%') == true">
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
                <span slot="reference">{{ scope.row[child.prop] }}</span>
              </el-popover>
            </div>
            <div v-else>
              {{ scope.row[child.prop] }}
            </div>
          </template>
        </el-table-column>
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
      isShow: true,
      tableData: [],
      tableHeader: [
        {
          prop: "1",
          label: "Tester"
        },
        {
          prop: "2",
          label: "Tester Station"
        },
        {
          prop: "3",
          label: "TestItem"
        },
        {
          prop: "4",
          label: "Material"
        },
        {
          prop: "5",
          label: "Material Vendor"
        },
        {
          prop: "6",
          label: "Test Date"
        },
        {
          prop: "7",
          label: "Input"
        },
        {
          prop: "8",
          label: "Fail rate"
        },
        {
          prop: "",
          label: "Fail Rate by VCM attach",
          children: [
            {
              prop: "9",
              label: "VA01"
            },
            {
              prop: "10",
              label: "VA02"
            },
            {
              prop: "11",
              label: "VA03"
            }
          ]
        },
        {
          prop: "",
          label: "Fail Rate by Jet Solding",
          children: [
            {
              prop: "12",
              label: "JS01"
            },
            {
              prop: "13",
              label: "JS02"
            },
            {
              prop: "14",
              label: "JS03"
            }
          ]
        },
        {
          prop: "",
          label: "Fail Rate by VCM Sealing",
          children: [
            {
              prop: "15",
              label: "VS01"
            },
            {
              prop: "16",
              label: "VS02"
            },
            {
              prop: "17",
              label: "VS03"
            }
          ]
        },
        {
          prop: "",
          label: "Fail Rate by Enclosure Aattch",
          children: [
            {
              prop: "18",
              label: "EA01"
            },
            {
              prop: "19",
              label: "EA02"
            },
            {
              prop: "20",
              label: "EA03"
            }
          ]
        },
        {
          prop: "",
          label: "Fail Rate by AA",
          children: [
            {
              prop: "21",
              label: "AA01"
            },
            {
              prop: "22",
              label: "AA02"
            },
            {
              prop: "23",
              label: "AA03"
            }
          ]
        },
        {
          prop: "",
          label: "Fail Rate by Assembly Line",
          children: [
            {
              prop: "24",
              label: "L01"
            },
            {
              prop: "25",
              label: "L02"
            },
            {
              prop: "26",
              label: "L03"
            }
          ]
        },
        {
          prop: "",
          label: "Fail Rate by too&cavity",
          children: [
            {
              prop: "27",
              label: "1"
            },
            {
              prop: "28",
              label: "2"
            },
            {
              prop: "29",
              label: "3"
            }
          ]
        },
        {
          prop: "",
          label: "Input by VCM attach",
          children: [
            {
              prop: "30",
              label: "VA01"
            },
            {
              prop: "31",
              label: "VA02"
            },
            {
              prop: "31",
              label: "VA03"
            }
          ]
        },
        {
          prop: "",
          label: "Input by Jet Solding",
          children: [
            {
              prop: "33",
              label: "JS01"
            },
            {
              prop: "34",
              label: "JS02"
            },
            {
              prop: "35",
              label: "JS03"
            }
          ]
        },
        {
          prop: "",
          label: "Input by VCM Sealing",
          children: [
            {
              prop: "36",
              label: "VS01"
            },
            {
              prop: "37",
              label: "VS02"
            },
            {
              prop: "38",
              label: "VS03"
            }
          ]
        },
        {
          prop: "",
          label: "Input by Enclosure Aattch",
          children: [
            {
              prop: "39",
              label: "EA01"
            },
            {
              prop: "40",
              label: "EA02"
            },
            {
              prop: "41",
              label: "EA03"
            }
          ]
        },
        {
          prop: "",
          label: "Input by AA",
          children: [
            {
              prop: "42",
              label: "AA1"
            },
            {
              prop: "43",
              label: "AA2"
            },
            {
              prop: "44",
              label: "AA3"
            }
          ]
        },
        {
          prop: "",
          label: "Input by Assembly Line",
          children: [
            {
              prop: "45",
              label: "L01"
            },
            {
              prop: "46",
              label: "L02"
            },
            {
              prop: "47",
              label: "L03"
            }
          ]
        },
        {
          prop: "",
          label: "Inpu by too&cavity",
          children: [
            {
              prop: "48",
              label: "1"
            },
            {
              prop: "49",
              label: "2"
            },
            {
              prop: "50",
              label: "3"
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
      this.tableData = [
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        },
        {
          1: "Z-cal test",
          2: "Zebra_UP",
          3: "Zebra_OIS_OOV/Gian_Trim（1173&1174&1175）",
          4: "OIS",
          5: "MTM",
          6: "2023/2/13",
          7: "1350",
          8: "0.07%",
          9: "0",
          10: "0.18%",
          11: "0",
          12: "0",
          13: "0.18%",
          14: "0",
          15: "0.24%",
          16: "0",
          17: "0",
          18: "",
          19: "",
          20: "",
          21: "",
          22: "",
          23: "",
          24: "0",
          25: "0",
          26: "0.29%",
          27: "0.05%",
          28: "0",
          29: "0",
          30: "350",
          31: "550",
          32: "450",
          33: "350",
          34: "550",
          35: "450",
          36: "420",
          37: "480",
          38: "450",
          39: "",
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "1000",
          46: "0",
          47: "350",
          48: "200",
          49: "600",
          50: "550"
        }
      ]

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
          background: "#b4c6e7",
          color: "#4c4c4c"
        }
      } else
        return {
          background: "#f8cbad",
          color: "#4c4c4c"
        }
    },
    Show() {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table__body-wrapper {
  &::-webkit-scrollbar {
    // 整个滚动条
    width: 0; // 纵向滚动条的宽度
    background: rgba(213, 215, 220, 0.3);
    border: none;
  }
  &::-webkit-scrollbar-track {
    // 滚动条轨道
    border: none;
  }
}

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
::v-deep ::-webkit-scrollbar {
  display: block;
  /* width: 20px; */
  height: 8px;
}

::v-deep ::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px #333;
  border-radius: 5px;
}
::v-deep ::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(55, 98, 255, 0.6);
}

.page-mian {
  height: calc(100% - 120px);
  margin-top: 10px;
}
/* 修改表格的一些样式 */
::v-deep .el-table {
  background: transparent;
  border: 1px solid #1683af;
  // font-size: 13px !important;
  height: calc(100% - 270px);
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
.el-button--mini {
  font-size: 14px;
}
.detail {
  cursor: pointer;
}
::v-deep .el-popper {
  background-color: #000c1a;
  .popper__arrow:after {
    border-bottom-color: #000c1a;
  }
}

// 查询区域样式
.elForm {
  border: 1px solid #1683af;
  margin-top: 10px;
  padding-top: 10px;
  // max-height: 0;
  transition: 100px 0.3s linear;
}
::v-deep .el-form-item__label {
  font-size: 16px;
  color: #fff;
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
    color: #fff;
    background-color: transparent !important;
  }
  .el-select-dropdown__item.selected:hover {
    color: #fff;
    background-color: #243d97 !important;
  }

  .popper__arrow:after {
    border-bottom-color: #000c1a !important;
  }
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 240px;
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
  height: 100%;
}
</style>
