<template>
  <el-container class="overview">
    <!-- 侧边栏 -->
    <el-aside :width="menuFold ? '65px' : '235px'" class="aside-container">
      <div class="top-title">
        <el-image class="logo" :src="logoUrl" fit="fill" />
        <h2 class="name" v-show="!menuFold">RAYPRUS</h2>
      </div>
      <!-- 菜单设置 -->
      <div class="end-set">
        <div :class="{ title: true, active: 0 == currentIndex }" @click="currentIndex = 0">
          <span class="iconfont icon-shuju"></span>
          <span class="name">数据</span>
        </div>
        <div :class="{ title: true, active: 1 == currentIndex }" @click="currentIndex = 1">
          <span class="iconfont icon-tubiaotongji"></span>
          <span class="name">报表</span>
        </div>
      </div>
      <menu-child :menus="getShowMenu" />
    </el-aside>
    <el-container class="right-container">
      <!-- 左边菜单 -->
      <navbar :menuFold.sync="menuFold" />
      <!-- 菜单下的区域 -->
      <div class="bread-container">
        <span
          class="item"
          @click="itemClick(item, index)"
          v-for="(item, index) in $store.getters.routerTitles"
          :key="item.name"
          :class="{ item: true, 'is-active': index == $store.getters.showIndex }"
        >
          {{ item.name }}
        </span>
      </div>
      <!-- 主要区域 -->
      <el-main class="main-container">
        <div class="container">
          <transition
            appear
            mode="out-in"
            :duration="1000"
            enter-active-class="animate__animated animate__fadeInLeftBig"
            leave-active-class="animate__animated animate__fadeOutRight"
          >
            <router-view :key="key" />
          </transition>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 导入navbar
import Navbar from "@/components/nav-bar/navbar.vue"
// 导入左边菜单
import MenuChild from "@/components/nav-menu/menu.vue"
export default {
  name: "overView",
  components: {
    Navbar,
    MenuChild
  },
  data() {
    return {
      menuFold: false,
      logoUrl: require("@/assets/images/other/_logo.png"),
      currentIndex: 0
    }
  },
  computed: {
    key() {
      return this.$route.path.replace(/\//g, "_")
    },
    getShowMenu() {
      return [this.$store.getters.menus[this.$store.getters.showIndex][this.currentIndex]]
    }
  },
  methods: {
    itemClick(item, index) {
      // 点击不同的按钮显示不同的子菜单
      this.$router.push(item.path).catch(() => {})
      this.$store.commit("fullLoading/SET_PATH", this.$route.path)
      this.$store.commit("permission/SET_INDEX", index)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__item {
  color: #fff;
}
.active {
  position: relative;
  border-radius: 4px;
  background: rgba(2, 43, 82, 1);
}
// 外层容器
.overview {
  width: 100%;
  height: 100%;
  // 侧边栏
  .aside-container {
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    transition: all 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    background: #304156;
    box-shadow: 5px 3px 7px 0px rgba(0, 0, 0, 0.5);
    .top-title {
      height: 88px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-bottom: 10px;
      &::after {
        content: "";
        position: absolute;
        bottom: 0px;
        height: 0px;
        width: 100%;
        height: 2px;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 1) 50%,
          rgba(255, 255, 255, 0) 100%
        );
      }
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
    .end-set {
      margin: auto;
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
      cursor: pointer;
      color: #fff;
      font-size: 16px;
      display: flex;
      border-radius: 4px;
      background: #2a4c73;
      box-shadow: inset 5px 5px 4px 0px rgba(0, 0, 0, 0.25);

      .title {
        flex: 1;
        text-align: center;
        letter-spacing: 6px;
        border-radius: 4px;
        .name {
          margin-left: 2px;
        }
      }
    }
  }
  // 右边主要区域
  .right-container {
    flex-direction: column;
    background: #eaedf0;
    .bread-container {
      padding-left: 20px;
      height: 40px;
      background: #fff;
      color: #fff;
      line-height: 40px;
      box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
      .item {
        cursor: pointer;
        display: inline-block;
        width: 112px;
        line-height: 30px;
        font-weight: bold;
        margin-right: 10px;
        text-align: center;
        background: #2a4c73;
        border-radius: 4px;
        letter-spacing: 2px;
        &:hover {
          background: rgba(42, 76, 115, 0.8);
        }
      }
      .is-active {
        background: #3764f1;
      }
    }
    .main-container {
      width: 100%;
      padding: 8px 15px 15px 15px;
      .container {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        padding: 20px;
        background: url("~@/assets/images/other/overview-bg1.png");
        background-size: 100% 100%;
        overflow: auto;
      }
    }
  }
}
</style>
