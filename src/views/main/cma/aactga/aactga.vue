<template>
  <div class="page-main">
    <dv-border-box-12>
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
          <cf-item />
        </el-carousel-item>
        <!-- <el-carousel-item>
          <aa-item />
        </el-carousel-item>
        <el-carousel-item>
          <ga-item />
        </el-carousel-item>
        <el-carousel-item>
          <ct-item />
        </el-carousel-item>
        <el-carousel-item>
          <acf-item />
        </el-carousel-item>
        <el-carousel-item>
          <test-item />
        </el-carousel-item>
        <el-carousel-item>
          <avi-item />
        </el-carousel-item> -->
      </el-carousel>
    </dv-border-box-12>
    <!-- 自定义两个切换按钮 -->
    <change-switch
      :leftConfig="{ left: '15px', top: '10px' }"
      :rightConfig="{ right: '15px', top: '10px' }"
      @directionChange="handleDirection"
    />
    <!-- 需要一个数组将 avi test  -->
    <!-- <div class="select-container">
      <div
        :class="{ 'select-item': true, 'active-item': index == currentIndex }"
        v-for="(item, index) in options"
        :key="item.value"
        @click="changeValue(index)"
      >
        {{ item.label }}
      </div>
    </div> -->
    <!-- 下拉选择框 -->
    <div class="selsect-container">
      <el-select :popper-append-to-body="false" @change="changeValue" size="mini" v-model="value" placeholder="">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
// 导入左右切换的组件
import ChangeSwitch from "@/components/change-switch/change-switch.vue"
// ACF AA/GA/CT AVI TEST
import AaItem from "./cpns/aa.vue"
import GaItem from "./cpns/ga.vue"
import CtItem from "./cpns/ct.vue"
import AcfItem from "./cpns/acf.vue"
import TestItem from "./cpns/test.vue"
import AviItem from "./cpns/avi.vue"
import CfItem from "./cpns/cf.vue"
export default {
  name: "aactga",
  data() {
    return {
      options: [
        { label: "CF", value: 1 },
        { label: "AA", value: 2 },
        { label: "GA", value: 3 },
        { label: "CT", value: 4 },
        { label: "ACF", value: 5 },
        { label: "TEST", value: 6 },
        { label: "AVI", value: 7 }
      ],
      value: "CF",
      currentIndex: 0
    }
  },
  components: {
    ChangeSwitch,
    AaItem,
    GaItem,
    CtItem,
    AcfItem,
    TestItem,
    AviItem,
    CfItem
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
    },
    changeCarousel(index) {
      this.value = this.options[index].value
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-select-dropdown__item.hover {
  color: #fff;
  background: #274be8 !important;
}
::v-deep .el-select-dropdown {
  background-color: #000c1a;
  columns: #fff;
}
/* 更改下拉框的背景色 */
::v-deep .el-input__inner {
  background: linear-gradient(58deg, #3f77e8, #243d97);
  color: #fff;
  font-size: 15px;
  height: 25px;
  border: none;
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
/* .select-container {
  position: absolute;
  top: 8px;
  right: 150px;
  display: flex;
  .select-item {
    border: 1px solid #0040ff;
    padding: 2px 5px;
    margin: 0px 5px;
    cursor: pointer;
  }
  .active-item {
    background: linear-gradient(58deg, #3f77e8, #243d97);
  }
} */
.selsect-container {
  position: absolute;
  top: 7px;
  right: 150px;
  width: 100px;
}
</style>
