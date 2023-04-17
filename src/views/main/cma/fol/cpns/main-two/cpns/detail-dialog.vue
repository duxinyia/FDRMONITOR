<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :before-close="toClose"
    :close-on-click-modal="false"
    top="20vh"
    width="65%"
  >
    <dv-border-box-11 :title="combineID" :key="Date.now()">
      <svg-icon class="closeIcon" icon-class="close" @click="toClose" />
      <div class="container">
        <div class="left">
          <div v-for="item in infoArr" :key="item.id">
            <span>{{ item.text }}:</span>
            <span>{{ item.data }}</span>
          </div>
          <!-- top5 -->
          <span class="efficiency-title">效率損失Top5:</span>
          <div v-for="(item, index) in efficiencyLoss" :key="item.errormsg" class="efficiency">
            {{ index + 1 }}. {{ item.errormsg }} {{ item.rate }}
          </div>
        </div>
        <div class="right">
          <div class="right-one">
            <el-table :data="oneTableData" border style="width: 100%">
              <template v-for="item in oneConfigArr">
                <el-table-column
                  :key="item.name"
                  :prop="item.prop"
                  :label="item.label"
                  :width="item.width"
                  align="center"
                ></el-table-column>
              </template>
            </el-table>
          </div>
          <div class="right-two">
            <base-echart height="200px" :options="options" />
          </div>
          <div class="right-three" :style="changeRightStyle">
            <div v-for="(item, index) in threeTable" :key="index" class="grid-item" :style="changeItemStyle(item)">
              {{ item.carrierXYRate || "" }}
            </div>
          </div>
        </div>
      </div>
    </dv-border-box-11>
  </el-dialog>
</template>

