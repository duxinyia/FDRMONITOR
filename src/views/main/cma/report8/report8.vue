<template>
  <div class="page-mian">
    <!-- :cell-style="cellStyle" -->
    <el-table
      v-for="(taT, index) in tableTitle"
      :key="index"
      :data="tabData[taT.type]"
      :header-cell-style="{
        'font-size': '16px',
        color: '#fff',
        'font-weight': 700
      }"
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
</template>

<script>
import moment from "moment"
// 导入点击搜索数据
import { GetFdrHeartCheck } from "@/api/cma/report8"
export default {
  name: "report8",
  props: {},
  components: {},
  data() {
    return {
      isLoading: false,

      // 表头名称
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
            { id: "Yield", name: "Qty Last 5 minite" },
            { id: "QTY", name: "Failrate" },
            { id: "Time", name: "Time" }
          ]
        },
        {
          type: "GetUploadState5min",
          name: "FDR Upload State",
          chileColumn: [
            { id: "MachineID", name: "PC" },
            { id: "QTY", name: "Failrate" },
            { id: "Yield", name: "Qty Last 5 minite" },
            { id: "Time", name: "Time" }
          ]
        },
        {
          type: "GetExportSate5min",
          name: "FDR Export State",
          chileColumn: [
            { id: "MachineID", name: "PC" },
            { id: "QTY", name: "Failrate" },
            { id: "Yield", name: "Qty Last 5 minite" },
            { id: "Time", name: "Time" }
          ]
        }
      ],
      // 自己组成的新的表格数据
      tabData: {
        // FdrHeartCheck: [
        //   {
        //     MachineID: "PC01",
        //     Status: "0",
        //     Message: "SUCCESS",
        //     Time: "2023/05/30 08:28:04"
        //   }
        // ],
        // FdrJmetHeartCheck: [
        //   {
        //     MachineID: "PC02",
        //     Status: "0",
        //     Message: "SUCCESS",
        //     Time: "2023-05-27 16:19:03"
        //   }
        // ],
        // GetDownloadSate5Min: [
        //   {
        //     MachineID: "PC04",
        //     Status: "0",
        //     Message: "SUCCESS",
        //     Time: "2023-05-30 16:19:03"
        //   }
        // ],
        // GetUploadState5min: [
        //   {
        //     MachineID: "PC05",
        //     Status: "0",
        //     Message: "SUCCESS",
        //     Time: "2023-05-30 16:19:03"
        //   }
        // ],
        // GetExportSate5min: [
        //   {
        //     MachineID: "PC06",
        //     Status: "0",
        //     Message: "SUCCESS",
        //     Time: "2023-05-27 16:19:03"
        //   }
        // ]
      }
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "FDR MONITOR")
  },
  mounted() {
    this.initData()
  },

  watch: {},
  methods: {
    initData() {
      let arr = ["FdrHeartCheck", "FdrJmetHeartCheck", "GetDownloadSate5Min", "GetUploadState5min", "GetExportSate5min"]
      arr.forEach((item) => {
        this.getData(item)
      })
    },
    // 获取数据
    async getData(i) {
      this.isLoading = true
      let res = await GetFdrHeartCheck(i)
      // console.log(res)
      this.$set(this.tabData, i, res.Resultvalue)
      this.isLoading = false
    },
    // 当Time和Nowtime差距大于8分钟，对应的行红色显示
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // console.log("row", row)
      // console.log("column", column)
      let property = column.property
      if (columnIndex === 3 && row[property]) {
        let times = new Date()
        times = moment().format("YYYY-MM-DD HH:mm:ss")
        let rows = row[property]
        let dataDiff = this.GetDateDiff(times, rows, "minute")
        if (dataDiff > 8) {
          this.$set(row, "show", true)
          // return { background: "#ff80ff", color: "#000" }
        }
      }
    },
    tableRowStyle({ row }) {
      if (row.show === true) {
        return { background: "#ff80ff", color: "#000" }
      } else {
        return { background: "transparent" }
      }
    },
    // 计算时间差
    GetDateDiff(startTime, endTime, diffType) {
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
  }
}
</script>

<style lang="scss" scoped>
.page-mian {
  box-sizing: border-box;
  height: calc(100% - 120px);
  margin-top: 10px;
  overflow: auto;
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
</style>
