<template>
  <el-container class="overview">
    <!-- 侧边栏 -->
    <el-aside :width="menuFold ? '65px' : '250px'" class="aside-container">
      <div class="top-title">
        <el-image class="logo" :src="changeLogo" fit="fill" />
        <h2 class="name" v-show="!menuFold">RAYPRUS</h2>
      </div>
      <menu-child />
    </el-aside>
    <el-container class="right-container">
      <navbar :menuFold.sync="menuFold" />
      <!-- 面包屑组件 -->
      <div class="bread-container">
        <router-link
          v-for="(tag,index) in this.$store.state.fullLoading.tags"
          ref="tag"
          :key="tag.path"
          :class="isActive(tag)?'active':''"
          :to="{ path: tag.path}"
          tag="span"
          class="tags-view-item"
          :style="activeStyle(tag)"
        >
          {{ tag.title }}
          <span
            v-if="!isActive(tag)"
            class="el-icon-close"
            @click.prevent.stop="closeSelectedTag(tag,index)"
          />
        </router-link>
      </div>
      <el-main class="main-container">
        <div class="container">
          <transition
            appear
            mode="out-in"
            :duration="1000"
            enter-active-class="animate__animated animate__fadeInRight"
            leave-active-class="animate__animated animate__backOutRight"
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
        "background-color": "#409eff"
      }
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    closeSelectedTag(tag, index) {
      this.$store.commit("fullLoading/DETELE_TAG", index)
    }
  }
}
</script>


<style lang="scss" scoped>
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
  /* &:first-of-type {
    margin-left: 15px;
  } */
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
  /* position: fixed;
  top: 0;
  left: 0; */
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
    box-shadow: 5px -6px 7px 0px rgba(0, 0, 0, 0.25);
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
      padding-left: 10px;
      height: 40px;
      background: #fff;
      line-height: 40px;
      box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    }
    .main-container {
      width: 100%;
      .container {
        width: 100%;
        height: 100%;
        padding: 20px;
        background: url("~@/assets/images/overview-bg.png");
        background-size: 100% 100%;
        overflow: auto;
      }
      /* background: url("~@/assets/images/overview-bg.png") no-repeat center center; */
      /* width: 100%;
      overflow: auto;
      position: relative;
      padding: 0px;
      margin: 20px;
      padding-right: 20px;
      padding-left: 30px;
      padding-top: 20px;
      background: url("~@/assets/images/overview-bg.png") no-repeat center center;
      background-size: 84.8958vw 100%;
      transform: translateX(-20px);
      background-clip: padding-box; */
    }
  }
}
</style>
