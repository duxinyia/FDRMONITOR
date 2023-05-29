<template>
  <div class="page-main">
    <!-- 使用轮播图来展示数据 -->
    <el-carousel
      style="height: 1000px"
      indicator-position="none"
      :interval="15 * 10000"
      ref="carousel"
      arrow="never"
      @change="changeCarousel"
    >
      <el-carousel-item> <child-cpn /> </el-carousel-item>
      <el-carousel-item> <child-cpn1 /> </el-carousel-item>
    </el-carousel>
    <!-- 自定义两个切换按钮 -->
    <change-switch
      :leftConfig="{ left: '5px', top: '5px' }"
      :rightConfig="{ right: '5px', top: '5px' }"
      @directionChange="handleDirection"
    />
  </div>
</template>
<script>
// 导入左右切换的组件
import ChangeSwitch from "@/components/change-switch/change-switch.vue"
// 导入子组件
import ChildCpn from "./child-cpn.vue"
import ChildCpn1 from "./child-cpn1.vue"
export default {
  name: "defect",
  components: {
    ChangeSwitch,
    ChildCpn,
    ChildCpn1
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "Top 25 Defect")
  },
  methods: {
    handleDirection(direction) {
      direction == "left" ? this.$refs.carousel.prev() : this.$refs.carousel.next()
    }
  }
}
</script>
<style lang="scss" scoped>
.page-main {
  height: calc(100% - 120px);
  margin-top: 10px;
  padding-top: 30px;
  position: relative;
}
::v-deep .el-carousel__container {
  height: 100%;
}
</style>
