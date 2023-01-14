<template>
  <div class="page-main">
    <dv-border-box-12>
      <div
        v-loading="isLoading"
        element-loading-spinner="el-icon-loading"
        element-loading-text="加载中"
        element-loading-background="rgba(0, 0, 0, 1)"
      >
        <!-- 自定义两个切换按钮 -->
        <div class="btns">
          <div class="left icon-wrapper" @click="toLeft">
            <i class="iconfont icon-shangyiye icon2"></i>
            <i class="iconfont icon-shangyiye icon1"></i>
            <i class="iconfont icon-shangyiye icon"></i>
          </div>
          <div class="right">
            <div class="control">
              <div class="fol-container container">
                <span
                  class="fol-box"
                  @click="changeIndex(1)"
                  :style="{
                    'box-shadow': currentIndex == 1 ? 'inset 0 0 20px #c987ed' : ''
                  }"
                ></span>
                <span class="name">FOL</span>
              </div>
              <div class="eol-container container">
                <span
                  class="eol-box"
                  @click="changeIndex(2)"
                  :style="{
                    'box-shadow': currentIndex == 2 ? 'inset 0 0 20px #58d5e0' : ''
                  }"
                ></span>
                <span class="name">EOL</span>
              </div>
              <div class="all-container container">
                <span
                  class="all-box"
                  @click="changeIndex(3)"
                  :style="{
                    'box-shadow': currentIndex == 3 ? 'inset 0 0 20px #fbeeca' : ''
                  }"
                ></span>
                <span class="name">ALL</span>
              </div>
            </div>
            <div class="icon-wrapper" @click="toRight">
              <i class="iconfont icon-xiayiye icon"></i>
              <i class="iconfont icon-xiayiye icon1"></i>
              <i class="iconfont icon-xiayiye icon2"></i>
            </div>
          </div>
        </div>
        <!-- 主要区域 -->
        <div class="main">
          <!-- 用轮播图显示 -->
          <el-carousel
            ref="carousel"
            :autoplay="false"
            height="880px"
            :interval="5000"
            arrow="never"
            indicator-position="none"
          >
            <el-carousel-item v-for="(everyArr, index) in getShowArray" :key="index">
              <div class="contaner">
                <div
                  v-for="(item, index) in everyArr"
                  :style="changeEveryStyle()"
                  class="machine"
                  :key="index"
                >
                  <p class="title">{{ item.deviceInfo.customName }}</p>
                  <el-row :gutter="6" class="headers">
                    <el-col :span="3">WIP</el-col>
                    <el-col :span="3" :offset="12">IO</el-col>
                    <el-col :span="3">Hit Rate</el-col>
                    <el-col :span="3">Yield</el-col>
                  </el-row>
                  <div class="wrapper-container">
                    <el-row
                      v-for="(item, index) in item.stationInfo"
                      type="flex"
                      align="middle"
                      :gutter="6"
                      :key="index"
                      class="data-info"
                    >
                      <el-col :span="2" class="wip-num">{{ item.wip || 0 }}</el-col>
                      <el-col :span="5">
                        <el-tooltip effect="dark" placement="right">
                          <div slot="content">
                            <span>上限WIP: {{ item.minWip }}</span>
                            <br />
                            <br />
                            <span>下限WIP: {{ item.maxWip }}</span>
                          </div>
                          <div>
                            <dv-percent-pond :config="changeConfig(item)" class="percent-pond" />
                          </div>
                        </el-tooltip>
                      </el-col>
                      <el-col :span="8">
                        <div class="battery">
                          <span class="name">{{ item.station }}</span>
                          <el-tooltip effect="dark" placement="right">
                            <div slot="content">
                              <span>實際產出: {{ item.outPut }}</span>
                              <br />
                              <br />
                              <span>計劃產出: {{ item.targetOut }}</span>
                              <br />
                              <br />
                              <span>差異產出: {{ item.outPut - item.targetOut }}</span>
                            </div>
                            <div class="container" :style="changeContainerStyle(item)">
                              <!-- 中间区域 -->
                              <div class="center" :style="changeCenterStyle(item)">{{ item.outPut }}</div>
                            </div>
                          </el-tooltip>
                        </div>
                      </el-col>
                      <el-col :span="3">{{ item.targetOut || "-" }}</el-col>
                      <el-col :span="3">{{ item.hitRate || "-" }}</el-col>
                      <el-col :span="3">{{ item.overallYield || "-" }}</el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script>
