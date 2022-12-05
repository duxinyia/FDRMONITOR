<template>
  <!-- aa 详情弹框 -->
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :before-close="toClose"
    :close-on-click-modal="false"
    width="51%"
  >
    <div class="detail-container">
      <dv-border-box-11 :title="machineName" :key="Date.now()">
        <!-- 返回按钮 -->
        <svg-icon class="closeIcon" icon-class="close" @click="toClose" />
        <div class="card-container">
          <div class="every-card" v-for="item in threeInfo" :key="item.date">
            <div class="date">{{ item.date || "无" }}</div>
            <div class="machine">
              <span class="text-justify te-indent">機種</span>
              :&nbsp;{{ item.deviceNo || "无" }}
            </div>
            <div class="combination">
              <span class="text-justify te-indent">組合</span>:&nbsp;
              <span class="config">{{ item.config || "无" }}</span>
            </div>
            <div class="planout">
              <span class="text-justify te-indent">計劃產出</span>
              :&nbsp;{{ item.planOut || "无" }}
            </div>
            <div class="actualout">
              <span class="text-justify te-indent">實際產出</span>
              :&nbsp;{{ item.actualOut || "无" }}
            </div>
            <div class="yieldrate">
              <span class="text-justify te-indent">達成率</span>
              :&nbsp;{{ item.hitRate || "无" }}
            </div>
            <div class="efficiency">
              <span class="text-justify te-indent">效率</span>
              :&nbsp;{{ item.efficiency.efficiency }}
            </div>
            <div class="firstYield">
              <span class="text-justify te-indent">一次良率</span>
              :&nbsp;{{ item.firstYield }}
            </div>
            <div class="efficiencyloss">
              <span class="text-justify">效率損失</span>:
            </div>
            <template v-if="Object.keys(item.mapYieldLoss).length > 0">
              <div
                v-for="(eff, index) in item.efficiencyLoss"
                :key="eff.rejectType"
                class="eff-yiel-container"
              >
                <span class="mr-auto te-indent">{{ index + 1 }}.{{ eff.errormsg }}</span>
                <span>{{ eff.rate }}</span>
              </div>
            </template>
            <template v-else>
              <div class="te-indent">暂无</div>
            </template>
            <div class="yieldloss">
              <span class="text-justify">良率損失</span>:
            </div>
            <template v-if="Object.keys(item.mapYieldLoss).length > 0">
              <div
                v-for="(yiel, index) in item.mapYieldLoss"
                :key="yiel.rejectType"
                class="eff-yiel-container"
              >
                <span class="mr-auto te-indent">{{ index + 1 }}.{{ yiel.rejectType }}</span>
                <span>{{ yiel.totalRate }}</span>
              </div>
            </template>
            <template v-else>
              <div class="te-indent">暂无</div>
            </template>
          </div>
        </div>

        <div class="state-container">
          <!-- 每个条的名称 -->
          <div class="name-container">
            <span v-for="item in ['Stn1:', 'Stn2:', 'Stn3:', 'Stn4:']" :key="item">{{ item }}</span>
          </div>
          <!-- 生成对应的时间 -->
          <div class="times-container">
            <span class="time" v-for="(item, index) in timeNums" :key="item + index">{{ item }}</span>
          </div>
          <!-- 生成对应的时间刻度 -->
          <div class="time-scale">
            <span v-for="item in 25" :key="item" class="scale"></span>
          </div>
          <!-- 生成四个条，用于显示不同的颜色 -->
          <div v-for="(value, key) in allShowData" :key="key" class="state">
            <!-- 循环数组，生成不同的span -->
            <el-tooltip placement="top" v-for="item in value" :key="item.starttime">
              <div slot="content">
                狀態:
                <span
                  class="stateDot"
                  :style="{
                    color:
                      item.runstate == 'RUN' ? 'rgba(51, 255, 102, 0.8)' : 'rgba(255, 0, 51, 0.5)'
                  }"
                >{{ item.runstate }}</span>
                <br />
                <br />
                開始時間:{{ item.starttime }}
                <br />
                <br />
                結束時間:{{ item.endtime }}
              </div>
              <span class="every-time" :style="itemStyle(item)"></span>
            </el-tooltip>
          </div>
        </div>
      </dv-border-box-11>
    </div>
  </el-dialog>
