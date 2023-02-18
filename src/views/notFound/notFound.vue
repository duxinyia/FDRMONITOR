<template>
  <div class="container">
    <!-- <e-icon-picker v-model="icon" style="width:500px" /> -->
    <div class="wrapper">
      <div class="text">404</div>
      <el-button type="success" @click="goBack" plain>返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "notFound",
  data() {
    return {
      icon: ""
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
