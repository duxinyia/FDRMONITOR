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
                    1.計劃產出:{{ item.values.FOL.targetOut | filterTargetOut }}
                    <br />
                    <br />
                    2.實際產出:{{ item.values.FOL.output }}
                    <br />
                    <br />
                    3.達成比例:{{ item.values.FOL.dailyHitRate }}
                    <br />
                    <br />
                    <!-- 3.達成比例:{{ changeReachRate(item) }}<br /><br /> -->
                    4.差異產出:{{ Number(item.values.FOL.output - item.values.FOL.targetOut)
                    }}
                    <br />
                    <br />
                    5.差異原因:{{ "無" }}
                    <br />
                  </div>
                  <div
                    @click="toMake('FOL', item)"
                    class="state-right state"
                    :style="changeHeight(item)"
                    v-if="folChecked"
                  >
                    <!-- 定位显示比例 10 / 21改为显示 dailyHitRate-->
                    <!-- <span class="rate" v-if="folChecked">{{
                      item.values.FOL.hitRate | filterRate
                    }}</span>-->
                    <span class="rate" v-if="folChecked">
                      {{
                      item.values.FOL.hitRate ? parseInt(item.values.FOL.hitRate) + "%" : "0%"
                      }}
                    </span>
                    <!-- 柱状图 -->
                    <span class="speed" :style="changeSpeed(item)"></span>
                  </div>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" placement="right">
                  <div slot="content">
                    1.計劃產出:{{ item.values.EOL.targetOut | filterTargetOut }}
                    <br />
                    <br />
                    2.實際產出:{{ item.values.EOL.output }}
                    <br />
                    <br />
                    3.達成比例:{{ item.values.EOL.dailyHitRate }}
                    <br />
                    <br />
                    <!-- 3.達成比例:{{ changeReachRate(item, "EOL") }}<br /><br /> -->
                    4.差異產出:{{ Number(item.values.EOL.output - item.values.EOL.targetOut)
                    }}
                    <br />
                    <br />
                    5.差異原因:{{ "無" }}
                    <br />
                  </div>
                  <div
                    @click="toMake('EOL', item)"
                    class="state-left state"
                    :style="changeHeight(item, 'EOL')"
                    v-if="eolChecked"
                  >
                    <!-- 定位显示 -->
                    <!-- <span class="rate" v-if="eolChecked">{{
                      item.values.EOL.hitRate | filterRate
                    }}</span>-->
                    <span class="rate" v-if="eolChecked">
                      {{
                      item.values.EOL.hitRate ? parseInt(item.values.EOL.hitRate) + "%" : "0%"
                      }}
                    </span>
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
    // 去掉小数部分
    filterTargetOut(value) {
      if (!value) return "無"
      return parseInt(value)
    }
  },
  methods: {
    changeSpeed(item, name = "FOL") {
      // console.log("item=====", item)
      let result = ""
      // 110以上 深绿 100-108 浅绿 100 以下 黄色
      // 判断是否是当天的数据
      if (this.$moment().format("YYYY-MM-DD").includes(item.dateCoode)) {
        result = item.values[name].hitRate ? parseInt(item.values[name].hitRate) : 0
      } else {
        result = item.values[name].dailyHitRate ? parseInt(item.values[name].dailyHitRate) : 0
      }
      let bgColor = ""
      if (result > 110) {
        // 深绿
        bgColor = `linear-gradient(
                  to bottom,
                  rgba(0, 255, 0, 0.5) 40%,
                  rgba(0, 255, 0, 0.7) 70%,
                  rgba(0, 255, 0, 1) 100%
                )`
      } else if (result >= 100) {
        // 浅绿
        bgColor = `linear-gradient(
                  to bottom,
                  rgba(51, 255, 153, 0.5) 40%,
                  rgba(51, 255, 153, 0.7) 70%,
                  rgba(51, 255, 153, 1) 100%
                )`
      } else {
        // 紫色
        bgColor = `linear-gradient(
                  to bottom,
                  rgba(255, 182, 30, 0.5) 40%,
                  rgba(255, 182, 30, 0.7) 70%,
                  rgba(255, 182, 30, 1) 100%
                )`
      }
      return {
        height: result > 100 ? "100%" : `${result}%`,
        background: bgColor
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
    toMake(ProductArea, item) {
      // console.log(ProductArea, item)
      let { deviceNo, plantID, customName, Opno } = this.device
      this.$router.push({
        name: "make",
        params: {
          deviceNo,
          plantID,
          ProductArea,
          Opno,
          customName,
          preTime: `${item.dateCoode}`
        }
      })
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
    height: calc(100% - 24px);
    display: flex;
    .left {
      font-size: 13px;
      display: flex;
      flex-direction: column;
      margin-top: 18px;
      color: #69f9ff;
      .every-num {
        margin-bottom: 15px;

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
            margin: 0 auto;
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
              cursor: pointer;
            }
            .state-left {
              position: relative;
              .rate {
                font-size: 13px;
                font-weight: bold;
                position: absolute;
                transform: rotate(180deg);
                bottom: -24px;
                left: 0px;
              }
              .speed {
                display: inline-block;
                width: 100%;
              }
            }
            .state-right {
              margin-right: 12px;
              position: relative;
              .rate {
                font-size: 13px;
                font-weight: bold;
                position: absolute;
                transform: rotate(180deg);
                bottom: -24px;
                left: 0px;
              }
              .speed {
                display: inline-block;
                width: 100%;
              }
            }
          }
          .date {
            margin-top: 4px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
