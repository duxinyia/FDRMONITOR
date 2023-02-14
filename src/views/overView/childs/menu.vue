<template>
  <el-menu
    class="el-menu-vertical"
    text-color="#fff"
    active-text-color="#fff"
    background-color="transparent"
    :collapse="false"
    router
    :default-active="$route.path"
  >
    <template v-for="(item,i) in menus">
      <template v-if="item.subs">
        <el-submenu
          :index="item.index"
          class="one-menu"
          :key="item.title"
          @click.native="itemClick(item)"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}{{i}}</span>
          </template>
          <template v-for="subItem in item.subs">
            <template v-if="subItem.subs">
              <el-submenu
                :index="subItem.index"
                :key="subItem.title"
                @click.native.stop="itemClick(subItem)"
              >
                <template slot="title">
                  <i :class="subItem.icon"></i>
                  <span slot="title">{{ subItem.title }}55</span>
                </template>
                <template v-for="subItem2 in subItem.subs">
                  <template v-if="subItem2.subs">
                    <el-submenu
                      :index="subItem2.index"
                      :key="subItem2.title"
                      @click.native.stop="itemClick(subItem2)"
                    >
                      <template slot="title">
                        <i :class="subItem2.icon"></i>
                        <span slot="title">{{ subItem2.title }}2892</span>
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
                          <span slot="title">{{ subItem3.title }}88</span>
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
                    <span slot="title">{{ subItem2.title }}99</span>
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
.one-menu > div {
  background: #fff !important;
  color: #000 !important;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
  position: relative;
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 50px;
    height: 20px;
    background: url("~@/assets/images/triangle.png") no-repeat center center;
  }
  i {
    color: #000 !important;
  }
}
/* .one-menu {
  div {
    background: red !important;
  }
} */
</style>

<style lang="scss" scoped>
i {
  color: #fff;
}
::v-deep .el-submenu__icon-arrow {
  color: #fff;
}
.one-menu {
  &:first-child {
    margin-bottom: 20px;
  }
}
/* .el-menu {
  height: 94%;
  overflow: auto;
} */
/* .one-menu + .el-submenu__title {
  background: #1f5997 !important;
} */
::v-deep .el-submenu__title {
  /* background: #fff !important; */
  border-radius: 20px;
  height: 40px;
  line-height: 40px;
}
.el-menu-item:hover {
  color: #ccc !important; // 菜单
  background: #1f5997 !important;
}
.el-menu-item {
  position: relative;
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
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }
}
.el-menu-item.is-active {
  color: var(--menu-item-active) !important;
  font-weight: bold;
  background: var(--menu-item-active-bg) !important;
}
.el-menu-vertical {
  border-right: 0;
}
</style>
