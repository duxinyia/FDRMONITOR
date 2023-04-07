<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :before-close="toClose"
    :close-on-click-modal="false"
    top="20vh"
    width="85%"
  >
    <svg-icon class="closeIcon" icon-class="close" @click="toClose" />
    <div style="height: 500px">
      <el-table
        :data="tableData1"
        :header-cell-style="{ background: 'transparent', color: '#fff' }"
      >
        <el-table-column prop="Device" width="80" align="center" label="不良类别">
          <el-table-column
            prop="Machine"
            width="80"
            align="center"
            label="机台号"
          ></el-table-column>
        </el-table-column>
        <el-table-column prop="Machine" align="center" label="VCM area">
          <el-table-column
            prop="Machine"
            width="80"
            align="center"
            label="Target"
          ></el-table-column>
          <el-table-column prop="Machine" width="80" align="center" label="Input"></el-table-column>
        </el-table-column>
        <el-table-column prop="Machine" align="center" label="2022/11/16">
          <el-table-column
            prop="Machine"
            align="center"
            label="Top VCM surface Scratch"
          ></el-table-column>
          <el-table-column
            prop="Machine"
            align="center"
            label="Top VCM surface Contamination"
          ></el-table-column>
        </el-table-column>
        <el-table-column prop="Machine" align="center" label="2022/11/15">
          <el-table-column
            prop="Machine"
            align="center"
            label="Top VCM surface Scratch"
          ></el-table-column>
          <el-table-column
            prop="Machine"
            align="center"
            label="Top VCM surface Contamination"
          ></el-table-column>
        </el-table-column>
        <el-table-column prop="Machine" align="center" label="2022/11/14">
          <el-table-column
            prop="Machine"
            align="center"
            label="Top VCM surface Scratch"
          ></el-table-column>
          <el-table-column
            prop="Machine"
            align="center"
            label="Top VCM surface Contamination"
          ></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "detail-dialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    combineID: {
      type: String,
      default: "这是标题"
    }
  },
  data() {
    return {}
  },
  methods: {
    toClose() {
      this.$emit("update:dialogVisible", false)
    }
  }
}
</script>

<style lang="scss" scoped>
/* 修改表格的一些样式 */
::v-deep .el-table {
  background: transparent;
  border: 1px solid #1683af;
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

// 弹出框的样式
::v-deep .el-dialog__header {
  display: none;
}
::v-deep .el-dialog__body {
  padding: 10px 5px 5px 5px;
  background: #00132a;
  min-width: 1200px;
}
::v-deep .border-box-content {
  padding: 60px 20px 20px 20px;
}
::v-deep .dv-border-box-11-title {
  font-size: 20px !important;
  font-weight: normal !important;
}

.closeIcon {
  width: 30px;
  height: 30px;
  color: #2d66e2;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transform: rotate(90deg);
  }
}
</style>
