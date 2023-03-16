<template>
  <!-- 主要区域 -->
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
            <contaienr :cIndex="currentIndex" />
          </div>
        </div>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script>
// 导入第一行
import mainOne from "./cpns/main-one/main-one.vue"
// 导入底部区域
import mainTwo from "./cpns/main-two/main-two.vue"
import mainThree from "./cpns/main-three/main-three.vue"
// 导入发送请求的函函數
export default {
  name: "sfc",
  components: {
    mainOne,
    mainTwo,
    mainThree
  },
  data() {
    return {
      title: ["By课 ", "By课 ", "By课 ", "By课 ", "By班别", "By班别 "],
      config: {
        xData: ["1/1", "1/2", "1/3", "1/4", "1/5", "1/6", "1/7"],
        yData: [
          [120.3, 132.9, 101.2, 134.8, 89.3, 170.2, 160.5],
          [110.4, 112.5, 161.4, 104.2, 160.0, 130.2, 120.2]
        ],
        legends: ["D", "N"]
      }
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "人員出勤率看板")
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
    box-shadow: inset 0 0 20px currentColor;
  }
  100% {
    box-shadow: inset 0 0 25px currentColor;
  }
}
</style>
