<template>
  <div>
    <page-header title="製造戰情中心" />
    <!-- 主要区域 -->
    <div class="page-main">
      <!-- 统计区域 -->
      <div class="count-container">
        <div v-for="(item, index) in configArr" class="container" :key="index">
          <dv-border-box-10>
            <div>
              <el-table :data="item" :header-cell-style="getRowClass">
                <el-table-column align="center" prop="productArea" label="名称"> </el-table-column>
                <el-table-column align="center" prop="totalCount" label="計畫"> </el-table-column>
                <el-table-column align="center" prop="hitCount" label="達成機種"> </el-table-column>
                <el-table-column align="center" prop="notHitCount" label="未達成">
                </el-table-column>
                <el-table-column align="center" width="100" prop="hitRate" label="達成率">
                </el-table-column>
              </el-table>
            </div>
          </dv-border-box-10>
        </div>

        <div class="control">
          <div class="fol-container" @click="folChecked = !folChecked">
            <span
              class="frame"
              :style="{
                'box-shadow': folChecked ? 'inset 0 0 20px #3762ff' : ''
              }"
            ></span>
            <span class="name">FOL</span>
          </div>
          <div class="eol-container" @click="eolChecked = !eolChecked">
            <span
              class="frame"
              :style="{
                'box-shadow': eolChecked ? 'inset 0 0 20px #3762ff' : ''
              }"
            ></span>
            <span class="name">EOL</span>
          </div>
        </div>
      </div>
      <!-- 下面的区域 -->
      <dv-border-box-13 :key="Date.now()">
        <div class="table-chart">
          <template v-for="(item, index) in outPutInfoDetails">
            <container
              :eolChecked="eolChecked"
              :folChecked="folChecked"
              :device="item.device"
              :dateValues="item.dateValues"
              :key="index"
              :maxOutput="maxOutput[index]"
              :maxTargetOut="maxTargetOut[index]"
            />
          </template>
        </div>
      </dv-border-box-13>
    </div>
  </div>
</template>

<script>
// 导入发送请求的函函數
import { GetProductInfo } from "@/api/makewar.js"
// 导入头部
import PageHeader from "@/components/page-header/index.vue"
// 导入子组件
import container from "./cpns/container.vue"
export default {
  name: "makewar",
  components: {
    PageHeader,
    container
  },
  data() {
    return {
      eolChecked: true,
      folChecked: true,
      configArr: [],
      outPutInfoDetails: [],
      maxOutput: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      maxTargetOut: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_FULLLOADING", true)
    this.initData()
  },
  methods: {
    async initData() {
      let requestArr = [this.GetProductInfo()]
      await Promise.all(requestArr)
      this.$store.commit("fullLoading/SET_FULLLOADING", false)
    },
    // 获取数据
    async GetProductInfo() {
      let res = await GetProductInfo()
      console.log("res44", res)
      res.hitStatistics.forEach((item) => {
        item.hitRate = parseInt(item.hitRate) + "%"
      })
      // 上方数据
      this.configArr = [[res.hitStatistics[0]], [res.hitStatistics[1]]]
      // 下方数据
      this.outPutInfoDetails = res.outPutInfoDetails
      // 找到最大值
      res.outPutInfoDetails.forEach((item, index) => {
        // let tempMax = 0
        item.dateValues.forEach((childItem) => {
          // childItem.values.EOL.output  取出的是 output 的最大值
          if (childItem.values.EOL.output > this.maxOutput[index]) {
            this.maxOutput[index] = childItem.values.EOL.output
          }
          // childItem.values.FOL.output
          if (childItem.values.FOL.output > this.maxOutput[index]) {
            this.maxOutput[index] = childItem.values.FOL.output
          }

          // childItem.values.EOL.output  取出的是 output 的最大值
          if (childItem.values.EOL.targetOut > this.maxTargetOut[index]) {
            this.maxTargetOut[index] = childItem.values.EOL.targetOut
          }
          // childItem.values.FOL.output
          if (childItem.values.FOL.targetOut > this.maxTargetOut[index]) {
            this.maxTargetOut[index] = childItem.values.FOL.targetOut
          }
        })
      })
    },
    getRowClass() {
      return "background:transparent !important;color:#1adafb;"
    }
    // changeEol() {
    //   this.eolChecked = !this.eolChecked
    // },
    // changeFol() {
    //   this.folChecked = !this.folChecked
    // }
  },
  beforeDestroy() {
    clearInterval(this.dataTiming)
  }
}
</script>

<style lang="scss" scoped>
//整个table的背景颜色
::v-deep .el-table,
.el-table__expanded-cell {
  background-color: transparent;
  color: white;
  font-size: 18px;
}
::v-deep th {
  padding: 2px 0 !important;
  border-bottom: none !important;
}
::v-deep th .cell {
  padding: 0 4px !important;
}
::v-deep td {
  padding: 4px 0 !important;
  border-bottom: none !important;
}
//表格整行的颜色
::v-deep .el-table tr {
  background-color: transparent !important;
}
::v-deep .el-table tbody tr:hover > td {
  background-color: #001229 !important;
}
::v-deep .border-box-content {
  padding: 15px;
}
.page-main {
  margin-top: 10px;
}
.table-chart {
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(5, 1fr);
  justify-content: space-between;
}
.count-container {
  display: flex;
  justify-content: flex-start;
  margin: 15px 0;
  .container {
    &:first-child {
      margin-right: 40px;
    }
  }
  .control {
    margin-left: auto;
    align-self: flex-end;
    display: flex;
    align-items: center;
    .eol-container,
    .fol-container {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .eol-container {
      // color: #58d5e0;
      color: #3762ff;
      .frame {
        border: 1px solid #3762ff;
      }
    }
    .fol-container {
      // color: #d08bf5;
      color: #3762ff;
      margin-right: 8px;
      .frame {
        border: 1px solid #3762ff;
      }
    }
    .frame {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-right: 6px;
    }
  }
}
</style>
