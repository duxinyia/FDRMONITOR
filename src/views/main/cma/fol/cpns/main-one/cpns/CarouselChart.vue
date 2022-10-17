<template>
  <div class="carousel-chart">
    <div class="title-container">
      <span class="title">{{ title }}</span>
      <div class="arrows">
        <span @click="toDown" class="iconfont icon-shangjiantou"></span>
        <span @click="toUP" class="iconfont icon-xiajiantou"></span>
      </div>
    </div>
    <div class="main-container">
      <div class="header">
        <span v-for="item in header" :key="item" class="item">{{ item }}</span>
      </div>
      <el-carousel
        ref="carousel"
        height="160px"
        :interval="10000"
        direction="vertical"
        indicator-position="none"
      >
        <el-carousel-item v-for="(everyArr, index) in getNewArray" :key="index">
          <div class="everyArr" v-for="(item, index) in everyArr" :key="index">
            <span class="final" v-for="(final, index) in item" :key="index">{{
              final | filterFinal
            }}</span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
// 导入对应的分割函数
import { splitArray } from "@/utils"
export default {
  name: "CarouselChart",
  props: ["title", "showdata"],
  data() {
    return {
      header: ["機種", "線體", "計劃產出", "實際產出", "達成率", "DPC", "LCB", "電性"]
    }
  },
  computed: {
    getNewArray() {
      let tempArr = this.showdata.filter((item) => item[0])
      return splitArray(tempArr, 5)
    }
  },
  filters: {
    filterFinal(value) {
      if (typeof value == "string") {
        if (value.includes("Line")) {
          return value.split(" ")[1]
        }
      }
      return value
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
.carousel-chart {
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
          margin-right: 10px;
        }
      }
    }
  }
  .main-container {
    .header {
      display: flex;
      align-items: center;
      text-align: center;
      background: #20316e;
      height: 35px;
      font-size: 15px;
      .item {
        display: inline-block;
        &:nth-child(1) {
          width: 50px;
        }
        &:nth-child(2) {
          width: 60px;
        }
        &:nth-child(3),
        &:nth-child(4) {
          width: 70px;
        }
        &:nth-child(5),
        &:nth-child(6),
        &:nth-child(7),
        &:nth-child(8) {
          width: 65px;
        }
      }
    }
    .everyArr {
      font-size: 14px;
      height: 33px;
      line-height: 33px;
      display: flex;
      text-align: center;
      &:nth-child(even) {
        background: #0a2732;
      }
      &:nth-child(odd) {
        background: #003b51;
      }
      .final {
        display: inline-block;
        &:nth-child(1) {
          width: 50px;
        }
        &:nth-child(2) {
          width: 60px;
        }
        &:nth-child(3),
        &:nth-child(4) {
          width: 70px;
        }
        &:nth-child(5),
        &:nth-child(6),
        &:nth-child(7),
        &:nth-child(8) {
          width: 65px;
        }
      }
    }
  }
}
</style>
