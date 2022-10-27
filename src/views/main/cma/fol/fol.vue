<template>
  <div>
    <page-header title="FOL設備總覽" />
    <!-- 主要区域 -->
    <div class="page-main">
      <!-- 第一行 -->
      <main-one :config1="config1" :config2="config2" :config3="config3" :config4="config4" />
      <!-- 第二行 -->
      <main-two :bottomData="bottomData" />
    </div>
  </div>
</template>
<script>
// 导入头部
import PageHeader from "@/components/page-header/index.vue"
// 导入第一行
import mainOne from "./cpns/main-one/main-one.vue"
// 导入底部区域
import mainTwo from "./cpns/main-two/main-two.vue"
// 导入发送请求的函函數
import { getMaintainInfo, getDeviceInfo, getMachineTop5, getProductInfo } from "@/api/fol.js"
export default {
  name: "fol",
  components: {
    PageHeader,
    mainOne,
    mainTwo
  },
  data() {
    return {
      config1: {
        xAxisData: [],
        seriesData: [],
        seriesData1: [],
        ciolData: [],
        sum: 0,
        bottomData: [],
        topData: [],
        details: []
      },
      config2: [],
      config4: {
        names: [],
        values: [],
        formatValue: []
      },
      config3: [],
      bottomData: [],
      dataTiming: null,
      textArr: []
    }
  },
  computed: {
    divConfig() {
      return [
        [
          {
            id: 1,
            text: this.textArr[0] || { name: "", state: "" },
            style: {
              width: "45px",
              height: "23px",
              "line-height": "23px",
              "margin-left": "6px",
              border: `1px solid #4ed4a5`
            }
          },
          {
            id: 2,
            style: {
              width: "20px",
              height: "5px",
              "margin-left": "15px",
              border: `1px solid #4ed4a5`
            }
          },
          {
            id: 3,
            text: this.textArr[1] || { name: "", state: "" },
            style: {
              width: "40px",
              height: "23px",
              "line-height": "23px",
              "margin-left": "6px",
              border: `1px solid #4ed4a5`
            }
          },
          {
            id: 4,
            style: {
              width: "20px",
              height: "5px",
              "margin-left": "15px",
              border: `1px solid #4ed4a5`
            }
          },
          {
            id: 5,
            text: this.textArr[2] || { name: "", state: "" },
            style: {
              width: "50px",
              height: "23px",
              "line-height": "23px",
              border: `1px solid #4ed4a5`
            }
          },
          {
            id: 6,
            text: this.textArr[3] || { name: "", state: "" },
            style: {
              width: "40px",
              height: "48px",
              "line-height": "48px",

              border: `1px solid #4ed4a5`
            }
          },
          {
            id: 7,
            text: this.textArr[4] || { name: "", state: "" },
            style: {
              width: "40px",
              height: "26px",
              "line-height": "26px",
              border: `1px solid #4ed4a5`
            }
          },
          {
            id: 8,
            text: this.textArr[5] || { name: "", state: "" },
            style: {
              width: "50px",
              height: "26px",
              "line-height": "26px",
              border: `1px solid #4ed4a5`
            }
          },
          {
            id: 9,
            style: {
              width: "20px",
              height: "5px",
              "margin-left": "15px",
              border: `1px solid #4ed4a5`
            }
          },
          {
            id: 10,
            text: this.textArr[6] || { name: "", state: "" },
            style: {
              width: "50px",
              height: "20px",
              "line-height": "21px",
              border: `1px solid #4ed4a5`
            }
          }
        ],
        []
      ]
    }
  },
  mounted() {
    // this.$store.commit("fullLoading/SET_FULLLOADING", true)
    this.initData()
    // 每5分钟获取一次数据
    this.dataTiming = setInterval(() => {
      this.initData()
    }, this.$globalData.CYCLE_TIME)
  },
  methods: {
    async initData() {
      let requestArr = [
        this.getMaintainInfo(),
        this.getDeviceInfo(),
        this.getMachineTop5(),
        this.getProductInfo()
      ]
      await Promise.all(requestArr)
      this.$store.commit("fullLoading/SET_FULLLOADING", false)
    },
    // 获取 配件到期提示區
    async getMaintainInfo() {
      let result = await getMaintainInfo()
      this.config1 = {
        xAxisData: [],
        seriesData: [],
        seriesData1: [],
        ciolData: [],
        sum: 0,
        bottomData: [],
        topData: [],
        details: []
      }
      if (Array.isArray(result)) {
        result.forEach((item) => {
          this.config1.xAxisData.push(item.alterName)
          this.config1.seriesData.push(item.count)
          this.config1.seriesData1.push({ name: "", value: item.count, details: item.details })
          this.config1.ciolData.push({ name: "", value: "0" })
          this.config1.sum += item.count
          this.config1.details.push(item.details)
        })
        result.forEach((item) => {
          this.config1.bottomData.push({ name: "", value: this.config1.sum - item.count })
          this.config1.topData.push({ name: "", value: this.config1.sum })
        })
      }
    },
    // 获取 配件到期提示區
    async getDeviceInfo() {
      let result = await getDeviceInfo()
      if (Array.isArray(result)) {
        this.config2 = []
        result.forEach((item) => {
          let {
            deviceSeries,
            mpsPlan,
            allowLine,
            actualLine,
            planStopLine,
            exceptStopLine,
            overLine
          } = item
          this.config2.push([
            deviceSeries,
            mpsPlan,
            allowLine,
            actualLine,
            planStopLine,
            exceptStopLine,
            overLine
          ])
        })
      }
    },
    // 获取top5的信息
    async getMachineTop5() {
      let result = await getMachineTop5()
      if (Array.isArray(result)) {
        this.config4 = {
          names: [],
          values: [],
          formatValues: []
        }
        result.forEach((item) => {
          this.config4.names.push(`${item.errormsg} ${item.rate}`)
          this.config4.values.push({
            value: item.keeptime,
            detail: item.machines
          })
          this.config4.formatValues.push((item.keeptime / 60).toFixed(2) + " Min")
        })
      }
    },
    // 获取对应机台的信息
    async getProductInfo() {
      let result = await getProductInfo()
      if (Array.isArray(result)) {
        this.bottomData = []
        this.config3 = []
        this.textArr = []
        // 下方的数据 给对象新加一个属性用于描述十个块的
        this.bottomData = result
        result.forEach((item) => {
          item.workShopInfos.forEach((childItem) => {
            childItem.machineInfos = childItem.machineInfos.map((machine) => {
              this.textArr = []
              // 每个机台的信息
              if (machine.memberRunStatus) {
                Object.entries(machine.memberRunStatus).forEach((item) => {
                  this.textArr.push({ name: item[0], state: item[1] })
                })
              }
              // 取出对应的状态 生成新的divArr
              return { ...machine, divsConfig: this.divConfig[0] }
            })
          })
        })
        // dataV中的数据
        result.forEach((item) => {
          item.workShopInfos.forEach((childItem) => {
            childItem.machineInfos.forEach((threeItem) => {
              const {
                customName,
                machineName,
                planeOutPut,
                outPut,
                hitRate,
                dpcRate,
                lcbRate,
                eFailRate
              } = threeItem
              customName &&
                this.config3.push([
                  this.handleValue(machineName),
                  customName || "-",
                  planeOutPut || "-",
                  outPut || "-",
                  hitRate || "-",
                  dpcRate || "-",
                  lcbRate || "-",
                  eFailRate || "-"
                ])
            })
          })
        })
      }
    },
    // 处理線體的数据
    handleValue(value) {
      if (typeof value == "string") {
        if (value.includes("Line")) {
          return value.split(" ")[1]
        }
      }
      return value
    }
  },
  beforeDestroy() {
    clearInterval(this.dataTiming)
  }
}
</script>
<style lang="scss" scoped>
.page-main {
  height: 100%;
}
</style>
