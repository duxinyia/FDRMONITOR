<template>
  <div class="page-main">
    <dv-border-box-12>
      <!-- 使用轮播图来展示数据 -->
      <el-carousel
        style="height: 1000px"
        indicator-position="none"
        :interval="15 * 10000"
        ref="carousel"
        arrow="never"
        @change="changeCarousel"
      >
        <el-carousel-item v-for="(item, index) in options" :key="index" :name="item.value">
          <fol-dpc :device="item.value" />
        </el-carousel-item>
      </el-carousel>
      <!-- 自定义两个切换按钮 -->
      <change-switch
        :leftConfig="{ left: '25px', top: '15px' }"
        :rightConfig="{ right: '25px', top: '15px' }"
        @directionChange="handleDirection"
      />
      <!-- 下拉选择框 -->
      <div class="selsect-container">
        <el-select :popper-append-to-body="false" @change="changeValue" size="mini" v-model="value" placeholder="">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
    </dv-border-box-12>
  </div>
</template>

<script>
// 获取所有的子系列的
import { getMESDeviceInfo } from "@/api/cma/sfc.js"
import FolDpc from "./foldpc.vue"
// 导入左右切换的组件
import ChangeSwitch from "@/components/change-switch/change-switch.vue"
export default {
  name: "follcb",
  components: {
    ChangeSwitch,
    FolDpc
  },
  data() {
    return {
      value: "",
      options: []
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "FOL DPC 差异层别")
    getMESDeviceInfo().then((res) => {
      res.forEach((item, index) => {
        this.options.push({ value: item.value, label: item.value })
      })
      this.value = this.options[0].value
    })
  },
  methods: {
    handleDirection(direction) {
      direction == "left" ? this.$refs.carousel.prev() : this.$refs.carousel.next()
    },
    changeValue(value) {
      console.log("value", value)
      this.$refs.carousel.setActiveItem(value)
    },
    changeCarousel(index) {
      this.value = this.options[index].value
    }
  }
}
</script>
<style lang="scss">
.el-select-dropdown__item.hover {
  color: #fff;
  background: #274be8 !important;
}
</style>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 50px 20px 20px;
  position: relative;
}
/* 更改下拉框的背景色 */
::v-deep .el-input__inner {
  background: linear-gradient(58deg, #3f77e8, #243d97);
  color: #fff;
  font-size: 15px;
  height: 25px;
  border: none;
}
::v-deep .el-select-dropdown {
  background-color: #000c1a;
  columns: #fff;
}
::v-deep .el-carousel__container {
  height: 100%;
}
.page-main {
  margin-top: 10px;
  height: calc(100% - 120px);
}

.selsect-container {
  position: absolute;
  top: 14px;
  right: 150px;
  width: 100px;
}
</style>