// 导入发送请求的函数
import { GetKeyStationRunningInfo } from "@/api/output2.js"
// 导入对应的分割函数
import { splitArray } from "@/utils"
export default {
  name: "output2",
  data() {
    return {
      dataTiming: null,
      showData: [],
      selectArea: "ALL",
      isLessSplit: false,
      currentIndex: 3,
      isLoading: true
    }
  },
  watch: {
    showData: {
      handler() {
        this.isLoading = false
      }
    }
  },
  computed: {
    getShowArray() {
      let splitNum = this.isLessSplit ? 3 : 6
      return splitArray(this.showData, splitNum)
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "九宮格產出看板")
    this.initData()
    // 每5分钟获取一次数据
    this.dataTiming = setInterval(() => {
      this.initData()
    }, this.$globalData.CYCLE_TIME)
  },
  methods: {
    async initData() {
      let requestArr = [this.GetKeyStationRunningInfo()]
      await Promise.all(requestArr)
    },
    async GetKeyStationRunningInfo() {
      this.isLoading = true
      this.isLessSplit = false
      this.showData = await GetKeyStationRunningInfo(this.selectArea)
      if (
        Array.isArray(this.showData) &&
        this.showData.findIndex((item) => item.stationInfo.length > 10) >= 0
      ) {
        this.isLessSplit = true
      }
      this.$store.commit("fullLoading/SET_FULLLOADING", false)
    },
    changeEveryStyle() {
      // 如果是分割成6块的
      if (!this.isLessSplit) {
        return {
          height: "48%"
        }
      }
    },
    changeContainerStyle(item) {
      let borders = this.$store.getters.theme == "dark" ? "#1694ed" : "#fff"
      let bgs = this.$store.getters.theme == "dark" ? "#093f65" : "transparent"
      return {
        border: `1px solid ${borders}`,
        background: bgs
      }
    },
    changeCenterStyle(item) {
      let result = parseInt(item.hitRate)
      let bgs0 = [
        "linear-gradient(to right,rgba(153, 102, 255, 0.3) 10%,rgba(153, 102, 255, 0.6) 50%,rgba(153, 102, 255, 0.9) 100%)",
        "linear-gradient(270deg, rgba(45, 60, 128, 1) 0%, rgba(39, 75, 232, 1) 100%)"
      ]
      let bgs1 = [
        "linear-gradient(tot right,rgba(34, 177, 249, 0.3) 10%,rgba(34, 177, 249, 0.6) 50%,rgba(34, 177, 249, 0.9) 100%)",
        "linear-gradient(270deg, rgba(222, 184, 47, 1) 0%, rgba(255, 140, 26, 1) 100%)"
      ]

      if (result > 100) {
        return {
          width: "100%",
          background: this.$store.getters.theme == "dark" ? bgs0[0] : bgs0[1]
        }
      }
      return {
        width: `${result}%`,
        background: this.$store.getters.theme == "dark" ? bgs1[0] : bgs1[1]
      }
    },
    changeConfig(item) {
      let showValue = 0
      if (item.wipRate) {
        showValue = parseInt(item.wipRate) > 100 ? 100 : parseInt(item.wipRate)
      }
      let colors =
        this.$store.getters.theme == "dark"
          ? ["#3DE7C9", "#00BAFF"]
          : ["rgba(13, 207, 255, 1)", "rgba(22, 43, 224, 1)"]
      let lineDashs = this.$store.getters.theme == "dark" ? [2, 2] : [2, 0]
      return {
        value: showValue,
        formatter: "",
        colors,
        borderRadius: 1,
        lineDash: lineDashs,
        borderWidth: 1,
        localGradient: false
      }
    },
    changeIndex(index) {
      let map = new Map([
        [1, "FOL"],
        [2, "EOL"],
        [3, "ALL"]
      ])
      this.currentIndex = index
      this.selectArea = map.get(index)
      this.GetKeyStationRunningInfo()
    },
    toLeft() {
      this.$refs["carousel"].prev()
    },
    toRight() {
      this.$refs["carousel"].next()
    }
  },
  beforeDestroy() {
    clearInterval(this.dataTiming)
  }
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
  position: relative;
}

.page-main {
  margin-top: 20px;
}
.contaner {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .machine {
    width: 600px;
    height: 100%;
    padding: 4px 6px 4px 6px;
    border-radius: 8px;
    background: var(--output2-machine-bg);
    overflow: auto;
    .title {
      font-size: 23px;
      font-weight: bold;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    .headers {
      .el-col {
        font-size: 17px;
        color: var(--output2-header-item);
        font-weight: bold;
      }
    }
    .wrapper-container {
      height: calc(100% - 54px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .data-info {
        vertical-align: middle;
        margin-bottom: 5px;
      }
    }
  }
}
.percent-pond {
  width: 100px !important;
  height: 25px !important;
}
.btns {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  .right {
    display: flex;
    .control {
      display: flex;
      align-items: center;
      .container {
        display: flex;
        align-items: center;
        span {
          &:nth-child(1) {
            display: inline-block;
            width: 25px;
            height: 25px;
            margin-right: 6px;
            cursor: pointer;
          }
        }
      }
      .fol-container {
        margin-left: auto;
        .fol-box {
          border: 2px solid #d08bf5;
        }
      }
      .eol-container {
        margin: 0 10px;
        .eol-box {
          border: 2px solid #58d5e0;
        }
      }
      .all-container {
        margin-right: 100px;
        .all-box {
          border: 2px solid #fbeeca;
        }
      }
    }
  }
  .icon-wrapper {
    cursor: pointer;
    animation: twinkle 2s infinite;
    .icon {
      font-weight: bold;
      font-size: 25px;
      color: var(--aa-bottom-icon);
    }
    .icon1 {
      font-weight: bold;
      font-size: 25px;
      color: var(--aa-bottom-icon1);
    }
    .icon2 {
      font-weight: 800;
      font-size: 25px;
      color: var(--aa-bottom-icon2);
    }
  }
}

.battery {
  width: 98%;
  height: 30px;
  display: flex;
  align-items: center;
  .name {
    width: 100px;
    overflow: hidden;
    margin-right: 10px;
  }
  .container {
    width: 110px;
    height: 100%;
    display: flex;
    align-items: center;
    .center {
      width: 50%;
      height: 80%;
      font-size: 14px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
@keyframes twinkle {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  to {
    opacity: 1;
  }
}
</style>
