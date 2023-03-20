<template>
  <div class="page-main">
    <el-tabs type="border-card">
      <el-tab-pane label="Output">
        <main-one />
      </el-tab-pane>
      <el-tab-pane label="Efficiency  rate">Efficiency rate</el-tab-pane>
      <el-tab-pane label="DownTime">DownTime</el-tab-pane>
      <el-tab-pane label="復判結批">復判結批</el-tab-pane>
      <el-tab-pane label="開班首件">開班首件</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// 导入子组件
import mainOne from "./cpns/main-one/main-one.vue"
export default {
  name: "wekoutput",
  components: {
    mainOne
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "周產出/效率看板")
  }
}
</script>

<style lang="scss" scoped>
/* 重置一些样式 */
::v-deep .el-tabs--border-card {
  background: transparent;
  height: 100%;
}
.page-main {
  height: calc(100% - 120px);
  margin-top: 10px;
}
</style>
