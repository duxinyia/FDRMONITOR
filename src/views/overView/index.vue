<template>
  <el-container class="overview">
    <!-- 侧边栏 -->
    <el-aside :width="menuFold ? '65px' : '235px'" class="aside-container">
      <div class="top-title">
        <el-image class="logo" :src="logoUrl" fit="fill" />
        <h2 class="name" v-show="!menuFold">RAYPRUS</h2>
      </div>
      <menu-child :menus="$store.getters.showRouter[$store.getters.showIndex]" />
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
          >{{ item.name }}</span
        >
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
      logoUrl: require("@/assets/images/other/_logo.png")
    }
  },
  computed: {
    key() {
      return this.$route.path.replace(/\//g, "_")
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
  background: rgba(87, 200, 249, 0.6);
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
    /* border-radius: 0px 0px 10px 10px; */
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
        padding: 30px 40px 20px 40px;
        background: url("~@/assets/images/other/overview-bg1.png");
        background-size: 100% 100%;
        overflow: auto;
      }
    }
  }
}
</style>
