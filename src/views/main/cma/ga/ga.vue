<template>
  <div class="page-main">
    <dv-border-box-12>
      <!-- 使用轮播图来展示数据 -->
      <el-carousel style="height: 1000px" indicator-position="none" :interval="15 * 10000" ref="carousel" arrow="never">
        <el-carousel-item v-for="(item, index) in machines" :key="index">
          <main-one :machine="item.machinename" />
        </el-carousel-item>
      </el-carousel>
      <!-- 自定义两个切换按钮 -->
      <change-switch
        :leftConfig="{ left: '0px', top: '9px' }"
        :rightConfig="{ right: '0px', top: '9px' }"
        @directionChange="handleDirection"
      />
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
      machines: []
    }
  },
  mounted() {
    // 目标 获取到散点图的数据数组
    this.$store.commit("fullLoading/SET_TITLE", "GA製程監控")
    getMachines({ MachineType: "GA" }).then((res) => {
      this.machines = res
    })
  },
  methods: {
    handleDirection(direction) {
      direction == "left" ? this.$refs.carousel.prev() : this.$refs.carousel.next()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-carousel__container {
  height: 100%;
}
::v-deep .border-box-content {
  padding: 30px 20px 20px 20px;
}
.page-main {
  height: calc(100% - 110px);
}
</style>
