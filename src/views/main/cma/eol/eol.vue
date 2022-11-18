<template>
  <div class="page-main">
    <main-one />
    <main-two />
  </div>
</template>

<script>
// 导入第一行
import mainOne from "./cpns/main-one/main-one.vue"
// 导入底部区域
import mainTwo from "./cpns/main-two/main-two.vue"
export default {
  name: "eol",
  components: {
    mainOne,
    mainTwo
  }
}
</script>

<style lang="scss" scoped>
.page-main {
  height: 100%;
}
</style>
