<template>
  <!-- fol -->
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-text="加載中..."
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="main-two"
  >
    <dv-border-box-11 :title="title">
      <!-- 使用轮播图来展示数据 -->
      <el-carousel
        style="height: 590px"
        indicator-position="none"
        :interval="15 * 1000"
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
              <div class="blcok-name">
                {{ block.workShop }}
              </div>
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
                        <div
                          v-for="item in divArr2[0]"
                          :key="item.id"
                          :style="changeDivStyle(item.style, machine)"
                        >
                          {{ item.text }}
                        </div>
                      </div>
                      <!-- 右边 -->
                      <div class="right">
                        <template v-if="machine.combineID">
                          <el-tooltip class="item" effect="dark" placement="right">
                            <div slot="content">dpc不良:{{ machine.dpcRate }}</div>
                            <div class="dpc">
                              <span class="name">DPC</span>
                              <i class="iconfont icon-hexagon"></i>
                            </div>
                          </el-tooltip>
                        </template>
                        <template v-else>
                          <div class="dpc">
                            <span class="name">DPC</span>
                            <!-- <svg-icon className="hexagon" icon-class="hexagon" /> -->
                            <i class="iconfont icon-hexagon"></i>
                          </div>
                        </template>
                        <div class="lcb" :style="changeLcbStyle(machine)">LCB</div>
                        <div class="e-fail" :style="changeLcbStyle(machine)">e-fail</div>
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
  computed: {
    title() {
      return this.bottomData.length > 0 ? this.bottomData[this.currentIndex].location : "标题"
    }
  },
  filters: {
    // 将 FOL Line08 转化为 08#
    changeMachineName(value) {
      if (!value) return "-"
      return value.substring(value.length - 2) + "#"
    }
  },
  methods: {
    handlePercentConfig(rate) {
      let colors = rate ? ["#00b050"] : ["rgba(127, 127, 127, 0.9)", "rgba(127, 127, 127, 0.9)"]
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
      }
      //   // 绿色 红色 黄色 灰色
      //   { color: "rgba(1, 181, 153, 0.8)" },
      //   { color: "rgba(230, 100, 100, 0.8)" },
      //   { color: "rgba(255, 228, 52, 0.8)" },
      //   { color: "rgba(128, 128, 128, 0.8)" }
      return {}
    },
    // 改变旗子的颜色
    changeIcon(machine) {
      // 如果没有机台
      if (!machine.combineID) {
        return {
          color: "rgba(128, 128, 128, 0.8)",
          "border-right": "2px solid rgba(128, 128, 128, 0.8)"
        }
      }
    },
    // 改变主体的颜色
    changeMachineInfo(machine) {
      if (!machine.combineID) {
        return {
          border: "2px solid rgba(127, 127, 127, 0.9)",
          "box-shadow": "inset 0 0 10px rgba(127, 127, 127, 0.9)"
        }
      }
    },
    changeDivStyle(style, machine) {
      if (!machine.combineID) {
        return {
          ...style,
          color: "rgba(127, 127, 127, 0.9)",
          border: `1px solid rgba(127, 127, 127, 0.9)`
        }
      } else {
        return { ...style }
      }
    },
    changeLcbStyle(machine) {
      if (!machine.combineID) {
        return {
          color: "rgba(127, 127, 127, 0.9)",
          border: "1px solid rgba(127, 127, 127, 0.9)"
        }
      }
    },
    // changeItemStyle(machine, item) {
    //   if (
    //     (machine.combineID == "M0001FC02" ||
    //       machine.combineID == "M0001FC11" ||
    //       machine.combineID == "M0001FC14") &&
    //     item.text == "FC"
    //   ) {
    //     return {
    //       color: "#fff",
    //       ...item.style,
    //       background: "rgba(230, 100, 100, 0.6)"
    //     }
    //   } else {
    //     return { color: "rgba(1, 181, 153, 0.8)", ...item.style }
    //   }
    // },
    // changelcbStyle(machine) {
    //   if (
    //     machine.combineID == "M0001FC02" ||
    //     machine.combineID == "M0001FC11" ||
    //     machine.combineID == "M0001FC14"
    //   ) {
    //     return { background: "rgba(230, 100, 100, 0.6)" }
    //   }
    // },
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
      background: rgba(7, 23, 145, 0.5);
      .blcok-name {
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
        color: rgba(255, 255, 255, 0.8);
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
                color: rgba(1, 181, 153, 0.8);
                border-right: 2px solid rgba(1, 181, 153, 0.8);
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
              border: 2px solid #354fad;
              box-shadow: inset 0 0 10px rgba(53, 79, 173, 1);
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
                  margin-top: 5px;
                  width: 40px;
                  height: 40x;
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
                  width: 35px;
                  height: 35px;
                  line-height: 35px;
                  border-radius: 50%;
                  border: 1px solid #46bb9b;
                  margin: 8px 0px;
                }
                .e-fail {
                  width: 30px;
                  height: 25px;
                  line-height: 25px;
                  border: 1px solid #46bb9b;
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
        color: rgba(89, 113, 197, 0.6);
      }
      .icon1 {
        font-weight: bold;
        font-size: 25px;
        color: rgba(89, 113, 197, 0.8);
      }
      .icon2 {
        font-weight: bold;
        font-size: 25px;
        color: rgba(89, 113, 197, 1);
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
