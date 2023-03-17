<template>
  <div class="manage-container">
    <div class="title-container">
      <span class="title">{{ showDiv1.length > 0 ? showDiv1[0].belong : "" }}</span>
    </div>
    <div class="project-container">
      <template v-for="(item, index) in showDiv1">
        <div v-if="item.isShow" :key="index" class="container" @click="toProject(item)">
          <el-image class="image" fit="fill" :src="item.imgUrl"></el-image>
          <span class="title">{{ item.title }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "manage",
  computed: {
    showDiv1() {
      let [a, b, c, d, e] = this.$route.path.split("/")
      // console.log(c, d, e)
      // let { type } = this.$route.params
      return this.$store.state.permission.textShowArr[c][d][e] || []
    }
  },
  methods: {
    toProject({ target, to, isExternalLink = false }) {
      if (isExternalLink) {
        // 打开新窗口
        window.open(to)
      } else {
        let path = this.$route.path
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
  height: 100%;
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
  }
  .project-container {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(5, 1fr);
    gap: 50px 30px;
    align-content: center;
    .container {
      height: 180px;
      cursor: pointer;
      border: 1px solid var(--cma-container-border);
      position: relative;
      overflow: hidden;
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
      .title {
        display: inline-block;
        width: 100%;
        height: 35px;
        font-weight: bold;
        text-align: center;
        line-height: 35px;
        background: rgba(204, 204, 204, 0.7);
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
      &:hover .title {
        transform: translateX(-100%);
      }
    }
  }
  @media screen and (max-width: 1600px) {
    .project-container {
      grid-template-rows: repeat(4, 1fr);
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
