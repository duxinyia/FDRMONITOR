<template>
  <!-- 主要区域 -->
  <div class="page-main">
    <div class="count-container">
      <div v-for="(item, index) in 2" class="container" :key="index">
        <dv-border-box-10 :color="changeBoxColor">
          <el-table
            v-loading="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 1)"
            :data="configArr[index]"
            :header-cell-style="getRowClass"
          >
            <el-table-column align="center" prop="productArea" label="名称"></el-table-column>
            <el-table-column align="center" prop="totalCount" label="計畫"></el-table-column>
            <el-table-column align="center" prop="hitCount" label="達成機種"></el-table-column>
            <el-table-column align="center" prop="notHitCount" label="未達成"></el-table-column>
            <el-table-column
              align="center"
              width="100"
              prop="hitRate"
              label="達成率"
            ></el-table-column>
          </el-table>
        </dv-border-box-10>
      </div>
      <div class="control">
        <div class="fol-container" @click="folChecked = !folChecked">
          <span
            class="frame"
            :style="{
              'box-shadow': folChecked ? 'inset 0 0 20px #5bdbe4' : ''
            }"
          ></span>
          <span class="name">FOL</span>
        </div>
        <div class="eol-container" @click="eolChecked = !eolChecked">
          <span
            class="frame"
            :style="{
              'box-shadow': eolChecked ? 'inset 0 0 20px #3762ff' : ''
            }"
          ></span>
          <span class="name">EOL</span>
        </div>
      </div>
    </div>
    <dv-border-box-13 :color="changeBoxColor" :key="Date.now()">
      <div class="table-chart">
        <template v-for="(showTitle, index) in titles">
          <container
            :eolChecked="eolChecked"
            :folChecked="folChecked"
            :device="outPutInfoDetails[index].device"
            :dateValues="outPutInfoDetails[index].dateValues"
            :key="index + index"
            :maxOutput="maxOutput[index]"
            :maxTargetOut="maxTargetOut[index]"
            :showTitle="showTitle"
            :isShow.sync="showArr[index]"
          />
        </template>
      </div>
    </dv-border-box-13>
  </div>
