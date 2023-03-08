<template>
  <div id="app" :style="appStyle">
    <keep-alive include="overView">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
export default {
  name: "App",
  mounted() {
    // let theme = cache.getCache("theme") || "dark"
    this.$store.commit("fullLoading/SET_THEME", "dark")
    document.documentElement.setAttribute("theme", "dark")
  },
  computed: {
    appStyle() {
      let isDark = this.$store.getters.theme == "dark"
      return isDark ? { background: "#020308" } : { background: "#fff" }
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
}
</style>
