<template>
  <div class="page-main">
    <dv-border-box-11 title="GA設備總覽">
      <main-one />
      <main-two />
      <main-two />
      <main-two />
    </dv-border-box-11>
  </div>
</template>

<script>
// 导入第一行
import mainOne from "./cpns/main-one/main-one.vue"
// 导入底部区域
import mainTwo from "./cpns/main-two/main-two.vue"
export default {
  name: "ga",
  components: {
    mainOne,
    mainTwo
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "GA設備總覽")
  }
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 60px 20px 20px 20px;
}
.page-main {
  height: calc(100% - 110px);
}
</style>
