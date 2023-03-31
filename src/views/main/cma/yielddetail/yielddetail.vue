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
        <el-table-column prop="c1" label="0.300%" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="November" align="center">
        <el-table-column prop="c2" label="0.300%" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="WK47" align="center">
        <el-table-column prop="c3" label="0.300%" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="WK48" align="center">
        <el-table-column prop="c4" label="0.300%" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="WK49" align="center">
        <el-table-column prop="c5" label="0.300%" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="12/4" align="center">
        <el-table-column prop="c6" label="0.300%" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="12/5" align="center">
        <el-table-column prop="c7" label="0.300%" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="近三天平均" align="center">
        <el-table-column prop="c8" label="0.300%" align="center"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "text1",
  data() {
    return {
      date: "256",
      tableData: [
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          date: "5",
          c1: "6",
          c2: "6",
          c3: "6",
          c4: "6",
          c5: "6",
          c6: "6",
          c7: "6",
          c8: "6"
        }
      ]
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "FOL LCB 差异层别")
  }
}
</script>

<style lang="scss" scoped>
.page-main {
  margin-top: 10px;
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