<script>
// 导入发送请求的函函數
import { GetMachineProductInfo, GetAOIScanInfo, GetConcentrationInfo } from "@/api/cma/fol.js"
// 导入基础模板
import baseEchart from "@/common/echart"
export default {
  name: "detail-dialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    combineID: {
      type: String,
      default: "标题"
    }
  },
  components: {
    baseEchart
  },
  data() {
    return {
      infoArr: [
        { id: 1, text: "日期", data: "5/28" },
        { id: 2, text: "機種", data: "ML-K" },
        { id: 3, text: "產出", data: "" },
        { id: 4, text: "當機時長", data: "" }
      ],
      efficiencyLoss: [],
      oneConfigArr: [
        { label: "線體", prop: "line", width: 55 },
        { label: "檢測頭", prop: "header", width: 60 },
        { label: "輸入", prop: "input", width: 45 },
        { label: "檢測不良數", prop: "detect", width: 90 },
        { label: "檢測不良率", prop: "detectrate", width: 90 },
        { label: "清潔數量", prop: "clean", width: 70 },
        { label: "清除率", prop: "cleanrate", width: 80 },
        { label: "污染數量", prop: "contaminated", width: 100 },
        { label: "污染率", prop: "contaminatedrate" },
        { label: "最終不良數", prop: "failureunitafterAOI" },
        { label: "最終不良率", prop: "failurerate", width: 85 },
        { label: "最終良率", prop: "rate", width: 70 }
      ],
      oneTableData: [{}, {}],
      maxArr: [0, 0],
      threeTable: [],
      // 柱狀图和折线图的数据
      xData: [],
      inputData: [],
      defectData: [],
      cleanData: [],
      finalData: []
    }
  },
  computed: {
    changeRightStyle() {
      return {
        "grid-template": `repeat(${this.maxArr[1] + 1}, 1fr) / repeat(${this.maxArr[0] + 1}, 1fr)`
      }
    },
    options() {
      return {
        title: {
          text: "PP 12小時數據",
          left: "left",
          textStyle: {
            color: "#369fb5",
            fontWeight: "bold",
            fontSize: 18
          }
        },
        grid: {
          top: 40,
          right: 38,
          left: 38,
          bottom: 30 //图表尺寸大小
        },
        legend: [
          // Defect Rate
          {
            top: 0,
            right: 300,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 15
            },
            data: ["Defect Rate"]
          },
          // Clean Rate
          {
            top: 0,
            right: 190,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 12
            },
            data: ["Clean Rate"]
          },
          // Final Rate
          {
            top: 0,
            right: 90,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 12
            },
            data: ["Final Rate"]
          },
          // Inputs
          {
            top: 0,
            right: 8,
            textStyle: {
              color: "#FFF",
              fontSize: 12
            },
            data: ["Inputs"]
          }
        ],
        tooltip: {
          show: true,
          trigger: "axis", //axis , item
          backgroundColor: "RGBA(0, 49, 85, 1)",
          borderColor: "rgba(0, 151, 251, 1)",
          borderWidth: 1,
          borderRadius: 0,
          textStyle: {
            color: "#BCE9FC",
            fontSize: 16,
            align: "left"
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          color: "#59588D",
          data: this.xData,
          axisLabel: {
            margin: 10,
            color: "#EEEEEE",
            textStyle: {
              fontSize: 13
            }
          },
          axisLine: {
            lineStyle: {
              color: "#ffffff",
              opacity: 0.3
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#ffffff",
              opacity: 0.3
            }
          }
        },
        yAxis: [
          {
            position: "left",
            min: 0, // 指定最小值
            max: Math.ceil(Math.max.apply(null, this.inputData)) + 100, // 指定最大值
            axisLabel: {
              color: "#EEEEEE",
              textStyle: {
                fontSize: 12
              }
            },
            axisLine: {
              lineStyle: {
                color: "#ffffff",
                opacity: 0.3
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#ffffff",
                opacity: 0.3
              }
            }
          },
          {
            type: "value",
            // name: "right",
            min: 0, // 指定最小值
            //max: (value) => value.max,
            max: Math.ceil(Math.max.apply(null, this.finalData)) + 20, // 指定最大值
            position: "right",
            splitLine: {
              show: false
            },
            axisLabel: {
              color: "#EEEEEE",
              textStyle: {
                fontSize: 12
              },
              formatter: function (value) {
                return value + "%"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#fff",
                opacity: 0.3
              }
            }
          }
        ],
        series: [
          // 柱状 数据
          {
            type: "bar",
            name: "Inputs",
            data: this.inputData,
            barWidth: "16",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(48,227,235,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(16,127,212,1)"
                  }
                ])
              }
            },
            label: {
              normal: {
                show: true,
                position: "top",
                fontSize: 12,
                fontWeight: "bold",
                color: "#FFFFFF"
              }
            }
          },
          // 线数据 Defect Rate
          {
            name: "Defect Rate",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            symbolSize: 8,
            smooth: true, // 设置拆线平滑
            itemStyle: {
              normal: {
                color: "#52fea2"
              }
            },
            data: this.defectData
          },
          // 线数据 Clean Rate
          {
            name: "Clean Rate",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            symbolSize: 8,
            smooth: true, // 设置拆线平滑
            itemStyle: {
              normal: {
                color: "#1fedeb"
              }
            },
            data: this.cleanData
          },
          // 线数据 Final Rate
          {
            name: "Final Rate",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            symbolSize: 8,
            smooth: true, // 设置拆线平滑
            itemStyle: {
              normal: {
                color: "#f7a35c"
              }
            },
            data: this.finalData
          }
        ]
      }
    }
  },
  methods: {
    toClose() {
      this.$emit("update:dialogVisible", false)
    },
    // 根据坐标改变对应的值
    changeItemStyle(item) {
      // 最高值和最低值的背景不同
      let str = ""
      if (item.isHigh) {
        str = "#ff0066"
      }
      if (item.isSecond) {
        str = "#CD8162"
      }
      // 动态显示位置
      let [x, y] = item.carrierXY
      return {
        "grid-area": `${x}/${y}/${x + 1}/${y + 1}`,
        background: str
      }
    },
    async getData(combineID) {
      this.clean()
      let requestArr = [
        this.GetMachineProductInfo(combineID),
        this.GetAOIScanInfo(combineID),
        this.GetConcentrationInfo(combineID)
      ]
      let res = await Promise.all(requestArr)
      console.log("res======", res)
      if (res[1]) {
        this.$emit("update:dialogVisible", true)
      }
      this.$emit("getDetailSuccess")
    },
    // 获取左边的数据
    async GetMachineProductInfo(combineID) {
      let res = await GetMachineProductInfo(combineID)
      // 取出对应的数据
      let { deviceNo, date, actualOut, efficiencyLossTime, efficiencyLoss } = res
      this.infoArr[0].data = date
      this.infoArr[1].data = deviceNo
      this.infoArr[2].data = actualOut
      this.infoArr[3].data = (efficiencyLossTime / 60).toFixed(2) + " Min"
      this.efficiencyLoss = efficiencyLoss
      return res
    },
    // 获取 右边 1，2表格的数据
    async GetAOIScanInfo(combineID) {
      let res = await GetAOIScanInfo(combineID)
      // 第一个表的数据
      this.oneTableData = res.aoiScanInfoTotal
      // 第二个表的数据
      res.aoiScanInfoTimeSpan &&
        res.aoiScanInfoTimeSpan.forEach(({ date, input, detectrate = "0%", cleanrate = "0%", rate = "0%" }) => {
          this.xData.push(date.slice(5, 13))
          this.inputData.push(input * 1)
          this.defectData.push(detectrate.slice(0, detectrate.length - 1) * 1)
          this.cleanData.push(cleanrate.slice(0, cleanrate.length - 1) * 1)
          this.finalData.push(rate.slice(0, rate.length - 1) * 1)
        })
      return res
    },
    // 获取右边下方的表格数据  GetConcentrationInfo
    async GetConcentrationInfo(combineID) {
      try {
        let res = await GetConcentrationInfo(combineID)
        console.log("取右边下方的表格数据", res)
        this.threeTable = res
        // let maxXYRate = 0,
        //   minXYRate = 10
        let RateArr = []
        // 找到行和列的最大值
        res.forEach((item) => {
          let [_x, _y] = item.carrierXY.split("-")
          // 获得行和列的最大值
          if (_x * 1 > this.maxArr[0]) {
            this.$set(this.maxArr, 0, _x * 1)
          }
          if (_y * 1 > this.maxArr[1]) {
            this.$set(this.maxArr, 1, _y * 1)
          }
          //找到 carrierXYRate 的最大值 和最小值
          if (
            item.carrierXYRate &&
            !RateArr.includes(Number(item.carrierXYRate.slice(0, item.carrierXYRate.length - 1)))
          ) {
            RateArr.push(Number(item.carrierXYRate.slice(0, item.carrierXYRate.length - 1)))
            // if (Number(item.carrierXYRate.slice(0, item.carrierXYRate.length - 1)) > maxXYRate) {
            //   maxXYRate = Number(item.carrierXYRate.slice(0, item.carrierXYRate.length - 1))
            // }
            // if (Number(item.carrierXYRate.slice(0, item.carrierXYRate.length - 1)) < minXYRate) {
            //   minXYRate = Number(item.carrierXYRate.slice(0, item.carrierXYRate.length - 1))
            // }
          }
        })
        RateArr.sort((v1, v2) => v2 - v1)
        // 现在需要找到最大值和第二大的值    RateArr.sort((v1, v2) => v2 - v1),
        // console.log(
        //   "最大值和最小值:",
        //   RateArr.sort((v1, v2) => v2 - v1)
        // )

        // 处理坐标
        this.threeTable = this.threeTable.map((item) => {
          // XY:2-1 => 5-10  2-2 => 4-10
          let [x, y] = item.carrierXY.split("-") // X = 2 Y = 1
          let _y = this.maxArr[0] + 2 - Number(x) // this.maxArr[1] => 4
          let _x = this.maxArr[1] + 2 - Number(y) // this.maxArr[0] => 10
          item.carrierXY = [_x, _y]
          // 添加最大和第二大的标志
          // if (RateArr.length >= 2) {
          let [maxXYRate, secondRate] = RateArr
          if (item.carrierXYRate.includes(String(maxXYRate))) {
            item.isHigh = true
          }
          if (item.carrierXYRate.includes(String(secondRate))) {
            item.isSecond = true
          }
          // }
          // if (maxXYRate + "%" == item.carrierXYRate) {
          //   item.isHigh = true
          // }
          // if (minXYRate + "%" == item.carrierXYRate) {
          //   item.isLow = true
          // }
          return item
        })

        // 构造对象 加入原数组
        for (let i = this.maxArr[0], j = 2; i > 0; i--, j++) {
          // this.threeTable.push({ carrierXY: `1-${j}`, text: `${i}` })
          this.threeTable.push({ carrierXY: [1, j], carrierXYRate: `${i}` })
        }
        for (let i = this.maxArr[1], j = 2; i > 0; i--, j++) {
          // this.threeTable.push({ carrierXY: `${j}-1`, text: `${i}` })
          this.threeTable.push({ carrierXY: [j, 1], carrierXYRate: `${i}` })
        }
      } catch (err) {
        console.log("error", err)
        return undefined
      }
    },
    clean() {
      this.oneTableData = [{}, {}]
      this.xData = []
      this.inputData = []
      this.defectData = []
      this.cleanData = []
      this.finalData = []
    }
  }
}
</script>

