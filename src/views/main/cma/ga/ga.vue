<template>
  <div class="page-main">
    <dv-border-box-12>
      <!-- 使用轮播图来展示数据 -->
      <el-carousel
        style="height: 1020px"
        indicator-position="none"
        :interval="15 * 10000"
        @change="changeCarousel"
        ref="carousel"
        arrow="never"
      >
        <el-carousel-item v-for="(item, index) in machines" :key="index">
          <main-one :machine="item.machinename" />
        </el-carousel-item>
      </el-carousel>
      <!-- 自定义两个切换按钮 -->
      <change-switch
        :leftConfig="{ left: '20px', top: '9px' }"
        :rightConfig="{ right: '20px', top: '9px' }"
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
// 导入接口请求函数
import { getMachines } from "@/api/cma/vaga.js"
// 导入子组件
import mainOne from "./cpns/index.vue"
// 导入左右切换的组件
import ChangeSwitch from "@/components/change-switch/change-switch.vue"
export default {
  name: "ga",
  components: {
    mainOne,
    ChangeSwitch
  },
  data() {
    return {
      machines: [],
      options: [],
      value: ""
    }
  },
  mounted() {
    // 目标 获取到散点图的数据数组
    this.$store.commit("fullLoading/SET_TITLE", "GA製程監控")
    getMachines({ MachineType: "GA" }).then((res) => {
      this.machines = res
      res.forEach((item, index) => {
        this.options.push({ value: index, label: item.machinename })
      })
      this.value = this.options[0].value
    })
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
::v-deep .el-carousel__container {
  height: 100%;
}
::v-deep .border-box-content {
  padding: 30px 20px 20px 20px;
}
.page-main {
  height: calc(100% - 110px);
}

.selsect-container {
  position: absolute;
  top: 7px;
  right: 150px;
  width: 100px;
}
</style>
