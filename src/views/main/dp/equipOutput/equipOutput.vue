<template>
  <div class="page-main">
    <dv-border-box-12>
      <div>
        <div class="btns">
          <div class="left">
            <div class="control">
              <div class="container" v-for="(item, index) in containerLeft" :key="index">
                <span
                  class="box box1"
                  @click="changeIndex(index)"
                  :style="{
                    'box-shadow': currentIndex == index ? `inset 0 0 20px ${item}` : '',
                    border: `2px solid ${item}`
                  }"
                ></span>
                <span class="name">{{ index }}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="control">
              <div class="container" v-for="(item, index) in containerRight" :key="index">
                <span class="box box2" :style="{ color: item }"></span>
                <span class="name">{{ index }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 主要区域 -->
        <div class="main">
          <div class="contaner">
            <!-- <p class="title">生產看板</p> -->
            <contaienr :cIndex="currentIndex" />
          </div>
        </div>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script>
// 导入子组件
import Contaienr from "./cpns/contaienr.vue"
export default {
  name: "equipOutput",
  components: { Contaienr },
  data() {
    return {
      // 当前选中
      currentIndex: "AA",
      // 左边颜色
      containerLeft: {
        AA: "#ff99ff",
        GA: "#0d60ae",
        DA: "#0eb18a",
        LA: "#ffff00",
        ALN: "#ff99ff",
        DTC: "#0d60ae",
        TS: "#0eb18a",
        ACF: "#ffff00",
        SA: "#ff99ff",
        LF: "#0d60ae",
        RET: "#0eb18a",
        TET: "#ffff00",
        FTC: "#ff99ff",
        AVI: "#0d60ae"
      },
      // 右边颜色
      containerRight: {
        RUN: "#92d050",
        DOWN: "#ff5050",
        IDLE: "#ffff99"
      }
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "設備產出看板")
  },
  computed: {},
  methods: {
    changeIndex(i) {
      this.currentIndex = i
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
  position: relative;
}

.page-main {
  margin-top: 20px;
}
.contaner {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
}
.btns {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  .right {
    margin-right: 20px;
  }
  .right,
  .left {
    display: flex;
    .control {
      display: flex;
      align-items: center;
      .container {
        display: flex;
        align-items: center;
        .box {
          display: inline-block;
          width: 25px;
          height: 25px;
          margin-right: 6px;
        }
        .box1 {
          cursor: pointer;
        }
      }
      .box2 {
        animation: fade 2s infinite;
      }
      .box {
        margin: 0 20px;
      }
    }
  }
}
@keyframes fade {
  0% {
    box-shadow: inset 0 0 25px currentColor;
  }
  50% {
    box-shadow: inset 0 0 10px currentColor;
  }
  100% {
    box-shadow: inset 0 0 25px currentColor;
  }
}
</style>
