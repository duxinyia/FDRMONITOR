<template>
  <el-container class="overview">
    <!-- 侧边栏 -->
    <el-aside :width="menuFold ? '65px' : '210px'" class="aside-container">
      <div class="top-title">
        <img class="logo" :src="logoUrl" alt="" />
        <h2 class="name" v-show="!menuFold">戰情中心</h2>
      </div>
      <el-menu
        class="el-menu-vertical"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="menuFold"
        router
        :default-active="$route.path"
      >
        <el-submenu index="/overview/cma">
          <template slot="title">
            <i class="el-icon-s-flag"></i>
            <span>CMA总览</span>
          </template>
          <el-menu-item index="/overview/cma/device">
            <i class="el-icon-s-platform"></i>
            <span slot="title">设备总览</span>
          </el-menu-item>
          <el-menu-item index="/overview/cma/make">
            <i class="el-icon-s-platform"></i>
            <span slot="title">制造总览</span>
          </el-menu-item>
          <el-menu-item index="/overview/cma/yield">
            <i class="el-icon-s-platform"></i>
            <span slot="title">良率总览</span>
          </el-menu-item>
        </el-submenu>
        <!-- 关于页面 -->
        <el-menu-item index="/overview/about">
          <i class="el-icon-info"></i>
          <span slot="title">关于</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右边区域: header 区域 和 main区域 -->
    <el-container class="right-container">
      <el-header class="header-container">
        <i
          class="flod"
          :class="menuFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="menuFold = !menuFold"
        ></i>
        <el-dropdown @command="handleCommand" placement="bottom">
          <span class="el-dropdown-link">
            <i class="el-icon-user-solid user-icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="layout">退出登录</el-dropdown-item>
            <el-dropdown-item command="dark">暗黑</el-dropdown-item>
            <el-dropdown-item command="light">明亮</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main-container">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
export default {
  name: "overView",
  data() {
    return {
      menuFold: false,
      logoUrl: require("@/assets/images/logo.png")
    }
  },
  created() {
    let theme = cache.getCache("theme") || "dark"
    document.documentElement.setAttribute("theme", theme)
  },
  methods: {
    handleCommand(command) {
      if (command == "layout") {
        // 清空缓存
        cache.deleteCache("user")
        this.$router.replace("/login")
      }
      if (command == "dark" || command == "light") {
        document.documentElement.setAttribute("theme", command)
        // cache.setCache("theme", command)
        this.$store.commit("fullLoading/SET_THEME", command)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 重置el-mune的样式
// 目录
.el-menu-item {
  // background-color: #162949 !important;
  background: var(--overview-menu-bg) !important;
}
.el-submenu {
  // background-color: #162949 !important;
  background: var(--overview-menu-bg) !important;
  // 二级菜单 ( 默认背景 )
  .el-menu-item {
    padding-left: 50px !important;
    // background-color: #0c2135 !important;
    // background-color: #162949 !important;
    background: var(--overview-menu-bg) !important;
  }
}

::v-deep .el-submenu__title {
  background-color: #162949 !important;
}

// hover 高亮
.el-menu-item:hover {
  color: #ccc !important; // 菜单
  background: #1f5997 !important;
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #1f5997 !important;
}
// 外层容器
.overview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // 侧边栏
  .aside-container {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 2000px;
    // text-align: left;
    // cursor: pointer;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    background: var(--overview-menu-bg);
    .top-title {
      // #162949
      background: var(--overview-menu-bg);
      // background: #162949;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      .logo {
        width: 32px;
        height: 32px;
        vertical-align: middle;
      }
      .name {
        color: #fff;
        // color: var(--iconColor);
        font-size: 24px;
        font-weight: bold;
        margin-left: 10px;
      }
    }
    .el-menu-vertical {
      border-right: 0;
      // &::not(.el-menu--collapse) {
      //   width: 100%;
      //   height: calc(100% - 48px);
      // }
    }
  }
  // 右边主要区域
  .right-container {
    .header-container {
      display: flex;
      align-items: center;
      height: 48px !important;
      justify-content: space-between;
      height: 100%;
      padding: 0 10px;
      // background: #324157;
      background: var(--overview-head-bg);
      .flod,
      .user-icon {
        cursor: pointer;
        font-size: 23px;
        // color: #fff;
        color: var(--icon-color);
        &:hover {
          color: #00ffff;
        }
      }
    }
    .main-container {
      background: var(--overview-main-bg);
    }
  }
}
</style>