</template>
<script>
// 导入发送请求的函函數
import { GetOutputInfoStatics, GetDeviceInfo } from "@/api/makewar.js"
// 获取标题的接口
import { GetStationName } from "@/api/output2.js"
// 导入子组件
import container from "./cpns/container.vue"
export default {
  name: "makewar",
  components: {
    container
  },
  data() {
    return {
      loading: true,
      eolChecked: true,
      folChecked: true,
      showArr: [true, true, true, true, true, true, true, true, true, true, true, true],
      configArr: [
        [{ hitCount: 0, hitRate: "0.00%", notHitCount: 0, productArea: "FOL", totalCount: 0 }],
        [{ hitCount: 0, hitRate: "0.00%", notHitCount: 0, productArea: "EOL", totalCount: 0 }]
      ],
      titles: [
        { customName: "", deviceNo: "" },
        { customName: "", deviceNo: "" },
        { customName: "", deviceNo: "" },
        { customName: "", deviceNo: "" },
        { customName: "", deviceNo: "" },
        { customName: "", deviceNo: "" },
        { customName: "", deviceNo: "" },
        { customName: "", deviceNo: "" },
        { customName: "", deviceNo: "" },
        { customName: "", deviceNo: "" },
        { customName: "", deviceNo: "" },
        { customName: "", deviceNo: "" }
      ],
      outPutInfoDetails: [
        { device: { customName: "", plantID: "", Opno: "" }, dateValues: [] },
        { device: { customName: "", plantID: "", Opno: "" }, dateValues: [] },
        { device: { customName: "", plantID: "", Opno: "" }, dateValues: [] },
        { device: { customName: "", plantID: "", Opno: "" }, dateValues: [] },
        { device: { customName: "", plantID: "", Opno: "" }, dateValues: [] },
        { device: { customName: "", plantID: "", Opno: "" }, dateValues: [] },
        { device: { customName: "", plantID: "", Opno: "" }, dateValues: [] },
        { device: { customName: "", plantID: "", Opno: "" }, dateValues: [] },
        { device: { customName: "", plantID: "", Opno: "" }, dateValues: [] },
        { device: { customName: "", plantID: "", Opno: "" }, dateValues: [] },
        { device: { customName: "", plantID: "", Opno: "" }, dateValues: [] },
        { device: { customName: "", plantID: "", Opno: "" }, dateValues: [] }
      ],
      maxOutput: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      maxTargetOut: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  computed: {
    changeBoxColor() {
      return this.$store.getters.theme == "dark" ? ["#6586ec", "#2cf7fe"] : ["#05dad4", "#2c97e1"]
    }
  },
  created() {
    // this.$store.commit("fullLoading/SET_FULLLOADING", false)
    this.$store.commit("fullLoading/SET_TITLE", "By天產出看板")
    // 获取上方的数据
    GetOutputInfoStatics().then((res) => {
      this.configArr = [[res[0]], [res[1]]]
      this.loading = false
    })
    // 获取标题
    GetStationName().then((res) => {
      console.log("GetStationName", res)
      this.titles = res
      this.outPutInfoDetails = []
      res &&
        res.forEach((item, index) => {
          GetDeviceInfo(item.deviceNo).then((r) => {
            this.$set(this.outPutInfoDetails, index, r)
            // console.log("-----", this.outPutInfoDetails)
            r.dateValues.forEach((childItem) => {
              // childItem.values.EOL.output  取出的是 output 的最大值
              if (childItem.values.EOL.output > this.maxOutput[index]) {
                this.maxOutput[index] = childItem.values.EOL.output
              }
              // childItem.values.FOL.output
              if (childItem.values.FOL.output > this.maxOutput[index]) {
                this.maxOutput[index] = childItem.values.FOL.output
              }
              // childItem.values.EOL.output  取出的是 output 的最大值
              if (childItem.values.EOL.targetOut > this.maxTargetOut[index]) {
                this.maxTargetOut[index] = childItem.values.EOL.targetOut
              }
              // childItem.values.FOL.output
              if (childItem.values.FOL.targetOut > this.maxTargetOut[index]) {
                this.maxTargetOut[index] = childItem.values.FOL.targetOut
              }
            })
            this.$set(this.showArr, index, false)
          })
        })
    })
  },
  methods: {
    getRowClass() {
      let color = this.$store.getters.theme == "dark" ? "#1adafb" : "rgba(39, 75, 232, 1)"
      return `background:transparent !important;color:${color};`
    }
  }
}
</script>

<style lang="scss" scoped>
//整个table的背景颜色
::v-deep .el-table,
.el-table__expanded-cell {
  background-color: transparent;
  color: var(--makewar-table-text);
  font-size: 18px;
}
::v-deep .el-table::before {
  display: none;
}
::v-deep th {
  padding: 2px 0 !important;
  border-bottom: none !important;
}
::v-deep th .cell {
  padding: 0 4px !important;
}
::v-deep td {
  padding: 4px 0 !important;
  border-bottom: none !important;
}
//表格整行的颜色
::v-deep .el-table tr {
  background-color: transparent !important;
}
::v-deep .el-table tbody tr:hover > td {
  background-color: transparent !important;
}
::v-deep .border-box-content {
  padding: 15px;
}
.page-main {
  margin-top: 10px;
}
.table-chart {
  height: 800px;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(5, 1fr);
  justify-content: space-between;
}
.count-container {
  display: flex;
  justify-content: flex-start;
  margin: 25px 0;
  .container {
    &:first-child {
      margin-right: 40px;
    }
  }
  .control {
    margin-left: auto;
    align-self: flex-end;
    display: flex;
    align-items: center;
    .eol-container,
    .fol-container {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .eol-container {
      .frame {
        border: 1px solid #3762ff;
      }
    }
    .fol-container {
      margin-right: 8px;
      .frame {
        border: 1px solid #5bdae3;
      }
    }
    .frame {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-right: 6px;
    }
  }
}
</style>
