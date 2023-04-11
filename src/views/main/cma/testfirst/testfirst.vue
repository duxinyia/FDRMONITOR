<template>
  <div class="page-main">
    <dv-border-box-12>
      <el-tabs type="card">
        <el-tab-pane label="Output">
          <div style="display: flex">
            <div>
              <el-table
                :data="tableData1"
                :header-cell-style="{ background: 'transparent', color: '#fff' }"
              >
                <el-table-column
                  width="65"
                  prop="Device"
                  align="center"
                  label="Device"
                ></el-table-column>
                <el-table-column
                  width="65"
                  prop="Machine"
                  align="center"
                  label="Machine"
                ></el-table-column>
                <el-table-column
                  width="65"
                  prop="Station"
                  align="center"
                  label="Station"
                ></el-table-column>
                <el-table-column
                  width="65"
                  prop="Target"
                  align="center"
                  label="Target"
                ></el-table-column>
                <el-table-column label="N" align="center">
                  <el-table-column
                    width="65"
                    prop="city1"
                    align="center"
                    label="Avg"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city2"
                    align="center"
                    label="03/20"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city3"
                    align="center"
                    label="03/21"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city4"
                    align="center"
                    label="03/22"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city5"
                    align="center"
                    label="03/23"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city6"
                    align="center"
                    label="03/24"
                  ></el-table-column>
                </el-table-column>
                <el-table-column label="H" align="center">
                  <el-table-column
                    width="65"
                    prop="city7"
                    align="center"
                    label="h1"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city8"
                    align="center"
                    label="h12"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city9"
                    align="center"
                    label="h3"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city10"
                    align="center"
                    label="h4"
                  ></el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div style="padding: 0px 20px">
              <el-table
                :data="tableData"
                :header-cell-style="{ background: 'transparent', color: '#fff' }"
              >
                <el-table-column prop="date" align="center" label="Taget"> </el-table-column>
                <el-table-column label="N" align="center">
                  <el-table-column
                    width="65"
                    prop="city1"
                    align="center"
                    label="Avg"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city2"
                    align="center"
                    label="03/20"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city3"
                    align="center"
                    label="03/21"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city4"
                    align="center"
                    label="03/22"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city5"
                    align="center"
                    label="03/23"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city6"
                    align="center"
                    label="03/24"
                  ></el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div>
              <el-table
                :data="tableData"
                :header-cell-style="{ background: 'transparent', color: '#fff' }"
              >
                <el-table-column width="65" prop="date" align="center" label="Taget">
                </el-table-column>
                <el-table-column label="N" align="center">
                  <el-table-column
                    width="65"
                    prop="city1"
                    align="center"
                    label="Avg"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city2"
                    align="center"
                    label="03/20"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city3"
                    align="center"
                    label="03/21"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city4"
                    align="center"
                    label="03/22"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city5"
                    align="center"
                    label="03/23"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city6"
                    align="center"
                    label="03/24"
                  ></el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Efficiency rate">
          <div style="display: flex">
            <div>
              <el-table
                :data="tableData1"
                :header-cell-style="{ background: 'transparent', color: '#fff' }"
              >
                <el-table-column
                  width="65"
                  prop="Device"
                  align="center"
                  label="Device"
                ></el-table-column>
                <el-table-column
                  width="65"
                  prop="Machine"
                  align="center"
                  label="Machine"
                ></el-table-column>
                <el-table-column
                  width="65"
                  prop="Station"
                  align="center"
                  label="Station"
                ></el-table-column>
                <el-table-column
                  width="65"
                  prop="Target"
                  align="center"
                  label="Target"
                ></el-table-column>
                <el-table-column label="N" align="center">
                  <el-table-column
                    width="65"
                    prop="city1"
                    align="center"
                    label="Avg"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city2"
                    align="center"
                    label="03/20"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city3"
                    align="center"
                    label="03/21"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city4"
                    align="center"
                    label="03/22"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city5"
                    align="center"
                    label="03/23"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city6"
                    align="center"
                    label="03/24"
                  ></el-table-column>
                </el-table-column>
                <el-table-column label="H" align="center">
                  <el-table-column
                    width="65"
                    prop="city7"
                    align="center"
                    label="h1"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city8"
                    align="center"
                    label="h12"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city9"
                    align="center"
                    label="h3"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city10"
                    align="center"
                    label="h4"
                  ></el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div style="padding: 0px 20px">
              <el-table
                :data="tableData"
                :header-cell-style="{ background: 'transparent', color: '#fff' }"
              >
                <el-table-column prop="date" align="center" label="Taget"> </el-table-column>
                <el-table-column label="N" align="center">
                  <el-table-column
                    width="65"
                    prop="city1"
                    align="center"
                    label="Avg"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city2"
                    align="center"
                    label="03/20"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city3"
                    align="center"
                    label="03/21"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city4"
                    align="center"
                    label="03/22"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city5"
                    align="center"
                    label="03/23"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city6"
                    align="center"
                    label="03/24"
                  ></el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Output">
          <div style="display: flex">
            <div>
              <el-table
                :data="tableData1"
                :header-cell-style="{ background: 'transparent', color: '#fff' }"
              >
                <el-table-column
                  width="65"
                  prop="Device"
                  align="center"
                  label="Device"
                ></el-table-column>
                <el-table-column
                  width="65"
                  prop="Machine"
                  align="center"
                  label="Machine"
                ></el-table-column>
                <el-table-column
                  width="65"
                  prop="Station"
                  align="center"
                  label="Station"
                ></el-table-column>
                <el-table-column
                  width="65"
                  prop="Target"
                  align="center"
                  label="Target"
                ></el-table-column>
                <el-table-column label="N" align="center">
                  <el-table-column
                    width="65"
                    prop="city1"
                    align="center"
                    label="Avg"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city2"
                    align="center"
                    label="03/20"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city3"
                    align="center"
                    label="03/21"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city4"
                    align="center"
                    label="03/22"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city5"
                    align="center"
                    label="03/23"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city6"
                    align="center"
                    label="03/24"
                  ></el-table-column>
                </el-table-column>
                <el-table-column label="H" align="center">
                  <el-table-column
                    width="65"
                    prop="city7"
                    align="center"
                    label="h1"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city8"
                    align="center"
                    label="h12"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city9"
                    align="center"
                    label="h3"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city10"
                    align="center"
                    label="h4"
                  ></el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div style="padding: 0px 20px">
              <el-table
                :data="tableData"
                :header-cell-style="{ background: 'transparent', color: '#fff' }"
              >
                <el-table-column prop="date" align="center" label="Taget"> </el-table-column>
                <el-table-column label="N" align="center">
                  <el-table-column
                    width="65"
                    prop="city1"
                    align="center"
                    label="Avg"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city2"
                    align="center"
                    label="03/20"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city3"
                    align="center"
                    label="03/21"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city4"
                    align="center"
                    label="03/22"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city5"
                    align="center"
                    label="03/23"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city6"
                    align="center"
                    label="03/24"
                  ></el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div>
              <el-table
                :data="tableData"
                :header-cell-style="{ background: 'transparent', color: '#fff' }"
              >
                <el-table-column width="65" prop="date" align="center" label="Taget">
                </el-table-column>
                <el-table-column label="N" align="center">
                  <el-table-column
                    width="65"
                    prop="city1"
                    align="center"
                    label="Avg"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city2"
                    align="center"
                    label="03/20"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city3"
                    align="center"
                    label="03/21"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city4"
                    align="center"
                    label="03/22"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city5"
                    align="center"
                    label="03/23"
                  ></el-table-column>
                  <el-table-column
                    width="65"
                    prop="city6"
                    align="center"
                    label="03/24"
                  ></el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
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
      tableData: [
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" },
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" },
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" },
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" },
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" },
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" },
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" },
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" },
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" },
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" },
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" },
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" },
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" },
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" },
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" },
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" },
        { date: "1", city1: "2", city2: "2", city3: "3", city4: "4", city5: "5", city6: "6" }
      ],
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
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "Test一次不良Top15")
  }
}
</script>

<style lang="scss" scoped>
.page-main {
  height: calc(100% - 120px);
  margin-top: 10px;
}
/* 重置  的样式 */
::v-deep .border-box-content {
  padding: 20px;
}
/* 重置 el-tab 一些样式 */
::v-deep .el-tabs__item {
  color: #fff;
}
::v-deep .el-tabs__header {
  border-bottom: 1px solid #1683af;
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
