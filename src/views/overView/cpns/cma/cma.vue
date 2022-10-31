<template>
  <div class="cma-container">
    <div v-for="(item, index) in showDiv" :key="index" class="container" @click="toProject(item)">
      <el-image class="image" fit="fill" :src="item.imgUrl"> </el-image>
      <span class="info">{{ item.info }}</span>
    </div>
  </div>
</template>

<script>
// 导入需要跳转路由配置
import { CMA_CONFIG } from "@/assets/data"
export default {
  name: "cma",
  data() {
    return {
      showDivMap: CMA_CONFIG,
      showDiv: []
    }
  },
  watch: {
    $route: {
      handler(newValue) {
        let { type } = newValue.params
        this.showDiv = this.showDivMap.get(type)
      },
      immediate: true
    }
  },
  created() {
    let { type } = this.$route.params
    this.showDiv = this.showDivMap.get(type)
  },
  methods: {
    toProject({ target, to, isExternalLink = false }) {
      if (isExternalLink) {
        // 打开新窗口
        window.open(to)
      } else {
        let path = this.$route.path
        this.$router.push({ name: to, query: { belong: target } })
        this.$store.commit("fullLoading/SET_PATH", path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cma-container {
  display: flex;
  flex-wrap: wrap;
  .container {
    cursor: pointer;
    border: 3px solid transparent;
    position: relative;
    overflow: hidden;
    margin-right: 30px;
    border-radius: 5px;
    margin-bottom: 20px;
    .image {
      width: 300px;
      height: 200px;
      transition: 0.5s;
      &:hover {
        transform: scale(1.2);
      }
    }
    .info {
      display: inline-block;
      width: 100%;
      height: 35px;
      font-weight: bold;
      text-align: center;
      line-height: 35px;
      background: rgba(204, 204, 204, 0.4);
      color: rgba(255, 255, 255, 0.8);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      transition: 0.5s;
    }
    &:hover {
      border: 3px solid #ccc;
    }
    &:hover .info {
      transform: translateX(-100%);
    }
  }
}
</style>
