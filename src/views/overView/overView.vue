<template>
  <el-container>
    <el-aside :width="isCollapse ? '60px' : '200px'" class="aside-container">
      <div class="top-title">
        <img class="logo" :src="logoUrl" alt="" />
        <h2 class="name" v-show="!isCollapse">戰情中心</h2>
      </div>

      <el-menu
        background-color="#162949"
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
          <el-menu-item-group>
            <span slot="title"></span>
            <el-menu-item index="/overview/cma/device">设备总览</el-menu-item>
            <el-menu-item index="/overview/cma/make">制造总览</el-menu-item>
            <el-menu-item index="/overview/cma/yield">良率总览</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 关于页面 -->
        <!-- <el-menu-item index="/overview/about">
          <i class="el-icon-menu"></i>
          <span slot="title">关于</span>
        </el-menu-item> -->
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
              <el-avatar icon="el-icon-user-solid" size="large"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="layout">退出登录</el-dropdown-item>
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
  methods: {
    handleCommand(command) {
      if (command == "layout") {
        // 清空缓存
        cache.deleteCache("user")
        this.$router.replace("/login")
        this.$message.success("退出成功~")
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
  height: calc(100% - 50px) !important;
}
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 5px;
  background: #324157;
  .flod {
    cursor: pointer;
  }
}
.aside-container {
  .top-title {
    background: #162949;
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
      font-size: 24px;
      font-weight: bold;
      margin-left: 10px;
    }
  }
}
</style>
