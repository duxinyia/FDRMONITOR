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
        <dv-border-box-11 :title="`${item.title}生產看板`">
          <div
            class="container"
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="#111e40"
          >
            <!-- <div class="container"> -->
            <div class="item" v-for="(i, index) in comLength" :key="index">
              <div class="header">
                <div
                  class="header-item"
                  v-show="
                    index !== 'hitRateColor' && index !== 'yieldColor' && index !== 'machineState'
                  "
                  v-for="(item, index) in resultvalue[cIndex] ? resultvalue[cIndex][0] : {}"
                  :key="index"
                >
                  <text-over-tooltip
                    refName="testName2"
                    className="header-item"
                    :content="index"
                  ></text-over-tooltip>
                  <!-- {{ index }} -->
                </div>
              </div>
              <div class="item-container">
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
                    class="show lamp-container"
                    v-show="
                      index !== 'hitRateColor' && index !== 'yieldColor' && index !== 'machineState'
                    "
                    v-for="(ii, index) in item"
                    :key="index"
                  >
                    <span
                      v-if="index === 'hitRate' || index === 'firstYield' || index === 'machine'"
                      class="lamp"
                      :style="
                        getColorStatus(
                          cIndex,
                          index,
                          resultvalue[cIndex][dindex].hitRate,
                          resultvalue[cIndex][dindex].firstYield,
                          resultvalue[cIndex][dindex].machineState
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
    resultvalue: {
      type: Object,
      default: () => ({})
    },
    cIndex: {
      type: String,
      default: "AA"
    },
    titleData: {
      type: Array,
      default: () => []
    },
    rColor: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      tableTitle: [],
      isArray: true
    }
  },
  mounted() {},
  computed: {
    loading() {
      let count = 0
      for (let key in this.resultvalue[this.cIndex]) {
        // if (this.resultvalue[this.cIndex].hasOwnProperty(key)) {
        count++
        // }
      }
      return count === 0
    },
    comLength() {
      let count = 0
      for (let key in this.resultvalue[this.cIndex]) {
        // if (this.resultvalue[this.cIndex].hasOwnProperty(key)) {
        count++
        // }
      }
      let num = parseInt(count / 25) + 1 <= 3 ? parseInt(count / 25) + 1 : 3
      return num
    }
  },
  watch: {},
  methods: {
    getColorStatus(c, i, r, y, machineState) {
      if (c == "RET") {
        if (i === "firstYield") {
          let yid = Number.parseFloat(y) || 0
          if (yid >= 97.5) {
            return { background: "#92d050" }
          } else if (yid < 94.5) {
            return { background: "#ff5050" }
          } else {
            return { background: "#ffc000" }
          }
        }
      } else if (c == "TET") {
        if (i === "firstYield") {
          let yid = Number.parseFloat(y) || 0
          if (yid >= 97.5) {
            return { background: "#92d050" }
          } else if (yid < 95) {
            return { background: "#ff5050" }
          } else {
            return { background: "#ffc000" }
          }
        }
      } else if (c == "FTC") {
        if (i === "firstYield") {
          let yid = Number.parseFloat(y) || 0
          if (yid >= 99.5) {
            return { background: "#92d050" }
          } else if (yid < 95) {
            return { background: "#ff5050" }
          } else {
            return { background: "#ffc000" }
          }
        }
      } else {
        if (i === "machine") {
          if (machineState == "Run") {
            return { background: "#92d050" }
          } else if (machineState == "Down") {
            return { background: "#ff5050" }
          } else {
            return { background: "#ffc000" }
          }
        }

        if (i === "firstYield") {
          let yid = Number.parseFloat(y) || 0
          if (yid > 99) {
            return { background: "#92d050" }
          } else if (yid < 97) {
            return { background: "#ff5050" }
          } else {
            return { background: "#ffc000" }
          }
        }
      }
      if (i === "hitRate") {
        let hr = Number.parseFloat(r) || 0
        if (hr >= 100) {
          return { background: "#92d050" }
        } else if (hr < 95) {
          return { background: "#ff5050" }
        } else {
          return { background: "#ffc000" }
        }
      }
    },
    // 颜色的控制
    // changeStyle(hitRate) {
    //   return { background: "#92d050" }
    // },
    // 回调的参数为 索引
    carouselChange(index) {
      this.$emit("autoPlay", index)
    },
    // 上一页
    prev() {
      this.$refs.carousel.prev()
    },
    // 下一页
    next() {
      this.$refs.carousel.next()
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
  width: 300%;
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
    &:nth-child(2) {
      margin: 0 20px;
    }
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

          flex: 1;
          border-right: 1px solid #1683af;
        }
        .lamp-container {
          // background-color: #92d050;
          display: flex;
          justify-content: center;
          align-items: center;
          .lamp {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-left: 8px;
            margin-right: 2px;
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
.el-tooltip {
  // width: unset;
  // height: unset;
  background-color: unset;
  border: unset;
  font-size: unset;
  color: unset;
}
</style>
