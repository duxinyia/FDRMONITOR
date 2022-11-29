<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :before-close="toClose"
    :close-on-click-modal="false"
    top="20vh"
    width="40%"
  >
    <dv-border-box-11 :title="diglogTitle" :key="dialogKey">
      <svg-icon class="closeIcon" icon-class="close" @click="toClose" />
      <div class="container">
        <template v-for="item in screenArr">
          <router-link
            v-if="!item.isExternalLink"
            tag="div"
            :to="{ name: item.to, query: { belong: item.target } }"
            :key="item.id"
            class="project"
          >
            <span class="name">{{ item.info }}</span>
          </router-link>
        </template>
      </div>
    </dv-border-box-11>
  </el-dialog>
</template>

<script>
// 导入需要跳转路由配置
import { CMA_CONFIG } from "@/assets/data"
export default {
  name: "project-dialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogKey: {
      type: Number,
      default: 1
    }
  },
  created() {
    this.belong = this.$route.query.belong
  },
  data() {
    return {
      belong: ""
    }
  },
  computed: {
    screenArr() {
      return CMA_CONFIG.get(this.belong).filter((item) => !item.isExternalLink)
    },
    diglogTitle() {
      return CMA_CONFIG.get(this.belong)[0].belong
    }
  },
  methods: {
    // 关闭弹框
    toClose() {
      this.$emit("update:dialogVisible", false)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  display: none;
}
::v-deep .el-dialog__body {
  padding: 10px 5px 5px 5px;
  background: #00132a;
}
::v-deep .border-box-content {
  padding: 60px 20px 20px 20px;
}
.container {
  padding: 10px;
  display: grid;
  gap: 20px 15px;
  color: #fff;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  .project {
    height: 40px;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: inset 0 0 10px rgb(139, 111, 255);
    .name {
      z-index: 9;
    }
    &::before {
      content: "";
      width: 0;
      height: 100%;
      align-self: center;
      position: absolute;
      background: rgba(139, 111, 255, 0.4);
      transform: skewX(-45deg);
      transition: all 0.5s;
    }
    &:hover::before {
      width: 120%;
    }
  }
}
.router-link-active {
  background: rgba(139, 111, 255, 0.8);
}
.closeIcon {
  position: absolute;
  right: 4px;
  top: 2px;
  width: 30px;
  height: 30px;
  color: #2d66e2;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transform: rotate(90deg);
  }
}
</style>
