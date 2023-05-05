<template>
  <div class="page-main">
    <dv-border-box-12>
      <!-- 主要区域 -->
      <div class="main">
        <el-carousel
          ref="carousel"
          :autoplay="false"
          height="880px"
          :interval="5000"
          arrow="never"
          indicator-position="none"
        >
          <el-carousel-item v-for="(everyTitle, index) in getShowArray" :key="index">
            <div class="contaner">
              <contaienr
                v-for="(item, i) in everyTitle"
                :index="i"
                :itemTitle="item"
                :showData="newData[3 * index + i]"
                :key="i"
              />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="control">
        <div class="fol-container container">
          <span
            class="fol-box"
            @click="changeIndex(1)"
            :style="{
              'box-shadow': currentIndex == 1 ? 'inset 0 0 20px #c987ed' : ''
            }"
          ></span>
          <span class="name">FOL</span>
        </div>
        <div class="eol-container container">
          <span
            class="eol-box"
            @click="changeIndex(2)"
            :style="{
              'box-shadow': currentIndex == 2 ? 'inset 0 0 20px #58d5e0' : ''
            }"
          ></span>
          <span class="name">EOL</span>
        </div>
        <div class="all-container container">
          <span
            class="all-box"
            @click="changeIndex(3)"
            :style="{
              'box-shadow': currentIndex == 3 ? 'inset 0 0 20px #fbeeca' : ''
            }"
          ></span>
          <span class="name">ALL</span>
        </div>
      </div>
      <change-switch
        :leftConfig="{ left: '0px', top: '15px' }"
        :rightConfig="{ right: '0px', top: '15px' }"
        @directionChange="handleDirection"
      />
    </dv-border-box-12>
  </div>
</template>
<script>
// 导入发送请求的函数
import { GetStationName, GetDeviceInfo } from "@/api/cma/output2.js"
// 导入对应的分割函数
import { splitArray } from "@/utils"
// 导入子组件
import Contaienr from "./cpns/contaienr.vue"
// 导入左右切换的组件
import ChangeSwitch from "@/components/change-switch/change-switch.vue"
export default {
  name: "output2",
  components: {
    Contaienr,
    ChangeSwitch
  },
  data() {
    return {
      dataTiming: null,
      selectArea: "ALL",
      currentIndex: 3,
      titles: [],
      newData: []
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "By站位產出看板")
    this.getData()
  },
  computed: {
    getShowArray() {
      return splitArray(this.titles, 3)
    }
  },
  methods: {
    // 获取数据
    async getData() {
      this.titles = []
      this.newData = []
      let res = await GetStationName(this.selectArea)
      this.titles = res
      res.forEach(async (item, index) => {
        let r = await GetDeviceInfo(this.selectArea, item.deviceNo)
        this.$set(this.newData, index, r[0].stationInfo)
      })
    },
    changeIndex(index) {
      let map = new Map([
        [1, "FOL"],
        [2, "EOL"],
        [3, "ALL"]
      ])
      this.currentIndex = index
      this.selectArea = map.get(index)
      this.getData()
    },
    handleDirection(direction) {
      direction == "left" ? this.$refs.carousel.prev() : this.$refs.carousel.next()
    }
  },
  beforeDestroy() {
    clearInterval(this.dataTiming)
  }
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
  position: relative;
}
.page-main {
  margin-top: 20px;
  position: relative;
  .main {
    margin-top: 30px;
  }
  .control {
    position: absolute;
    right: 20px;
    top: 15px;
    display: flex;
    align-items: center;
    .container {
      display: flex;
      align-items: center;
      span {
        &:nth-child(1) {
          display: inline-block;
          width: 25px;
          height: 25px;
          margin-right: 6px;
          cursor: pointer;
        }
      }
    }
    .fol-container {
      margin-left: auto;
      .fol-box {
        border: 2px solid #d08bf5;
      }
    }
    .eol-container {
      margin: 0 10px;
      .eol-box {
        border: 2px solid #58d5e0;
      }
    }
    .all-container {
      margin-right: 100px;
      .all-box {
        border: 2px solid #fbeeca;
      }
    }
  }
}
.contaner {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 15px;
}
</style>
