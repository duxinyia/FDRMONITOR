<template>
  <div class="page-header">
    <!-- 第一行 -->
    <div class="header-one">
      <dv-decoration-10 class="dv-dec-10" />
      <dv-decoration-8 class="dv-dec-8" :color="changeColor" />
      <div class="logo-container">
        <img class="logo" :src="logoSrc" alt="logoSrc" />
      </div>
      <dv-decoration-8 class="dv-dec-8" :reverse="true" :color="changeColor" />
      <dv-decoration-10 class="dv-dec-10-s" />
    </div>
    <!-- 各种操作按钮 -->
    <div class="operations">
      <div class="left"></div>
      <div class="right">
        <!-- 返回上一级 -->
        <el-tooltip v-if="$route.meta.isJump" content="返回上一级" placement="top">
          <span class="iconfont icon-fanhui backone" @click="$router.go(-1)"></span>
        </el-tooltip>
        <!-- 全屏和退出 -->
        <el-tooltip :content="isFullScreen ? '退出全屏' : '全屏'" placement="top">
          <span
            :class="{
              iconfont: true,
              fullscreen: true,
              'icon-quanping': !isFullScreen,
              'icon-tuichuquanping': isFullScreen
            }"
            @click="fullscreenClick"
          ></span>
        </el-tooltip>
        <!-- 返回首頁 -->
        <el-tooltip content="返回首頁" placement="top">
          <span class="iconfont icon-shouye select-bg" @click="goHome"></span>
        </el-tooltip>
      </div>
    </div>
    <!-- 第二行 -->
    <div class="header-two">
      <div class="react-container">
        <div class="react-left">
          <span class="address" v-html="changeAddress"></span>
        </div>
      </div>
      <div class="header-center">
        <div class="left" v-if="this.$store.getters.theme == 'light'"></div>
        <h3 class="title-text">{{ title }}</h3>
        <div class="right" v-if="this.$store.getters.theme == 'light'"></div>
      </div>

      <div class="react-container">
        <div class="react-right">
          <span class="currentTime">{{ currentTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 全屏
import screenfull from "screenfull"
export default {
  name: "page-header",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      logoSrc: require("@/assets/images/other/new_logo.png"),
      currentTime: "", // 当前的时间
      timing: null,
      isFullScreen: false
    }
  },
  mounted() {
    this.initScreen()
  },
  computed: {
    changeColor() {
      return this.$store.getters.theme == "dark" ? ["#568aea", "#000000"] : ["#568aea", "#ecf6ff"]
    },
    changeAddress() {
      if (this.$route.path.includes("cma")) {
        return "RAYPRUS&nbsp;深圳&nbsp;龍華&nbsp;CMA"
      } else {
        return "RAYPRUS&nbsp;深圳&nbsp;龍華&nbsp;DP"
      }
    }
  },
  created() {
    this.getCurrentTime()
  },
  methods: {
    goHome() {
      let path = this.$store.state.fullLoading.path
      this.$router.replace(path).catch((err) => {})
    },
    initScreen() {
      if (screenfull.enabled) {
        screenfull.on("change", this.changeScreen)
      }
    },
    changeScreen() {
      this.isFullscreen = screenfull.isFullscreen
    },
    // 切换全屏
    fullscreenClick() {
      if (!screenfull.enabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning"
        })
        return false
      }
      this.isFullScreen = !this.isFullScreen
      screenfull.toggle()
    },
    destroyScreen() {
      if (screenfull.enabled) {
        screenfull.off("change", this.changeScreen)
      }
    },
    // 获取当前时间
    getCurrentTime() {
      this.timing = setInterval(() => {
        this.currentTime = this.$moment().format("YYYY-MM-DD HH:mm:ss")
      }, 1000)
    }
  },
  beforeDestroy() {
    clearInterval(this.timing)
    this.destroyScreen()
  }
}
</script>
<style lang="scss" scoped>
.page-header {
  margin-top: 6px;
  .header-one {
    display: flex;
    .dv-dec-10,
    .dv-dec-10-s {
      width: 33.3%;
      height: 5px;
    }
    .dv-dec-10-s {
      transform: rotateY(180deg);
    }
    .dv-dec-8 {
      width: 200px;
      height: 50px;
    }
    .logo-container {
      width: 500px;
      text-align: center;
      .logo {
        width: 200px;
        height: 50px;
      }
    }
  }
  .operations {
    position: absolute;
    width: 100%;
    top: 18px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .right {
      height: 100%;
      display: flex;
      align-items: center;
      .fullscreen {
        cursor: pointer;
        font-size: 30px;
        background: var(--page-head-icon);
        background-clip: text;
        color: #fff;
        -webkit-text-fill-color: transparent;
        &:hover {
          color: aqua;
        }
      }
      .backone {
        @extend .fullscreen;
        margin-right: 10px;
      }
      .signout {
        @extend .fullscreen;
        font-size: 29px;
        margin-top: -3px;
        margin-left: 10px;
      }
      .select-bg {
        cursor: pointer;
        font-size: 30px;
        @extend .fullscreen;
        font-weight: bold;
        margin-left: 10px;
      }
    }
  }
  .header-two {
    display: flex;
    justify-content: space-between;
    .header-center {
      display: flex;
      align-items: center;
      .left,
      .right {
        width: 300px;
        height: 5px;
      }
      .left {
        margin-right: 20px;
        background: linear-gradient(
          to right,
          rgba(90, 210, 250, 0) 26.1%,
          rgba(39, 75, 232, 1) 100%
        );
      }
      .title-text {
        font-size: 35px;
        font-weight: 700;
        height: 50px;
        line-height: 50px;
        vertical-align: bottom;
        background: var(--page-head-title);
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .right {
        margin-left: 20px;
        background: linear-gradient(
          to left,
          rgba(90, 210, 250, 0) 26.1%,
          rgba(39, 75, 232, 1) 100%
        );
      }
    }
    .react-container {
      width: 400px;
      height: 50px;
      overflow: hidden;

      .react-left {
        width: 100%;
        height: 50px;
        transform: skewX(45deg);
        transform-origin: bottom;
        text-align: left;
        line-height: 50px;
        background: var(--react-left-bg);
        .address {
          display: inline-block;
          margin-left: 25px;
          font-size: 22px;
          color: var(--react-text);
          transform: skewX(-45deg);
        }
      }
      .react-right {
        @extend .react-left;
        text-align: right;
        border-right: none;
        transform: skewX(-45deg);
        background: var(--react-right-bg);
        .currentTime {
          display: inline-block;
          font-size: 23px;
          margin-right: 25px;
          color: var(--react-text);
          transform: skewX(45deg);
        }
      }
    }
  }
}
</style>
