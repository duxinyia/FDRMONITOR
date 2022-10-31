<template>
  <div id="index" ref="appRef" :style="changeAppBg">
    <dv-loading v-if="$store.state.fullLoading.fullLoading">Loading...</dv-loading>
    <div class="contaienr">
      <!-- 退出按钮 -->
      <div class="operations">
        <div class="left">
          <!-- 展开菜单 -->
          <el-tooltip content="戰情中心" placement="top">
            <span class="iconfont icon-shezhi setup" @click="openProjectDialog"></span>
          </el-tooltip>
          <el-tooltip content="背景選擇" placement="top">
            <span class="iconfont icon-fenlei select-bg" @click="openBgDialog"></span>
          </el-tooltip>
        </div>
        <div class="right">
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
      <!-- 不同项目切换 -->
      <project-dialog :dialogKey="Date.now()" :dialogVisible.sync="dialogVisible" />
      <!-- 不同背景切换 -->
      <bgs-dialog
        @radioChangeBg="radioChangeBg"
        @selectChangeBg="selectChangeBg"
        :dialogKey="Date.now()"
        :dialogVisible.sync="bgDialogVisible"
      />
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>
<script>
// 导入自适应函数
import drawMixin from "@/utils/drawMixin"
// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
// 全屏
import screenfull from "screenfull"
// 导入弹框
import ProjectDialog from "@/components/project-dialog/project-dialog.vue"
// 导入背景选择弹框
import BgsDialog from "@/components/bgs-dialog/bgs-dialog.vue"
export default {
  mixins: [drawMixin],
  components: {
    ProjectDialog,
    BgsDialog
  },
  data() {
    return {
      isFullScreen: false,
      dialogVisible: false,
      bgDialogVisible: false,
      imgUrl: cache.getCache("bgUrl")
        ? cache.getCache("bgUrl").bg
        : require("@/assets/images/background5.png")
    }
  },
  mounted() {
    this.initScreen()
  },
  computed: {
    changeAppBg() {
      console.log("changeAppBg")
      if (this.imgUrl.includes("img")) {
        return { background: `url(${this.imgUrl})` }
      } else {
        return { background: this.imgUrl }
      }
    }
  },
  methods: {
    // 选择了背景图片
    radioChangeBg(imgUrl) {
      this.imgUrl = imgUrl
      // this.$refs["appRef"].style.background = `url(${imgUrl})`
    },
    // 选择了纯色 背景
    selectChangeBg(bgCol) {
      this.imgUrl = bgCol
      // this.$refs["appRef"].style.background = bgCol
      // console.log(this.$refs["appRef"].style.background)
    },
    changeBg(bg) {
      console.log("data", bg)
      if (bg) {
        if (bg.includes("img")) {
          this.$refs["appRef"].style.background = `url(${this.imgUrl})`
        } else {
          this.$refs["appRef"].style.background = bg
        }
        this.imgUrl = bg
      }
    },

    initScreen() {
      if (screenfull.enabled) {
        screenfull.on("change", this.changeScreen)
      }
    },
    changeScreen() {
      this.isFullscreen = screenfull.isFullscreen
    },
    openProjectDialog() {
      this.dialogVisible = true
    },
    openBgDialog() {
      this.bgDialogVisible = true
    },
    goHome() {
      this.$router.push(this.$store.state.fullLoading.path)
    },
    // goNext() {
    //   console.log("hello world")
    // },
    logout() {
      // 清空缓存  { background: `url(${imgUrl})` }
      cache.deleteCache("user")
      this.$router.replace("/login")
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
    }
  },
  beforeDestroy() {
    this.destroyScreen()
  }
}
</script>

<style lang="scss" scoped>
#index {
  color: #fff;
  width: 1920px;
  height: 1080px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;
  box-sizing: border-box;
  .contaienr {
    width: 100%;
    height: 100%;
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
          color: #3762ff;
          &:hover {
            color: aqua;
          }
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
          color: #3762ff;
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
  }
}
</style>
