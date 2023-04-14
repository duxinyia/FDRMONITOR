<template>
  <!-- 主要区域 -->
  <div class="page-main">
    <dv-border-box-13 :color="changeBoxColor">
      <!-- 自定义两个切换按钮 -->
      <change-switch
        :leftConfig="{ left: '0px', top: '55px' }"
        :rightConfig="{ right: '0px', top: '55px' }"
        @directionChange="handleDirection"
      />
      <div class="count-container">
        <div></div>
        <div class="center">
          <div v-for="(item, index) in 2" class="container" :key="index">
            <dv-border-box-10 :color="changeBoxColor">
              <el-table
                v-loading="loading"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 1)"
                :data="configArr[index]"
                :header-cell-style="getRowClass"
              >
                <el-table-column align="center" prop="productArea" label="名称"></el-table-column>
                <el-table-column align="center" prop="totalCount" label="計畫"></el-table-column>
                <el-table-column align="center" prop="hitCount" label="達成機種"></el-table-column>
                <el-table-column align="center" prop="notHitCount" label="未達成"></el-table-column>
                <el-table-column
                  align="center"
                  width="100"
                  prop="hitRate"
                  label="達成率"
                ></el-table-column>
              </el-table>
            </dv-border-box-10>
          </div>
        </div>
        <div class="control">
          <div class="fol-container" @click="folChecked = !folChecked">
            <span
              class="frame"
              :style="{
                'box-shadow': folChecked ? 'inset 0 0 20px #5bdbe4' : ''
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
      <div class="table-chart">
        <!-- 使用轮播图来展示数据 -->
        <el-carousel
          style="height: 800px"
          indicator-position="none"
          :interval="15 * 10000"
          ref="carousel"
          arrow="never"
        >
          <el-carousel-item v-for="(everyArr, index) in splitArr" :key="index">
            <!-- index * 分割的大小 + childIndex -->
            <div class="child-container">
              <container
                v-for="(showTitle, childIndex) in everyArr"
                :eolChecked="eolChecked"
                :folChecked="folChecked"
                :device="outPutInfoDetails[index * 15 + childIndex].device"
                :dateValues="outPutInfoDetails[index * 15 + childIndex].dateValues"
                :maxOutput="maxOutput[index * 15 + childIndex]"
                :maxTargetOut="maxTargetOut[index * 15 + childIndex]"
                :showTitle="showTitle"
                :isShow.sync="showArr[index * 15 + childIndex]"
                :key="index + childIndex"
              />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </dv-border-box-13>
  </div>
</template>
<script>
// 导入左右切换的组件
import ChangeSwitch from "@/components/change-switch/change-switch.vue"
// 导入发送请求的函函數
import { GetOutputInfoStatics, GetDeviceInfo } from "@/api/cma/makewar.js"
// 获取标题的接口
import { GetStationName } from "@/api/cma/output2.js"
// 导入子组件
import container from "./cpns/container.vue"
import { splitArray } from "@/utils"
export default {
  name: "makewar",
  components: {
    container,
    ChangeSwitch
  },
  data() {
    return {
      loading: true,
      eolChecked: true,
      folChecked: true,
      showArr: [],
      configArr: [
        [{ hitCount: 0, hitRate: "0.00%", notHitCount: 0, productArea: "FOL", totalCount: 0 }],
        [{ hitCount: 0, hitRate: "0.00%", notHitCount: 0, productArea: "EOL", totalCount: 0 }]
      ],
      titles: [],
      outPutInfoDetails: [],
      maxOutput: [],
      maxTargetOut: []
    }
  },
  computed: {
    changeBoxColor() {
      return ["#6586ec", "#2cf7fe"]
    },
    // 分割形成不同的数组
    splitArr() {
      return splitArray(this.titles, 15)
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "By天產出看板")
    // 获取上方的数据
    GetOutputInfoStatics().then((res) => {
      this.configArr = [[res[0]], [res[1]]]
      this.loading = false
    })
    // 获取标题
    GetStationName().then((res) => {
      // 分页处理 15 为一页
      console.log("GetStationName", res)
      this.titles = res
      // 设置初始值
      this.outPutInfoDetails = Array(res.length).fill({
        device: { customName: "", plantID: "", Opno: "" },
        dateValues: []
      })
      this.showArr = Array(res.length).fill(true)

      res &&
        res.forEach((item, index) => {
          GetDeviceInfo(item.deviceNo).then((r) => {
            this.$set(this.outPutInfoDetails, index, r)
            r.dateValues.forEach((childItem) => {
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
            this.$set(this.showArr, index, false)
          })
        })
    })
  },
  methods: {
    getRowClass() {
      let color = this.$store.getters.theme == "dark" ? "#1adafb" : "rgba(39, 75, 232, 1)"
      return `background:transparent !important;color:${color};`
    },
    handleDirection(direction) {
      direction == "left" ? this.$refs.carousel.prev() : this.$refs.carousel.next()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-carousel__container {
  height: 100%;
}
//整个table的背景颜色
::v-deep .el-table,
.el-table__expanded-cell {
  background-color: transparent;
  color: var(--makewar-table-text);
  font-size: 18px;
}
::v-deep .el-table::before {
  display: none;
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
  background-color: transparent !important;
}
::v-deep .border-box-content {
  padding: 15px;
  position: relative;
}
.page-main {
  margin-top: 10px;
}
.child-container {
  height: 800px;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(5, 1fr);
  justify-content: space-evenly;
}
.count-container {
  display: flex;
  margin: 10px 0px 10px 0px;
  padding: 0px 90px;
  justify-content: space-around;
  .center {
    display: flex;
    .container {
      &:first-child {
        margin-right: 100px;
      }
    }
  }

  .control {
    display: flex;
    align-items: center;
    .eol-container,
    .fol-container {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .eol-container {
      .frame {
        border: 1px solid #3762ff;
      }
    }
    .fol-container {
      margin-right: 8px;
      .frame {
        border: 1px solid #5bdae3;
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
