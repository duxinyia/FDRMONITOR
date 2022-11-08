<template>
  <div
    class="container"
    v-loading="isLoading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="加载中"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <!-- 标题区域 -->
    <div class="title-area">
      <span class="title" v-if="showTitle">{{ title }}</span>
      <slot />
    </div>
    <!-- 轮播表 -->
    <dv-scroll-board ref="scrollBoard" :config="config" :style="{ height: height }" />
  </div>
</template>

<script>
export default {
  name: "scroll-chart",
  props: {
    /**
     * 轮播图的标题
     */
    title: {
      type: String,
      default: "默认标题"
    },
    config: {},
    height: {
      type: String,
      default: "250px"
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isLoading: true
    }
  },
  watch: {
    config: {
      handler() {
        this.isLoading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// @import "@/assets/scss/variables.scss";
.title {
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
  color: $title-color;
  color: var(--chart-title);
  padding-left: 5px;
  border-left: 4px solid var(--chart-slip);
  // border-left: 4px solid #bb98fa;
}
::v-deep .header-item {
  padding: 0 2px !important;
}
::v-deep .ceil {
  padding: 0 2px !important;
}
</style>
