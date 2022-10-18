<template>
  <div>
    <page-header title="九宮格產出看板" />
    <dv-border-box-12>
      <!-- 自定义两个切换按钮 -->
      <div class="btns">
        <span class="left-icon-container" @click="toLeft">
          <i class="iconfont icon-shangyiye icon2"></i>
          <i class="iconfont icon-shangyiye icon1"></i>
          <i class="iconfont icon-shangyiye icon"></i>
        </span>
        <span @click="toRight">
          <i class="iconfont icon-xiayiye icon"></i>
          <i class="iconfont icon-xiayiye icon1"></i>
          <i class="iconfont icon-xiayiye icon2"></i>
        </span>
      </div>
      <div class="select-container">
        <el-select v-model="selectArea" placeholder="请选择" @change="changeArea">
          <el-option
            v-for="item in areas"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <!-- 主要区域 -->
      <div class="page-main">
        <!-- 用轮播图显示 -->
        <el-carousel
          ref="carousel"
          :autoplay="false"
          height="880px"
          :interval="5000"
          indicator-position="none"
        >
          <el-carousel-item v-for="(everyArr, index) in getShowArray" :key="index">
            <div class="contaner">
              <div
                v-for="(item, index) in everyArr"
                :style="changeEveryStyle()"
                class="item"
                :key="index"
              >
                <p class="title">{{ item.deviceInfo.customName }}</p>
                <el-row :gutter="6" class="headers">
                  <el-col :span="3">WIP</el-col>
                  <el-col :span="3" :offset="12">IO</el-col>
                  <el-col :span="3">Hit Rate</el-col>
                  <el-col :span="3">Yield</el-col>
                </el-row>
                <div class="wrapper-container">
                  <el-row
                    v-for="(item, index) in item.stationInfo"
                    type="flex"
                    align="middle"
                    :gutter="6"
                    :key="index"
                    class="data-info"
                  >
                    <el-col :span="2" class="wip-num">{{ item.wip || "-" }}</el-col>
                    <el-col :span="5">
                      <dv-percent-pond :config="percentConfig" class="percent-pond" />
                    </el-col>
                    <el-col :span="8">
                      <div class="battery">
                        <span class="name">{{ item.station }}</span>
                        <div class="container">
                          <!-- 中间区域 -->
                          <div class="center" :style="changeCenterStyle(item)">
                            {{ item.outPut }}
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="3">{{ item.targetOut || "-" }}</el-col>
                    <el-col :span="3">{{ item.hitRate || "-" }}</el-col>
                    <el-col :span="3">{{ item.overallYield || "-" }}</el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </dv-border-box-12>
  </div>
</template>

