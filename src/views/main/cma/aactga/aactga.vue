<template>
  <div class="page-main">
    <dv-border-box-10>
      <!-- 轮播图 -->
      <el-carousel
        style="height: 100%"
        indicator-position="none"
        :interval="150 * 1000"
        ref="carousel"
        arrow="never"
        @change="changeCarousel"
      >
        <el-carousel-item>
          <aagact-item />
        </el-carousel-item>
        <el-carousel-item>
          <acf-item />
        </el-carousel-item>
        <el-carousel-item>
          <test-item />
        </el-carousel-item>
        <el-carousel-item>
          <avi-item />
        </el-carousel-item>
      </el-carousel>
    </dv-border-box-10>

    <!-- 自定义两个切换按钮 -->
    <change-switch
      :leftConfig="{ left: '5px', top: '10px' }"
      :rightConfig="{ right: '5px', top: '10px' }"
      @directionChange="handleDirection"
    />
    <!-- 需要一个数组将 avi test  -->
    <div class="select-container">
      <div
        :class="{ 'select-item': true, 'active-item': index == currentIndex }"
        v-for="(item, index) in options"
        :key="item.value"
        @click="changeValue(index)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
// 导入左右切换的组件
import ChangeSwitch from "@/components/change-switch/change-switch.vue"
// ACF AA/GA/CT AVI TEST
import AagactItem from "./cpns/aagact.vue"
import AcfItem from "./cpns/acf.vue"
import TestItem from "./cpns/test.vue"
import AviItem from "./cpns/avi.vue"
export default {
  name: "aactga",
  data() {
    return {
      options: [
        { label: "AA/GA/CT", value: 1 },
        { label: "ACF", value: 2 },
        { label: "TEST", value: 3 },
        { label: "AVI", value: 4 }
      ],
      currentIndex: 0
    }
  },
  components: {
    ChangeSwitch,
    AagactItem,
    AcfItem,
    TestItem,
    AviItem
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "By機臺產出看板")
  },
  methods: {
    handleDirection(direction) {
      direction == "left" ? this.$refs.carousel.prev() : this.$refs.carousel.next()
    },
    changeValue(value) {
      this.$refs.carousel.setActiveItem(value)
      this.currentIndex = value
    },
    changeCarousel(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style lang="scss">
.el-select-dropdown__item.hover {
  background: transparent !important;
}
.value-popprt {
  background: transparent !important;
  border: 1px solid #2e6099;
  .el-select-dropdown__item {
    color: #fff !important;
    &:hover {
      background: #2e6099;
    }
    & .hover {
      background: transparent !important;
    }
  }
  .selected {
    background: #2e6099 !important;
  }
}
</style>

<style lang="scss" scoped>
/* 更改下拉框的背景色 */
::v-deep .el-input__inner {
  background: transparent;
  color: #fff;
  font-size: 15px;
  border: 1px solid #2e6099;
  &:hover {
    border: 1px solid #2e6099;
  }
}
::v-deep .border-box-content {
  padding: 20px;
}
::v-deep .el-carousel__container {
  height: 100%;
  margin-top: 15px;
}
.page-main {
  margin-top: 10px;
  height: calc(100% - 120px);
  position: relative;
}
.select-container {
  position: absolute;
  top: 8px;
  right: 150px;
  display: flex;
  /* width: 120px; */
  .select-item {
    border: 1px solid #0040ff;
    padding: 2px 5px;
    margin: 0px 5px;
    cursor: pointer;
  }
  .active-item {
    background: #102768;
  }
}
</style>
