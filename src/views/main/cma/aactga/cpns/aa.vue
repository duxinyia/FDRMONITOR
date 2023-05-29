<template>
  <!-- <div class="item1-container">
    <div class="item">
      <dv-border-box-11 title="AA生產看板">
        <div
          class="item1"
          v-loading="aaLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-text="加载中"
          element-loading-background="rgba(0, 0, 0, 1)"
        >
          <div class="header">
            <div class="header-item">Device</div>
            <div class="header-item" style="flex: 1.1">Machine</div>
            <div class="header-item">Target</div>
            <div class="header-item">OutPut</div>
            <div class="header-item">HitRate</div>
            <div class="header-item">1st Yield</div>
          </div>
          <div class="item-container">
            <div v-for="(item, index) in aaData" :key="index" class="every-item">
              <div class="show">{{ item.device }}</div>
              <div class="show lamp-container" style="flex: 1.1">
                <span class="lamp" :style="changeMachine(item.machineState)"></span>
                <span class="text">{{ item.machine }}</span>
              </div>
              <div class="show">{{ item.target }}</div>
              <div class="show">{{ item.outPut }}</div>
              <div class="show lamp-container">
                <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                <span class="text">{{ item.hitRate }}</span>
              </div>
              <div class="show lamp-container">
                <span class="lamp" :style="changeYield(item.firstYield)"></span>
                <span class="text">{{ item.firstYield }}</span>
              </div>
            </div>
          </div>
        </div>
      </dv-border-box-11>
    </div>
  </div> -->
  <div>
    <ces-table :tableData="tableData" :tableCols="tableCols"> </ces-table>
  </div>
</template>

<script>
// 导入发送请求的函数
import { getAAData } from "@/api/cma/aagact.js"
export default {
  name: "aa",
  data() {
    return {
      // 表格列配置
      tableCols: [
        { id: "device", name: "Device" },
        { id: "machine", name: "Machine" },
        { id: "target", name: "Target" },
        {
          id: "",
          name: "OutPut",
          chileColumn: [
            { id: "station", name: `${this.$moment().subtract(2, "day").format("YYYY/M/D")}` },
            { id: "targetOut", name: `${this.$moment().subtract(1, "day").format("YYYY/M/D")}` },
            { id: "outPut", name: `${this.$moment().format("YYYY/M/D")}` }
          ]
        },
        {
          id: "",
          name: "HitRate",
          chileColumn: [
            { id: "station", name: `${this.$moment().subtract(2, "day").format("YYYY/M/D")}` },
            { id: "targetOut", name: `${this.$moment().subtract(1, "day").format("YYYY/M/D")}` },
            { id: "outPut", name: `${this.$moment().format("YYYY/M/D")}` }
          ]
        },
        {
          id: "",
          name: "1st Yield",
          chileColumn: [
            { id: "station", name: `${this.$moment().subtract(2, "day").format("YYYY/M/D")}` },
            { id: "targetOut", name: `${this.$moment().subtract(1, "day").format("YYYY/M/D")}` },
            { id: "outPut", name: `${this.$moment().format("YYYY/M/D")}` }
          ]
        }
      ],
      tableData: [],
      aaData: [],
      // 红 绿  黄
      colors1: ["rgba(255, 0, 102, 0.9)", "rgba(0, 255, 0, 0.9)", "rgba(255, 255, 0, 0.9)"],
      colors: [
        "radial-gradient(50% 50%, rgba(255, 0, 102, 0.5) 50%, rgba(255, 0, 102, 1) 100%)",
        "radial-gradient(50% 50%, rgba(0, 255, 0, 0.5) 50%, rgba(0, 255, 0, 1) 100%)",
        "radial-gradient(50% 50%, rgba(255, 255, 0, 0.5) 50%, rgba(255, 255, 0, 1) 100%)"
      ]
    }
  },
  created() {
    getAAData().then((res) => {
      this.aaData = res
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
      let num = Number.parseFloat(hitRate) || 0
      if (num >= 100) {
        return { background: this.colors[1], color: this.colors1[1] }
      } else if (num < 95) {
        return { background: this.colors[0], color: this.colors1[0] }
      } else {
        return { background: this.colors[2], color: this.colors1[2] }
      }
    },
    changeYield(firstYield) {
      let num = Number.parseFloat(firstYield)
      if (num < 99.4) {
        return {
          background: "radial-gradient(50% 50%, rgba(153, 0, 255,0.5) 50%, rgba(153, 0, 255,1) 100%)",
          color: "#9900ff"
        }
      } else {
        return {
          visibility: "hidden"
        }
      }
    },
    changeMachine(state) {
      if (state == "Run") {
        return { background: this.colors[1], color: this.colors1[1] }
      } else if (state == "Down") {
        return { background: this.colors[0], color: this.colors1[0] }
      } else {
        return { background: this.colors[2], color: this.colors1[2] }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 60px 20px 20px 20px !important;
}
::v-deep .el-carousel__container {
  height: 100%;
}

.item1-container {
  display: flex;
  .item {
    flex: 1;
  }
}

.item1 {
  flex: 1;
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
    height: 790px;
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
      .lamp-container {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .lamp {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          margin-left: 8px;
          animation: fade 2s infinite;
        }
        .text {
          padding-right: 8px;
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
