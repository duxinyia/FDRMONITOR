<template>
  <div class="myscroll-chart">
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
      height="215px"
      :interval="waitTime"
      direction="vertical"
      indicator-position="none"
    >
      <el-carousel-item v-for="(everyArr, index) in getNewArray" :key="index">
        <div class="rows" v-for="(rows, index) in everyArr" :key="index">
          <span
            class="row"
            :style="`width:${widths[i]}px;`"
            v-for="(row, i) in rows"
            :key="i"
            v-html="row"
          ></span>
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
  computed: {
    getNewArray() {
      let { showData, rowNum } = this
      // let tempArr = this.showdata.filter((item) => item[0])
      return splitArray(showData, rowNum)
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
@import "@/assets/scss/variables.scss";
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
      padding-left: 5px;
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
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    text-align: center;
    display: flex;
    &:nth-child(even) {
      background: #0a2732;
    }
    &:nth-child(odd) {
      background: #003b51;
    }
  }
  // .main {
  //   font-size: 14px;
  //   .rows {
  //     display: flex;
  //     .row-item {
  //       flex: 1;
  //     }
  //   }
  // }
}
</style>
