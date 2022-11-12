<template>
  <div class="container">
    <div class="wrapper">
      <div class="text">404</div>
      <dv-border-box-11
        :color="['#05dad4', '#2c97e1']"
        style="height:200px"
        title="dv-border-box-11"
      >dv-border-box-11</dv-border-box-11>
      <el-button type="success" @click="goBack" plain>返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "notFound",
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .dv-border-box-11-title {
  font-size: 30px !important;
  font-weight: bold !important;
  background: greenyellow !important;
}
.container {
  width: 100vw;
  height: 100vh;
  background: #000c2f;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .wrapper {
    .text {
      font-size: 400px;
      line-height: 400px;
      color: #343f69;
    }
  }
}
</style>