<style lang="scss" scoped>
//整个table的背景颜色
::v-deep .el-table {
  font-size: 15px !important;
  color: #fff;
  border-top: 1px solid #1683af;
  border-left: 1px solid #1683af;
  background-color: transparent !important; //主体框透明透明
}
::v-deep .cell {
  padding: 0px !important;
}
::v-deep .el-table th {
  color: #1adafb;
  padding: 3px 0 !important;
  background-color: transparent;
  border-right: 1px solid #1683af;
  border-bottom: 1px solid #1683af !important;
}
::v-deep .el-table td {
  padding: 3px 0 !important;
  border-right: 1px solid #1683af;
  border-bottom: 1px solid #1683af;
}
::v-deep .el-table tr {
  background-color: transparent !important; //每一行透明
}
::v-deep .el-table::before,
.el-table::after {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
::v-deep .el-table tbody tr:hover > td {
  background-color: transparent !important;
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

.container {
  height: 480px;
  display: flex;
  .left {
    flex: 2;
    font-size: 16px;
    line-height: 1.8em;
    flex-shrink: 0;
    padding: 15px 0 0 15px;
    margin-right: 10px;
    color: rgb(243, 229, 229);
    background: rgba(22, 131, 175, 0.4);
    .efficiency {
      text-indent: 1em;
    }
  }
  .right {
    flex: 8;
    flex-shrink: 0;
    font-size: 16px;
    .right-one {
      margin-bottom: 10px;
      color: rgba(255, 255, 255, 0.6);
    }
    .right-two {
      margin-bottom: 20px;
    }

    .right-three {
      display: grid;
      // justify-content: center;
      // align-content: center;
      color: #fff;
      background: transparent;
      height: 150px;
      border: 1px solid #1683af;
      .grid-item {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #1683af;
      }
    }
  }
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
</style>
