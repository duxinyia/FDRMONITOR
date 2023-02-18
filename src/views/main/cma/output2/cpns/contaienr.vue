<template>
  <div
    class="machine"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <p class="title">{{itemTitle.customName}}</p>
    <el-row :gutter="6" class="headers">
      <el-col :span="3">WIP</el-col>
      <el-col :span="3" :offset="12">IO</el-col>
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
              <span>上限WIP: {{ item.minWip }}</span>
              <br />
              <br />
              <span>下限WIP: {{ item.maxWip }}</span>
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
        <el-col :span="3">{{ item.hitRate || "-" }}</el-col>
        <el-col :span="3">{{ item.overallYield || "-" }}</el-col>
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
      loading: true
    }
  },
  watch: {
    showData: {
      handler(newValue) {
        this.loading = false
      }
    }
  },
  methods: {
    changeContainerStyle(item) {
      let borders = this.$store.getters.theme == "dark" ? "#1694ed" : "#fff"
      let bgs = this.$store.getters.theme == "dark" ? "#093f65" : "transparent"
      return {
        border: `1px solid ${borders}`,
        background: bgs
      }
    },
    changeCenterStyle(item) {
      //  数字
      let result = parseInt(item.hitRate)
      if (item.targetOut == 0) {
        result = 0
      }
      let bgs0 = [
        "linear-gradient(to right,rgba(153, 102, 255, 0.3) 10%,rgba(153, 102, 255, 0.6) 50%,rgba(153, 102, 255, 0.9) 100%)",
        "linear-gradient(270deg, rgba(45, 60, 128, 1) 0%, rgba(39, 75, 232, 1) 100%)"
      ]
      let bgs1 = [
        "linear-gradient(tot right,rgba(34, 177, 249, 0.3) 10%,rgba(34, 177, 249, 0.6) 50%,rgba(34, 177, 249, 0.9) 100%)",
        "linear-gradient(270deg, rgba(222, 184, 47, 1) 0%, rgba(255, 140, 26, 1) 100%)"
      ]

      if (result > 100) {
        return {
          width: "100%",
          background: this.$store.getters.theme == "dark" ? bgs0[0] : bgs0[1]
        }
      }
      return {
        width: `${result}%`,
        background: this.$store.getters.theme == "dark" ? bgs0[0] : bgs1[1]
      }
    },
    changeConfig(item) {
      let showValue = 0
      if (item.wipRate) {
        showValue = parseInt(item.wipRate) > 100 ? 100 : parseInt(item.wipRate)
      }
      let colors =
        this.$store.getters.theme == "dark"
          ? ["#3DE7C9", "#00BAFF"]
          : ["rgba(13, 207, 255, 1)", "rgba(22, 43, 224, 1)"]
      let lineDashs = this.$store.getters.theme == "dark" ? [2, 2] : [2, 0]
      return {
        value: showValue,
        formatter: "",
        colors,
        borderRadius: 1,
        lineDash: lineDashs,
        borderWidth: 1,
        localGradient: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.percent-pond {
  width: 100px !important;
  height: 25px !important;
}
.machine {
  width: 600px;
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
</style>
