<template>
  <el-container class="overview">
    <!-- 侧边栏 -->
    <el-aside :width="menuFold ? '65px' : '235px'" class="aside-container">
      <div class="top-title">
        <el-image class="logo" :src="changeLogo" fit="fill" />
        <h2 class="name" v-show="!menuFold">RAYPRUS</h2>
      </div>
      <!-- 各种状态 -->
      <!-- <div class="systems" style="margin-bottom:10px;color:#fff">
        <div @click="currentComponent = 'MenuChild'" class="cma">CMA</div>
        <div @click="currentComponent = 'MenuChild'" class="dp">DP</div>
      </div>-->
      <transition
        appear
        mode="out-in"
        :duration="100"
        enter-active-class="animate__animated animate__fadeInLeftBig"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <menu-child :menus="$store.getters.showRouter[$store.getters.showIndex]" />
      </transition>
      <!-- <el-tabs v-model="activeName">
        <el-tab-pane label="CMA菜单" name="first">
          <menu-child :menus="$store.getters.showRouter[1]" />
        </el-tab-pane>
        <el-tab-pane label="DP菜单" name="second">
          <h1>这是dp的菜单</h1>
        </el-tab-pane>
      </el-tabs>-->
    </el-aside>
    <el-container class="right-container">
      <navbar :menuFold.sync="menuFold" />
      <div class="bread-container">
        <span
          class="item"
          @click="itemClick(index)"
          v-for="(item,index) in $store.getters.routerTitles"
          :key="item"
        >{{item}}</span>
        <!-- <router-link
          v-for="(tag, index) in this.$store.state.fullLoading.tags"
          ref="tag"
          :key="tag.path"
          :class="isActive(tag) ? 'active' : ''"
          :to="{ path: tag.path }"
          tag="span"
          class="tags-view-item"
          :style="activeStyle(tag)"
        >
          {{ tag.title }}
          <span
            v-if="!isActive(tag)"
            class="el-icon-close"
            @click.prevent.stop="closeSelectedTag(tag, index)"
          />
        </router-link>-->
      </div>
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
import Navbar from "./childs/navbar.vue"
// 导入左边菜单
import MenuChild from "./childs/menu.vue"

// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
export default {
  name: "overView",
  components: {
    Navbar,
    MenuChild
  },
  data() {
    return {
      activeName: "first",
      // currentComponent: "MenuChild",
      icon: "",
      currentIndex: 2,
      menuFold: false,
      theme: this.$store.getters.theme || "dark",
      // menus,
      tags: [{ title: "首页", path: "/overview/manage/output" }]
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
    }
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    activeStyle(tag) {
      if (!this.isActive(tag)) return {}
      return {
        "background-color": "#304156"
      }
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    closeSelectedTag(tag, index) {
      this.$store.commit("fullLoading/DETELE_TAG", index)
    },
    itemClick(index) {
      this.$store.commit("permission/SET_INDEX", index)
    }
  }
}
</script>

<style lang="scss" scoped>
/* 修改tabs的样式 */
/* ::v-deep .el-tabs__nav {
  width: 100%;
  display: flex;
  text-align: center;
} */
::v-deep .el-tabs__item {
  color: #fff;
  /* flex: 1;
  padding: 0; */
}
.active {
  background: rgba(87, 200, 249, 0.6);
}
.tags-view-item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-right: 8px;
  margin-top: 4px;
  &:last-of-type {
    margin-right: 15px;
  }
  &.active {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
    &::before {
      content: "";
      background: #fff;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
      margin-right: 2px;
    }
  }
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
    border-radius: 0px 0px 10px 10px;
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
    .systems {
      display: flex;
      justify-content: space-around;
      background: #42b983;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      .cma,
      .dp {
        flex: 1;
      }
      .cma {
        background: red;
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
      line-height: 40px;
      box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
      .item {
        cursor: pointer;
        display: inline-block;
        /* width: 100px; */
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        border: 1px solid yellowgreen;
        margin-right: 10px;
        text-align: center;
        /* background: red; */
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
        background: url("~@/assets/images/overview-bg1.png");
        background-size: 100% 100%;
        overflow: auto;
      }
    }
  }
}
</style>
