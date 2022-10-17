<template>
  <div>
    <span class="title">{{ title }}</span>
    <div class="container">
      <el-tooltip v-for="(item, index) in config" :key="index" placement="right">
        <div slot="content">
          <!-- 多行信息<br />第二行信息 -->
          <div class="tootip-container">
            <div class="header">
              <span
                v-for="item in ['機台名稱', '比率', '持續時間']"
                :key="item"
                class="header-item"
                >{{ item }}</span
              >
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
            <dv-percent-pond :config="lastConfig(item.value, index)" class="dv-pond" style="" />
          </div>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
// 到入深拷贝函数
// import { deepClone } from "@/utils"
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
      }
    }
  },
  methods: {
    lastConfig(value, index) {
      let lastConfig = { ...this.baseConfig, value }
      if (index == 0) {
        lastConfig.colors = ["rgba(255, 0, 0,0.6)", "#ff0033"]
      } else if (index == 1) {
        lastConfig.colors = ["rgba(241, 196, 15,0.6)", "#f1c40f"]
      } else {
        lastConfig.colors = ["rgba(0, 186, 255, 0.6)", "#00baff"]
      }
      return lastConfig
    },
    specialSty(index) {
      // 红 黄 灰
      // let bgColor = index == 0 ? "#e74c3c" : index == 1 ? "#f1c40f" : "#bdc3c7"
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.title {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 5px;
  color: $title-color;
  padding-left: 5px;
  border-left: 4px solid #bb98fa;
}

.tootip-container {
  width: 180px;
  line-height: 2;
  text-align: center;
  .header {
    display: flex;
    border: 1px solid #fff;
    .header-item {
      flex: 1;
    }
  }
  .machine-info {
    display: flex;
    border-bottom: 1px solid #fff;
    border-right: 1px solid #fff;
    border-left: 1px solid #fff;
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
