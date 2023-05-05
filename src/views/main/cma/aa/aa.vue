<template>
  <!-- 主要区域 -->
  <div class="page-main">
    <!-- 第一行 -->
    <main-one :config1="config1" :config2="config2" :config3="config3" :config4="config4" :config5="config5" />
    <!-- 第二行 -->
    <main-two :totalBlock="bottomData" />
  </div>
</template>
<script>
// 导入第一行
import mainOne from "./cpns/main-one/main-one.vue"
// 导入底部区域
import mainTwo from "./cpns/main-two/main-two.vue"
// 导入发送请求的函函數
import {
  getAAMachineMaintainInfo,
  getAAProductInfo,
  getAllStateNums,
  getEfficiencyTop5,
  getYieldTop5,
  getMachinesInfo
} from "@/api/cma/aa.js"
export default {
  name: "aa",
  components: {
    mainOne,
    mainTwo
  },
  data() {
    return {
      dataTiming: null,
      config1: [],
      config2: [],
      config3: [
        { id: 1, number: 0, des: "總數" },
        { id: 2, number: 0, des: "待命" },
        { id: 3, number: 0, des: "運行中" },
        { id: 4, number: 0, des: "效率異常" },
        { id: 5, number: 0, des: "計劃" },
        { id: 6, number: 0, des: "實際" },
        { id: 7, number: 0, des: "差異" },
        { id: 8, number: 0, des: "異常停頭" }
      ],
      config4: {
        data: []
      },
      config5: [],
      bottomData: {},
      // OffLine 下线状态 灰色 OnLine:Level0 绿色 OnLine:Level1 橙色/黄色  OnLine:Level2 红色
      colorMap: new Map([
        ["OffLine", "#858585"],
        ["OnLine:Level0", "#7CFC00"],
        ["OnLine:Level1", "#FFFF00"],
        ["OnLine:Level2", "#FF4040"]
      ])
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "AA設備總覽")
    this.initData()
    // 每5分钟获取一次数据
    this.dataTiming = setInterval(() => {
      this.initData()
    }, this.$globalData.CYCLE_TIME)
  },
  methods: {
    // 发送请求，处理数据
    async initData() {
      let requestArr = [
        this.getAAMachineMaintainInfo(),
        this.getAAProductInfo(),
        this.getAllStateNums(),
        this.getEfficiencyTop5(),
        this.getYieldTop5(),
        this.getMachinesInfo()
      ]
      await Promise.all(requestArr)
    },
    // 获取保養任務公告
    async getAAMachineMaintainInfo() {
      let res = await getAAMachineMaintainInfo()
      if (Array.isArray(res)) {
        let tempArr = []
        res.forEach((item) => {
          tempArr.push([
            item.machinename,
            this.getImgStr(item.stn1),
            this.getImgStr(item.stn2),
            this.getImgStr(item.stn3),
            this.getImgStr(item.stn4)
          ])
        })
        // 现在的
        this.config1 = tempArr
      }
    },
    // 當日產出/達成率/良率/統計
    async getAAProductInfo() {
      let res = await getAAProductInfo()
      if (Array.isArray(res)) {
        let tempArr = []
        res.forEach((item) => {
          tempArr.push([item.customName, parseInt(item.planeOutPut), item.outPut, item.hitRate || "-", item.firstYield])
        })
        // 现
        this.config5 = tempArr
      }
    },
    // 获取中间的数据
    async getAllStateNums() {
      let res = await getAllStateNums()
      // 处理中间的值
      // 总数：machineCount 待命:idleCount 运行中：runCount 效率异常: downCount/downRate
      // 计划: planHeadCount 实际:actualHeadCount 差异:headDvalue   异常停顿: downHeadCount
      let {
        machineCount,
        idleCount,
        runCount,
        downCount,
        downRate,
        planHeadCount,
        actualHeadCount,
        headDvalue,
        downHeadCount
      } = res
      let tempArr = [
        { number: machineCount },
        { number: idleCount },
        { number: runCount },
        { number: `${downCount}(${downRate})` },
        { number: planHeadCount },
        { number: actualHeadCount },
        { number: headDvalue },
        { number: downHeadCount }
      ]
      tempArr.forEach((item, index) => {
        Object.assign(this.config3[index], item)
      })
    },
    // 获取效率损失top5
    async getEfficiencyTop5() {
      let res = await getEfficiencyTop5()
      let base = 0
      this.config4 = res.map((item, index) => {
        let value = 0
        if (index == 0) {
          base = item.keeptime * 1
          value = 100
        } else {
          value = Math.round((Number(item.keeptime) * 100) / base)
        }
        return {
          name: `${item.errormsg} ${item.rate}`,
          keeptime: item.keeptime,
          machines: item.machines,
          value
        }
      })
    },
    // 获取良率损失top5
    async getYieldTop5() {
      let res = await getYieldTop5()
      console.log("res===", res)

      this.config2 = res.map((item) => {
        let { rejectType: name, total: value, totalRate: rate, machines } = item
        return { name, value, rate, machines }
      })
    },
    // 获取下方机台信息的数据 及每个block
    async getMachinesInfo() {
      // 处理Block的数据
      this.bottomData = await getMachinesInfo()
    },
    // 根据布尔值返回对应的img字符串
    getImgStr(state) {
      return `<span style="background:${this.colorMap.get(state)};" class="dot"></span>`
    }
  },
  beforeDestroy() {
    clearInterval(this.dataTiming)
  }
}
</script>
