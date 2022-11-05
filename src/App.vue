<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
export default {
  name: "App",
  created() {
    let theme = cache.getCache("theme") || "dark"
    document.documentElement.setAttribute("theme", theme)
  }
}
</script>
<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  background-color: #020308;
  // background: var(--base-bg);
}
</style>
