<template>
  <el-container>
    <el-aside :width="isCollapse ? '65px' : '200px'" class="aside-container">
      <div class="top-title">
        <img class="logo" :src="logoUrl" alt="" />
        <h2 class="name" v-show="!isCollapse">戰情中心</h2>
      </div>
      <el-menu
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        router
        :default-active="$route.path"
        :collapse-transition="false"
      >
        <el-submenu index="/overview/cma">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>CMA总览</span>
          </template>
          <el-menu-item index="/overview/cma/device">
            <i class="el-icon-s-data"></i>
            <span slot="title">设备总览</span>
          </el-menu-item>
          <el-menu-item index="/overview/cma/make">
            <i class="el-icon-s-data"></i>
            <span slot="title">制造总览</span>
          </el-menu-item>
          <el-menu-item index="/overview/cma/yield">
            <i class="el-icon-s-data"></i>
            <span slot="title">良率总览</span>
          </el-menu-item>
        </el-submenu>
        <!-- 关于页面 -->
        <el-menu-item index="/overview/about">
          <i class="el-icon-menu"></i>
          <span slot="title">关于</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-container">
          <!-- 控制开关的按钮 -->
          <i class="el-icon-s-fold flod" @click="isCollapse = !isCollapse" v-if="!isCollapse"></i>
          <i class="el-icon-s-unfold flod" @click="isCollapse = !isCollapse" v-if="isCollapse"></i>
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
        </div>
      </el-header>
      <el-main>
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
      isCollapse: false,
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
<style>
.el-container {
  height: 100% !important;
}
.el-aside {
  transition: width 0.2s;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
</style>

<style lang="scss" scoped>
::v-deep .el-avatar {
  background: transparent;
}
::v-deep .el-container {
  height: 100% !important;
}
::v-deep .el-menu-item-group__title {
  display: none !important;
}
::v-deep .el-header {
  height: 50px !important;
  padding: 0px;
}
::v-deep .el-menu {
  border-right: none;
  background: var(--overview-menu-bg);
  height: calc(100% - 50px) !important;
}
::v-deep .el-main {
  background: var(--overview-main-bg);
}
.header-container {
  display: flex;
  align-items: center;
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
.aside-container {
  .top-title {
    // #162949
    background: var(--overview-menu-bg);
    // background: #162949;
    height: 50px;
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
}
</style>
