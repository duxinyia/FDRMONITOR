<template>
  <!-- fol -->
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-text="加載中..."
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="main-two"
  >
    <dv-border-box-11 :color="changeBoxColor" :title="title">
      <div
        v-loading="isLoading"
        element-loading-spinner="el-icon-loading"
        element-loading-text="加载中"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <!-- 使用轮播图来展示数据 -->
        <el-carousel
          style="height: 590px"
          indicator-position="none"
          :interval="150 * 1000"
          ref="carousel"
          arrow="never"
          @change="carouselChange"
        >
          <el-carousel-item v-for="floor in bottomData" :key="floor.location">
            <!-- 生成四个块 -->
            <div class="wrapper">
              <div
                v-for="(block, index) in floor.workShopInfos"
                :key="block.workShop"
                :class="{
                  'block-container': true,
                  active0: index == 0,
                  active1: index == 1,
                  active2: index == 2,
                  active3: index == 3
                }"
              >
                <!-- block名称 -->
                <dv-decoration-7 :color="changeDv7Color" class="block-name">
                  <div style="padding: 0 5px">{{ block.workShop }}</div>
                </dv-decoration-7>
                <!-- 剩下展示六个块 -->
                <div class="block-layout">
                  <!-- 机台容器 -->
                  <div v-for="machine in block.machineInfos" :key="machine.ip" class="machine">
                    <div class="content">
                      <div
                        class="machine-head"
                        :style="changeHead(machine)"
                        @click="openDialog(machine)"
                      >
                        <i class="iconfont icon-flag" :style="changeIcon(machine)"></i>
                        <span class="state">{{ machine.machineName | changeMachineName }}</span>
                      </div>

                      <div class="machine-info" :style="changeMachineInfo(machine)">
                        <!-- 左边 -->
                        <div class="left">
                          <template v-if="machine.combineTag && machine.combineTag == 'DA'">
                            <div
                              v-for="item in divArr2[1]"
                              :key="item.id"
                              :style="changeDivStyle(item.style, machine)"
                            >
                              {{ item.text }}
                            </div>
                          </template>
                          <template v-else>
                            <div
                              v-for="item in divArr2[0]"
                              :key="item.id"
                              :style="changeDivStyle(item.style, machine)"
                            >
                              {{ item.text }}
                            </div>
                          </template>
                        </div>
                        <!-- 右边 -->
                        <div class="right">
                          <!-- 如果有机台 -->
                          <el-tooltip
                            v-if="machine.combineID"
                            class="item"
                            effect="dark"
                            placement="right"
                          >
                            <div slot="content">dpc不良:{{ machine.dpcRate | changeRate }}</div>
                            <div class="dpc">
                              <span class="name">DPC</span>
                              <svg-icon class="hexagon" :icon-class="changeIconClass(machine)" />
                              <!-- <i class="iconfont icon-hexagon"></i> -->
                            </div>
                          </el-tooltip>
                          <div v-else class="dpc">
                            <span class="name" style="color: rgba(128, 128, 128, 0.8)">DPC</span>
                            <svg-icon class="hexagon1" icon-class="hexagon" />
                            <!-- <i class="iconfont icon-hexagon"></i> -->
                          </div>

                          <el-tooltip class="item" effect="dark" placement="right">
                            <div slot="content">lcb不良:{{ machine.lcbRate | changeRate }}</div>
                            <div class="lcb" :style="changeLcbStyle(machine, 'lcb')">LCB</div>
                          </el-tooltip>
                          <el-tooltip class="item" effect="dark" placement="right">
                            <div slot="content">efail不良:{{ machine.eFailRate | changeRate }}</div>
                            <div class="e-fail" :style="changeLcbStyle(machine, 'fail')">
                              e-fail
                            </div>
                          </el-tooltip>
                          <dv-percent-pond
                            class="percent-pond"
                            :config="handlePercentConfig(machine.hitRate)"
                          />
                        </div>
                      </div>
                    </div>
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
    </dv-border-box-11>
    <!-- 详情弹框 -->
    <detail-dialog
      ref="dialog"
      :combineID="combineID"
      :dialogVisible.sync="dialogVisible"
      @getDetailSuccess="getDetailSuccess"
    />
  </div>
