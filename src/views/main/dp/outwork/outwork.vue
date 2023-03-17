<template>
  <!-- 主要区域 -->
  <div class="page-main">
    <!-- 主要区域 -->
    <!-- 第一行 -->
    <main-one />
    <div class="content">
      <!-- 第二行 -->
      <main-two :title="title" :config="config" />
      <main-three :title="title" :config="config" />
    </div>
  </div>
</template>
<script>
// 导入第一行
import mainOne from "./cpns/main-one/main-one.vue"
// 导入底部区域
import mainTwo from "./cpns/main-two/main-two.vue"
import mainThree from "./cpns/main-three/main-three.vue"
// 导入发送请求的函函數
export default {
  name: "sfc",
  components: {
    mainOne,
    mainTwo,
    mainThree
  },

  data() {
    return {
      title: ["By课 ", "By课 ", "By课 ", "By课 ", "By班别", "By班别 "],
      config: {
        xData: ["1/1", "1/2", "1/3", "1/4", "1/5", "1/6", "1/7"],
        yData: [
          [120.3, 132.9, 101.2, 134.8, 89.3, 170.2, 160.5],
          [110.4, 112.5, 161.4, 104.2, 160.0, 130.2, 120.2]
        ],
        legends: ["D", "N"]
      }
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "人員出勤率看板")
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 10px 20px 18px 20px;
}
</style>
