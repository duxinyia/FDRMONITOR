<template>
  <div class="manage-container">
    <div class="title-container">
      <span class="title">{{ showDiv1[0].belong }}</span>
      <el-image class="title-icon" :src="titleIcon" fit="cover"></el-image>
    </div>
    <div class="project-container">
      <div
        v-for="(item, index) in showDiv1"
        :key="index"
        class="container"
        @click="toProject(item)"
      >
        <el-image class="image" fit="fill" :src="item.imgUrl"></el-image>
        <span class="info">{{ item.info }}</span>
      </div>
    </div>
  </div>
</template>
<script>
// 导入需要跳转路由配置
import { changeCmaConfig } from "@/assets/data"
export default {
  name: "manage",
  data() {
    return {
      titleIcon: require("@/assets/images/title-icon.png")
    }
  },
  computed: {
    showDiv1() {
      let { type } = this.$route.params
      let theme = this.$store.getters.theme
      return changeCmaConfig(theme).get(type)
    }
  },
  methods: {
    toProject({ target, to, isExternalLink = false }) {
      if (isExternalLink) {
        // 打开新窗口
        window.open(to)
      } else {
        let path = this.$route.path
        // this.$router.push({ name: to, query: { belong: target } })
        this.$router.push({ name: to })
        this.$store.commit("fullLoading/SET_PATH", path)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.manage-container {
  width: 100%;
  position: absolute;
  padding-right: 20px;
  gap: 20px;
  /* z-index: 999; */
  .title-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .title {
      color: var(--cma-title);
      font-size: 25px;
      font-weight: bold;
      &::after {
        content: "";
        display: inline-block;
        width: 5px;
        height: 20px;
        margin: auto 15px;
        background: var(--cma-title);
      }
    }
    .title-icon {
      width: 126px;
      height: 48px;
    }
  }
  .project-container {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    /* justify-content: center; */
    align-content: center;
    /* display: flex;
    flex-wrap: wrap; */
    padding-right: 20px;
    .container {
      width: 300px;
      height: 200px;
      /* width: 15.625vw;
      height: 10.4167vw; */
      cursor: pointer;
      border: 1px solid var(--cma-container-border);
      position: relative;
      overflow: hidden;
      /* margin-right: 80px;
      margin-bottom: 80px; */
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0px 0px 15px var(--cma-box-shadow);
      .image {
        width: 100%;
        height: 100%;
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
        background: rgba(204, 204, 204, 0.7);
        /* background: rgba(0, 0, 0, 0.8); */
        /* color: rgba(255, 255, 255, 0.8); */
        color: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        transition: 0.5s;
      }
      &:hover {
        border: 1px solid #56c4f8;
      }
      &:hover .info {
        transform: translateX(-100%);
      }
    }
  }

  @media screen and (max-width: 1500px) {
    .project-container {
      grid-template-rows: repeat(4, 1fr);
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
