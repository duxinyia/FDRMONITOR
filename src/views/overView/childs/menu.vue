<template>
  <el-menu
    class="el-menu-vertical"
    text-color="#fff"
    active-text-color="#fff"
    background-color="transparent"
    :collapse="false"
    unique-opened
    :default-active="$route.path"
  >
    <template v-for="item in menus">
      <template v-if="item.subs">
        <el-submenu
          :index="item.index"
          class="one-menu"
          :key="item.title"
          @click.native="itemClick(item)"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <template v-for="subItem in item.subs">
            <template v-if="subItem.subs">
              <el-submenu
                :index="subItem.index"
                :key="subItem.title"
                @click.native.stop="itemClick(subItem)"
                class="one-item"
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
                      class="two-item"
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
                              <span slot="title">{{ subItem3.title }}66</span>
                            </template>
                            <el-menu-item
                              v-for="fiveItem in subItem3.subs"
                              :key="fiveItem.title"
                              :index="fiveItem.index"
                              @click.native.stop="itemClick(fiveItem)"
                            >
                              <i :class="fiveItem.icon"></i>
                              <span slot="title">{{ fiveItem.title }}77</span>
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
            <el-menu-item
              v-else
              :index="subItem.index"
              :key="subItem.title"
              @click.native.stop="itemClick(subItem)"
            >
              <i :class="subItem.icon"></i>
              <span slot="title">{{ subItem.title }}</span>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.index" :key="item.title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}33</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
// 导入侧边栏配置文件
import { menus } from "@/assets/data"
export default {
  name: "menu-child",
  data() {
    return {
      menus
    }
  },
  methods: {
    itemClick(item) {
      console.log("item", item)
      if (["產出", "良率", "設備", "製程監控"].includes(item.title)) {
        this.$router.push(item.index)
      }
      let path = this.$route.path
      if (!this.$store.state.fullLoading.tags.find((tag) => tag.path == item.index) && !item.subs) {
        this.$store.commit("fullLoading/SET_TAG", { title: item.title, path: item.index })
      }
      this.$store.commit("fullLoading/SET_PATH", path)
    }
  }
}
</script>
<style lang="scss">
.one-menu > .el-submenu__title {
  background: linear-gradient(90deg, #21aebe91 0%, #3357caf5 68.63%, #353cb8 100%);
  width: 85%;
  height: 38px;
  line-height: 38px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
  position: relative;
  i {
    color: #fff !important;
  }
  &::after {
    background: transparent !important;
  }
}
.one-menu > ul {
  position: relative;
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: -11px;
    right: 13px;
    width: 50px;
    height: 20px;
    z-index: 10;
    background: url("~@/assets/images/new_triangle.png") no-repeat center center;
  }
}

.one-menu {
  .el-menu {
    background: #2a4c73 !important;
  }
}
.one-item {
  .el-menu--inline {
    /* background: #001a33 !important;
     */
    /* background: #113763 !important;
    box-shadow: inset 0px 3px 4px 0px rgba(0, 0, 0, 0.25); */
    background: #113763 !important;
    box-shadow: inset 0px 4px 5px 0px hsl(0, 0%, 0%, 0.25);
  }
  .el-submenu__title {
    border-radius: 0 !important;
    height: 50px !important;
    line-height: 50px !important;
    &:hover {
      /* border-radius: 0; */
      box-sizing: border-box;
      color: #fff !important; // 菜单#1f5997
      background: #002c5e !important;
      /* border: 1px solid #3766f4; */
    }
  }
}

.two-item {
  .el-menu--inline {
    /* background: #00101f !important; */
    /* background: rgb(0, 26, 51) !important;
    box-shadow: inset 0px 3px 4px 0px rgb(0, 0, 0); */
    background: #002445 !important;
    box-shadow: inset 0px 3px 5px 0px hsl(0, 0%, 0%);
  }
}

.el-menu-item {
  transition: 0.2s;
  position: relative;
  z-index: 100;
  &:hover {
    box-sizing: border-box;
    color: #fff !important; // 菜单#1f5997
    background: #022b52 !important;
    /* border: 1px solid #3766f4; */
    transform: scale(1.1);
  }
  /* &:first-child {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      height: 0px;
      width: 100%;
      height: 2px;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.01),
        rgba(42, 130, 228, 1) 51.39%,
        rgba(255, 255, 255, 0.01) 100%
      );
    }
  } */
  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 0px;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.01),
      rgba(42, 130, 228, 1) 51.39%,
      rgba(255, 255, 255, 0.01) 100%
    );
  }
}
.el-submenu__title {
  transition: 0.2s;
  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 0px;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.01),
      rgba(42, 130, 228, 1) 51.39%,
      rgba(255, 255, 255, 0.01) 100%
    );
  }
  &:hover {
    transform: scale(1.1);
  }
}
</style>

<style lang="scss" scoped>
i {
  color: #fff;
}
::v-deep .el-submenu__icon-arrow {
  color: #fff;
}
.one-menu {
  margin-bottom: 24px;
}
::v-deep .el-submenu__title {
  border-radius: 20px;
  height: 40px;
  line-height: 40px;
  z-index: 100;
  /* &:hover {
    border-radius: 0;
    box-sizing: border-box;
    color: #fff !important; // 菜单#1f5997
    background: #304f78 !important;
    border: 1px solid #3766f4;
  } */
}
/* .el-menu-item:hover {
  box-sizing: border-box;
  color: #fff !important; // 菜单#1f5997
  background: #022b52 !important;
  border: 1px solid #3766f4;
  transform: scale(1.2);
} */

.el-menu-item.is-active {
  color: var(--menu-item-active) !important;
  font-weight: bold;
  background: var(--menu-item-active-bg) !important;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
}
.el-menu-vertical {
  border-right: 0;
}
</style>
