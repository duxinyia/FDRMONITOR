<template>
  <div class="page-header">
    <!-- 第一行 -->
    <div class="header-one">
      <dv-decoration-10 class="dv-dec-10" />
      <dv-decoration-8 class="dv-dec-8" :color="['#568aea', '#000000']" />
      <div class="logo-container">
        <img class="logo" :src="logoSrc" alt="logoSrc" />
      </div>
      <dv-decoration-8 class="dv-dec-8" :reverse="true" :color="['#568aea', '#000000']" />
      <dv-decoration-10 class="dv-dec-10-s" />
    </div>
    <!-- 第二行 -->
    <div class="header-two">
      <div class="react-left">
        <span class="address" v-html="address"></span>
      </div>
      <h3 class="title-text">{{ title }}</h3>
      <div class="react-right">
        <span class="currentTime">{{ currentTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "page-header",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      logoSrc: require("@/assets/images/RP_logo_blue.png"),
      address: "深圳&nbsp;龍華&nbsp;三贏&nbsp;CMA",
      currentTime: "", // 当前的时间
      timing: null
    }
  },
  created() {
    this.getCurrentTime()
  },
  methods: {
    // 获取当前时间
    getCurrentTime() {
      this.timing = setInterval(() => {
        this.currentTime = this.$moment().format("YYYY-MM-DD HH:mm:ss")
      }, 1000)
    }
  },
  beforeDestroy() {
    clearInterval(this.timing)
  }
}
</script>
<style lang="scss" scoped>
.page-header {
  .header-one {
    display: flex;
    .dv-dec-10,
    .dv-dec-10-s {
      width: 33.3%;
      height: 5px;
    }
    .dv-dec-10-s {
      transform: rotateY(180deg);
    }
    .dv-dec-8 {
      width: 200px;
      height: 50px;
    }
    .logo-container {
      width: 500px;
      text-align: center;
      .logo {
        width: 200px;
        height: 50px;
      }
    }
  }
  .header-two {
    display: flex;
    justify-content: space-between;
    .title-text {
      font-size: 35px;
      font-weight: 700;
      height: 50px;
      line-height: 50px;
      vertical-align: bottom;
    }
    .react-left {
      width: 400px;
      height: 0;
      text-align: left;
      line-height: 50px;
      border-bottom: 50px solid #0e1738;
      border-right: 45px solid transparent;
      .address {
        font-size: 22px;
        color: rgb(153, 153, 153);
      }
    }
    .react-right {
      @extend .react-left;
      text-align: right;
      border-right: none;
      border-left: 45px solid transparent;
      .currentTime {
        font-size: 23px;
        color: rgb(153, 153, 153);
      }
    }
  }
}
</style>
