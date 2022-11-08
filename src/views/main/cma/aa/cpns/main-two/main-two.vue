<template>
  <!-- aa -->
  <div
    class="main-two"
    v-loading.fullscreen.lock="loading"
    element-loading-text="加載中..."
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <!-- 该楼层的具体block -->
    <dv-border-box-11 :title="title">
      <div
        v-loading="isLoading"
        element-loading-spinner="el-icon-loading"
        element-loading-text="加载中"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <!-- 定位显示颜色 -->
        <div class="machine-color-info">
          <div class="info-container" v-for="item in colorsInfo" :key="item.state">
            <span class="color" :style="{ color: item.color }"></span>
            <span class="state">{{ item.state }}</span>
          </div>
        </div>
        <div class="show-container">
          <!-- 使用轮播图来展示数据 -->
          <el-carousel
            style="height: 500px"
            indicator-position="none"
            :interval="15 * 1000"
            ref="carousel"
            arrow="never"
            @change="carouselChange"
          >
            <el-carousel-item v-for="(blocks, floor_name) in totalBlock" :key="floor_name">
              <div class="wrapper">
                <div
                  class="block-container"
                  v-for="(block_arr, block_name) in blocks"
                  :key="block_name"
                >
                  <dv-decoration-7 class="block-name"
                    >&nbsp;&nbsp;{{ block_name || "-" }}&nbsp;&nbsp;</dv-decoration-7
                  >
                  <div class="grid-container">
                    <div class="machine-container" v-for="(item, index) in block_arr" :key="index">
                      <span
                        class="machine"
                        @click="goDetail(item)"
                        :style="{ color: selectColor(item.runStatus) }"
                      >
                        {{ item.machineName || "-" }}
                      </span>
                      <div class="dots">
                        <template v-if="Object.keys(item.aaHeadCurrentRunStates).length > 0">
                          <span
                            class="state-dot"
                            v-for="(state, stn) in item.aaHeadCurrentRunStates"
                            :key="stn"
                            :style="dotBgColor(state)"
                          >
                          </span>
                        </template>
                        <template v-else>
                          <span
                            class="state-dot"
                            :style="dotBgColor()"
                            v-for="item in 4"
                            :key="item"
                          ></span>
                        </template>
                      </div>
                      <dv-percent-pond class="percent" :config="selectConfig(item)" />
                    </div>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
          <!-- 自定义两个切换按钮 -->
          <div class="btns">
            <span class="left-icon-container" @click="prev">
              <i class="iconfont icon-shangyiye icon2"></i>
              <i class="iconfont icon-shangyiye icon1"></i>
              <i class="iconfont icon-shangyiye icon"></i>
            </span>
            <span @click="next">
              <i class="iconfont icon-xiayiye icon"></i>
              <i class="iconfont icon-xiayiye icon1"></i>
              <i class="iconfont icon-xiayiye icon2"></i>
            </span>
          </div>
        </div>
      </div>
    </dv-border-box-11>
    <!-- 详情弹框 -->
    <detail-dialog
      ref="dialog"
      :machineName="machineName"
      :dialogVisible.sync="dialogVisible"
      @getDetailSuccess="loading = false"
    />
  </div>
