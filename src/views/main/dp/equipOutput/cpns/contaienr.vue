<template>
  <div class="page-main-a">
    <!-- 使用轮播图来展示数据 -->
    <el-carousel
      style="height: 860px"
      indicator-position="none"
      :interval="15 * 1000"
      ref="carousel"
      arrow="never"
      @change="carouselChange"
    >
      <el-carousel-item v-for="(item, index) in titleData" :key="index">
        <dv-border-box-11 :title="`${cIndex}生產看板`">
          <div
            class="container"
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="#111e40"
          >
            <!-- <div class="container"> -->
            <div class="item" v-for="(i, index) in comLength" :key="index">
              <!-- 表格头部 -->
              <div class="header">
                <div
                  class="header-item"
                  :style="
                    index === 'machine' || index === 'firstYield' || index === 'hitRate'
                      ? index === 'machine' && isMachineState
                        ? 'flex: 1.4'
                        : 'flex: 1.18'
                      : ''
                  "
                  v-show="
                    index !== 'hitRateColor' && index !== 'yieldColor' && index !== 'machineState'
                  "
                  v-for="(item, index) in resultvalue[cIndex] ? resultvalue[cIndex][0] : {}"
                  :key="index"
                >
                  <!--  tooltip的封装-->
                  <!-- <text-over-tooltip
                    refName="testName2"
                    className="header-item"
                    :content="index"
                  ></text-over-tooltip> -->
                  <!-- 将后端拿到的数据字段变成需求的表头名 -->
                  {{
                    index !== "firstYield"
                      ? index.charAt(0).toUpperCase() + index.slice(1)
                      : "1st Yield"
                  }}
                </div>
              </div>
              <div class="item-container">
                <!-- 表格数据截断 -->
                <div
                  v-for="(item, dindex) in resultvalue[cIndex]
                    ? resultvalue[cIndex].slice(
                        i * 24 - 24,
                        i === 3 ? resultvalue[cIndex].length : i * 24
                      )
                    : {}"
                  :key="dindex"
                  class="every-item"
                >
                  <div
                    :style="
                      index === 'firstYield' || index === 'hitRate' || index === 'machine'
                        ? index === 'machine' && isMachineState
                          ? 'flex: 1.4'
                          : 'flex: 1.18'
                        : ''
                    "
                    class="show"
                    :class="
                      index === 'hitRate' ||
                      index === 'firstYield' ||
                      (index === 'machine' && isMachineState)
                        ? 'lamp-container'
                        : ''
                    "
                    v-show="
                      index !== 'hitRateColor' && index !== 'yieldColor' && index !== 'machineState'
                    "
                    v-for="(ii, index) in item"
                    :key="index"
                  >
                    <!-- 状态颜色 -->
                    <span
                      v-if="index === 'hitRate' || index === 'firstYield' || index === 'machine'"
                      id="lamp"
                      :style="
                        getColorStatus(
                          cIndex,
                          index,
                          item.hitRate,
                          item.firstYield,
                          item.machineState
                        )
                      "
                    ></span>
                    <span class="text"> {{ ii }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dv-border-box-11>
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
</template>

<script>
// 引入tooltop公共组件
import TextOverTooltip from "@/components/text-over-tooltip/TextOverTooltip.vue"
export default {
  name: "contaienr",
  components: { TextOverTooltip },
  props: {
    // 所有的数据
    resultvalue: {
      type: Object,
      default: () => ({})
    },
    // 当前的
    cIndex: {
      type: String,
      default: "AA"
    },
    // 上面颜色的综合
    titleData: {
      type: Array,
      default: () => []
    },
    // 右边的颜色
    rColor: {
      type: Object,
      default: () => ({})
    },
    plid: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      // 判断是否有machineState,或者isMachineState不为红黄绿三个颜色
      isMachineState: true,
      colors1: ["rgba(255, 0, 102, 0.9)", "rgba(0, 255, 0, 0.9)", "rgba(255, 255, 0, 0.9)"],
      colors: [
        "radial-gradient(50% 50%, rgba(255, 0, 102, 0.5) 50%, rgba(255, 0, 102, 1) 100%)",
        "radial-gradient(50% 50%, rgba(0, 255, 0, 0.5) 50%, rgba(0, 255, 0, 1) 100%)",
        "radial-gradient(50% 50%, rgba(255, 255, 0, 0.5) 50%, rgba(255, 255, 0, 1) 100%)"
      ]
    }
  },
  mounted() {},
  computed: {
    // 数据没返回，有loading效果
    loading() {
      let count = 0
      for (let key in this.resultvalue[this.cIndex]) {
        // if (this.resultvalue[this.cIndex].hasOwnProperty(key)) {
        count++
        // }
      }
      return count === 0
    },
    // 计算页面表格列数，一列24行数据，只能出现三大列，多余的数据在第三列（可以滚动查看）
    comLength() {
      let count = 0
      for (let key in this.resultvalue[this.cIndex]) {
        count++
      }
      let num = parseInt(count / 25) + 1 <= 3 ? parseInt(count / 25) + 1 : 3
      return num
    }
  },
  watch: {},
  methods: {
    // globalStatus(max, min, gi, gy) {
    //   if (gi === "firstYield") {
    //     let yid = Number.parseFloat(gy) || 0
    //     if (yid >= max) {
    //       return { background: "#92d050" }
    //     } else if (yid < min) {
    //       return { background: "#ff5050" }
    //     } else {
    //       return { background: "rgba(255, 255, 0, 0.9)" }
    //     }
    //   }
    // },
    // 返回颜色状态 c代表是哪个看板，i代表哪一列，r代表当前的hitRate的值，y代表当前的firstYield的值，machineState代表当前machineState的值
    getColorStatus(c, i, r, y, machineState = 0) {
      if (c == "RET") {
        // this.globalStatus(97.5, 94.5, i, y)
        if (i === "firstYield") {
          let yid = Number.parseFloat(y) || 0
          if (yid >= 97.5) {
            return { background: this.colors[1], color: this.colors1[1] }
          } else if (yid < 94.5) {
            return { background: this.colors[0], color: this.colors1[0] }
          } else {
            return { background: this.colors[2], color: this.colors1[2] }
          }
        }
      } else if (c == "TET") {
        // this.globalStatus(97.5, 95, i, y)
        if (i === "firstYield") {
          let yid = Number.parseFloat(y) || 0
          if (yid >= 97.5) {
            return { background: this.colors[1], color: this.colors1[1] }
          } else if (yid < 95) {
            return { background: this.colors[0], color: this.colors1[0] }
          } else {
            return { background: this.colors[2], color: this.colors1[2] }
          }
        }
      } else if (c == "FTC") {
        if (i === "firstYield") {
          let yid = Number.parseFloat(y) || 0
          if (yid >= 99.5) {
            return { background: this.colors[1], color: this.colors1[1] }
          } else if (yid < 95) {
            return { background: this.colors[0], color: this.colors1[0] }
          } else {
            return { background: this.colors[2], color: this.colors1[2] }
          }
        }
      } else if (c === "AA") {
        if (i == "firstYield") {
          let yid = Number.parseFloat(y) || 0
          if (yid > 99) {
            return { background: this.colors[1], color: this.colors1[1] }
          } else if (yid < 97) {
            return { background: this.colors[0], color: this.colors1[0] }
          } else {
            return { background: this.colors[2], color: this.colors1[2] }
          }
        }
      }
      if (i === "machine") {
        if (machineState == "Run") {
          this.isMachineState = true
          return { background: this.colors[1], color: this.colors1[1] }
        } else if (machineState == "Down") {
          this.isMachineState = true
          return { background: this.colors[0], color: this.colors1[0] }
        } else if (machineState == "Idle") {
          this.isMachineState = true
          return { background: this.colors[2], color: this.colors1[2] }
        } else {
          this.isMachineState = false
          return { display: "none" }
        }
      }
      if (i === "hitRate") {
        let hr = Number.parseFloat(r) || 0
        if (hr >= 100) {
          return { background: this.colors[1], color: this.colors1[1] }
        } else if (hr < 95) {
          return { background: this.colors[0], color: this.colors1[0] }
        } else {
          return { background: this.colors[2], color: this.colors1[2] }
        }
      }
    },
    // 回调的参数为 索引
    carouselChange(index) {
      this.$emit("autoPlay", index)
    },
    // 上一页
    prev() {
      this.$refs.carousel.setActiveItem(this.plid - 1)
      this.$emit("changeId", this.plid, 1)
    },
    // 下一页
    next() {
      this.$refs.carousel.setActiveItem(this.plid + 1)
      this.$emit("changeId", this.plid, 2)
      // this.$refs.carousel.next()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-carousel__container {
  height: 100%;
}
::v-deep .border-box-content {
  padding: 60px 20px 20px 20px;
}
::v-deep .el-carousel__container {
  // height: 100%;
}
::v-deep .el-carousel__item {
  // height: 100%;
}
::v-deep .dv-border-box-11-title {
  font-size: 25px;
  font-weight: bold;
}
.page-main-a {
  min-width: 300%;
  // height: 850px;
  padding-top: 5px;
  text-align: center;
}
.btns {
  span {
    z-index: 1000;
    margin-top: 10px;
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
      font-size: 20px;
      color: var(--aa-bottom-icon);
    }
    .icon1 {
      font-weight: bold;
      font-size: 20px;
      color: var(--aa-bottom-icon1);
    }
    .icon2 {
      font-weight: 800;
      font-size: 20px;
      color: var(--aa-bottom-icon2);
    }
  }
}
.container {
  margin-top: 51px;
  display: flex;
  .item {
    margin: 0 10px;
    // &:nth-child(2) {
    //   margin: 0 20px;
    // }
    // text-align: center;
    flex: 1;
    .header {
      font-size: 18px;

      display: flex;
      border-top: 1px solid #1683af;
      border-bottom: 1px solid #1683af;
      border-left: 1px solid #1683af;
      line-height: 35px;
      background: #243d97;
      .header-item {
        // width: 5px;
        // white-space: nowrap;
        // overflow: hidden;
        // text-overflow: ellipsis;
        flex: 1;
        border-right: 1px solid #1683af;
      }
      .header-item:hover {
        cursor: pointer;
      }
    }
    .item-container {
      overflow: overlay;
      height: 744px;

      .every-item {
        display: flex;
        border-bottom: 1px solid #1683af;
        border-left: 1px solid #1683af;
        line-height: 30px;

        .show {
          // width: 5px;
          white-space: nowrap;
          flex: 1;
          border-right: 1px solid #1683af;
        }
        .lamp-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          #lamp {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            margin-left: 8px;
            margin-right: 2px;
            animation: fade 2s infinite;

            // border: 1px solid #fff;
          }
          .text {
            padding-right: 8px;
          }
        }
      }
    }
  }
}

@keyframes fade {
  0% {
    box-shadow: inset 0 0 5px currentColor;
  }
  50% {
    box-shadow: inset 0 0 10px currentColor;
  }
  100% {
    box-shadow: inset 0 0 5px currentColor;
  }
}
.el-tooltip {
  // width: unset;
  // height: unset;
  background-color: unset;
  border: unset;
  font-size: unset;
  color: unset;
}
</style>