<script>
// 导入头部
import PageHeader from "@/components/page-header/index.vue"
// 导入发送请求的函数
import { GetKeyStationRunningInfo } from "@/api/output2.js"
// 导入对应的分割函数
import { splitArray } from "@/utils"
export default {
  name: "output2",
  components: {
    PageHeader
  },
  data() {
    return {
      // dataV中的进度池的config
      percentConfig: {
        value: 56,
        formatter: "",
        borderRadius: 1,
        lineDash: [2, 2],
        borderWidth: 1
      },
      dataTiming: null,
      showData: [],
      areas: [
        {
          value: "ALL",
          label: "全部"
        },
        {
          value: "FOL",
          label: "FOL"
        },
        {
          value: "EOL",
          label: "EOL"
        }
      ],
      selectArea: "ALL",
      isLessSplit: false
    }
  },
  computed: {
    getShowArray() {
      let splitNum = this.isLessSplit ? 3 : 6
      return splitArray(this.showData, splitNum)
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_FULLLOADING", true)
    this.initData()
    // 每5分钟获取一次数据
    this.dataTiming = setInterval(() => {
      this.initData()
    }, 3 * 60 * 1000)
  },
  methods: {
    async initData() {
      let requestArr = [this.GetKeyStationRunningInfo()]
      await Promise.all(requestArr)
      this.$store.commit("fullLoading/SET_FULLLOADING", false)
    },
    async GetKeyStationRunningInfo() {
      this.isLessSplit = false
      this.showData = await GetKeyStationRunningInfo(this.selectArea)
      if (this.showData.findIndex((item) => item.stationInfo.length > 10) >= 0) {
        this.isLessSplit = true
      }
      // 所有的值都跟 showData 的 length有关系
      console.log("this.showData", this.showData)
    },
    changeArea() {
      this.$store.commit("fullLoading/SET_FULLLOADING", true)
      this.GetKeyStationRunningInfo().then(() => {
        this.$store.commit("fullLoading/SET_FULLLOADING", false)
      })
    },
    changeEveryStyle() {
      // 如果是分割成6块的
      if (!this.isLessSplit) {
        return {
          height: "48%"
        }
      }
    },
    changeCenterStyle(item) {
      // console.log("item", item)
      let result = parseInt(item.hitRate)
      if (result > 100) {
        return {
          width: "100%",
          background:
            "linear-gradient(to right,rgba(153, 102, 255, 0.3) 10%,rgba(153, 102, 255, 0.6) 50%,rgba(153, 102, 255, 0.9) 100%)"
        }
      }
      return {
        width: `${result}%`
      }
    },
    toLeft() {
      this.$refs["carousel"].prev()
    },
    toRight() {
      this.$refs["carousel"].next()
    }
  },
  beforeDestroy() {
    clearInterval(this.dataTiming)
  }
}
</script>

<style>
.el-select-dropdown {
  background: #00132a !important;
  color: #fff;
  border: 1px solid #0a4d6e;
}
.el-select-dropdown__item.hover {
  background: #0a4d6e;
  color: #fff;
}
</style>
<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
}
::v-deep .el-input__inner {
  background: rgba(10, 77, 110, 0.6);
  color: #fff;
  border: 1px solid #0a4d6e;
}
::v-deep .el-select:hover .el-input__inner {
  border-color: #0a4d6e;
}
::v-deep .el-input {
  width: 100px;
}

.page-main {
  font-size: 16px;
}

.contaner {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .item {
    width: 600px;
    height: 100%;
    padding: 4px 6px 4px 6px;
    border: 1px solid #2f5e75;
    .title {
      font-size: 23px;
      font-weight: bold;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    .headers {
      .el-col {
        font-size: 17px;
        color: #3be8ea;
        font-weight: bold;
      }
    }
    .wrapper-container {
      height: calc(100% - 54px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .data-info {
        vertical-align: middle;
        margin-bottom: 5px;
      }
    }
  }
}
.percent-pond {
  width: 100px;
  height: 25px;
}
.btns {
  span {
    position: absolute;
    width: 120px;
    height: 50px;
    text-align: center;
    animation: twinkle 2s infinite;
    cursor: pointer;
    &:nth-child(1) {
      left: 10px;
      top: 20px;
    }
    &:nth-child(2) {
      right: 10px;
      top: 20px;
    }
    .icon {
      font-weight: bold;
      font-size: 25px;
      color: rgba(89, 113, 197, 0.6);
    }
    .icon1 {
      font-weight: bold;
      font-size: 25px;
      color: rgba(89, 113, 197, 0.8);
    }
    .icon2 {
      font-weight: 800;
      font-size: 25px;
      color: rgba(89, 113, 197, 1);
    }
  }
}
.select-container {
  display: flex;
  .el-select {
    margin: -7px 120px 7px auto;
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
  }
  .container {
    width: 110px;
    height: 100%;
    display: flex;
    align-items: center;
    background: #093f65;
    border: 1px solid #1694ed;
    .center {
      width: 50%;
      height: 80%;
      background: linear-gradient(
        to right,
        rgba(34, 177, 249, 0.3) 10%,
        rgba(34, 177, 249, 0.6) 50%,
        rgba(34, 177, 249, 0.9) 100%
      );
    }
  }
}
@keyframes twinkle {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  to {
    opacity: 1;
  }
}
</style>