</template>
<script>
// 导入详情弹框
import DetailDialog from "./cpns/detail-dialog.vue"
export default {
  name: "main-two",
  props: {
    totalBlock: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    DetailDialog
  },
  data() {
    return {
      commonConfig: {
        value: 66,
        borderWidth: 1,
        borderRadius: 1,
        borderGap: 1,
        localGradient: true,
        lineDash: [0, 0]
      },
      colorsInfo: [
        { state: "RUN", color: "rgb(103, 249, 216)" },
        { state: "DOWN", color: "rgb(230, 100, 100)" },
        { state: "IDLE", color: "rgb(255, 228, 52)" }
      ],
      currentIndex: 0,
      loading: false,
      isLoading: true,
      dialogVisible: false, // 详情弹框
      machineName: "" // 弹框 的名称
    }
  },
  computed: {
    title() {
      return Object.keys(this.totalBlock)[this.currentIndex]
    }
  },
  watch: {
    totalBlock: {
      handler() {
        this.isLoading = false
      }
    }
  },
  methods: {
    selectColor(state) {
      let map = new Map([
        ["RUN", "#67f9d8"],
        ["DOWN", "#E66464"],
        ["IDLE", "#ffe434"],
        ["", "#595959"]
      ])
      return map.get(state)
    },
    dotBgColor(state = "STOP") {
      let map = new Map([
        ["RUN", "#31e631"],
        ["STOP", "#808080"],
        ["ExceptionRUN", "#ff4500"],
        ["ExceptionSTOP", "#dd4848"]
      ])
      return {
        background: map.get(state)
      }
    },
    selectConfig(item) {
      return {
        ...this.commonConfig,
        colors: ["rgba(135, 206, 250,0.6)", "rgba(135, 206, 250,0.8)"],
        formatter: "",
        value: this.strToNum(item.hitRate)
      }
    },
    strToNum(str) {
      let result = str.split(".")[0]
      return result > 100 ? 100 : result
    },
    // 回调的参数为 索引
    carouselChange(index) {
      this.currentIndex = index
    },
    // 打开详情弹框
    goDetail({ machineName, ip }) {
      if (!ip) {
        this.$message({
          message: "無效的機台",
          type: "warning",
          duration: 1000
        })
        return
      }
      this.loading = true
      this.machineName = machineName
      this.$refs["dialog"].getData(ip)
    },
    // 上一楼
    prev() {
      this.$refs.carousel.prev()
    },
    // 下一楼
    next() {
      this.$refs.carousel.next()
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .dv-percent-pond {
  margin: 0 auto;
}
::v-deep .border-box-content {
  padding: 60px 20px 20px 20px;
}
::v-deep .el-carousel {
  width: 100%;
}
::v-deep .el-carousel__container {
  height: 100%;
}
::v-deep .el-carousel__item {
  height: 100%;
}
::v-deep .dv-border-box-11-title {
  font-size: 25px;
  font-weight: bold;
}
.main-two {
  position: relative;
  .machine-color-info {
    position: absolute;
    display: flex;
    right: 168px;
    top: 48px;
    .info-container {
      display: flex;
      align-items: center;
      margin-right: 10px;
      .color {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 4px;
        background: rgba(53, 79, 173, 0.4);
        animation: fade 2s infinite;
      }
      .state {
        font-size: 16px;
      }
    }
  }
  .show-container {
    margin-top: 20px;
    .wrapper {
      height: 100%;
      display: flex;
      .block-container {
        flex: 1;
        margin-right: 10px;
        border-radius: 10px;
        // background-color: rgba(53, 79, 173, 0.3);
        background: var(--aa-bottom-block-bg);
        .block-name {
          width: 100%;
          height: 40px;
          overflow: hidden;
          line-height: 40px;
          margin-bottom: 10px;
          // color: rgb(162, 198, 153);
          text-align: center;
          border-bottom: 2px solid rgba(53, 79, 173, 0.8);
        }
        .grid-container {
          height: calc(100% - 48px);
          display: grid;
          grid-template-rows: repeat(7, 1fr);
          grid-template-columns: repeat(3, 1fr);
          justify-items: center;
          align-items: center;
          .machine-container {
            position: relative;
            display: inline-block;
            text-align: center;
            width: 90%;
            margin-bottom: 10px;
            .machine {
              display: inline-block;
              width: 100%;
              font-weight: normal;
              height: 30px;
              font-size: 17px;
              text-align: center;
              line-height: 30px;
              border-radius: 4px;
              cursor: pointer;
              margin-bottom: 2px;
              background: rgba(53, 79, 173, 0.4);
              animation: fade 2s infinite;
            }
            .dots {
              width: 100%;
              margin: 0 auto;
              display: flex;
              height: 8px;
              border: 1px solid rgba(53, 79, 173, 0.3);
              .state-dot {
                flex: 1;
                height: 100%;
                margin-right: 1px;
                &:last-child {
                  margin-right: 0px;
                }
              }
            }
            .percent {
              width: 100%;
              height: 9px;
              margin-top: 2px;
            }
          }
        }
      }
    }
    .btns {
      span {
        position: absolute;
        width: 120px;
        height: 50px;
        text-align: center;
        animation: twinkle 2s infinite;
        cursor: pointer;
        &:nth-child(1) {
          left: 15px;
          top: 46px;
        }
        &:nth-child(2) {
          right: 15px;
          top: 46px;
        }
        .icon {
          font-weight: bold;
          font-size: 25px;
          color: rgba(89, 113, 197, 0.6);
        }
        .icon1 {
          font-weight: bold;
          font-size: 25px;
          color: rgba(89, 113, 197, 0.8);
        }
        .icon2 {
          font-weight: 800;
          font-size: 25px;
          color: rgba(89, 113, 197, 1);
        }
      }
    }
  }
}

@keyframes fade {
  0% {
    box-shadow: inset 0 0 15px currentColor;
  }
  50% {
    box-shadow: inset 0 0 10px currentColor;
  }
  100% {
    box-shadow: inset 0 0 15px currentColor;
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
