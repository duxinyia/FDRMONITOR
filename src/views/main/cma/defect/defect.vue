<template>
  <div class="defect-container">
    <page-header title="Top 25 Defect Item" />
    <div class="page-main">
      <div class="top-header">
        <!-- 下拉选择框 -->
        <el-select v-model="rank" placeholder="段位">
          <el-option
            v-for="item in ranks"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <!-- 机种(可多选) -->
        <el-select
          v-model="machine"
          multiple
          collapse-tags
          class="machine-select"
          placeholder="机种(可多选)"
        >
          <el-option
            v-for="item in machines"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-model="timeframe"
          class="date-picker"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['06:00:00']"
        >
        </el-date-picker>
        <!-- 查询按钮 -->
        <el-button type="success">查询</el-button>
      </div>
      <div class="bottom-data">
        <div v-for="(item, index) in showData[currentPage - 1]" :key="index" class="every-device">
          <el-row>
            <el-col :span="16">2022-10-22</el-col>
            <el-col :span="8" class="border-left">{{ item.device }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="16">Overall Yield</el-col>
            <el-col :span="8" class="border-left">{{ item.overallYield }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="16">Target Yield</el-col>
            <el-col :span="8" class="border-left">{{ item.targetYield || "-" }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="16">DefectName</el-col>
            <el-col :span="4" class="border-left border-right">Fail Qty</el-col>
            <el-col :span="4">Rate</el-col>
          </el-row>
          <div class="text">
            <template v-for="(child, index) in item.defectNameList">
              <el-row :key="index">
                <el-col v-if="index <= 8" :span="16" :style="`text-align:center`">{{
                  child.name
                }}</el-col>
                <el-col v-else :span="16" :style="`text-align:left`">{{ child.name }}</el-col>
                <el-col :span="4" class="border-left border-right">{{ child.failQty }}</el-col>
                <el-col :span="4">{{ child.rate }}</el-col>
              </el-row>
            </template>
          </div>
        </div>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="3"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 导入头部
import PageHeader from "@/components/page-header/index.vue"
// 导入发送请求的函函數
import { GetDefectYieldInfo } from "@/api/defect.js"
// 导入对应的函数
import { splitArray } from "@/utils"
export default {
  name: "defect",
  components: {
    PageHeader
  },
  data() {
    return {
      // 接口返回的数据
      showData: [],
      // 段位
      rank: "",
      ranks: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      // 机种
      machine: "",
      machines: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      timeframe: [this.$moment().format("YYYY-MM-DD 06:00:00")],
      total: 10,
      currentPage: 1
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_FULLLOADING", true)
    this.getDefectYieldInfo()
  },

  methods: {
    async getDefectYieldInfo() {
      let res = await GetDefectYieldInfo()
      // console.log("处理前", res)
      if (res) {
        this.total = res.length
        this.$store.commit("fullLoading/SET_FULLLOADING", false)
        this.showData = splitArray(res, 3)
        res.forEach((item) => {
          let fails = 0
          let rates = 0
          item.defectNameList.forEach((item) => {
            // console.log(item.failQty, parseFloat(item.rate) * 10)
            fails += item.failQty
            rates += parseFloat(item.rate) * 10
          })
          // console.log("处理后fails rates", fails, rates)
          item.defectNameList.push({ name: "ALL", failQty: fails, rate: rates / 10 })
        })
        // console.log("处理后res", res)
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-col {
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  text-align: center;
}
::v-deep .el-row {
  border-bottom: 2px solid #1478a1;
}
.border-left {
  border-left: 2px solid #1478a1;
}
.border-right {
  border-right: 2px solid #1478a1;
}
.machine-select {
  margin: 0 10px;
}
.date-picker {
  margin-right: 10px;
}
.text {
  height: 700px;
  overflow-y: scroll;
  position: relative;
  // .el-row {
  //   &:last-child {
  //     position: fixed;
  //     bottom: 20px;
  //     left: 0;
  //     right: 0;
  //   }
  // }
}
.page-main {
  .top-header {
    margin: 10px 0;
  }
  .bottom-data {
    display: flex;
    flex-wrap: wrap;

    .every-device {
      width: 600px;
      margin: 5px;
      border: 2px solid #1478a1;
    }
  }
}
</style>