</template>

<script>
// 获取block的详细信息
import { getMachineThreeInfo, getMachineHeadRunInfos } from "@/api/aa.js"
export default {
  name: "detail-dialog",
  props: {
    // 弹框标题
    machineName: {
      type: String,
      default: "标题"
    },
    // 弹框是否可见
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      threeInfo: [],
      allShowData: {},
      timeNums: [
        "6:00",
        "8:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
        "22:00",
        "24:00",
        "2:00",
        "4:00",
        "6:00"
      ]
    }
  },
  methods: {
    // 获取数据
    async getData(ip) {
      let requestArr = [this.getMachineThreeInfo(ip), this.getMachineHeadRunInfos(ip)]
      await Promise.all(requestArr)
      // 发射事件，打开弹框
      this.$emit("update:dialogVisible", true)
      this.$emit("getDetailSuccess")
    },
    // 三天的数据 一天一个card
    async getMachineThreeInfo(ip) {
      this.threeInfo = await getMachineThreeInfo(ip)
    },
    // 下方的数据
    async getMachineHeadRunInfos(ip) {
      this.allShowData = await getMachineHeadRunInfos(ip)
    },
    itemStyle(item) {
      let bgColor = item.runstate == "Stop" ? "rgba(255, 0, 51, 0.5)" : "rgba(51, 255, 102, 0.8)"
      let width = (Number(item.keeptime) / 90).toFixed(2)
      return {
        background: bgColor,
        width: `${width}px`
      }
    },
    // 关闭弹框
    toClose() {
      this.$emit("update:dialogVisible", false)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__header {
  display: none;
}
::v-deep .el-dialog__body {
  padding: 0px;
  background: #00132a;
  min-width: 1000px;
}
::v-deep .border-box-content {
  padding: 50px 20px 20px 20px;
}
::v-deep .dv-border-box-11-title {
  font-size: 16px !important;
  font-weight: normal !important;
}

.detail-container {
  width: 1000px;
  .closeIcon {
    position: absolute;
    right: 18px;
    top: 30px;
    width: 30px;
    height: 30px;
    color: #2d66e2;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      transform: rotate(90deg);
    }
  }
  .card-container {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    margin: 5px 5px;
    .every-card {
      width: 330px;
      padding: 10px;
      line-height: 20px;
      color: rgb(243, 229, 229);
      border-radius: 5px;
      margin-right: 10px;
      background: rgba(53, 79, 173, 0.3);
      .date {
        color: #adff2f;
        font-size: 15px;
      }
      &:last-child {
        margin-right: 0;
      }
      .efficiencyloss {
        font-weight: bold;
      }
      .yieldloss {
        @extend .efficiencyloss;
      }
      .eff-yiel-container {
        display: flex;
        .mr-auto {
          margin-right: auto;
        }
      }
      .text-justify {
        display: inline-block;
        width: 25%;
        text-align-last: justify;
      }
      .te-indent {
        text-indent: 16px;
      }
      .combination {
        display: flex;
        word-break: break-all;
        flex-wrap: wrap;
        .config {
          flex: 1;
          height: 42px;
        }
      }
    }
  }
  .state-container {
    background: rgba(53, 79, 173, 0.3);
    position: relative;
    margin: 0 0 20px 30px;
    padding-bottom: 10px;
    border-left: 1px solid #eeee00;
    border-bottom: 1px solid #eeee00;
    .name-container {
      position: absolute;
      left: -40px;
      top: 0px;
      display: flex;
      flex-direction: column;
      color: aqua;
      span {
        margin-bottom: 22px;
      }
    }
    .times-container {
      width: 101%;
      position: absolute;
      left: -7px;
      bottom: -30px;
      color: aquamarine;
      display: flex;
      justify-content: space-between;
    }
    .time-scale {
      width: 100%;
      position: absolute;
      left: 0px;
      bottom: -7px;
      display: flex;
      justify-content: space-between;
      .scale {
        display: inline-block;
        width: 2px;
        height: 5px;
        background: #fff;
      }
    }
    .state {
      margin-top: 20px;
      display: flex;
      background: rgba(199, 199, 199, 0.6);
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      .every-time {
        display: inline-block;
        height: 20px;
        &:last-child {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
    }
  }
}
</style>
