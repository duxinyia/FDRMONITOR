<template>
  <div class="container">
    <div class="wrapper">
      <el-image class="notfound" :src="img" fit="cover"></el-image>
      <el-button class="back" type="success" @click="goBack" plain>返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "notFound",
  data() {
    return {
      img: require("@/assets/images/other/404.png")
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: #000c2f;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .notfound {
      width: 500px;
      margin-bottom: 50px;
    }
    .back {
      width: 300px;
      background: #144646;
    }
  }
}
</style>
