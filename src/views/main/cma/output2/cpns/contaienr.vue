<template>
  <div
    class="machine"
    v-loading="loading"
    element-loading-text="加载中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="#111e40"
  >
    <p class="title">{{ itemTitle.customName }}</p>
    <el-row :gutter="6" class="headers">
      <el-col :span="3">WIP</el-col>
      <el-col :span="4" :offset="4">Station</el-col>
      <el-col :span="4">Output</el-col>
      <el-col :span="3">IO</el-col>
      <el-col :span="3">Hit Rate</el-col>
      <el-col :span="3">Yield</el-col>
    </el-row>
    <div class="wrapper-container">
      <el-row
        v-for="(item, i) in showData"
        type="flex"
        align="middle"
        :gutter="6"
        :key="i"
        class="data-info"
      >
        <el-col :span="2" class="wip-num">{{ item.wip || 0 }}</el-col>

        <el-col :span="5">
          <el-tooltip effect="dark" placement="right">
            <div slot="content">
              <span>上限WIP: {{ item.maxWip }}</span>
              <br />
              <br />
              <span>下限WIP: {{ item.minWip }}</span>
            </div>
            <div>
              <dv-percent-pond :config="changeConfig(item)" class="percent-pond" />
            </div>
          </el-tooltip>
        </el-col>

        <el-col :span="8">
          <div class="battery">
            <el-tooltip effect="dark" :content="item.station" placement="bottom">
              <span class="name">{{ item.station }}</span>
            </el-tooltip>
            <el-tooltip effect="dark" placement="right">
              <div slot="content">
                <span>實際產出: {{ item.outPut }}</span>
                <br />
                <br />
                <span>計劃產出: {{ item.targetOut }}</span>
                <br />
                <br />
                <span>差異產出: {{ item.outPut - item.targetOut }}</span>
              </div>
              <div class="container" :style="changeContainerStyle(item)">
                <div class="center" :style="changeCenterStyle(item)">{{ item.outPut }}</div>
              </div>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="3">{{ item.targetOut || "-" }}</el-col>
        <el-col :span="3">
          {{ item.hitRate ? parseInt(item.hitRate) + "%" : "-" }}
        </el-col>
        <el-col :span="3">{{ parseInt(item.overallYield) + "%" || "-" }}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "contaienr",
  props: ["itemTitle", "showData", "index"],
  data() {
    return {
      loading: true,
      colors1: ["rgba(255, 0, 102, 0.9)", "rgba(0, 255, 0, 0.9)", "rgba(255, 255, 0, 0.9)"],
      colors: [
        "radial-gradient(50% 50%, rgba(255, 0, 102, 0.5) 50%, rgba(255, 0, 102, 1) 100%)",
        "radial-gradient(50% 50%, rgba(0, 255, 0, 0.5) 50%, rgba(0, 255, 0, 1) 100%)",
        "radial-gradient(50% 50%, rgba(255, 255, 0, 0.5) 50%, rgba(255, 255, 0, 1) 100%)"
      ]
    }
  },
  watch: {
    showData: {
      handler() {
        this.loading = false
      }
    }
  },
  methods: {
    changeContainerStyle(item) {
      let borderColor =
        item.wip > item.maxWip
          ? "rgba(0, 176, 80, 0.9)"
          : item.wip < item.minWip
          ? "rgba(255, 0, 0, 0.9)"
          : "#1694ed"
      if (parseInt(item.hitRate)) {
        return {
          border: `1px solid ${borderColor}`
        }
      }
      return { border: `1px solid #1694ed` }
    },
    changeCenterStyle(item) {
      // wip > targetOut 亮绿色 wip < targetOut 亮红色
      //  数字
      let result = parseInt(item.hitRate)
      if (item.targetOut == 0) {
        result = 0
      }
      let bgs = [
        "linear-gradient(to right,rgba(0, 176, 80, 0.3) 10%,rgba(0, 176, 80, 0.6) 50%,rgba(0, 176, 80, 0.9) 100%)",
        "linear-gradient(to right,rgba(255, 0, 0, 0.3) 10%,rgba(255, 0, 0, 0.6) 50%,rgba(255, 0, 0, 0.9) 100%)",
        "linear-gradient(to right,rgba(153, 102, 255, 0.3) 10%,rgba(153, 102, 255, 0.6) 50%,rgba(153, 102, 255, 0.9) 100%)"
      ]
      let bg = item.wip > item.maxWip ? bgs[0] : item.wip < item.minWip ? bgs[1] : bgs[2]

      if (result > 100) {
        return {
          width: "100%",
          background: bg
        }
      }
      return {
        width: `${result}%`,
        background: bg
      }
    },
    changeConfig(item) {
      console.log("item", item)
      // wip > targetOut 亮黄色 wip < targetOut 亮红色
      let showValue = 0
      if (item.wipRate) {
        // showValue = parseInt(item.wipRate) > 100 ? 100 : parseInt(item.wipRate)
        showValue = (item.wip / item.maxWip) * 100
        console.log(showValue)
      }
      let colors =
        item.wip > item.maxWip
          ? ["#ff0", "#ff0"]
          : item.wip < item.minWip
          ? ["#f00", "#f00"]
          : ["#3DE7C9", "#00BAFF"]
      if (item.wip && item.maxWip) {
        return {
          value: showValue,
          formatter: "",
          colors,
          borderRadius: 1,
          lineDash: [1, 1],
          borderWidth: 1,
          localGradient: false
        }
      }
      return {
        value: showValue,
        formatter: "",
        colors: ["#3DE7C9", "#00BAFF"],
        borderRadius: 1,
        lineDash: [1, 1],
        borderWidth: 1,
        localGradient: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-icon-loading {
  font-size: 25px;
}
.percent-pond {
  width: 100px !important;
  height: 25px !important;
}
.machine {
  height: 100%;
  padding: 4px 6px 4px 6px;
  border-radius: 8px;
  background: var(--output2-machine-bg);
  .title {
    font-size: 23px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .headers {
    margin-bottom: 5px;
    .el-col {
      font-size: 17px;
      color: var(--output2-header-item);
      font-weight: bold;
    }
  }
  .wrapper-container {
    height: 840px;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    border-top: 2px solid #436fbd;
    overflow: auto;
    .data-info {
      vertical-align: middle;
      margin-bottom: 16.5px;
    }
  }
}
.battery {
  width: 98%;
  height: 30px;
  display: flex;
  align-items: center;
  .name {
    width: 100px;
    overflow: hidden;
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .container {
    width: 110px;
    height: 100%;
    display: flex;
    align-items: center;
    .center {
      width: 50%;
      height: 80%;
      font-size: 14px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
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
