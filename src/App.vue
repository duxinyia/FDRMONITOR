<template>
  <div class="app">
    <keep-alive include="overView">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "App1",
  mounted() {
    this.$store.commit("fullLoading/SET_THEME", "dark")
    document.documentElement.setAttribute("theme", "dark")
  }
}
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  background: #020308;
}
</style>
