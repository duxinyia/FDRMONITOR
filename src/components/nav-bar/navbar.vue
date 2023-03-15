<template>
  <el-header class="header-container">
    <div class="header-left">
      <i
        class="flod"
        style="display: none"
        :class="menuFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="changeMenuState"
      ></i>
      <span class="title">戰情中心</span>
    </div>
    <div class="header-right">
      <span class="currentTime">{{ currentTime }}</span>
      <span class="username">{{ $store.state.user.user.fullName }}</span>
      <el-dropdown @command="handleCommand" placement="bottom">
        <span class="el-dropdown-link">
          <i class="el-icon-user-solid user-icon"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-switch-button" command="layout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
export default {
  name: "navbar",
  props: {
    menuFold: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timing: null,
      currentTime: ""
    }
  },
  created() {
    this.getCurrentTime()
  },
  methods: {
    handleCommand(command) {
      if (command == "layout") {
        // 清空缓存
        cache.clearCache()
        this.$router.replace("/login")
        this.$router.go(0)
      }
    },
    getCurrentTime() {
      this.timing = setInterval(() => {
        this.currentTime = this.$moment().format("YYYY-MM-DD HH:mm:ss")
      }, 1000)
    },
    changeMenuState() {
      this.$emit("update:menuFold", !this.menuFold)
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
.header-container {
  width: 100%;
  display: flex;
  align-items: center;
  height: 48px !important;
  justify-content: space-between;
  padding: 0 20px;
  background: var(--overview-head-bg);
  box-shadow: 0px 1px #ddd;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  padding: 0 20px;
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
      color: var(--icon-color);
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    color: var(--icon-color);
    .currentTime {
      margin-right: 10px;
    }
    .username {
      padding: 0 8px;
      border-left: 2px solid var(--icon-color);
      border-right: 2px solid var(--icon-color);
    }
  }
  .flod,
  .user-icon {
    cursor: pointer;
    font-size: 25px;
    color: var(--icon-color);
    &:hover {
      color: #0ff;
    }
  }
  .user-icon {
    margin-left: 10px;
  }
}
</style>
