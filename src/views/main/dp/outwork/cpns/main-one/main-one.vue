<template>
  <div class="main-one">
    <div v-for="(item, index) in 3" class="container" :key="index">
      <dv-border-box-11 :title="title[index]">
        <el-table :data="configArr[index]">
          <el-table-column align="center" prop="a" label="計畫開線"></el-table-column>
          <el-table-column align="center" prop="b" label="實際開線"></el-table-column>
          <el-table-column align="center" prop="c" label="計書出勤"></el-table-column>
          <el-table-column align="center" prop="d" label="D實際出勤"></el-table-column>

          <el-table-column align="center" prop="e" label="N實際出勤"></el-table-column>
          <el-table-column align="center" prop="f" label="出勤率"></el-table-column>
        </el-table>
      </dv-border-box-11>
    </div>
  </div>
</template>
<script>
export default {
  name: "main-one",
  data() {
    return {
      loading: false,
      configArr: [
        [{ a: 10, b: 11, c: 180, d: 87, e: 60, f: "95.00%" }],
        [{ a: 10, b: 11, c: 180, d: 87, e: 60, f: "95.00%" }],
        [{ a: 10, b: 11, c: 180, d: 87, e: 60, f: "95.00%" }]
      ],
      title: ["SMT", "FOL", "EOL"]
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 60px 20px 20px 20px !important;
}

.el-table,
.el-table__expanded-cell {
  background-color: transparent;
  font-size: 18px;
}
::v-deep .el-table th.el-table__cell {
  background-color: transparent;
  color: rgb(26, 218, 251);
}
::v-deep .el-table .el-table__cell {
  padding: 10px 0px;
}
::v-deep .el-table::before {
  display: none;
}
::v-deep th {
  border-bottom: none !important;
}
::v-deep td {
  border-bottom: none !important;
}
//表格整行的颜色
::v-deep .el-table tr {
  background-color: transparent !important;
  color: #fff;
}
::v-deep .el-table th.el-table__cell > .cell {
  padding: 0px;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background: transparent;
}
.main-one {
  display: flex;
  justify-content: space-around;
  .container {
    flex: 1;
  }
}
</style>
