<template>
  <div class="page-header">
    <!-- 第一行 -->
    <div class="header-one">
      <dv-decoration-10 class="dv-dec-10" />
      <!-- <dv-decoration-8 class="dv-dec-8" :color="changeColor" /> -->
      <dv-decoration-8 class="dv-dec-8" :color="['#568aea', '#000000']" />
      <div class="logo-container">
        <img class="logo" :src="logoSrc" alt="logoSrc" />
      </div>
      <dv-decoration-8 class="dv-dec-8" :reverse="true" :color="['#568aea', '#000000']" />
      <!-- <dv-decoration-8 class="dv-dec-8" :reverse="true" :color="changeColor" /> -->
      <dv-decoration-10 class="dv-dec-10-s" />
    </div>
    <!-- 各种操作按钮 -->
    <div class="operations">
      <div class="left">
        <!-- 展开菜单 -->
        <el-tooltip content="戰情中心" placement="top">
          <span class="iconfont icon-shezhi setup" @click="dialogVisible = true"></span>
        </el-tooltip>
        <!-- 背景选择 -->
        <el-tooltip content="背景選擇" placement="top">
          <span class="iconfont icon-fenlei select-bg" @click="bgDialogVisible = true"></span>
        </el-tooltip>
        <!-- 主题切换 -->
        <!-- <el-switch
          v-model="thememode"
          active-icon-class="el-icon-sunny"
          inactive-icon-class="el-icon-moon"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch> -->
      </div>
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
          <span class="iconfont icon-shouye-shouye select-bg" @click="goHome"></span>
        </el-tooltip>
        <!-- 退出 -->
        <el-tooltip content="退出" placement="top">
          <span class="iconfont icon-tuichu1 signout" @click="logout"></span>
        </el-tooltip>
      </div>
    </div>
    <!-- 第二行 -->
    <div class="header-two">
      <div class="react-left">
        <span class="address" v-html="address"></span>
      </div>
      <h3 class="title-text">{{ title }}</h3>
      <div class="react-right">
        <span class="currentTime">{{ currentTime }}</span>
      </div>
    </div>
    <!-- 不同项目切换 -->
    <project-dialog :dialogVisible.sync="dialogVisible" />
    <!-- 不同背景切换 -->
    <bgs-dialog
      @radioChangeBg="radioChangeBg"
      @selectChangeBg="selectChangeBg"
      :dialogVisible.sync="bgDialogVisible"
    />
  </div>
</template>

<script>
// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
// 全屏
import screenfull from "screenfull"
// 导入弹框
import ProjectDialog from "@/components/project-dialog/project-dialog.vue"
// 导入背景选择弹框
import BgsDialog from "@/components/bgs-dialog/bgs-dialog.vue"
export default {
  name: "page-header",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    ProjectDialog,
    BgsDialog
  },
  data() {
    return {
      logoSrc: require("@/assets/images/RP_logo_blue.png"),
      address: "深圳&nbsp;龍華&nbsp;三贏&nbsp;CMA",
      currentTime: "", // 当前的时间
      timing: null,
      dialogVisible: false,
      bgDialogVisible: false,
      isFullScreen: false,
      thememode: true
    }
  },
  mounted() {
    this.initScreen()
  },
  computed: {
    changeAppBg() {
      if (this.imgUrl.includes("img")) {
        return { background: `url(${this.imgUrl})` }
      } else {
        return { background: this.imgUrl }
      }
    }
    // changeColor() {
    //   return this.$store.getters.theme == "dark" ? ["#568aea", "#000000"] : ["red", "green"]
    // }
  },
  created() {
    this.getCurrentTime()
  },
  methods: {
    // 选择了背景图片
    radioChangeBg(imgUrl) {
      this.imgUrl = imgUrl
    },
    // 选择了纯色 背景
    selectChangeBg(bgCol) {
      this.imgUrl = bgCol
    },
    goHome() {
      this.$router.push(this.$store.state.fullLoading.path)
    },
    logout() {
      cache.deleteCache("user")
      this.$router.replace("/login")
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
        // color: #3762ff;
        color: var(--page-head-icon);
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
        @extend .fullscreen;
        font-weight: bold;
        margin-left: 10px;
      }
    }
    .left {
      .setup {
        cursor: pointer;
        font-size: 30px;
        // color: #3762ff;
        color: var(--page-head-icon);
        &:hover {
          color: aqua;
        }
      }
      .select-bg {
        @extend .setup;
        margin-left: 10px;
      }
    }
  }
  .header-two {
    display: flex;
    justify-content: space-between;
    .title-text {
      font-size: 35px;
      font-weight: 700;
      height: 50px;
      line-height: 50px;
      vertical-align: bottom;
      color: var(--base-text-color);
    }
    .react-left {
      width: 400px;
      height: 0;
      text-align: left;
      line-height: 50px;
      // border-bottom: 50px solid #0e1738;
      border-bottom: 50px solid var(--react-bg);
      border-right: 45px solid transparent;
      .address {
        font-size: 22px;
        // color: #999;
        color: var(--react-text);
      }
    }
    .react-right {
      @extend .react-left;
      text-align: right;
      border-right: none;
      border-left: 45px solid transparent;
      .currentTime {
        font-size: 23px;
        color: var(--react-text);
        // color: #999;
      }
    }
  }
}
</style>
