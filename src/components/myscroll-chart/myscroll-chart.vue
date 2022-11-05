<template>
  <div
    class="myscroll-chart"
    v-loading="isLoading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="加载中"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <!-- 标题区域 -->
    <div class="title-container">
      <span class="title">{{ title }}</span>
      <div class="arrows">
        <span @click="toDown" class="iconfont icon-shangjiantou"></span>
        <span @click="toUP" class="iconfont icon-xiajiantou"></span>
      </div>
    </div>
    <div class="header">
      <div
        class="header-item"
        :style="`width:${widths[i]}px;height:${headerHeight}px;line-height: ${headerHeight}px;`"
        v-for="(item, i) in headers"
        :key="item"
        v-html="item"
      ></div>
    </div>
    <el-carousel
      ref="carousel"
      :height="carouselHeight"
      :interval="waitTime"
      direction="vertical"
      indicator-position="none"
    >
      <el-carousel-item v-for="(everyArr, index) in getNewArray" :key="index">
        <div
          class="rows"
          v-for="(rows, index) in everyArr"
          :style="`height: ${avgHeight}px;line-height: ${avgHeight}px;background-color: ${
            index % 2 === 0 ? evenRowBGC : oddRowBGC
          }`"
          :key="index"
        >
          <template v-for="(row, i) in rows">
            <span class="row" :style="`width:${widths[i]}px`" :key="i" v-html="row"></span>
          </template>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
// 导入对应的分割函数
import { splitArray } from "@/utils"
export default {
  name: "myscroll-chart",
  props: {
    // 轮播图的标题
    title: {
      type: String,
      default: ""
    },
    // 轮播表的高度
    carouselHeight: {
      type: String,
      default: "215px"
    },
    // 头部区域
    headers: {
      type: Array,
      default: () => []
    },
    // 轮播的时间
    waitTime: {
      type: Number,
      default: 10000
    },
    // 表头高度
    headerHeight: {
      type: Number,
      default: 30
    },
    // 双数的颜色
    evenRowBGC: {
      type: String,
      default: "#0a2732"
    },
    // 单数的颜色
    oddRowBGC: {
      type: String,
      default: "#003b51"
    },
    // 各项的数组
    widths: {
      type: Array,
      default: () => []
    },
    // 需要展示的数组
    showData: {
      type: Array,
      default: () => []
    },
    // 需要展示的列数
    rowNum: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    getNewArray() {
      let { showData, rowNum } = this
      return splitArray(showData, rowNum)
    },
    avgHeight() {
      let { carouselHeight, rowNum } = this
      return parseInt(carouselHeight) / rowNum
    }
  },
  watch: {
    showData: {
      handler() {
        this.isLoading = false
      }
    }
  },
  methods: {
    toUP() {
      this.$refs["carousel"].prev()
    },
    toDown() {
      this.$refs["carousel"].next()
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "@/assets/scss/variables.scss";
.myscroll-chart {
  text-align: center;
  .title-container {
    display: flex;
    justify-content: space-between;
    .title {
      display: inline-block;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 5px;
      color: $title-color;
      // color: var(--chart-title);
      padding-left: 5px;
      // border-left: 4px solid var(--chart-slip);
      border-left: 4px solid #bb98fa;
    }
    .arrows {
      span {
        cursor: pointer;
        font-size: 20px;
        color: #00baff;
        &:hover {
          color: aqua;
        }
        &:nth-child(1) {
          margin-right: 5px;
        }
      }
    }
  }
  .header {
    font-size: 16px;
    display: flex;
    background: #20316e;
    text-align: center;
  }
  .rows {
    // height: 36px;
    // line-height: 36px;
    font-size: 14px;
    text-align: center;
    display: flex;
  }
}
</style>
