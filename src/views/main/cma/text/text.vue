<template>
  <div class="page-main">
    <el-table :data="tableData" :header-cell-style="{ background: 'transparent', color: '#fff' }">
      <el-table-column prop="Device" align="center" label="不良項目"></el-table-column>
      <el-table-column prop="Machine" align="center" label="機種"></el-table-column>
      <el-table-column prop="Station" align="center" label="战位"></el-table-column>
      <el-table-column label="日期" align="center">
        <el-table-column prop="date" align="center" :label="date"></el-table-column>
      </el-table-column>
      <el-table-column label="October" align="center">
        <el-table-column prop="c1" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="November" align="center">
        <el-table-column prop="c2" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="WK47" align="center">
        <el-table-column prop="c3" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="WK48" align="center">
        <el-table-column prop="c4" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="WK49" align="center">
        <el-table-column prop="c5" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="12/4" align="center">
        <el-table-column prop="c6" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="12/5" align="center">
        <el-table-column prop="c7" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="近三天平均" align="center">
        <el-table-column prop="c3" align="center"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "text",
  data() {
    return {
      date: "256",
      tableData: [{ Device: "1", Machine: "2", Station: "3", date: "5" }]
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "VA製程監控")
  }
}
</script>

<style lang="scss" scoped>
.page-main {
  height: calc(100% - 120px);
}

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
</style>
