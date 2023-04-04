<template>
  <div class="page-main-a">
    <!-- 使用轮播图来展示数据 -->
    <el-carousel
      style="height: 860px"
      indicator-position="none"
      :interval="15 * 1000"
      ref="carousel"
      arrow="never"
      @change="carouselChange"
    >
      <el-carousel-item class="item1-container">
        <!-- 子组件 -->
        <child-table :currentIndex="'TAA'" :allData="resultvalue" />
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <!-- 子组件 -->
        <child-table :currentIndex="'RAA'" :allData="resultvalue" />
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <!-- 子组件 -->
        <child-table :currentIndex="'DA'" :allData="resultvalue" />
        <child-table :currentIndex="'LA'" :allData="resultvalue" />
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <!-- 子组件 -->
        <child-table :currentIndex="'ALN'" :allData="resultvalue" />
        <child-table :currentIndex="'NTC'" :allData="resultvalue" />
        <child-table :currentIndex="'GA'" :allData="resultvalue" />
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <!-- 子组件 -->
        <child-table :currentIndex="'TS'" :allData="resultvalue" />
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <!-- 子组件 -->
        <child-table :currentIndex="'ACF'" :allData="resultvalue" />
        <child-table :currentIndex="'LF'" :allData="resultvalue" />
        <child-table :currentIndex="'AVI'" :allData="resultvalue" />
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <child-table :currentIndex="'SA'" :allData="resultvalue" />
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <!-- 子组件 -->
        <child-table :currentIndex="'RET'" :allData="resultvalue" />
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <!-- 子组件 -->
        <child-table :currentIndex="'TET'" :allData="resultvalue" />
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <!-- 子组件 -->
        <child-table :currentIndex="'FTC'" :allData="resultvalue" />
      </el-carousel-item>
    </el-carousel>
    <!-- 自定义两个切换按钮 -->
    <!-- <div class="btns">
      <span class="left-icon-container" @click="prev">
        <i class="iconfont icon-shangyiye icon2"></i>
        <i class="iconfont icon-shangyiye icon1"></i>
        <i class="iconfont icon-shangyiye icon"></i>
      </span>
      <span @click="next">
        <i class="iconfont icon-xiayiye icon"></i>
        <i class="iconfont icon-xiayiye icon1"></i>
        <i class="iconfont icon-xiayiye icon2"></i>
      </span>
    </div> -->
    <change-switch
      :leftConfig="{ left: '15px', top: '55px' }"
      :rightConfig="{ right: '15px', top: '55px' }"
      @directionChange="handleDirection"
    />
  </div>
</template>

<script>
// 引入tooltop公共组件
import TextOverTooltip from "@/components/text-over-tooltip/TextOverTooltip.vue"
// 导入左右切换的组件
import ChangeSwitch from "@/components/change-switch/change-switch.vue"
// 导入里面表格的组件
import ChildTable from "./childTable.vue"
export default {
  name: "contaienr",
  components: { TextOverTooltip, ChangeSwitch, ChildTable },
  props: {
    // 所有的数据
    resultvalue: {
      type: Object,
      default: () => ({})
    },
    // 当前的
    cIndex: {
      type: String,
      default: "AA"
    }
  },

  data() {
    return {}
  },
  mounted() {},
  computed: {},

  watch: {},
  methods: {
    handleDirection(direction) {
      direction == "left" ? this.$refs.carousel.prev() : this.$refs.carousel.next()
    },

    // 回调的参数为 索引
    carouselChange(index) {
      this.$emit("autoPlay", index)
    },
    // 上一页
    prev() {
      this.$refs.carousel.prev()
    },
    // 下一页
    next() {
      this.$refs.carousel.next()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-carousel__container {
  height: 100%;
}
::v-deep .border-box-content {
  padding: 60px 20px 20px 20px;
}
::v-deep .dv-border-box-11-title {
  font-size: 25px;
  font-weight: bold;
}
.page-main-a {
  min-width: 300%;
  padding-top: 5px;
}
.item1-container {
  display: flex;
  .deviceItem {
    flex: 1;
  }
}
</style>
