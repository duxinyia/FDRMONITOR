<template>
  <div id="index" ref="appRef">
    <dv-loading v-if="$store.state.fullLoading.fullLoading">Loading...</dv-loading>
    <page-header :title="$store.state.fullLoading.title" />
    <router-view />
  </div>
</template>
<script>
// 导入头部
import PageHeader from "@/components/page-header/index.vue"
// 导入自适应函数
import drawMixin from "@/utils/drawMixin"
export default {
  mixins: [drawMixin],
  components: {
    PageHeader
  }
}
</script>
<style lang="scss" scoped>
#index {
  color: #fff;
  background-color: #020308;
  width: 1920px;
  height: 1080px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;
  box-sizing: border-box;
  background: url("~@/assets/images/other/background3.png") no-repeat center center !important;
}
</style>
