<template>
  <div
    class="myscroll-chart"
    v-loading="isLoading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="加载中"
    element-loading-background="rgba(0, 0, 0, 1)"
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
          :style="`height: ${avgHeight}px;line-height: ${avgHeight}px;`"
          :key="index"
        >
          <span v-for="(row, i) in rows" class="row" :style="`width:${widths[i]}px`" :key="i" v-html="row"></span>
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
      type: Array
      // default: () => []
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
.myscroll-chart {
  text-align: center;
  .title-container {
    display: flex;
    justify-content: space-between;
    .title {
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 5px;
      color: var(--chart-title);
      &::before {
        content: "";
        display: inline-block;
        margin-right: 5px;
        width: 4px;
        height: 0.9em;
        border-radius: 2px;
        background: var(--chart-slip);
      }
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
        &:nth-child(2) {
          color: var(--chart-scroll-right-arraw);
          &:hover {
            color: #00baff;
          }
        }
      }
    }
  }
  .header {
    font-size: 16px;
    display: flex;
    /* color: #000; */
    background: var(--chart-scroll-header);
    text-align: center;
  }
  .rows {
    font-size: 14px;
    text-align: center;
    display: flex;
    color: var(--base-text-color);
    &:nth-child(2n) {
      background: var(--chart-scroll-odd);
    }
    &:nth-child(2n + 1) {
      background: var(--chart-scroll-even);
    }
  }
}
</style>
