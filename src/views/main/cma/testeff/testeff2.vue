<template>
  <div class="page-main">
    <dv-border-box-12 class="wrapper-container">
      <el-row :gutter="20">
        <el-col :span="12">
          <ces-table :tableData="tableData" :tableCols="tableCols" tableHeight="900">
            <template #batch="{ row }">
              <span class="batch" @click="openDetail">{{ row.batch }}</span>
            </template>
          </ces-table>
        </el-col>
        <el-col :span="12">
          <ces-table :tableData="tableData" :tableCols="tableCols" tableHeight="900"> </ces-table
        ></el-col>
      </el-row>
      <el-dialog
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        :before-close="toClose"
        :close-on-click-modal="false"
      >
        <dv-border-box-11 title="ACF Cube Plasma 看板" class="dialog">
          <svg-icon class="closeIcon" icon-class="close" @click="toClose" />
          <el-row class="des">
            <el-col :span="12">幾種:MW-E</el-col>
            <el-col :span="12">Plasma machineno:MW-E</el-col>
            <el-col :span="12">批號:MW-E</el-col>
            <el-col :span="12">Plasma 上機時間:MW-E</el-col>
          </el-row>
          <ces-table :tableData="tableData1" :tableCols="tableCols1" tableHeight="300"> </ces-table>
        </dv-border-box-11>
      </el-dialog>
    </dv-border-box-12>
  </div>
</template>
<script>
// 导入子组件
import mainOne from "./cpns/main-one/main-one.vue"
export default {
  name: "testeff",
  components: {
    mainOne
  },
  data() {
    return {
      dialogVisible: true,
      // 表格的数据
      tableData: [
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" }
      ],
      // 表格列配置
      tableCols: [
        { id: "device", name: "幾種" },
        { id: "machineno", name: "Plasma machineno" },
        { id: "time", name: "Plasma 上機時間" },
        { id: "batch", name: "批號" },
        { id: "Stangingtime", name: "Stangingtime" }
      ],
      // 表格的數據
      tableData1: [
        { device: "Cube Plasma tray 1", machineno: "2023/02/10 07:398", time: "4.35" },
        { device: "Cube Plasma tray 1", machineno: "2023/02/10 07:398", time: "4.35" },
        { device: "Cube Plasma tray 1", machineno: "2023/02/10 07:398", time: "4.35" },
        { device: "Cube Plasma tray 1", machineno: "2023/02/10 07:398", time: "4.35" }
      ],
      // 表格的列配置
      tableCols1: [
        { id: "device", name: "Tray ID" },
        { id: "machineno", name: "Tray Plasma时间" },
        { id: "time", name: "Stanging Time" }
      ]
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "Test效率看板")
  },
  methods: {
    openDetail() {
      console.log("openDetail")
    },
    toClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.page-main {
  height: calc(100% - 120px);
  margin-top: 10px;
}
/* 重置  的样式 */

.wrapper-container {
  /* padding: 20px !important; */
  ::v-deep .border-box-content {
    padding: 20px;
  }
}
.dialog {
  ::v-deep .border-box-content {
    padding: 60px 20px 20px 20px;
  }
}
// 弹出框的样式
::v-deep .el-dialog__header {
  display: none;
}
::v-deep .el-dialog__body {
  padding: 0px;
  background: #00132a;
}
.batch {
  cursor: pointer;
}
.closeIcon {
  position: absolute;
  right: 4px;
  top: 2px;
  width: 30px;
  height: 30px;
  color: #2d66e2;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transform: rotate(90deg);
  }
}

.des {
  color: #fff;
  font-size: 16px;
  ::v-deep .el-col {
    padding-left: 20px;
    margin-bottom: 10px;
  }
}
</style>
