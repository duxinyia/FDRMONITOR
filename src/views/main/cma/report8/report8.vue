<template>
  <div id="index" ref="appRef">
    <dv-loading v-if="$store.state.fullLoading.fullLoading">Loading...</dv-loading>
    <page-header :title="$store.state.fullLoading.title" />
    <div class="page-mian">
      <!-- :row-style="tableRowStyle" -->
      <!-- 左边表格 -->
      <div class="leftTable">
        <el-table
          :class="tabData[taT.type] && tabData[taT.type].isLoading ? 'table-isloading' : ''"
          ref="reportTable1"
          v-for="(taT, index) in leftTableTitle"
          :key="index"
          :data="tabData[taT.type]"
          :header-cell-style="{
            'font-size': '16px',
            color: '#fff',
            'font-weight': 700
          }"
          height="250"
          :cell-style="cellStyle1"
          :row-style="tableRowStyle1"
          v-loading="tabData[taT.type] && tabData[taT.type].isLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-text="加载中..."
          element-loading-background="rgba(0, 0, 0, 1)"
        >
          <el-table-column :prop="taT.id" align="left" :label="taT.name">
            <el-table-column
              v-show="taT.chileColumn"
              v-for="(c, index) in taT.chileColumn"
              :key="index"
              :prop="c.id"
              align="center"
              :label="c.name"
              :width="tableWidth(c.id)"
            >
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>

      <!-- 右边表格 -->
      <div class="rightTable">
        <el-table
          ref="reportTable"
          v-for="(taT, index) in tableTitle"
          :key="index"
          :data="tabData[taT.type]"
          :header-cell-style="{
            'font-size': '16px',
            color: '#fff',
            'font-weight': 700
          }"
          height="142"
          :cell-style="cellStyle"
          :row-style="tableRowStyle"
          v-loading="isLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-text="加载中..."
          element-loading-background="rgba(0, 0, 0, 1)"
        >
          <!--height="calc(100% - 20.9px) " 如果没有下拉框换成这个-->
          <el-table-column :prop="taT.id" align="left" :label="taT.name">
            <el-table-column
              v-show="taT.chileColumn"
              v-for="(c, index) in taT.chileColumn"
              :key="index"
              :prop="c.id"
              align="center"
              :label="c.name"
            >
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div class="text">IT值班人員請參考公司首頁：Rayprus MIS 值班表</div>
      <!-- 报警音频controls -->
      <audio id="aodioDom" :src="sound" ref="alarmsaudio" loop></audio>
    </div>
    <!-- 报警弹窗 -->
    <el-dialog
      :modal-append-to-body="false"
      title="警告"
      :visible.sync="dialogVisible"
      width="30%"
      style="margin-top: 25vh"
    >
      <span class="dialogText">{{ alarmsText }}</span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 提示弹窗 -->
    <el-dialog
      :show-close="false"
      :modal-append-to-body="false"
      title="提示"
      :visible.sync="dialogPlay"
      width="30%"
      style="margin-top: 25vh"
    >
      <span class="dialogText">请按确定键打开音效</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="surePlay">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment"
