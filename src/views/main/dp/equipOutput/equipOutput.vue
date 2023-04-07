<template>
  <div class="page-main">
    <dv-border-box-12>
      <div>
        <div class="btns">
          <div class="left">
            <div class="select-input">
              <!-- :popper-append-to-body="false" -->
              <el-select
                :popper-append-to-body="false"
                v-model="value"
                filterable
                clearable
                placeholder="請選擇"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <!-- <div class="container" v-for="(item, index) in containerLeft" :key="index">
                <span
                  class="box box1"
                  @click="redirectPage(item)"
                  :style="{
                    'box-shadow': currentIndex == item.title ? `inset 0 0 20px ${item.color}` : '',
                    border: `2px solid ${item.color}`
                  }"
                ></span>
                <span class="name">{{ item.title }}</span>
              </div> -->
            </div>
          </div>
          <div class="right">
            <div class="control">
              <div class="container" v-for="(item, index) in containerRight" :key="index">
                <span class="box box2" :style="{ color: item }"></span>
                <span class="name">{{ index }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 主要区域 -->
        <div class="main">
          <div class="contaner">
            <!-- <p class="title">生產看板</p> -->
            <contaienr
              :resultvalue="showArr"
              :cIndex="currentIndex"
              :titleData="containerLeft"
              :newValue="value"
              @autoPlay="autoPlay"
            />
          </div>
        </div>
      </div>
    </dv-border-box-12>
  </div>
</template>
<script>
// 导入发送请求的函数
import { GetAaData } from "@/api/dp/equipOutput.js"
// 导入子组件
import Contaienr from "./cpns/contaienr.vue"
export default {
  name: "equipOutput",
  components: { Contaienr },
  data() {
    return {
      dataTiming: null,
      // pid: 0,
      // 当前选中
      currentIndex: "AA",
      // 左边颜色 inface:接口循环
      containerLeft: [
        { inface: "AA", title: "AA" },
        { inface: "DA", title: "DA" },
        { inface: "LA", title: "LA" },
        { inface: "GA", title: "GA" },
        { inface: "ALN", title: "ALN" },
        { inface: "NTC", title: "NTC" },
        { inface: "TerminalSoldering", title: "TS" },
        { inface: "ACF", title: "ACF" },
        { inface: "LaserFlipping", title: "LF" },
        { inface: "AVI", title: "AVI" },
        { inface: "SA", title: "SA" },
        { inface: "RXEOL", title: "RET" },
        { inface: "TXEOL", title: "TET" },
        { inface: "Compliance", title: "FTC" }
      ],
      // 右边颜色
      containerRight: {
        RUN: "rgba(0, 255, 0, 0.9)",
        DOWN: "rgba(255, 0, 102, 0.9)",
        IDLE: "rgba(255, 255, 0, 0.9)"
      },
      // 14个表格的数据
      showArr: {},
      // 下拉选择数据
      options: [
        { value: "TAA", label: "TAA" },
        { value: "RAA", label: "RAA" },
        { value: "DA/LA", label: "DA/LA" },
        { value: "ALN/NTC/GA", label: "ALN/NTC/GA" },
        { value: "TS", label: "TS" },
        { value: "ACF/LF/AVI", label: "ACF/LF/AVI" },
        { value: "SA", label: "SA" },
        { value: "RET", label: "RET" },
        { value: "TET", label: "TET" },
        { value: "FTC", label: "FTC" }
      ],
      value: ""
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "設備產出看板")
    this.initData()
    // 每1分钟获取一次数据
    this.dataTiming = setInterval(() => {
      this.initData()
    }, 60000)
  },
  computed: {},
  watch: {},
  methods: {
    initData() {
      // 循环调用接口
      this.containerLeft.forEach((key, i) => {
        this.getData(key.inface, key.title)
      })
    },
    // i是1代表上一页，2代表下一页
    // changeId(plid, i) {
    //   i === 1 ? (this.pid = plid - 1) : (this.pid = plid + 1)
    //   if (this.pid < 0) {
    //     this.pid = 13
    //   } else if (this.pid > 13) {
    //     this.pid = 0
    //   }
    // },
    //点击色块跳转
    // redirectPage(i) {
    //   this.currentIndex = i.title
    //   // console.log(i)
    //   this.pid = i.id
    // },
    // 自动播放时选中上面的颜色框
    autoPlay(index) {
      // this.currentIndex = this.containerLeft[index].title
      // this.pid = index
    },

    // 获取数据
    async getData(i, n) {
      let res = await GetAaData(i)
      res = Object.values(res)
      let newTAdata = []
      let newRAdata = []
      if (i === "AA") {
        res.forEach((value) => {
          if (value.machine.indexOf("TAA") != -1) {
            newTAdata.push(value)
            this.$set(this.showArr, "TAA", newTAdata)
          } else if (value.machine.indexOf("RAA") != -1) {
            newRAdata.push(value)
            this.$set(this.showArr, "RAA", newRAdata)
          }
        })
      } else {
        this.$set(this.showArr, n, res)
      }

      // console.log("showArr======", this.showArr)
      // console.log("res======", typeof res)
    }
  },
  beforeDestroy() {
    clearInterval(this.dataTiming)
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input--suffix .el-input__inner {
  background-color: rgba(0, 0, 0, 0.3);
  font-size: 16px;
  color: #fff;
  border-color: #409eff;
}
::v-deep .el-select-dropdown {
  background-color: #000c1a;
  .el-select-dropdown__item {
    color: #fff;
    // color: #243d97 !important;
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: #243d97;
  }
  .el-select-dropdown__item.selected {
    background-color: #243d97 !important;
  }
  .popper__arrow:after {
    border-bottom-color: #000c1a !important;
  }
}
::v-deep .border-box-content {
  // height: 890px;
  padding: 15px;
  position: relative;
}

.select-input {
  margin: 0px 0px 0px 20px;
  z-index: 200;
}

.contaner {
  // height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
}
.btns {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-bottom: 8px;
  .right {
    margin-right: 20px;
  }
  .right,
  .left {
    display: flex;
    .control {
      display: flex;
      align-items: center;
      .container {
        display: flex;
        align-items: center;
        .box {
          display: inline-block;
          width: 25px;
          height: 25px;
          margin-right: 6px;
          margin-top: -10px;
        }
        .box1 {
          // cursor: pointer;
        }
      }
      .box2 {
        animation: fade 2s infinite;
      }
      .box {
        margin: 0 20px;
      }
    }
  }
}

@keyframes fade {
  0% {
    box-shadow: inset 0 0 25px currentColor;
  }
  50% {
    box-shadow: inset 0 0 10px currentColor;
  }
  100% {
    box-shadow: inset 0 0 25px currentColor;
  }
}
</style>
