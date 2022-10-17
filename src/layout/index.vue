<template>
  <div id="index" ref="appRef">
    <dv-loading v-if="$store.state.fullLoading.fullLoading">Loading...</dv-loading>
    <app-head title="FOL設備總覽" />
    <router-view />
  </div>
</template>
<script>
// 导入对应的区域
import { AppHead } from "./cpns"
// 导入自适应函数
import drawMixin from "./mixin/drawMixin"
export default {
  mixins: [drawMixin],
  components: {
    AppHead
  },
  data() {
    return {
      loading: false
    }
  }
}
</script>
<style lang="scss" scoped>
#index {
  color: #fff;
  width: 1920px;
  height: 1080px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;
  box-sizing: border-box;
  background: url("~@/assets/images/background3.png");
}
</style>