// 导入头部
import PageHeader from "@/components/page-header/index.vue"
// 导入点击搜索数据
import { GetFdrHeartCheck } from "@/api/cma/report8"
// 导入自适应函数
import drawMixin from "@/utils/drawMixin"
//报警声语音的路径（这样引入是方便打包上传）
import sounds from "@/assets/audio/alarmsAudio.mp3"
export default {
  mixins: [drawMixin],
  name: "report8",
  props: {},
  components: {
    PageHeader
  },
  data() {
    return {
      flag: 0,
      // 提示打开音效弹窗
      dialogPlay: true,
      // 报警声的路径
      sound: sounds,
      // 延迟时间
      dataTiming: null,
      // loading标志显示
      isLoading: false,

      // 报警弹窗是否显示
      dialogVisible: false,
      // 对话框里面显示的字
      alarmsText: "",

      // 右边表头名称
      tableTitle: [
        {
          type: "FdrHeartCheck",
          name: "SFCAPI  State:",
          chileColumn: [
            { id: "MachineID", name: "PC" },
            { id: "Status", name: "State" },
            { id: "Message", name: "MSG" },
            { id: "Time", name: "Time" }
          ]
        },
        {
          type: "FdrJmetHeartCheck",
          name: "JmetAPI  State:",
          chileColumn: [
            { id: "MachineID", name: "PC" },
            { id: "Status", name: "State" },
            { id: "Message", name: "MSG" },
            { id: "Time", name: "Time" }
          ]
        },
        {
          type: "GetDownloadSate5Min",
          name: "FDR DownLoad State",
          chileColumn: [
            { id: "MachineID", name: "PC" },
            { id: "QTY", name: "Qty Last 5 minite" },
            { id: "Yield", name: "FailRate" },
            { id: "Time", name: "Time" }
          ]
        },
        {
          type: "GetUploadState5min",
          name: "FDR Upload State",
          chileColumn: [
            { id: "MachineID", name: "PC" },
            { id: "QTY", name: "Qty Last 5 minite" },
            { id: "Yield", name: "FailRate" },
            { id: "Time", name: "Time" }
          ]
        },
        {
          type: "GetExportSate5min",
          name: "FDR Export State",
          chileColumn: [
            { id: "MachineID", name: "PC" },
            { id: "QTY", name: "Qty Last 5 minite" },
            { id: "Yield", name: "FailRate" },
            { id: "Time", name: "Time" }
          ]
        }
      ],
      // 左边表头
      leftTableTitle: [
        {
          type: "PackageState",
          name: "Package State:",
          chileColumn: [
            { id: "Deviceno", name: "Deviceno" },
            { id: "PackageQty", name: "Package qty Now - Last 2 Day" },
            { id: "ExportFailBagQty", name: "ExportFailBagQty" },
            { id: "TimesPan", name: "TimesPan" },
            { id: "Time", name: "Time" }
          ]
        },
        {
          type: "SonoState",
          name: "Sono State:",
          chileColumn: [
            { id: "Deviceno", name: "Deviceno" },
            { id: "SonoQty", name: "Sono qty Now - Last 11 Day" },
            { id: "ExportFailSonoQty", name: "ExportFailSonoQty" },
            { id: "TimesPan", name: "TimesPan" },
            { id: "Time", name: "Time" }
          ]
        },
        {
          type: "FeeState",
          name: "Fee State:",
          chileColumn: [
            { id: "Deviceno", name: "Deviceno" },
            { id: "FeeQty", name: "Fee qty Now - Last 11 Day" },
            { id: "ExportFailFeeQty", name: "ExportFailFeeQty" },
            { id: "TimesPan", name: "TimesPan" },
            { id: "Time", name: "Time" }
          ]
        }
      ],
      // 表格数据
      tabData: {}
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "FDR MONITOR")
    // this.$store.commit("fullLoading/SET_FULLLOADING", true)
  },
  mounted() {
    this.initData()
    // this.$set(this.tabData, "FdrHeartCheck", p)
    this.leftInitData()
    // 每 60000（1分钟）获取一次右边数据
    this.dataTiming = setInterval(async () => {
      // this.tabData = {}
      await this.initData()
    }, 60000)
    // 每 1800000（30分钟）获取一次右边数据
    this.dataTiming1 = setInterval(() => {
      // this.tabData = {}
      this.leftInitData()
    }, 1800000)
  },

  watch: {},
  methods: {
    tableWidth(id) {
      if (id === "PackageQty" || id === "SonoQty" || id === "FeeQty") {
        return "230"
      }
    },
    async initData() {
      let arr = ["FdrHeartCheck", "FdrJmetHeartCheck", "GetDownloadSate5Min", "GetUploadState5min", "GetExportSate5min"]
      let requestArr = []
      for (let i = 0; i < arr.length; i++) {
        this.$set(this.tabData, arr[i], [])
        this.$set(this.tabData[arr[i]], "isLoading", true)
        // requestArr.push(this.getData(item))
        await this.getData(arr[i])
      }
      // let p = { MachineID: "PC05", QTY: "0", Yield: "0%", Time: "2023/07/10 12:00:31" }
      // this.tabData["GetExportSate5min"].push(p)
      // await Promise.all(requestArr)
      // this.$store.commit("fullLoading/SET_FULLLOADING", false)
      // console.log(this.tabData)
      if (this.flag === 1) {
        this.computedErrorNum()
      }
    },
    async leftInitData() {
      let arr = ["PackageState", "SonoState", "FeeState"]
      let requestArr = []
      for (let i = 0; i < arr.length; i++) {
        this.$set(this.tabData, arr[i], [])
        this.$set(this.tabData[arr[i]], "isLoading", true)
        await this.getData(arr[i])
      }

      // let o = {
      //   Deviceno: "APM0088",
      //   ExportFailSonoQty: 1,
      //   SonoQty: 0,
      //   Time: "2023-07-10 10:16:32",
      //   TimesPan: "2023-07-08 00:00:00—2023-07-09 23:59:59"
      // }
      // this.tabData["SonoState"] && this.tabData["SonoState"].push(o)
      if (this.flag === 1) {
        this.computedErrorNum1()
      }
    },

    // 获取数据
    async getData(i) {
      let res = await GetFdrHeartCheck(i)
      this.$set(this.tabData, i, res.Resultvalue || [])
      if (this.tabData[i].length >= 0) {
        this.tabData[i].isLoading = false
      }
    },

    surePlay() {
      this.$refs.alarmsaudio.pause()
      this.dialogPlay = false
      this.computedErrorNum()
      this.computedErrorNum1()
      this.flag = 1
    },
    // 计算弹出警示框并报警(播放mp3音频)
    computedErrorNum() {
      Object.keys(this.tabData).forEach((key) => {
        if (key == "FdrHeartCheck" || key == "FdrJmetHeartCheck") {
          this.tabData[key] &&
            this.tabData[key].forEach((item) => {
              let times = new Date()
              times = moment().format("YYYY-MM-DD HH:mm:ss")
              let dataDiff = this.getDateDiff(times, item.Time, "hour")
              if ((item.Status != undefined && item.Status !== "0") || dataDiff <= -1) {
                this.dialogVisible = true
                this.alarmsText = "發生錯誤請上傳LOG及發信給客戶"
                this.$refs.alarmsaudio.currentTime = 0 //从头开始播放提示音
                this.$refs.alarmsaudio.play() //播放
              }
            })
        } else {
          this.tabData[key].forEach((item) => {
            if (String(item.Yield).includes("%") && parseFloat(item.Yield) >= 95) {
              this.dialogVisible = true
              this.alarmsText = "發生錯誤請檢查並通知白班人員"
            }
          })
        }
      })
    },
    computedErrorNum1() {
      Object.keys(this.tabData).forEach((key) => {
        if (key == "SonoState") {
          this.tabData[key] &&
            this.tabData[key].forEach((item) => {
              if (item.ExportFailSonoQty != undefined && item.ExportFailSonoQty != "0") {
                this.dialogVisible = true
                this.alarmsText = "發生錯誤請上傳LOG及發信給客戶"
                this.$refs.alarmsaudio.currentTime = 0 //从头开始播放提示音
                this.$refs.alarmsaudio.play() //播放
              }
            })
        }
      })
    },
    sure() {
      this.dialogVisible = false
      this.$refs.alarmsaudio.pause()
    },
    // 当Time和Nowtime差距大于8分钟，对应的行红色显示
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // console.log("column", column)
      let property = column.property
      if (columnIndex === 3 && row[property] && row.Status !== undefined) {
        let times = new Date()
        times = moment().format("YYYY-MM-DD HH:mm:ss")
        let rows = row[property]
        let dataDiff = this.getDateDiff(times, rows, "hour")
        if (dataDiff <= -2) {
          this.$set(row, "showPurple", true)
        } else if (dataDiff <= -1) {
          this.$set(row, "showRed", true)
          // return { background: "#ff80ff", color: "#000" }
        }
      } else if (columnIndex === 2 && row[property] && String(row[property]).includes("%")) {
        if (parseFloat(row[property]) >= 95) {
          this.$set(row, "show", true)
          // return { background: "#ff80ff", color: "#000" }
        }
      } else if (row.Status && row.Status != "0") {
        this.$set(row, "show", true)
      }
    },
    cellStyle1({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 4 && row.ExportFailSonoQty !== undefined) {
        if (row.ExportFailSonoQty && row.ExportFailSonoQty != "0") {
          this.$set(row, "show", true)
        }
      }
    },
    // 对应的行变颜色
    tableRowStyle({ row }) {
      if (row.showRed === true) {
        return { background: "red", color: "#000" }
      } else if (row.showPurple === true) {
        return { background: "purple", color: "#000" }
      } else if (row.show === true) {
        return { background: "#ff80ff", color: "#000" }
      } else {
        return { background: "transparent" }
      }
    },
    tableRowStyle1({ row }) {
      if (row.show === true) {
        return { background: "#ff80ff", color: "#000" }
      } else {
        return { background: "transparent" }
      }
    },
    // 计算时间差
    getDateDiff(startTime, endTime, diffType) {
      //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
      startTime = startTime.replace(/\-/g, "/")
      endTime = endTime.replace(/\-/g, "/")
      //将计算间隔类性字符转换为小写
      diffType = diffType.toLowerCase()
      let sTime = new Date(startTime) //开始时间
      let eTime = new Date(endTime) //结束时间
      //作为除数的数字
      let timeType = 1
      switch (diffType) {
        case "second":
          timeType = 1000
          break
        case "minute":
          timeType = 1000 * 60
          break
        case "hour":
          timeType = 1000 * 3600
          break
        case "day":
          timeType = 1000 * 3600 * 24
          break
        default:
          break
      }
      return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType))
    }
  },

  beforeDestroy() {
    clearInterval(this.dataTiming)
    clearInterval(this.dataTiming1)
    this.$nextTick(() => {
      //在数据加载完，重新渲染表格,防止显示隐藏表格列出现闪动的问题
      this.$refs["reportTable"].doLayout()
    })
  }
}
</script>

<style lang="scss" scoped>
#index {
  color: #fff;
  background-color: #020308;
  width: 1920px;
  height: 1080px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;
  box-sizing: border-box;
  background: #020308;
}
.page-mian {
  display: flex;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
  height: calc(100% - 120px);
  margin-top: 10px;
  overflow: auto;
}
.text {
  position: absolute;
  color: #fff;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
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
.table-isloading {
  border: 2px solid #1683af;
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
.dialogText {
  font-size: 16px;
}
::v-deep .el-dialog__body {
  text-align: center;
}
::v-deep .el-button {
  font-size: 16px;
}
.leftTable,
.rightTable {
  width: 950px !important;
  overflow: overlay;
  height: 86%;
}
</style>
