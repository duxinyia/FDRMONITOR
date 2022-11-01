<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :before-close="toClose"
    :close-on-click-modal="false"
    top="10vh"
    width="40%"
  >
    <dv-border-box-11 title="背景选择" :key="dialogKey">
      <svg-icon className="closeIcon" icon-class="close" @click="toClose" />
      <div class="container">
        <div class="img-container" v-for="(item, index) in bgs" :key="index">
          <el-radio v-model="radio" class="radio" :label="index">背景{{ index + 1 }}</el-radio>
          <el-image class="image" :src="item" :preview-src-list="bgs"> </el-image>
          <!-- 遮罩层 -->
          <div class="mask">
            <span class="iconfont icon-yanjing eye"></span>
            <span class="text">预览</span>
          </div>
        </div>
        <div class="img-container">
          <p class="radio">自定义</p>
          <el-color-picker
            class="image"
            v-model="color"
            show-alpha
            @change="changeColor"
          ></el-color-picker>
        </div>
      </div>
    </dv-border-box-11>
  </el-dialog>
</template>

<script>
// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
export default {
  name: "bgs-dialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogKey: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      radio: cache.getCache("bgUrl") ? cache.getCache("bgUrl").index : "",
      color: cache.getCache("bgUrl") ? cache.getCache("bgUrl").bg : "",
      bgs: [
        require("@/assets/images/background5.png"),
        require("@/assets/images/background3.png"),
        require("@/assets/images/background8.jpg"),
        require("@/assets/images/background9.png"),
        require("@/assets/images/background10.jpg"),
        require("@/assets/images/background11.jpg"),
        require("@/assets/images/background12.jpg"),
        require("@/assets/images/background13.jpg"),
        require("@/assets/images/background14.jpg"),
        require("@/assets/images/background15.jpg"),
        require("@/assets/images/background16.jpg")
      ]
    }
  },
  watch: {
    radio: {
      handler(newVal) {
        this.$emit("radioChangeBg", this.bgs[newVal])
        cache.setCache("bgUrl", { index: newVal, bg: this.bgs[newVal] })
      }
    }
  },
  methods: {
    toClose() {
      this.$emit("update:dialogVisible", false)
    },
    changeColor(newColor) {
      // this.radio = 100
      console.log("newColor", newColor)
      this.$emit("selectChangeBg", newColor)
      cache.setCache("bgUrl", { index: 100, bg: newColor })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  display: none;
}

::v-deep .el-dialog__body {
  padding: 10px 5px 5px 5px;
  background: #00132a;
  min-width: 758px;
}
::v-deep .border-box-content {
  padding: 60px 20px 20px 20px;
}
::v-deep .el-radio__label {
  color: #fff;
}
.container {
  padding: 10px;
  display: grid;
  gap: 20px 15px;
  color: #fff;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  text-align: center;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(4, 1fr);
  .img-container {
    text-align: center;
    height: 220px;
    position: relative;
    overflow: hidden;
    .mask {
      width: 100%;
      height: 200px;
      text-align: center;
      line-height: 200px;
      margin-top: 15px;
      pointer-events: none;
      background: rgba(127, 127, 127, 0.6);
      transition: 0.4s;
      position: absolute;
      left: -100%;
      top: 10px;
      z-index: 10;
      .eye {
        font-size: 20px;
        margin-right: 10px;
        font-weight: bold;
        margin-top: 4px;
        &:hover {
          color: #2d66e2;
        }
      }
      .text {
        font-size: 16px;
        font-weight: bold;
        display: inline-block;
        &:hover {
          color: #2d66e2;
        }
      }
    }
    .image {
      width: 100%;
      height: 200px;
      line-height: 200px;
      &:hover + .mask {
        transform: translateX(100%);
      }
    }
    .radio {
      height: 20px;
      line-height: 20px;
    }
  }
}

.closeIcon {
  position: absolute;
  right: 4px;
  top: 2px;
  width: 30px;
  height: 30px;
  color: #2d66e2;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transform: rotate(90deg);
  }
}
</style>
