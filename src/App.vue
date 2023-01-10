<template>
  <div id="app" :style="appStyle">
    <!-- <transition
      appear
      mode="out-in"
      :duration="1000"
      enter-active-class="animate__animated animate__backInDown"
      leave-active-class="animate__animated animate__backOutRight"
    >-->
    <router-view />
    <!-- </transition> -->
  </div>
</template>
<script>
// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
export default {
  name: "App",
  data() {
    return {
      lightBg: require("@/assets/images/background17.png")
    }
  },
  mounted() {
    let theme = cache.getCache("theme") || "dark"
    document.documentElement.setAttribute("theme", theme)
  },
  computed: {
    appStyle() {
      let isDark = this.$store.getters.theme == "dark"
      return isDark ? { background: "#020308" } : this.$store.getters.bgUrl
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  /* background-color: #020308; */
  background-image: url("~@/assets/images/background17.png") no-repeat center center;
}
</style>
