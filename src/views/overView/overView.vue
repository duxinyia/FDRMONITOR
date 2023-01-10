<template>
  <el-container class="overview">
    <!-- 侧边栏 -->
    <el-aside :width="menuFold ? '65px' : '300px'" :class="asideClass">
      <div class="top-title">
        <el-image class="logo" :src="changeLogo" fit="fill" />
        <h2 class="name" v-show="!menuFold">RAYPRUS</h2>
      </div>
      <!-- <el-menu
        class="el-menu-vertical"
        text-color="#fff"
        background-color="transparent"
        active-text-color="#ffd04b"
        :collapse="menuFold"
        router
        :default-active="$route.path"
      >
        <el-submenu index="/overview/cma">
          <template slot="title">
            <i class="el-icon-s-flag menu-icon"></i>
            <span>CMA总览</span>
          </template>
          <el-menu-item index="/overview/cma/device">
            <span class="iconfont icon-gongju mr-10"></span>
            <span slot="title">设备总览</span>
          </el-menu-item>
          <el-menu-item index="/overview/cma/make">
            <span class="iconfont icon-zhizaoye mr-10"></span>
            <span slot="title">制造总览</span>
          </el-menu-item>
          <el-menu-item index="/overview/cma/yield">
            <span class="iconfont icon-hege mr-10"></span>
            <span slot="title">良率总览</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/overview/about">
          <i class="el-icon-info menu-icon"></i>
          <span slot="title">关于</span>
        </el-menu-item>
      </el-menu>-->
      <el-menu
        class="el-menu-vertical"
        text-color="#fff"
        background-color="transparent"
        active-text-color="#ffd04b"
        :collapse="menuFold"
        :default-active="$route.path"
      >
        <!-- @open="handleOpen"
        @close="handleClose"
        @select="handSelect"-->
        <template v-for="item in menus">
          <template v-if="item.subs">
            <el-submenu :index="item.index" :key="item.title" @click.native="itemClick(item)">
              <template slot="title">
                <i :class="item.icon"></i>
                <!-- <span class="iconfont icon-jiedianguanli text"></span> -->
                <span slot="title">{{ item.title }}22</span>
              </template>
              <template v-for="subItem in item.subs">
                <template v-if="subItem.subs">
                  <el-submenu
                    :index="subItem.index"
                    :key="subItem.title"
                    @click.native.stop="itemClick(subItem)"
                  >
                    <template slot="title">
                      <i :class="subItem.icon"></i>
                      <span slot="title">{{ subItem.title }}</span>
                    </template>

                    <template v-for="subItem2 in subItem.subs">
                      <template v-if="subItem2.subs">
                        <el-submenu
                          :index="subItem2.index"
                          :key="subItem2.title"
                          @click.native.stop="itemClick(subItem2)"
                        >
                          <template slot="title">
                            <i :class="subItem2.icon"></i>
                            <span slot="title">{{ subItem2.title }}</span>
                          </template>
                          <template v-for="subItem3 in subItem2.subs">
                            <template v-if="subItem3.subs">
                              <el-submenu
                                :index="subItem3.index"
                                :key="subItem3.title"
                                @click.native.stop="itemClick(subItem3)"
                              >
                                <template slot="title">
                                  <i :class="subItem3.icon"></i>
                                  <span slot="title">{{ subItem3.title }}</span>
                                </template>
                                <el-menu-item
                                  v-for="fiveItem in subItem3.subs"
                                  :key="fiveItem.title"
                                  :index="fiveItem.index"
                                  @click.native.stop="itemClick(fiveItem)"
                                >
                                  <i :class="fiveItem.icon"></i>
                                  <span slot="title">{{ fiveItem.title }}</span>
                                </el-menu-item>
                              </el-submenu>
                            </template>
                            <el-menu-item
                              v-else
                              :index="subItem3.index"
                              :key="subItem3.title"
                              @click.native.stop="itemClick(subItem3)"
                            >
                              <i :class="subItem3.icon"></i>
                              <span slot="title">{{ subItem3.title }}</span>
                            </el-menu-item>
                          </template>
                        </el-submenu>
                      </template>
                      <el-menu-item
                        v-else
                        :index="subItem2.index"
                        :key="subItem2.title"
                        @click.native.stop="itemClick(subItem2)"
                      >
                        <i :class="subItem2.icon"></i>
                        <span slot="title">{{ subItem2.title }}</span>
                      </el-menu-item>
                    </template>
                  </el-submenu>
                </template>

                <el-menu-item v-else :index="subItem.index" :key="subItem.title">
                  <i :class="subItem.icon"></i>
                  <span slot="title">{{ subItem.title }}</span>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>

          <template v-else>
            <el-menu-item :index="item.index" :key="item.title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-aside>
    <!-- 右边区域: header 区域 和 main区域 -->
    <el-container class="right-container">
      <el-header class="header-container">
        <div class="header-left">
          <i
            class="flod"
            :class="menuFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            @click="menuFold = !menuFold"
          ></i>
          <span class="title">戰情中心</span>
        </div>
        <!-- <div class="header-center"></div> -->
        <div class="header-right">
          <!-- 时间显示 -->
          <span class="currentTime">{{ currentTime }}</span>

          <!-- 显示用户名 -->
          <span class="username">{{ $store.state.user.user.fullName }}</span>

          <!-- 下拉菜单 -->
          <el-dropdown @command="handleCommand" placement="bottom">
            <span class="el-dropdown-link">
              <i class="el-icon-user-solid user-icon"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-switch-button" command="layout">退出</el-dropdown-item>
              <el-dropdown-item
                :class="[$store.getters.theme == 'dark' ? 'active' : '']"
                icon="el-icon-moon"
                command="dark"
                divided
              >深色</el-dropdown-item>
              <el-dropdown-item
                :class="[$store.getters.theme != 'dark' ? 'active' : '']"
                icon="el-icon-sunny"
                command="light"
                divided
              >浅色</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="main-container">
        <transition
          appear
          mode="out-in"
          :duration="1000"
          enter-active-class="animate__animated animate__fadeInRight"
          leave-active-class="animate__animated animate__backOutRight"
        >
          <router-view :key="key" />
        </transition>

        <!-- <el-image
          v-if="$store.getters.theme == 'dark'"
          class="bottom-img"
          :src="bottomImgUrl"
          fit="contain"
        ></el-image>
        <el-image v-else class="light-bottom-img" :src="lightBottomImgUrl" fit="contain"></el-image>-->
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 导入侧边栏配置文件
import { menus } from "@/assets/data"
// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
export default {
  name: "overView",
  data() {
    return {
      menuFold: false,
      theme: this.$store.getters.theme || "dark",
      bottomImgUrl: require("@/assets/images/overview-bottom.png"),
      lightBottomImgUrl: require("@/assets/images/_overview-bottom.png"),
      asideBg: require("@/assets/images/menu-bg.png"),
      lightAsiseBg: require("@/assets/images/_menu-bg.png"),
      currentTime: "", // 当前的时间
      timing: null,
      menus
    }
  },
  computed: {
    key() {
      return this.$route.path.replace(/\//g, "_")
    },
    changeLogo() {
      return this.$store.getters.theme == "dark"
        ? this.$globalData.lightLogo
        : this.$globalData.logoUrl
    },
    asideClass() {
      return {
        "aside-container": true,
        "light-container": this.$store.getters.theme != "dark",
        "dark-container": this.$store.getters.theme == "dark"
      }
    }
  },
  created() {
    let theme = cache.getCache("theme") || "dark"
    document.documentElement.setAttribute("theme", theme)
    this.getCurrentTime()
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log("打开：", key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log("关闭：", key, keyPath)
    },
    handSelect(key, keyPath) {
      console.log("选择：", key, keyPath)
    },
    openMenu() {
      console.log("/overview/manage/2")
    },
    handleCommand(command) {
      if (command == "layout") {
        // 清空缓存
        cache.deleteCache("user")
        this.$router.replace("/login")
      } else {
        // this.$i18n.locale = lang
        let index = command == "dark" ? 0 : 1
        document.documentElement.setAttribute("theme", command)
        this.$store.commit("fullLoading/SET_THEME", command)
        this.$store.commit("fullLoading/SET_BGURL", {
          index,
          bg: `background:url(${this.$globalData.bgs[index]})`
        })
      }
    },
    itemClick(item) {
      // console.log("item", item)
      let path = this.$route.path
      this.$store.commit("fullLoading/SET_PATH", path)
      if (item.toLink) {
        this.$router.push({ name: item.toLink })
      }
      if (item.outLink) {
        window.open(item.outLink)
      }
      if (item.title == "製程監控") {
        // console.log("製程監控")
        this.$router.push("/overview/manage/process")
      }
      if (item.title == "設備") {
        this.$router.push("/overview/manage/device")
      }
      if (item.title == "產出") {
        this.$router.push("/overview/manage/output")
      }
      if (item.title == "良率") {
        this.$router.push("/overview/manage/yield")
      }
      // 切换右边的情况
      // if(item.)
      // 1. 外部链接  window.open 2. 自己写的代码 $router.push 跳转
      // this.$router.push({ name: item.index })
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
  }
}
</script>
<style lang="scss">
.el-dropdown-menu {
  padding: 0 0;
}
.el-dropdown-menu__item--divided {
  margin-top: 0;
}
.el-dropdown-menu__item--divided:before {
  display: none;
}
</style>

<style lang="scss" scoped>
i {
  color: #fff;
}

::v-deep .el-submenu__title {
  background-color: transparent !important;
}
.mr-10 {
  margin-right: 10px;
}
.menu-icon {
  color: #fff;
}
.active {
  background: rgba(87, 200, 249, 0.6);
}

// hover 高亮
.el-menu-item:hover {
  color: #ccc !important; // 菜单
  background: #1f5997 !important;
}

.el-menu-item.is-active {
  color: var(--menu-item-active) !important;
  font-weight: bold;
  background-color: var(--menu-item-active-bg) !important;
}
// 外层容器
.overview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* min-width: 1200px; */
  // 侧边栏
  .aside-container {
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    transition: all 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    .top-title {
      /* position: fixed;
      top: 0;
      left: 0; */
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #5ad1fa;

      /* background: #5ad1fa; */
      .logo {
        width: 32px;
        height: 32px;
        vertical-align: middle;
      }
      .name {
        color: var(--page-head-name);
        font-size: 22px;
        font-weight: bold;
        margin-left: 6px;
        margin-top: 5px;
      }
    }
    .el-menu-vertical {
      border-right: 0;
    }
  }
  .light-container {
    background: url("~@/assets/images/_menu-bg.png") no-repeat center center !important;
  }
  .dark-container {
    background: url("~@/assets/images/menu-bg.png") no-repeat center center !important;
  }
  // 右边主要区域
  .right-container {
    .header-container {
      display: flex;
      align-items: center;
      height: 48px !important;
      justify-content: space-between;
      height: 100%;
      padding: 0 20px;
      background: var(--overview-head-bg);
      .header-left {
        display: flex;
        align-items: center;
        .flod {
          margin-right: 10px;
        }
        .title {
          font-size: 20px;
          font-weight: bold;
          letter-spacing: 10px;
          margin-top: 4px;
          color: #fff;
          /* vertical-align: middle; */
        }
      }
      .header-right {
        display: flex;
        align-items: center;
        color: #fff;
        .currentTime {
          margin-right: 10px;
          /* margin-right: 25px; */
        }
        .username {
          /* padding: ; */
          padding: 0 8px;
          border-left: 4px solid #fff;
          border-right: 4px solid #fff;
        }
      }
      .flod,
      .user-icon {
        margin-left: 10px;
        cursor: pointer;
        font-size: 25px;
        color: var(--icon-color);
        &:hover {
          color: #0ff;
        }
      }
    }
    .main-container {
      width: 100%;
      overflow: auto;
      position: relative;
      background: var(--overview-main-bg);
      /* margin: 20px;
      padding: 0; */
      /* .bottom-img {
        width: 2220px;
        height: 1058px;
        position: absolute;
        top: -169px;
        right: -400px;
      } */
      /* .light-bottom-img {
        position: absolute;
        top: 190px;
        right: -400px;
        z-index: 0;
      } */
    }
  }
}

@media screen and (max-width: 1500px) {
  .aside-container {
    width: 0px !important;
    transform: translateX(-100%);
  }
  .flod {
    display: none;
  }
}
</style>
