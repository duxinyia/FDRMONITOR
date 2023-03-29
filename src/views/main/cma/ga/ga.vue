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
      >
        <el-carousel-item v-for="(item, index) in machines" :key="index">
          <main-one :machine="item.machinename" />
        </el-carousel-item>
      </el-carousel>
      <!-- 自定义两个切换按钮 -->
      <div class="btns">
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
      </div>
    </dv-border-box-12>
  </div>
</template>
<script>
// 导入接口请求函数
import { getMachines } from "@/api/cma/vaga.js"
// 导入子组件
import mainOne from "./cpns/index.vue"
export default {
  name: "va",
  components: {
    mainOne
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
    // 上一楼
    prev() {
      this.$refs.carousel.prev()
    },
    // 下一楼
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
  padding: 30px 20px 20px 20px;
}
.page-main {
  height: calc(100% - 110px);
}

.btns {
  span {
    position: absolute;
    width: 120px;
    height: 50px;
    text-align: center;
    animation: twinkle 2s infinite;
    cursor: pointer;
    &:nth-child(1) {
      left: 0px;
      top: 9px;
    }
    &:nth-child(2) {
      right: 0px;
      top: 9px;
    }
    .icon {
      font-weight: bold;
      font-size: 25px;
      color: var(--aa-bottom-icon);
    }
    .icon1 {
      font-weight: bold;
      font-size: 25px;
      color: var(--aa-bottom-icon1);
    }
    .icon2 {
      font-weight: 800;
      font-size: 25px;
      color: var(--aa-bottom-icon2);
    }
  }
}
</style>
