<template>
  <div class="page-main">
    <!-- <div class="top-header">
      <el-select v-model="rank" placeholder="段位">
        <el-option v-for="item in ranks" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
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
      <el-button type="primary">查询</el-button>
    </div> -->
    <div class="bottom-data">
      <div v-for="(item, index) in showData[currentPage - 1]" :key="index" class="every-device">
        <el-row>
          <el-col :span="16">{{ $moment().format("YYYY-MM-DD HH:mm:ss") }}</el-col>
          <el-col :span="8" class="border-left especially">{{ item.device }}</el-col>
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
              <el-col :span="16" :class="{ especially: index <= 8 ? true : false }">{{
                child.name
              }}</el-col>
              <el-col
                :span="4"
                :class="{
                  'border-left': true,
                  'border-right': true,
                  especially: index <= 8 ? true : false
                }"
                >{{ child.failQty }}</el-col
              >
              <el-col :span="4" :class="{ especially: index <= 8 ? true : false }">{{
                child.rate
              }}</el-col>
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
</template>

<script>
// 导入发送请求的函函數
import { GetDefectYieldInfo } from "@/api/defect.js"
// 导入对应的函数
import { splitArray } from "@/utils"
export default {
  name: "defect",
  data() {
    return {
      // 接口返回的数据
      showData: [],
      // 段位
      // rank: "",
      // ranks: [
      //   {
      //     value: "选项1",
      //     label: "黄金糕"
      //   },
      //   {
      //     value: "选项2",
      //     label: "双皮奶"
      //   }
      // ],
      // 机种
      // machine: "",
      // machines: [
      //   {
      //     value: "选项1",
      //     label: "黄金糕"
      //   },
      //   {
      //     value: "选项2",
      //     label: "双皮奶"
      //   }
      // ],
      // timeframe: [this.$moment().format("YYYY-MM-DD 06:00:00")],
      // timeframe: "",
      total: 10,
      currentPage: 1
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "Top 25 Defect Item")
    this.$store.commit("fullLoading/SET_FULLLOADING", true)
    this.getDefectYieldInfo()
  },

  methods: {
    async getDefectYieldInfo() {
      let res = await GetDefectYieldInfo()
      if (res) {
        this.total = res.length
        this.$store.commit("fullLoading/SET_FULLLOADING", false)
        this.showData = splitArray(res, 3)
        res.forEach((item) => {
          let fails = 0
          let rates = 0
          item.defectNameList.forEach((item) => {
            fails += item.failQty
            rates += parseFloat(item.rate) * 10
          })
          item.defectNameList.push({
            name: "ALL",
            failQty: fails,
            rate: (rates / 10).toFixed(2) + "%"
          })
        })
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
// 重置下拉框的样式
// ::v-deep .el-input__inner {
//   background: transparent;
//   color: #fff;
//   border: 1px solid #409eff;
// }
// ::v-deep .el-select {
//   &:hover .el-input__inner {
//     border: 1px solid #409eff;
//   }
// }
// ::v-deep .el-range-input {
//   background: transparent;
//   color: #fff;
//   border: none;
// }
// ::v-deep .el-tag--info {
//   background: rgba(64, 158, 255, 0.4);
//   color: #fff;
//   border: none;
// }
// 重置分頁器的樣式
::v-deep .el-pagination {
  padding: 0;
}
::v-deep .el-pagination.is-background .btn-next,
::v-deep .el-pagination.is-background .btn-prev,
::v-deep .el-pagination.is-background .el-pager li {
  color: #fff;
  background: transparent;
  border: 1px solid #1478a1;
}
::v-deep .el-pagination .btn-prev {
  margin-left: 0;
}
.border-left {
  border-left: 2px solid #1478a1;
}
.border-right {
  border-right: 2px solid #1478a1;
}
// .machine-select {
//   margin: 0 10px;
// }
// .date-picker {
//   margin-right: 10px;
// }
.text {
  height: 700px;
  overflow-y: scroll;
  position: relative;
}
.especially {
  text-align: center;
  background: rgba(33, 120, 155, 0.4);
}
.page-main {
  // .top-header {
  //   margin: 10px 0;
  // }
  .bottom-data {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .every-device {
      width: 600px;
      border: 2px solid #1478a1;
    }
  }
}
</style>
