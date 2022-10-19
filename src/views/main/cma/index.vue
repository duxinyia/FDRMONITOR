<template>
  <div id="index" ref="appRef" :style="{ backgroundImage: `url(${imgUrl})` }">
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
          <el-tooltip content="返回首頁" placement="top">
            <span class="iconfont icon-shouye-shouye select-bg" @click="goHome"></span>
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
          <el-tooltip content="退出" placement="top">
            <span class="iconfont icon-tuichu1 signout" @click="logout"></span>
          </el-tooltip>
        </div>
      </div>
      <!-- 不同项目切换 -->
      <project-dialog :dialogKey="Date.now()" :dialogVisible.sync="dialogVisible" />
      <!-- 不同背景切换 -->
      <bgs-dialog
        @changeBg="changeBg"
        :dialogKey="Date.now()"
        :dialogVisible.sync="bgDialogVisible"
      />
      <router-view />
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
      screenArr: [
        { id: 1, name: "AA設備總覽", path: "aa" },
        { id: 2, name: "FOL設備總覽", path: "fol" },
        { id: 3, name: "產出可視化平台", path: "output" },
        { id: 4, name: "九宮格產出看板", path: "output2" },
        { id: 5, name: "製造層", path: "make" },
        { id: 6, name: "製造戰情中心", path: "makewar" }
      ],
      imgUrl: cache.getCache("bgUrl")
        ? cache.getCache("bgUrl").bg
        : require("@/assets/images/background5.png")
    }
  },
  mounted() {
    this.initScreen()
  },
  methods: {
    changeBg(data) {
      this.imgUrl = data
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
      this.$router.replace({ name: "overview" })
    },
    logout() {
      // 清空缓存
      cache.deleteCache("user")
      this.$router.replace("/login")
      this.$message.success("退出成功~")
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