</template>
<script>
// 导入详情弹框
import DetailDialog from "./cpns/detail-dialog.vue"
// 导入不同的配置文件
import { divArr2 } from "./config.js"
export default {
  name: "main-two",
  props: {
    bottomData: {
      type: Array,
      default: () => [
        {
          workShopInfos: []
        }
      ]
    }
  },
  components: {
    DetailDialog
  },

  data() {
    return {
      loading: false,
      isLoading: true,
      currentIndex: 0,
      // 水位图的配置文件
      percentConfig: {
        value: 66,
        localGradient: true,
        formatter: "",
        colors: ["#23cb87"]
      },
      divArr2,
      // 详情弹框
      dialogVisible: false,
      // 弹框id
      combineID: ""
    }
  },
  watch: {
    bottomData: {
      handler() {
        this.isLoading = false
      }
    }
  },
  computed: {
    title() {
      return this.bottomData.length > 0 ? this.bottomData[this.currentIndex].location : "-"
    },
    changeBoxColor() {
      return this.$store.getters.theme == "dark" ? ["#8aaafb", "#1f33a2"] : ["#05dad4", "#2c97e1"]
    },
    changeDv7Color() {
      return this.$store.getters.theme == "dark" ? ["#1dc1f5", "#1dc1f5"] : ["#fff", "#fff"]
    }
  },
  filters: {
    // 将 FOL Line08 转化为 08#
    changeMachineName(value) {
      if (!value) return "-"
      return value.substring(value.length - 2) + "#"
    },
    changeRate(rate) {
      if (rate) {
        return parseFloat(rate).toFixed(2) + "%"
      }
    }
  },
  methods: {
    handlePercentConfig(rate) {
      // 如果 rate 有值 就显示绿色 如果没值的话 显示黑色不渐变
      let colors = ""
      // dark 保持原样 light 从新的规则
      if (this.$store.getters.theme == "dark") {
        colors = rate ? ["#00b050"] : ["rgba(127, 127, 127, 0.9)", "rgba(127, 127, 127, 0.9)"]
      } else {
        colors = rate
          ? ["rgba(252, 161, 134, 1)", "rgba(246, 211, 101, 1)"]
          : ["rgba(127, 127, 127, 0.9)", "rgba(127, 127, 127, 0.9)"]
      }
      return {
        value: rate ? rate.split(".")[0] : 0,
        localGradient: true,
        formatter: "",
        borderWidth: 1,
        colors
      }
    },
    // 打开弹框
    openDialog(machine) {
      // machineName
      if (!machine.combineID) return
      this.loading = true
      this.combineID = machine.machineName.split(" ")[1]
      this.$refs["dialog"].getData(machine.combineID)
    },
    // 子组件获取数据成功 关闭请求数据的loading效果
    getDetailSuccess() {
      this.loading = false
    },
    carouselChange(index) {
      this.currentIndex = index
    },
    // 改变标题区域的border
    changeHead(machine) {
      // console.log(machine)
      // 如果没有机台
      if (!machine.combineID) {
        return {
          border: "2px solid rgba(128, 128, 128, 0.8)",
          color: "rgba(128, 128, 128, 0.8)",
          cursor: "auto"
        }
      } else {
        // 有机台的颜色值
        if (this.$store.getters.theme == "dark") {
          // 暗色的
        } else {
          return {
            // border: "2px solid",
            "border-image":
              "linear-gradient(to left,rgba(90, 210, 250, 1) 0%,rgba(39, 75, 232, 1) 100%) 2"
          }
        }
      }
      //   // 绿色 红色 黄色 灰色
      //   { color: "rgba(1, 181, 153, 0.8)" },
      //   { color: "rgba(230, 100, 100, 0.8)" },
      //   { color: "rgba(255, 228, 52, 0.8)" },
      //   { color: "rgba(128, 128, 128, 0.8)" }
      return {}
    },
    changeIconClass(machine) {
      // 这个是已经有值的情况 分情况 dark light
      if (this.$store.getters.theme == "dark") {
        return machine.dpcColor == "Y" ? "hexagon-red" : "hexagon"
      } else {
        return machine.dpcColor == "Y" ? "hexagon-red" : "hexagon"
      }
    },
    // 改变旗子的颜色
    changeIcon(machine) {
      // 如果没有机台
      if (!machine.combineID) {
        return {
          color: "rgba(128, 128, 128, 0.8)",
          "border-right": "2px solid rgba(128, 128, 128, 0.8)"
        }
      } else {
        // 通过判断是否属于 dask
        if (this.$store.getters.theme == "dark") {
          return {
            color: "rgba(1, 181, 153, 0.8)",
            "border-right": "2px solid rgba(1, 181, 153, 0.8)"
          }
        } else {
          return {
            // "border-image":
            //   "linear-gradient(to right,rgba(90, 210, 250, 1) 0%,rgba(39, 75, 232, 1) 100%)",
            color: "#fff",
            "border-right": "2px solid rgba(39, 75, 232, 1)"
          }
        }
      }
    },
    // 改变主体的颜色
    changeMachineInfo(machine) {
      // 没有机台显示的颜色
      if (!machine.combineID) {
        return {
          border: "2px solid rgba(127, 127, 127, 0.9)",
          "box-shadow": "inset 0 0 10px rgba(127, 127, 127, 0.9)"
        }
      } else {
        // 有机台显示的颜色
        if (this.$store.getters.theme == "dark") {
          return {
            border: "2px solid #02958e",
            "box-shadow": "inset 0 0 10px rgba(2, 149, 142, 0.5)"
          }
        } else {
          return {
            border: "2px solid rgba(39, 75, 232, 1)",
            background:
              "radial-gradient(50% 50%, rgba(0, 227, 210, 0) 0%, rgba(63, 119, 232, 0.3) 100%)"
          }
        }
      }
    },
    changeDivStyle(style, machine) {
      if (!machine.combineID) {
        return {
          ...style,
          color: "rgba(127, 127, 127, 0.9)",
          border: `1px solid rgba(127, 127, 127, 0.9)`,
          "font-size": "12px"
        }
      } else {
        return { ...style, "font-size": "12px" }
      }
    },
    changeLcbStyle(machine, type) {
      // lcbColor -> Y 红色
      if (machine.combineID) {
        // 有机台显示的颜色
        if (machine.lcbColor == "Y" && type == "lcb") {
          return {
            background: "#f04d4d"
          }
        } else {
          let color = this.$store.getters.theme == "dark" ? "#46bb9b" : "rgba(23, 51, 143, 1)"
          return {
            border: `1px solid ${color}`
          }
        }
      } else {
        // 没有机台显示的颜色
        return {
          color: "rgba(127, 127, 127, 0.9)",
          border: "1px solid rgba(127, 127, 127, 0.9)"
        }
      }
    },
    // 上一楼
    prev() {
      this.$refs.carousel.prev()
    },
    // 下一楼
    next() {
      this.$refs["carousel"].next()
    }
  }
}
</script>
<style lang="scss" scoped>
//动态改变arr
::v-deep .border-box-content {
  padding: 70px 20px 20px 20px;
}
::v-deep .dv-border-box-11-title {
  font-size: 25px;
  font-weight: bold;
}
::v-deep .el-carousel__container {
  height: 100%;
}
::v-deep .el-carousel__item {
  height: 100%;
}

