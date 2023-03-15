<template>
  <div class="page-main">
    <!-- 分三栏 左边 中间 右边 -->
    <!-- <dv-border-box-12> -->
    <dv-border-box-10>
      <div class="contaienr">
        <div class="item">
          <dv-border-box-11 class="top-box" title="AA生產看板">
            <div
              class="item1"
              v-loading="aaLoading"
              element-loading-spinner="el-icon-loading"
              element-loading-text="加载中"
              element-loading-background="rgba(0, 0, 0, 1)"
            >
              <div class="header">
                <div class="header-item">Device</div>
                <div class="header-item">Machine</div>
                <div class="header-item">Target</div>
                <div class="header-item">OutPut</div>
                <div class="header-item">HitRate</div>
                <div class="header-item">1st Yield</div>
              </div>
              <div class="item-container">
                <div v-for="(item, index) in aaData" :key="index" class="every-item">
                  <div class="show">{{ item.device }}</div>
                  <div class="show" :style="changeMachine(item.machineState)">
                    {{ item.machine }}
                  </div>
                  <div class="show">{{ item.target }}</div>
                  <div class="show">{{ item.outPut }}</div>
                  <div class="show" :style="changeStyle(item.hitRate)">{{ item.hitRate }}</div>
                  <div class="show" :style="changeYield(item.firstYield)">
                    {{ item.firstYield }}
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
        <div class="item">
          <dv-border-box-11 class="top-box" title="CT生產看板">
            <div
              class="item1"
              v-loading="ctLoading"
              element-loading-spinner="el-icon-loading"
              element-loading-text="加载中"
              element-loading-background="rgba(0, 0, 0, 1)"
            >
              <div class="header">
                <div class="header-item">Device</div>
                <div class="header-item">Machine</div>
                <div class="header-item">Target</div>
                <div class="header-item">OutPut</div>
                <div class="header-item">HitRate</div>
                <div class="header-item">1st Yield</div>
              </div>
              <div class="item-container">
                <div v-for="(item, index) in ctData" :key="index" class="every-item">
                  <div class="show">{{ item.device }}</div>
                  <div class="show">{{ item.machine }}</div>
                  <div class="show">{{ item.target }}</div>
                  <div class="show">{{ item.outPut }}</div>
                  <div class="show" :style="changeStyle(item.hitRate)">{{ item.hitRate }}</div>
                  <div class="show">
                    {{ item.firstYield }}
                  </div>
                </div>
              </div>
            </div></dv-border-box-11
          >
        </div>
        <div class="item">
          <dv-border-box-11 class="top-box" title="GA生產看板">
            <div
              class="item1"
              v-loading="gaLoading"
              element-loading-spinner="el-icon-loading"
              element-loading-text="加载中"
              element-loading-background="rgba(0, 0, 0, 1)"
            >
              <div class="header">
                <div class="header-item">Machine</div>
                <div class="header-item">Target</div>
                <div class="header-item">OutPut</div>
                <div class="header-item">HitRate</div>
              </div>
              <div class="item-container">
                <div v-for="(item, index) in gaData" :key="index" class="every-item">
                  <div class="show">{{ item.machine }}</div>
                  <div class="show">{{ item.target }}</div>
                  <div class="show">{{ item.outPut }}</div>
                  <div class="show" :style="changeStyle(item.hitRate)">{{ item.hitRate }}</div>
                </div>
              </div>
            </div></dv-border-box-11
          >
        </div>
      </div>
    </dv-border-box-10>
  </div>
</template>

<script>
// 导入发送请求的函数
import { getAAData, getGAData, getCTData } from "@/api/aagact.js"
export default {
  name: "aactga",
  data() {
    return {
      aaData: [],
      gaData: [],
      ctData: [],
      showArr: [
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },

        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        }
      ],
      // 红 绿  黄
      colors: ["#f00", "#008000", "#ff0"]
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "AA/GA/CT")
    getAAData().then((res) => {
      console.log("getAAData", res)
      this.aaData = res
    })
    getGAData().then((res) => {
      console.log("getGAData", res)
      this.gaData = res
    })
    getCTData().then((res) => {
      console.log("getCTData", res)
      this.ctData = res
    })
  },
  computed: {
    aaLoading() {
      return this.aaData.length == 0
    },
    gaLoading() {
      return this.gaData.length == 0
    },
    ctLoading() {
      return this.ctData.length == 0
    }
  },
  methods: {
    changeStyle(hitRate) {
      // console.log(Number.parseFloat(hitRate))
      let num = Number.parseFloat(hitRate) || 0
      if (num >= 100) {
        return { color: this.colors[1] }
      } else if (num < 95) {
        return { color: this.colors[0] }
      } else {
        return { color: this.colors[2] }
      }
    },
    changeYield(firstYield) {
      // console.log(firstYield)
      let num = Number.parseFloat(firstYield)
      if (num < 99.4) {
        return { color: "#9932CD" }
      }
    },
    changeMachine(state) {
      // console.log("state", state)
      if (state == "Run") {
        return { color: this.colors[1] }
      } else if (state == "Down") {
        return { color: this.colors[0] }
      } else {
        return { color: this.colors[2] }
      }
    },
    changectStyle(device, firstYield) {
      let num = Number.parseFloat(firstYield)
      if (device == "JU") {
        if (num < 96) {
          return { color: this.colors[0] }
        }
      } else if (device == "MD-X" || device == "ML-X") {
        if (num < 98) {
          return { color: this.colors[0] }
        }
      } else if (device == "NH-X") {
        if (num < 93) {
          return { color: this.colors[0] }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.top-box .border-box-content {
  padding: 60px 20px 20px 20px !important;
}
</style>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
}

.page-main {
  margin-top: 10px;
}
.contaienr {
  display: flex;
  .item {
    flex: 1;
  }
}
.item1 {
  flex: 1;

  // overflow: auto;
  text-align: center;
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
  .item-container {
    height: 800px;
    overflow: auto;
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
  }
}
</style>
