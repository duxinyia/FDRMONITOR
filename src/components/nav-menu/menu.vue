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
        <el-submenu :index="item.index" class="one-menu" :key="item.title" @click.native="itemClick(item)">
          <template slot="title">
            <item :icon="item.icon" :title="item.title" />
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
                  <item :icon="subItem.icon" :title="subItem.title" />
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
                        <item :icon="subItem2.icon" :title="subItem2.title" />
                      </template>
                      <template v-for="subItem3 in subItem2.subs">
                        <template v-if="subItem3.subs">
                          <el-submenu
                            :index="subItem3.index"
                            :key="subItem3.title"
                            @click.native.stop="itemClick(subItem3)"
                          >
                            <template slot="title">
                              <item :icon="subItem3.icon" :title="subItem3.title" />
                            </template>
                            <el-menu-item
                              v-for="fiveItem in subItem3.subs"
                              :key="fiveItem.title"
                              :index="fiveItem.index"
                              @click.native.stop="itemClick(fiveItem)"
                            >
                              <item :icon="fiveItem.icon" :title="fiveItem.title" />
                            </el-menu-item>
                          </el-submenu>
                        </template>
                        <el-menu-item
                          v-else
                          :index="subItem3.index"
                          :key="subItem3.title"
                          @click.native.stop="itemClick(subItem3)"
                        >
                          <item :icon="subItem3.icon" :title="subItem3.title" />
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
                    <item :icon="subItem2.icon" :title="subItem2.title" />
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>
            <el-menu-item v-else :index="subItem.index" :key="subItem.title" @click.native.stop="itemClick(subItem)">
              <item :icon="subItem.icon" :title="subItem.title" />
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.index" :key="item.title">
          <item :icon="item.icon" :title="item.title" />
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
import Item from "./Item"
export default {
  name: "menu-child",
  components: {
    Item
  },
  props: ["menus"],
  methods: {
    itemClick(item) {
      console.log("点击的item", item)
      /**
       * 1. 后端如果是外链(http https), window.open 方法打开新窗口
       * 2.
       * fin: 把当前路径保存下来，用于跳转回来0
       */
      // 如果index包含http 那么是跳转外部链接
      if (item.index.includes("http")) {
        window.open(item.index)
        return
      }
      // 普通跳转路由的
      if (!item.subs) {
        // console.log("执行了哦")
        item.index = item.index.split("/")[item.index.split("/").length - 1]
        this.$router.push({ name: item.index }).catch(() => {})
      }
      // 点击了这些菜单，要跳转路由 切换右边的值 并且打开子菜单
      if (["產出", "良率", "設備", "製程監控", "cma所有报表", "dp所有报表"].includes(item.title)) {
        this.$router.push(item.index).catch(() => {})
      }
      let path = this.$route.path
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
    background: url("~@/assets/images/other/new_triangle.png") no-repeat center center;
  }
}

.one-menu {
  .el-menu {
    background: #2a4c73 !important;
  }
}
.one-item {
  .el-menu--inline {
    background: #113763 !important;
    box-shadow: inset 0px 4px 5px 0px hsl(0, 0%, 0%, 0.25);
  }
  .el-submenu__title {
    border-radius: 0 !important;
    height: 50px !important;
    line-height: 50px !important;
    &:hover {
      box-sizing: border-box;
      color: #fff !important; // 菜单#1f5997
      background: #002c5e !important;
    }
  }
}

.two-item {
  .el-menu--inline {
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
    transform: scale(1.1);
  }
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
/* 更改 svg图标 的距离 */
.el-menu-vertical .svg-icon {
  margin-right: 13px;
}
i {
  color: #fff;
}
/* 没做的菜单的样子 */
::v-deep .el-icon-s-release {
  color: rgba(204, 204, 204, 0.3) !important;
}
::v-deep .el-icon-s-release + span {
  color: rgba(204, 204, 204, 0.3) !important;
}
/* 外部链接 */
::v-deep .el-icon-search {
  color: rgba(255, 255, 0, 0.6) !important;
}
::v-deep .el-icon-search + span {
  color: rgba(255, 255, 0, 0.6) !important;
  /* text-decoration: underline; */
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
}
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
