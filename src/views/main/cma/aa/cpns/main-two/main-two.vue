<template>
  <!-- aa -->
  <div
    class="main-two"
    v-loading.fullscreen.lock="loading"
    element-loading-text="加載中..."
    element-loading-background="rgba(0, 0, 0, 1)"
  >
    <dv-border-box-11 :color="changeBoxColor" :title="title">
      <div
        v-loading="isLoading"
        element-loading-spinner="el-icon-loading"
        element-loading-text="加载中"
        element-loading-background="rgba(0, 0, 0, 1)"
      >
        <!-- 定位显示颜色 -->
        <div class="machine-color-info">
          <div class="info-container" v-for="item in colorsInfo" :key="item.state">
            <span
              :class="['color', $store.getters.theme == 'dark' ? 'is-animation' : '']"
              :style="selectColor(item.state)"
            ></span>
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
                <div class="block-container" v-for="(block_arr, block_name) in blocks" :key="block_name">
                  <dv-decoration-7 :color="changeDv7Color" class="block-name">
                    <span class="name">{{ block_name || "" }}</span>
                  </dv-decoration-7>
                  <div class="grid-container">
                    <div class="machine-container" v-for="(item, index) in block_arr" :key="index">
                      <div
                        :class="['machine', $store.getters.theme == 'dark' ? 'is-animation' : '']"
                        @click="goDetail(item)"
                        :style="selectColor(item.runStatus)"
                      >
                        <span :style="{ color: selectSpanColor() }">
                          {{ item.machineName || "" }}
                        </span>
                      </div>
                      <div class="dots">
                        <template v-if="Object.keys(item.aaHeadCurrentRunStates).length > 0">
                          <span
                            class="state-dot"
                            v-for="(state, stn) in item.aaHeadCurrentRunStates"
                            :key="stn"
                            :style="dotBgColor(state)"
                          ></span>
                        </template>
                        <template v-else>
                          <span class="state-dot" :style="dotBgColor()" v-for="item in 4" :key="item"></span>
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
          <change-switch
            :leftConfig="{ left: '23px', top: '46px' }"
            :rightConfig="{ right: '23px', top: '46px' }"
            @directionChange="handleDirection"
          />
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
// 导入左右切换的组件
import ChangeSwitch from "@/components/change-switch/change-switch.vue"
export default {
  name: "main-two",
  props: {
    totalBlock: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    DetailDialog,
    ChangeSwitch
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
    },
    changeBoxColor() {
      // return this.$store.getters.theme == "dark" ? ["#8aaafb", "#1f33a2"] : ["#05dad4", "#2c97e1"]
      return this.$store.getters.theme == "dark" ? ["#8aaafb", "#1f33a2"] : ["#05dad4", "#2c97e1"]
    },
    changeDv7Color() {
      return this.$store.getters.theme == "dark" ? ["#1dc1f5", "#1dc1f5"] : ["#fff", "#fff"]
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
      let map = ""
      if (this.$store.getters.theme == "dark") {
        map = new Map([
          ["RUN", "#67f9d8"],
          ["DOWN", "#E66464"],
          ["IDLE", "#ffe434"],
          ["", "#595959"]
        ])
        return {
          color: map.get(state)
        }
      } else {
        map = new Map([
          ["RUN", "radial-gradient(50% 50%, rgba(39, 75, 232, 1) 0%, rgba(90, 210, 250, 1) 100%)"],
          ["DOWN", "radial-gradient(50% 50%, rgba(246, 211, 101, 1) 0%, rgba(252, 161, 134, 1) 100%)"],
          ["IDLE", "radial-gradient(50% 50%, rgba(26, 156, 44, 1) 0%, rgba(125, 245, 141, 1) 100%)"],
          ["", "rgba(0, 0, 0, 0.3)"]
        ])
        return {
          background: map.get(state)
        }
      }
    },
    selectSpanColor() {
      return this.$store.getters.theme == "dark" ? "" : "#fff"
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
      let colors =
        this.$store.getters.theme == "dark"
          ? ["rgba(135, 206, 250,0.6)", "rgba(135, 206, 250,0.8)"]
          : ["#284ee8", "#284ee8"]
      return {
        ...this.commonConfig,
        colors,
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

    //
    handleDirection(direction) {
      direction == "left" ? this.$refs.carousel.prev() : this.$refs.carousel.next()
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .dv-border-box-11-title {
  font-size: 30px !important;
  font-weight: bold !important;
  color: #000 !important;
}
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
/* 为了适配动画 */
.is-animation {
  animation: fade 2s infinite;
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
        background: var(--aa-item-bg);
      }
      .state {
        font-size: 16px;
        color: var(--base-text-color);
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
        background: var(--aa-bottom-block-bg);
        .block-name {
          width: 100%;
          height: 40px;
          overflow: hidden;
          line-height: 40px;
          margin-bottom: 10px;
          text-align: center;
          border-bottom: 2px solid var(--aa-bottom-block-border);
          .name {
            padding: 0 5px;
            color: var(--base-text-color);
          }
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
</style>
