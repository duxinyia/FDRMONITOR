<template>
  <div class="deviceItem">
    <dv-border-box-11 class="top-box" :title="`${currentIndex}生產看板`">
      <div
        ref="loadingContent"
        class="container"
        v-loading="loading(currentIndex)"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="#111e40"
      >
        <div class="item" v-for="(i, index) in comLength(currentIndex)" :key="index">
          <!-- 表格头部 -->
          <div class="header">
            <div class="header-item" style="flex: 1.1">Device</div>
            <div class="header-item" style="flex: 1.8">Machine</div>
            <div class="header-item">Build</div>
            <div class="header-item">Target</div>
            <div class="header-item">OutPut</div>
            <div class="header-item" style="flex: 1.6">HitRate</div>
            <div
              v-if="
                currentIndex == 'TAA' ||
                currentIndex == 'RAA' ||
                currentIndex == 'RET' ||
                currentIndex == 'TET' ||
                currentIndex == 'FTC'
              "
              class="header-item"
              style="flex: 1.6"
            >
              1st Yield
            </div>
          </div>
          <div class="item-container">
            <!-- 表格数据截断 -->
            <div
              v-for="(item, dindex) in currentIndex == 'TAA' ||
              currentIndex == 'RAA' ||
              currentIndex == 'TS' ||
              currentIndex == 'SA' ||
              currentIndex == 'RET' ||
              currentIndex == 'TET' ||
              currentIndex == 'FTC'
                ? comLayout(currentIndex, i)
                : allData[currentIndex]"
              :key="dindex"
              class="every-item"
            >
              <div class="show" style="flex: 1.1">
                {{ item.device }}
              </div>
              <div
                class="show"
                :class="item.machineState ? 'lamp-container' : ''"
                style="flex: 1.8"
              >
                <span class="lamp" :style="changeMachine(item.machineState)"></span>
                <span class="text">{{ item.machine }}</span>
              </div>
              <div class="show">{{ item.buildNo }}</div>
              <div class="show">{{ item.target }}</div>
              <div class="show">{{ item.outPut }}</div>
              <div class="show lamp-container" style="flex: 1.6">
                <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                <span class="text">{{ item.hitRate }}</span>
              </div>
              <div
                v-if="
                  currentIndex == 'TAA' ||
                  currentIndex == 'RAA' ||
                  currentIndex == 'RET' ||
                  currentIndex == 'TET' ||
                  currentIndex == 'FTC'
                "
                class="show lamp-container"
                style="flex: 1.6"
              >
                <span class="lamp" :style="changeYield(currentIndex, item.firstYield)"></span>
                <span class="text">{{ item.firstYield }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dv-border-box-11>
  </div>
</template>
<script>
export default {
  name: "childTable",
  components: {},
  props: {
    // 所有的数据
    allData: {
      type: Object,
      default: () => ({})
    },
    // 当前的
    currentIndex: {
      type: String,
      default: "TAA"
    }
  },
  data() {
    return {
      // 状态颜色
      colors1: ["rgba(255, 0, 102, 0.9)", "rgba(0, 255, 0, 0.9)", "rgba(255, 255, 0, 0.9)"],
      colors: [
        "radial-gradient(50% 50%, rgba(255, 0, 102, 0.5) 50%, rgba(255, 0, 102, 1) 100%)",
        "radial-gradient(50% 50%, rgba(0, 255, 0, 0.5) 50%, rgba(0, 255, 0, 1) 100%)",
        "radial-gradient(50% 50%, rgba(255, 255, 0, 0.5) 50%, rgba(255, 255, 0, 1) 100%)"
      ]
    }
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    // 数据没返回，有loading效果
    loading(index) {
      let count = 0
      for (let key in this.allData[index]) {
        count++
      }
      return count === 0
    },
    // 计算列数，24行一列，最多三列
    comLength(index) {
      let count = 0
      for (let key in this.allData[index]) {
        count++
      }
      if (count === 0) {
        return
      }
      if (
        index == "RAA" ||
        index == "TAA" ||
        index == "SA" ||
        index == "RET" ||
        index == "TET" ||
        index == "FTC" ||
        index == "TS"
      ) {
        let num = parseInt(count / 26) + 1 <= 3 ? parseInt(count / 26) + 1 : 3
        return num
      } else {
        return 1
      }
    },
    // 计算表格每列数据，少于72条，一列24条数据，多于72条，一列的条数是总条数/3的值
    comLayout(type, index) {
      let len = this.allData[type].length
      if (this.allData[type] && len <= 75) {
        return this.allData[type].slice(index * 25 - 25, index === 3 ? len : index * 25)
      } else if (this.allData[type] && len > 75) {
        let indexLen = index * len
        return this.allData[type].slice(
          parseInt(indexLen / 3) - parseInt(len / 3),
          index === 3 ? len : indexLen - (indexLen - parseInt(indexLen / 3))
        )
      }
    },

    // 机台状态
    changeMachine(state = 0) {
      if (state == "Run" || state == "RUN" || state == "RU001") {
        return { background: this.colors[1], color: this.colors1[1] }
      } else if (state == "Down" || state == "DOWN") {
        return { background: this.colors[0], color: this.colors1[0] }
      } else if (state == "Idle" || state == "IDLE") {
        return { background: this.colors[2], color: this.colors1[2] }
      } else {
        return { visibility: "hidden" }
      }
    },
    // hitRate状态
    changeStyle(hitRate) {
      let hr = Number.parseFloat(hitRate) || 0
      if (hr >= 100) {
        return { background: this.colors[1], color: this.colors1[1] }
      } else if (hr < 95) {
        return { background: this.colors[0], color: this.colors1[0] }
      } else {
        return { background: this.colors[2], color: this.colors1[2] }
      }
    },
    // firstYield状态
    changeYield(type, firstYield) {
      let num = Number.parseFloat(firstYield)
      if (type == "TAA" || type == "RAA") {
        let yid = Number.parseFloat(num) || 0
        if (yid > 99) {
          return { background: this.colors[1], color: this.colors1[1] }
        } else if (yid < 97) {
          return { background: this.colors[0], color: this.colors1[0] }
        } else {
          return { background: this.colors[2], color: this.colors1[2] }
        }
      } else if (type == "RET") {
        let yid = Number.parseFloat(firstYield) || 0
        if (yid >= 97.5) {
          return { background: this.colors[1], color: this.colors1[1] }
        } else if (yid < 94.5) {
          return { background: this.colors[0], color: this.colors1[0] }
        } else {
          return { background: this.colors[2], color: this.colors1[2] }
        }
      } else if (type == "TET") {
        let yid = Number.parseFloat(firstYield) || 0
        if (yid >= 97.5) {
          return { background: this.colors[1], color: this.colors1[1] }
        } else if (yid < 95) {
          return { background: this.colors[0], color: this.colors1[0] }
        } else {
          return { background: this.colors[2], color: this.colors1[2] }
        }
      } else if (type == "FTC") {
        let yid = Number.parseFloat(firstYield) || 0
        if (yid >= 99.5) {
          return { background: this.colors[1], color: this.colors1[1] }
        } else if (yid < 95) {
          return { background: this.colors[0], color: this.colors1[0] }
        } else {
          return { background: this.colors[2], color: this.colors1[2] }
        }
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
.deviceItem {
  // margin-top: -1px;
}
.container {
  margin-top: 51px;
  display: flex;
  height: calc(100% - 45px);
  .item {
    text-align: center;
    margin: -5px 10px;
    flex: 1;
    .header {
      font-size: 18px;
      display: flex;
      border-top: 1px solid #1683af;
      border-bottom: 1px solid #1683af;
      border-left: 1px solid #1683af;
      line-height: 35px;
      background: #243d97;
      .header-item {
        // width: 5px;
        // white-space: nowrap;
        // overflow: hidden;
        // text-overflow: ellipsis;
        flex: 1;
        border-right: 1px solid #1683af;
      }
      .header-item:hover {
        cursor: pointer;
      }
    }
    .item-container {
      overflow: overlay;
      height: 800px;
      .every-item {
        display: flex;
        border-bottom: 1px solid #1683af;
        border-left: 1px solid #1683af;
        line-height: 30px;
        .show {
          // width: 5px;
          white-space: nowrap;
          flex: 1;
          border-right: 1px solid #1683af;
        }
        .lamp-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .lamp {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            margin-left: 8px;
            margin-right: 2px;
            animation: fade 2s infinite;
          }
          .text {
            padding-right: 8px;
          }
        }
      }
    }
  }
}

@keyframes fade {
  0% {
    box-shadow: inset 0 0 5px currentColor;
  }
  50% {
    box-shadow: inset 0 0 10px currentColor;
  }
  100% {
    box-shadow: inset 0 0 5px currentColor;
  }
}
</style>
