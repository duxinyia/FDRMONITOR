<template>
  <div class="page-mian">
    <!-- 选择下拉框+搜索按钮 -->
    <div class="select-two">
      <div class="system-select" v-for="item in selectData" :key="item.name">
        <span>{{ item.name }}:</span>
        <el-select
          v-if="item.type == 'select'"
          :popper-append-to-body="false"
          v-model="item.value"
          placeholder="請選擇"
        >
          <el-option
            v-for="optionsItem in options[item.key]"
            :key="optionsItem.id"
            :label="optionsItem.id"
            :value="optionsItem.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-button icon="el-icon-search" class="btn" type="primary" round @click="getSearchData">查詢</el-button>
    </div>
    <!-- 图表 -->
    <div class="charts">
      <!-- 折线图 -->
      <line-chart v-if="flag === 1" class="echarts linecharts" :height="height" :config="lineChartConfig" />
      <!-- 饼图 -->
      <pie-chart class="echarts piecharts" v-if="flag === 0" :seriesData="seriesData" :height="height" />
      <!-- 柱状图 -->
      <bar-chart class="echarts barcharts" v-if="flag === 2" :barData="barData" :height="height" />
    </div>
  </div>
</template>

<script>
// 导入折线图
import LineChart from "./echarts/line-chart.vue"
import PieChart from "./echarts/pie-chart.vue"
import BarChart from "./echarts/bar-chart.vue"
export default {
  name: "report6",
  props: {},
  components: { PieChart, LineChart, BarChart },
  data() {
    return {
      height: "830px",
      barData: [
        ["product", "2015", "2016", "2017", "2018", "2019"],
        ["Matcha Latte", 43.3, 85.8, 93.7, 50, 35],
        ["Milk Tea", 83.1, 73.4, 55.1, 40, 76],
        ["Cheese Cocoa", 86.4, 65.2, 82.5, 50, 66],
        ["Walnut Brownie", 30, 53, 32, 80, 45],
        ["Brownie", 30, 53, 32, 80, 10]
      ],
      lineChartConfig: {
        legends: ["IOWA", "JU-X", "JU-2X", "MD-3X", "MD-2X", "ML-2X", "ML-X", "MW", "NH-2X", "Stanley"],
        xData: ["05-12", "05-13", "05-14", "05-15", "05-16", "05-17", "05-18", "05-19"],
        yData: [
          [0.3, 0.3, 0, 3, 3, 3, 1, 3],
          [5, 2, 0, 0, 0, 0, 1, 1],
          [1, 3, 5, 6, 1, 4, 3, 2],
          [3, 3, 0, 3, 3, 3, 1, 3],
          [1, 1, 1, 1, 1, 3, 1, 3],
          [4, 3, 2, 3, 0, 3, 1, 3],
          [1, 2, 0, 3, 3, 3, 1, 3],
          [3, 2, 0, 4, 4, 4, 3, 3]
        ]
      },
      seriesData: [
        { name: "MW", value: 3907700 },
        // { name: "MD-X", value: 34834 },
        { name: "Stanley", value: 2375878 },
        { name: "NH-X", value: 413372 },
        { name: "ML-3X", value: 37603 },
        { name: "ML-2X", value: 13794721 },
        { name: "JU-3X", value: 1362509 },
        { name: "JU-2X", value: 5429477 },
        { name: "JU-X", value: 2198291 },
        { name: "MD-2X", value: 2040755 },
        { name: "MD-3X", value: 12881302 },
        { name: "ML-X", value: 8795010 },
        { name: "NH-2X", value: 2668478 }
      ],
      isLoading: false,
      flag: 1,
      // 下拉框值
      selectData: [
        { name: "機臺類型", value: "", type: "select", key: "machineType" },
        { name: "維度", value: "", type: "select", key: "dimension" },
        { name: "圖表", value: "折线图", type: "select", key: "charts" }
      ],
      // 两个下拉框的选项
      options: {
        machineType: [
          {
            value: "Genius",
            label: "Genius"
          },
          {
            value: "MW-X2",
            label: "MW-X2"
          },
          {
            value: "MW-X3",
            label: "MW-X3"
          },
          {
            value: "MW-X4",
            label: "MW-X4"
          },
          {
            value: "MW-X5",
            label: "MW-X5"
          }
        ],
        dimension: [
          {
            value: "维度1",
            label: "维度1"
          },
          {
            value: "维度2",
            label: "维度2"
          },
          {
            value: "维度3",
            label: "维度4"
          },
          {
            value: "维度4",
            label: "维度4"
          },
          {
            value: "维度5",
            label: "维度5"
          }
        ],
        charts: [
          {
            value: "柱状图",
            label: "柱状图"
          },
          {
            value: "折线图",
            label: "折线图"
          },
          {
            value: "饼图",
            label: "饼图"
          }
        ]
      },
      // 从后端拿到的图表数据
      chartsData: [],
      // 自己组成的新的表格数据
      tabData: []
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "数据分析")
  },
  mounted() {
    this.getselectData()
  },

  watch: {},
  methods: {
    // 获取下拉框数据
    getselectData() {},

    // 点击搜索按钮
    getSearchData() {
      if (this.selectData[2].value === "饼图") {
        this.flag = 0
      } else if (this.selectData[2].value === "折线图") {
        this.flag = 1
      } else if (this.selectData[2].value === "柱状图") {
        this.flag = 2
      }
    },
    // 获取数据
    getData(inputD) {}
  }
}
</script>

<style lang="scss" scoped>
.page-mian {
  height: calc(100% - 120px);
  margin-top: 10px;
  // border: 1px solid red;
}

// 输入框的样式
.select-two {
  display: flex;
  height: 80px;
  padding: 10px 0px;
  border-radius: 4px;
  background: linear-gradient(90deg, rgba(36, 57, 73, 1) 0%, rgba(80, 126, 163, 1) 100%);
  border: 2px solid rgba(160, 190, 250, 1);
  .btn {
    font-size: 14px;
    width: 88px;
    height: 34px;
    border-radius: 95px;
    background: rgba(0, 143, 253, 1);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    margin-left: 72px;
    padding-left: 18px;
    padding-top: 9px;
    margin-top: 11px;
  }
}
::v-deep .el-select .el-input .el-select__caret {
  color: rgba(128, 128, 128, 1);
}
.charts {
  border-radius: 4px;
  border: 2px solid rgba(160, 190, 250, 1);
  margin: 20px 0 20px 0;
  .echarts {
    margin-top: 20px;
  }
}
.system-select {
  align-items: center;
  margin-top: 8px;
  span {
    font-size: 16px;
    padding: 0 10px 0 25px;
  }
}
::v-deep .el-scrollbar {
  width: 238px;
}
::v-deep .el-input--suffix .el-input__inner {
  z-index: 100;
  border: 0px solid #fff;
  border-radius: 4px;
  background: rgba(255, 255, 255, 1);
  font-size: 16px;
  color: rgba(128, 128, 128, 1);
}
</style>
