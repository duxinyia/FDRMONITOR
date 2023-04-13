<template>
  <div class="page-main">
    <!-- 第一行 -->
    <main-one />
    <!-- 第二行 -->
    <main-two />
  </div>
</template>

<script>
// 导入第一行
import mainOne from "./cpns/main-one/main-one.vue"
// 导入底部区域
import mainTwo from "./cpns/main-two/main-two.vue"
export default {
  name: "effciency",
  props: {},
  components: {
    mainOne,
    mainTwo
  },
  data() {
    return {}
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "效率看板")
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.page-main {
  height: calc(100% - 120px);
  margin-top: 10px;
}
</style>
