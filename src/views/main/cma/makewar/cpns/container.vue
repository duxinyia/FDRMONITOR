<template>
  <div class="wrapper">
    <dv-border-box-10>
      <p class="title">{{ device.customName }}</p>
      <div class="container">
        <div class="left">
          <span class="every-num" v-for="(item, index) in getShowArr" :key="index">{{ item }}</span>
        </div>
        <div class="right">
          <div v-for="(item, index) in dateValues" :key="index" class="item">
            <div class="text">
              <div class="middle">
                <el-tooltip class="item" effect="dark" placement="right">
                  <div slot="content">
                    1.計劃產出:{{ item.values.FOL.targetOut | filterTargetOut }}<br /><br />
                    2.實際產出:{{ item.values.FOL.output }}<br /><br />
                    3.達成比例:{{ changeReachRate(item) }}<br /><br />
                    4.差異產出:{{ Number(item.values.FOL.output - item.values.FOL.targetOut)
                    }}<br /><br />
                    5.差異原因:{{ "無" }}<br />
                  </div>

                  <div class="state-right state" :style="changeHeight(item)" v-if="folChecked">
                    <!-- 定位显示比例 -->
                    <span class="rate" v-if="folChecked">{{
                      item.values.FOL.hitRate | filterRate
                    }}</span>
                    <!-- 柱状图 -->
                    <span class="speed" :style="changeSpeed(item)"></span>
                  </div>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" placement="right">
                  <div slot="content">
                    1.計劃產出:{{ item.values.EOL.targetOut | filterTargetOut }}<br /><br />
                    2.實際產出:{{ item.values.EOL.output }}<br /><br />
                    3.達成比例:{{ changeReachRate(item, "EOL") }}<br /><br />
                    4.差異產出:{{ Number(item.values.EOL.output - item.values.EOL.targetOut)
                    }}<br /><br />
                    5.差異原因:{{ "無" }}<br />
                  </div>
                  <div
                    class="state-left state"
                    :style="changeHeight(item, 'EOL')"
                    v-if="eolChecked"
                  >
                    <!-- 定位显示 -->
                    <span class="rate" v-if="eolChecked">{{
                      item.values.EOL.hitRate | filterRate
                    }}</span>
                    <!-- 柱状图 -->
                    <span class="speed" :style="changeSpeed(item, 'EOL')"></span>
                  </div>
                </el-tooltip>
              </div>
              <div class="date">{{ item.dateCoode.slice(-5) }}</div>
            </div>
          </div>
        </div>
      </div>
    </dv-border-box-10>
  </div>
</template>

<script>
export default {
  name: "container",
  props: {
    device: {
      type: Object,
      default: () => ({})
    },
    dateValues: {
      type: Array,
      default: () => []
    },
    eolChecked: {
      type: Boolean,
      default: false
    },
    folChecked: {
      type: Boolean,
      default: false
    },
    maxOutput: {
      type: Number,
      default: 0
    },
    maxTargetOut: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      config: { value: 66, formatter: "" }
    }
  },
  computed: {
    // 获得左边要显示的四个数字
    getShowArr() {
      let lowNum = Math.floor(this.maxTargetOut / 4)
      return [
        Math.ceil(this.maxTargetOut).toLocaleString("en-US"),
        (lowNum * 3).toLocaleString("en-US"),
        (lowNum * 2).toLocaleString("en-US"),
        lowNum.toLocaleString("en-US"),
        0
      ]
    }
  },
  filters: {
    // 分割添加上%
    filterRate(value) {
      if (!value) return "0%"
      return value.split(".")[0] + "%"
    },
    // 去掉小数部分
    filterTargetOut(value) {
      if (!value) return "無"
      return parseInt(value)
    }
  },
  methods: {
    changeSpeed(item, name = "FOL") {
      let result = parseInt(this.changeReachRate(item, name))
      return {
        height: result > 100 ? "100%" : `${result}%`
      }
    },
    changeHeight(item, name = "FOL") {
      let height = ""
      if (item.values[name].targetOut == 0) {
        height = "150px"
      } else {
        height = `${(item.values[name].targetOut / this.maxTargetOut) * 150}px`
      }
      return {
        height
      }
    },
    changeReachRate(item, name = "FOL") {
      return Number((item.values[name].output / item.values[name].targetOut) * 100).toFixed(0) + "%"
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 10px;
}
.wrapper {
  width: 350px;
  font-size: 16px;
  padding: 6px 4px;
  .title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  .container {
    display: flex;
    .left {
      font-size: 13px;
      display: flex;
      flex-direction: column;
      margin-top: 18px;
      color: #69f9ff;
      .every-num {
        margin-bottom: 10px;
      }
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: space-around;
      .item {
        text-align: center;
        display: flex;
        .text {
          margin-top: auto;
          .middle {
            margin-top: 25px;
            display: flex;
            .state {
              margin: 0 auto;
              margin-top: auto;
              width: 30px;
              height: 150px;
              text-align: center;
              border: 1px solid #69f9ff;
              padding: 1px;
              transform: rotate(180deg);
              display: flex;
            }
            .state-left {
              position: relative;
              .rate {
                font-size: 12px;
                position: absolute;
                transform: rotate(180deg);
                bottom: -24px;
                left: 0px;
              }
              .speed {
                display: inline-block;
                width: 100%;
                background: linear-gradient(
                  to bottom,
                  rgba(105, 249, 255, 0.6) 40%,
                  rgba(105, 249, 255, 0.5) 70%,
                  rgba(105, 249, 255, 1) 100%
                );
              }
            }
            .state-right {
              margin-right: 12px;
              position: relative;
              .rate {
                font-size: 12px;
                position: absolute;
                transform: rotate(180deg);
                bottom: -24px;
                left: 0px;
              }
              .speed {
                display: inline-block;
                width: 100%;
                background: linear-gradient(
                  to bottom,
                  rgba(220, 145, 255, 0.6) 40%,
                  rgba(220, 145, 255, 0.8) 70%,
                  rgba(220, 145, 255, 1) 100%
                );
              }
            }
          }
          .date {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
