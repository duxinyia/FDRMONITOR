<template>
  <!-- <div
    class="page-main-a"
    v-loading="loading"
    element-loading-text="加载中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="#111e40"
  > -->
  <div class="page-main-a">
    <!-- 使用轮播图来展示数据 -->
    <el-carousel
      style="height: 860px"
      indicator-position="none"
      :interval="15 * 1000"
      ref="carousel"
      arrow="never"
      @change="carouselChange"
    >
      <el-carousel-item v-for="(item, index) in titleData" :key="index">
        <dv-border-box-11 :title="`${item.title}生產看板`">
          <div class="container">
            <div class="item" v-for="(v, i) in 3" :key="i">
              <div class="header">
                <div class="header-item" v-for="(item, index) in tabTitle" :key="index">
                  {{ item }}
                </div>
              </div>
              <div v-for="(item, index) in showArr" :key="index" class="every-item">
                <div class="show" v-for="(ii, index) in item" :key="index">
                  {{ ii }}
                </div>
              </div>
            </div>
          </div>
        </dv-border-box-11>
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
  </div>
</template>

<script>
export default {
  name: "contaienr",
  props: ["cIndex", "titleData"],
  data() {
    return {
      loading: true,
      tabTitle: ["Device", "Machine", "Build", "Target", "OutPut", "HitRate", "1st Yield"],
      showArr: [
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        }
      ]
    }
  },
  watch: {
    showData: {
      handler() {
        // console.log("showData", this.showData)
        this.loading = false
      }
    }
  },
  methods: {
    // 回调的参数为 索引
    carouselChange(index) {
      this.$emit("autoPlay", index)
      console.log(index)
    },
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
  padding: 60px 20px 20px 20px;
}
::v-deep .el-carousel__container {
  // height: 100%;
}
::v-deep .el-carousel__item {
  // height: 100%;
}
::v-deep .dv-border-box-11-title {
  font-size: 25px;
  font-weight: bold;
}
.page-main-a {
  width: 300%;
  // height: 850px;
  padding-top: 5px;
  text-align: center;
}
.btns {
  span {
    z-index: 1000;
    margin-top: 10px;
    position: absolute;
    width: 120px;
    height: 50px;
    text-align: center;
    animation: twinkle 2s infinite;
    cursor: pointer;
    &:nth-child(1) {
      left: 15px;
      top: 46px;
    }
    &:nth-child(2) {
      right: 15px;
      top: 46px;
    }
    .icon {
      font-weight: bold;
      font-size: 20px;
      color: var(--aa-bottom-icon);
    }
    .icon1 {
      font-weight: bold;
      font-size: 20px;
      color: var(--aa-bottom-icon1);
    }
    .icon2 {
      font-weight: 800;
      font-size: 20px;
      color: var(--aa-bottom-icon2);
    }
  }
}
.container {
  margin-top: 51px;
  display: flex;
  .item {
    flex: 1;
    .header {
      display: flex;
      border-top: 1px solid #1683af;
      border-bottom: 1px solid #1683af;
      border-left: 1px solid #1683af;
      line-height: 35px;
      background: #243d97;
      .header-item {
        flex: 1;
        border-right: 1px solid #1683af;
      }
    }

    .every-item {
      display: flex;
      border-bottom: 1px solid #1683af;
      border-left: 1px solid #1683af;
      line-height: 30px;

      .show {
        flex: 1;
        border-right: 1px solid #1683af;
      }
    }

    &:nth-child(2) {
      margin: 0 20px;
    }
  }
}
</style>
