<template>
  <div class="page-main">
    <el-table :data="tableData1" :header-cell-style="{ background: 'transparent', color: '#fff' }">
      <el-table-column align="center">
        <template #header>
          <div class="table-header">
            <span></span>
            <span class="title">hello</span>
            <div class="selsect-container">
              <el-select @change="changeValue" size="mini" v-model="value" placeholder="">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </template>
        <el-table-column width="60" prop="Device" align="center" label="Testers"></el-table-column>
        <el-table-column width="60" prop="Machine" align="center" label="Input"></el-table-column>
        <el-table-column
          width="60"
          prop="Station"
          align="center"
          label="Hit Rate"
        ></el-table-column>
        <el-table-column width="60" prop="Target" align="center" label="First"></el-table-column>
        <el-table-column width="60" prop="Target" align="center" label="Sockets"></el-table-column>
        <el-table-column width="60" v-for="item in 12" :key="item" label="6-8" align="center">
          <el-table-column width="63" prop="city1" align="center" label="Input"></el-table-column>
          <el-table-column width="72" prop="city2" align="center" label="First Yield">
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "fixtrue",
  props: {},
  components: {},
  data() {
    return {
      tableData1: [],
      options: [],
      value: ""
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "Test治具良率看板")
  },
  methods: {
    changeValue() {}
  }
}
</script>

<style lang="scss" scoped>
.page-main {
  height: calc(100% - 120px);
  margin-top: 10px;
}

.table-header {
  display: flex;
  justify-content: space-between;

  .selsect-container {
    width: 100px;
    margin-right: 10px;
  }
}

/* 更改下拉框的背景色 */
::v-deep .el-input__inner {
  background: linear-gradient(58deg, #3f77e8, #243d97);
  color: #fff;
  font-size: 15px;
  height: 25px;
  border: none;
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
</style>
