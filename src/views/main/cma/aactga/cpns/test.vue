<template>
  <div class="test-main">
    <el-row class="select-contaienr">
      <el-col
        v-for="(item, index) in options"
        @click.native="itemClick(index)"
        class="select-item"
        :key="item"
        :span="1"
        >{{ item }}</el-col
      >
      <!-- <el-col :span="1">JU-X</el-col>
      <el-col :span="1">JU-3X</el-col>
      <el-col :span="1">JU-4X</el-col> -->
    </el-row>
    <!-- 轮播图 -->
    <el-carousel
      style="height: 100%"
      indicator-position="none"
      :interval="150 * 1000"
      ref="carousel"
      arrow="never"
      @change="changeCarousel"
    >
      <el-carousel-item>
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
      </el-carousel-item>
      <el-carousel-item>
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
      </el-carousel-item>
    </el-carousel>
    <!-- <el-select v-model="value" placeholder="请选择" @change="changeValue">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select> -->
  </div>

  <!-- 详情弹框 -->
  <!-- <detail-dialog ref="dialog" :dialogVisible.sync="dialogVisible" /> -->
</template>

<script>
// 导入详情弹框
// import DetailDialog from "./cpns/detail-dialog.vue"
export default {
  name: "test",
  props: {},
  data() {
    return {
      dialogVisible: true,
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
      ],
      options: ["JU-X", "JU-2X", "JU-3X"],
      currentIndex: 0
    }
  },
  methods: {
    changeCarousel(index) {
      this.currentIndex = index
    },
    itemClick(index) {
      console.log("hello")
      this.$refs.carousel.setActiveItem(index)
      this.currentIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
}
.test-main {
  height: 100%;
}

.page-main {
  height: calc(100% - 120px);
  margin-top: 10px;
}

.select-contaienr {
  .select-item {
    border: 1px solid red;
    margin-right: 10px;
    padding: 5px 0px;
    text-align: center;
    cursor: pointer;
  }
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
