<template>
  <div class="text">
    <div>hello world</div>
  </div>
</template>

<script>
export default {
  name: "ga",
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "GA設備總覽")
  }
}
</script>

<style lang="scss" scoped>
.text {
  width: 100%;
  height: 950px;
}
</style>