.main-two {
  height: 680px;
  position: relative;
  text-align: center;
  .wrapper {
    height: 100%;
    display: flex;
    .block-container {
      flex: 1;
      margin: 0px 15px 0px 0px;
      /* background: rgba(7, 23, 145, 0.5); */
      background: var(--fol-bottom-item-bg);
      .block-name {
        height: 35px;
        line-height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 1px 1px rgba(53, 79, 173, 0.8);
        font-size: 20px;
        font-weight: 800;
        .block-name-icon {
          animation: rotation 4s linear infinite;
        }
      }

      .block-layout {
        height: 547px;
        display: grid;
        color: rgba(255, 255, 255, 0.9);
        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: repeat(3, 1fr);
        .machine {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .content {
            .machine-head {
              cursor: pointer;
              width: 94%;
              margin: auto;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 4px;
              vertical-align: middle;
              border: 2px solid rgba(1, 181, 153, 0.8);
              .icon-flag {
                flex: 2;
                font-size: 25px;
                /* color: rgba(1, 181, 153, 0.8);
                border-right: 2px solid rgba(1, 181, 153, 0.8); */
              }
              .state {
                flex: 4;
                height: 100%;
                display: inline-block;
              }
            }
            .machine-info {
              display: flex;
              position: relative;
              width: 135px;
              height: 220px;
              padding: 6px 3px 5px 6px;
              /* border: 2px solid #02958e;
              box-shadow: inset 0 0 10px rgba(2, 149, 142, 1); */
              border-radius: 8px;
              .left {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                font-size: 13px;
              }
              .right {
                flex: 1;
                display: flex;
                align-items: center;
                flex-direction: column;
                font-size: 12px;
                text-align: center;
                .dpc {
                  // margin-top: 5px;
                  width: 35px;
                  height: 35px;
                  text-align: center;
                  position: relative;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  .name {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                  }
                  .icon-hexagon {
                    font-size: 40px;
                    color: #46bb9b;
                  }
                  .icon-liubianxing2 {
                    font-size: 40px;
                    color: #46bb9b;
                  }
                }
                .lcb {
                  width: 30px;
                  height: 30px;
                  line-height: 30px;
                  border-radius: 50%;
                  /* border: 1px solid #46bb9b; */
                  margin: 0px 0px 6px 0px;
                }
                .e-fail {
                  width: 30px;
                  height: 25px;
                  line-height: 25px;
                  /* border: 1px solid #46bb9b; */
                }
              }
            }
          }
        }
      }
      &:last-child {
        margin-right: 0;
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
        left: 0px;
        top: 40px;
      }
      &:nth-child(2) {
        right: 0px;
        top: 40px;
      }
      .icon {
        font-weight: bold;
        font-size: 25px;
        /* color: rgba(89, 113, 197, 0.6); */
        color: var(--aa-bottom-icon);
      }
      .icon1 {
        font-weight: bold;
        font-size: 25px;
        /* color: rgba(89, 113, 197, 0.8); */
        color: var(--aa-bottom-icon1);
      }
      .icon2 {
        font-weight: 800;
        font-size: 25px;
        /* color: rgba(89, 113, 197, 1); */
        color: var(--aa-bottom-icon2);
      }
    }
  }
}

.percent-pond {
  width: 95px;
  height: 30px;
  position: absolute;
  right: -14px;
  bottom: 38px;
  transform: rotate(-90deg);
}
.hexagon {
  width: 30px;
  height: 30px;
  color: #46bb9b;
}
.hexagon1 {
  width: 30px;
  height: 30px;
  color: rgba(128, 128, 128, 0.8);
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
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
