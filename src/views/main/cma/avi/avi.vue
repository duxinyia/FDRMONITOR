<template>
  <div class="page-main">
    <dv-border-box-10>
      <el-table
        :data="tableData1"
        :header-cell-style="{ background: 'transparent', color: '#fff' }"
      >
        <el-table-column prop="Device" align="center" label="Device"></el-table-column>
        <el-table-column prop="Machine" align="center" label="Machine"></el-table-column>
        <el-table-column label="2023-03-30" align="center">
          <el-table-column prop="city1" align="center" label="Target"></el-table-column>
          <el-table-column prop="city2" align="center" label="Output"></el-table-column>
          <el-table-column prop="city3" align="center" label="HitRate"></el-table-column>
          <el-table-column prop="city4" align="center" label="FirstYield"></el-table-column>
          <el-table-column prop="city5" align="center" label="DPC"></el-table-column>
          <el-table-column prop="city6" align="center" label="LCB"></el-table-column>
          <el-table-column prop="city6" align="center" label="SFR"></el-table-column>
        </el-table-column>
        <el-table-column label="2023-03-29" align="center">
          <el-table-column prop="city1" align="center" label="Target"></el-table-column>
          <el-table-column prop="city2" align="center" label="Output"></el-table-column>
          <el-table-column prop="city3" align="center" label="HitRate"></el-table-column>
          <el-table-column prop="city4" align="center" label="FirstYield"></el-table-column>
          <el-table-column prop="city5" align="center" label="DPC"></el-table-column>
          <el-table-column prop="city6" align="center" label="LCB"></el-table-column>
          <el-table-column prop="city6" align="center" label="SFR"></el-table-column>
        </el-table-column>
        <el-table-column label="2023-03-28" align="center">
          <el-table-column prop="city1" align="center" label="Target"></el-table-column>
          <el-table-column prop="city2" align="center" label="Output"></el-table-column>
          <el-table-column prop="city3" align="center" label="HitRate"></el-table-column>
          <el-table-column prop="city4" align="center" label="FirstYield"></el-table-column>
          <el-table-column prop="city5" align="center" label="DPC"></el-table-column>
          <el-table-column prop="city6" align="center" label="LCB"></el-table-column>
          <el-table-column prop="city6" align="center" label="SFR"></el-table-column>
        </el-table-column>
      </el-table>
    </dv-border-box-10>
  </div>
</template>

<script>
export default {
  name: "avi",
  props: {},
  components: {},
  data() {
    return {
      tableData1: [
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          Target: "4",
          city1: "5",
          city2: "6",
          city3: "5",
          city4: "6",
          city5: "5",
          city6: "6",
          city7: "5",
          city8: "6",
          city9: "5",
          city10: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          Target: "4",
          city1: "5",
          city2: "6",
          city3: "5",
          city4: "6",
          city5: "5",
          city6: "6",
          city7: "5",
          city8: "6",
          city9: "5",
          city10: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          Target: "4",
          city1: "5",
          city2: "6",
          city3: "5",
          city4: "6",
          city5: "5",
          city6: "6",
          city7: "5",
          city8: "6",
          city9: "5",
          city10: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          Target: "4",
          city1: "5",
          city2: "6",
          city3: "5",
          city4: "6",
          city5: "5",
          city6: "6",
          city7: "5",
          city8: "6",
          city9: "5",
          city10: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          Target: "4",
          city1: "5",
          city2: "6",
          city3: "5",
          city4: "6",
          city5: "5",
          city6: "6",
          city7: "5",
          city8: "6",
          city9: "5",
          city10: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          Target: "4",
          city1: "5",
          city2: "6",
          city3: "5",
          city4: "6",
          city5: "5",
          city6: "6",
          city7: "5",
          city8: "6",
          city9: "5",
          city10: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          Target: "4",
          city1: "5",
          city2: "6",
          city3: "5",
          city4: "6",
          city5: "5",
          city6: "6",
          city7: "5",
          city8: "6",
          city9: "5",
          city10: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          Target: "4",
          city1: "5",
          city2: "6",
          city3: "5",
          city4: "6",
          city5: "5",
          city6: "6",
          city7: "5",
          city8: "6",
          city9: "5",
          city10: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          Target: "4",
          city1: "5",
          city2: "6",
          city3: "5",
          city4: "6",
          city5: "5",
          city6: "6",
          city7: "5",
          city8: "6",
          city9: "5",
          city10: "6"
        },
        {
          Device: "1",
          Machine: "2",
          Station: "3",
          Target: "4",
          city1: "5",
          city2: "6",
          city3: "5",
          city4: "6",
          city5: "5",
          city6: "6",
          city7: "5",
          city8: "6",
          city9: "5",
          city10: "6"
        }
      ]
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "AVI效率看板")
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
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
.page-main {
  height: calc(100% - 120px);
  margin-top: 10px;
}
</style>
