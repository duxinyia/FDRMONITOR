<template>
  <div
    v-loading="isLoading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="加载中"
    element-loading-background="rgba(0, 0, 0, 1)"
  >
    <span class="title">{{ title }}</span>
    <div class="container">
      <el-tooltip v-for="(item, index) in config" :key="index" placement="bottom">
        <div slot="content">
          <div class="tootip-container">
            <div class="header">
              <span v-for="item in ['機台名稱', '比率', '持續時間']" :key="item" class="header-item">{{ item }}</span>
            </div>
            <div v-for="machine in item.machines" :key="machine.machinename" class="machine-info">
              <span>{{ machine.machinename }}</span>
              <span>{{ machine.rate }}</span>
              <span>{{ (machine.keeptime / 60).toFixed(2) }}</span>
            </div>
          </div>
        </div>
        <div class="item-wrapper">
          <!-- 左边 -->
          <div class="top">
            <span class="ranking-number" :style="specialSty(index)">No.{{ index + 1 }}</span>
            <span class="ranking-title">{{ item.name }}</span>
            <span class="keeptime">{{ (item.keeptime / 60).toFixed(0) }}&nbsp;Min</span>
          </div>
          <div class="bottom">
            <dv-percent-pond :config="lastConfig(item.value, index)" class="dv-pond" style />
          </div>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
export default {
  name: "table-chart",
  props: {
    title: {
      type: String,
      default: "默认标题"
    },
    config: {}
  },
  data() {
    return {
      baseConfig: {
        borderWidth: 0,
        formatter: "",
        lineDash: [4, 2]
      },
      isLoading: true
    }
  },
  watch: {
    config: {
      handler() {
        this.isLoading = false
      }
    }
  },
  methods: {
    lastConfig(value, index) {
      let lastConfig = { ...this.baseConfig, value }
      if (this.$store.getters.theme == "dark") {
        if (index == 0) {
          lastConfig.colors = ["rgba(255, 0, 0,0.1)", "#ff0033"]
        } else if (index == 1) {
          lastConfig.colors = ["rgba(241, 196, 15,0.6)", "#f1c40f"]
        } else {
          lastConfig.colors = ["rgba(0, 186, 255, 0.6)", "#00baff"]
        }
      } else {
        lastConfig.colors = ["rgb(0, 227, 210)", "rgb(63, 119, 232)"]
      }
      return lastConfig
    },
    specialSty(index) {
      // 红 黄 灰
      // let bgColor = index == 0 ? "#e74c3c" : index == 1 ? "#f1c40f" : "#bdc3c7"
      if (this.$store.getters.theme == "dark") {
        if (index == 0) {
          return {
            color: "#e74c3c",
            fontSize: "16px",
            fontWeight: 800
          }
        } else if (index == 1) {
          return {
            color: "#f1c40f",
            fontSize: "16px",
            fontWeight: 800
          }
        } else {
          return {
            color: "#bdc3c7"
          }
        }
      } else {
        return {
          fontWeight: 800,
          color: "rgba(63, 119, 232, 1)"
        }
      }
    }
  }
}
</script>
<style>
.el-tooltip__popper {
  padding: 4px;
}
</style>
<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  font-size: 20px;
  line-height: 1em;
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--chart-title);
  &::before {
    content: "";
    display: inline-block;
    margin-right: 5px;
    width: 4px;
    height: 0.9em;
    line-height: 0.9em;
    border-radius: 2px;
    background: var(--chart-slip);
  }
}
.tootip-container {
  width: 180px;
  line-height: 2em;
  text-align: center;
  font-size: 14px;
  .header {
    display: flex;
    padding: 0 4px;
    background: #20316e;
    .header-item {
      flex: 1;
    }
  }
  .machine-info {
    display: flex;
    padding: 0 4px;
    &:nth-child(2n) {
      background: #003b51;
    }
    &:nth-child(2n + 1) {
      background: #0a2732;
    }
    span {
      flex: 1;
    }
  }
}
.container {
  width: 100%;
  height: 250px;
  font-size: 15px;
  .item-wrapper {
    height: 52px;
    .top {
      display: flex;
      .ranking-title {
        padding-left: 10px;
        margin-right: auto;
        color: var(--base-text-color);
      }
      .keeptime {
        color: var(--base-text-color);
      }
    }
    .bottom {
      .dv-pond {
        width: 100%;
        height: 16px;
        padding-bottom: 2px;
        border-bottom: 2px solid rgba(19, 112, 251, 0.5);
      }
    }
  }
}
</style>
