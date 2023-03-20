<template>
  <div class="page-main">
    <!-- 分三栏 左边 中间 右边 -->
    <!-- <dv-border-box-12> -->
    <dv-border-box-10>
      <div class="contaienr">
        <!-- 使用轮播图来展示数据 -->
        <el-carousel
          style="height: 920px"
          indicator-position="none"
          :interval="15 * 1000"
          ref="carousel"
          arrow="never"
        >
          <el-carousel-item>
            <div class="item1-container">
              <div class="item">
                <dv-border-box-11 class="top-box" title="AA生產看板">
                  <div
                    class="item1"
                    v-loading="aaLoading"
                    element-loading-spinner="el-icon-loading"
                    element-loading-text="加载中"
                    element-loading-background="rgba(0, 0, 0, 1)"
                  >
                    <div class="header">
                      <div class="header-item">Device</div>
                      <div class="header-item" style="flex: 1.1">Machine</div>
                      <div class="header-item">Target</div>
                      <div class="header-item">OutPut</div>
                      <div class="header-item">HitRate</div>
                      <div class="header-item">1st Yield</div>
                    </div>
                    <div class="item-container">
                      <div v-for="(item, index) in aaData" :key="index" class="every-item">
                        <div class="show">{{ item.device }}</div>
                        <div class="show lamp-container" style="flex: 1.1">
                          <span class="lamp" :style="changeMachine(item.machineState)"></span>
                          <span class="text">{{ item.machine }}</span>
                        </div>
                        <div class="show">{{ item.target }}</div>
                        <div class="show">{{ item.outPut }}</div>
                        <div class="show lamp-container">
                          <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                          <span class="text">{{ item.hitRate }}</span>
                        </div>
                        <div class="show lamp-container">
                          <!-- {{ item.firstYield }} -->
                          <span class="lamp" :style="changeYield(item.firstYield)"></span>
                          <span class="text">{{ item.firstYield }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </dv-border-box-11>
              </div>
              <div class="item">
                <dv-border-box-11 class="top-box" title="CT生產看板">
                  <div
                    class="item1"
                    v-loading="ctLoading"
                    element-loading-spinner="el-icon-loading"
                    element-loading-text="加载中"
                    element-loading-background="rgba(0, 0, 0, 1)"
                  >
                    <div class="header">
                      <div class="header-item">Device</div>
                      <div class="header-item">Machine</div>
                      <div class="header-item">Target</div>
                      <div class="header-item">OutPut</div>
                      <div class="header-item">HitRate</div>
                      <div class="header-item">1st Yield</div>
                    </div>
                    <div class="item-container">
                      <div v-for="(item, index) in ctData" :key="index" class="every-item">
                        <div class="show">{{ item.device }}</div>
                        <div class="show">{{ item.machine }}</div>
                        <div class="show">{{ item.target }}</div>
                        <div class="show">{{ item.outPut }}</div>
                        <div class="show lamp-container">
                          <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                          <span class="text">{{ item.hitRate }}</span>
                        </div>
                        <div class="show">
                          {{ item.firstYield }}
                        </div>
                      </div>
                    </div>
                  </div></dv-border-box-11
                >
              </div>
              <div class="item">
                <dv-border-box-11 class="top-box" title="GA生產看板">
                  <div
                    class="item1"
                    v-loading="gaLoading"
                    element-loading-spinner="el-icon-loading"
                    element-loading-text="加载中"
                    element-loading-background="rgba(0, 0, 0, 1)"
                  >
                    <div class="header">
                      <div class="header-item">Machine</div>
                      <div class="header-item">Target</div>
                      <div class="header-item">OutPut</div>
                      <div class="header-item">HitRate</div>
                    </div>
                    <div class="item-container">
                      <div v-for="(item, index) in gaData" :key="index" class="every-item">
                        <div class="show">{{ item.machine }}</div>
                        <div class="show">{{ item.target }}</div>
                        <div class="show">{{ item.outPut }}</div>
                        <div class="show lamp-container">
                          <!-- {{ item.hitRate }} -->
                          <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                          <span class="text">{{ item.hitRate }}</span>
                        </div>
                      </div>
                    </div>
                  </div></dv-border-box-11
                >
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="item">
              <dv-border-box-11 class="top-box" title="ACF生產看板">
                <div
                  class="item1"
                  v-loading="aaLoading"
                  element-loading-spinner="el-icon-loading"
                  element-loading-text="加载中"
                  element-loading-background="rgba(0, 0, 0, 1)"
                >
                  <div class="header">
                    <div class="header-item">Device</div>
                    <div class="header-item">Machine</div>
                    <div class="header-item">Target</div>
                    <div class="header-item">OutPut</div>
                    <div class="header-item">HitRate</div>
                    <div class="header-item">1st Yield</div>
                  </div>
                  <div class="item-container">
                    <div v-for="(item, index) in aaData" :key="index" class="every-item">
                      <div class="show">{{ item.device }}</div>
                      <div class="show lamp-container" style="width: 90px">
                        <!-- {{ item.machine }} -->
                        <span class="lamp" :style="changeMachine(item.machineState)"></span>
                        <span class="text">{{ item.machine }}</span>
                      </div>
                      <div class="show">{{ item.target }}</div>
                      <div class="show">{{ item.outPut }}</div>
                      <div class="show lamp-container">
                        <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                        <span class="text">{{ item.hitRate }}</span>
                      </div>
                      <div class="show lamp-container">
                        <span class="lamp" :style="changeYield(item.firstYield)"></span>
                        <span class="text">{{ item.firstYield }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </dv-border-box-11>
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
    </dv-border-box-10>
  </div>
</template>

<script>
// 导入发送请求的函数
import { getAAData, getGAData, getCTData } from "@/api/aagact.js"
export default {
  name: "aactga",
  data() {
    return {
      aaData: [],
      gaData: [],
      ctData: [],
      // colors: ["#ff4500", "#008000", "#ff0"]
      // 红 绿  黄
      colors: ["rgba(255, 0, 102, 0.9)", "rgba(0, 255, 0, 0.9)", "rgba(255, 255, 0, 0.9)"]
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "AA/GA/CT")
    getAAData().then((res) => {
      this.aaData = res
    })
    getGAData().then((res) => {
      this.gaData = res
    })
    getCTData().then((res) => {
      this.ctData = res
    })
  },
  computed: {
    aaLoading() {
      return this.aaData.length == 0
    },
    gaLoading() {
      return this.gaData.length == 0
    },
    ctLoading() {
      return this.ctData.length == 0
    }
  },
  methods: {
    changeStyle(hitRate) {
      // console.log(Number.parseFloat(hitRate))
      let num = Number.parseFloat(hitRate) || 0
      if (num >= 100) {
        return { background: this.colors[1] }
      } else if (num < 95) {
        return { background: this.colors[0] }
      } else {
        return { background: this.colors[2] }
      }
    },
    changeYield(firstYield) {
      // console.log(firstYield)
      let num = Number.parseFloat(firstYield)
      if (num < 99.4) {
        // return { color: "#9932CD" }
        // return { color: "#9900ff" }
        return { background: "#BF3EFF" }
      }
    },
    changeMachine(state) {
      // console.log("state", state)
      if (state == "Run") {
        return { background: this.colors[1] }
      } else if (state == "Down") {
        return { background: this.colors[0] }
      } else {
        return { background: this.colors[2] }
      }
    },
    changectStyle(device, firstYield) {
      let num = Number.parseFloat(firstYield)
      if (device == "JU") {
        if (num < 96) {
          return { color: this.colors[0] }
        }
      } else if (device == "MD-X" || device == "ML-X") {
        if (num < 98) {
          return { color: this.colors[0] }
        }
      } else if (device == "NH-X") {
        if (num < 93) {
          return { color: this.colors[0] }
        }
      }
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

<style lang="scss">
.top-box .border-box-content {
  padding: 60px 20px 20px 20px !important;
}
</style>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
}
::v-deep .el-carousel__container {
  height: 100%;
}

.page-main {
  margin-top: 10px;
}
.item1-container {
  display: flex;
  .item {
    flex: 1;
  }
}
.item {
  max-width: 640px;
}
.contaienr {
  .btns {
    span {
      position: absolute;
      width: 120px;
      height: 50px;
      text-align: center;
      animation: twinkle 2s infinite;
      cursor: pointer;
      &:nth-child(1) {
        left: 10px;
        top: 16px;
        z-index: 10;
      }
      &:nth-child(2) {
        right: 10px;
        top: 16px;
        z-index: 10;
      }
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
}
.item1 {
  flex: 1;
  text-align: center;
  .header {
    display: flex;
    border-top: 1px solid #1683af;
    border-bottom: 1px solid #1683af;
    border-left: 1px solid #1683af;
    line-height: 35px;
    background: #243d97;
    .header-item {
      flex: 1;
      border-right: 1px solid #1683af;
    }
  }
  .item-container {
    height: 810px;
    overflow: auto;
    .every-item {
      display: flex;
      border-bottom: 1px solid #1683af;
      border-left: 1px solid #1683af;
      line-height: 30px;
      .show {
        flex: 1;
        border-right: 1px solid #1683af;
      }
      .lamp-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .lamp {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          margin-left: 8px;
        }
        .text {
          padding-right: 8px;
        }
      }
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
