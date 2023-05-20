<template>
  <div class="defectdetail">
    <dv-border-box-12>
      <div class="operate">
        <!-- 下拉选择框 -->
        <div class="selsect-container">
          <el-select :popper-append-to-body="false" @change="changeValue" size="mini" v-model="value" placeholder="">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
        <div class="date-container">
          <div class="item" v-for="item in [7, 6, 5, 4]" :key="item">{{ item }}</div>
        </div>
      </div>
      <div class="show-container">
        <div style="width: 620px" class="wrapper">
          <el-row class="title-container">
            <el-col :span="16">Project</el-col>
            <el-col :span="8">11月8号</el-col>
          </el-row>
          <el-row>
            <el-col :span="16">Overall Yield</el-col>
            <el-col :span="8">98.71%</el-col>
          </el-row>
          <el-row>
            <el-col :span="16">Overall Yield</el-col>
            <el-col :span="8">98.71%</el-col>
          </el-row>
          <el-row>
            <el-col :span="16">DefectName</el-col>
            <el-col :span="4">Fail Qty</el-col>
            <el-col :span="4">Rate</el-col>
          </el-row>
          <!-- 数据 -->
          <el-row v-for="item in 15" :key="item">
            <el-col :span="16">DPC</el-col>
            <el-col :span="4">32</el-col>
            <el-col :span="4">0.69%</el-col>
          </el-row>
          <el-row>
            <el-col :span="16">Total</el-col>
            <el-col :span="4">69</el-col>
            <el-col :span="4">1.28%</el-col>
          </el-row>
        </div>
        <div style="width: 620px" class="wrapper">
          <el-row class="title-container">
            <el-col :span="16">Project</el-col>
            <el-col :span="8">11月8号</el-col>
          </el-row>
          <el-row>
            <el-col :span="16">Overall Yield</el-col>
            <el-col :span="8">98.71%</el-col>
          </el-row>
          <el-row>
            <el-col :span="16">Overall Yield</el-col>
            <el-col :span="8">98.71%</el-col>
          </el-row>
          <el-row>
            <el-col :span="16">DefectName</el-col>
            <el-col :span="4">Fail Qty</el-col>
            <el-col :span="4">Rate</el-col>
          </el-row>
          <!-- 数据 -->
          <el-row v-for="item in 15" :key="item">
            <el-col :span="16">DPC</el-col>
            <el-col :span="4">32</el-col>
            <el-col :span="4">0.69%</el-col>
          </el-row>
          <el-row>
            <el-col :span="16">Total</el-col>
            <el-col :span="4">69</el-col>
            <el-col :span="4">1.28%</el-col>
          </el-row>
        </div>
        <div style="width: 620px" class="wrapper">
          <el-row class="title-container">
            <el-col :span="16">Project</el-col>
            <el-col :span="8">11月8号</el-col>
          </el-row>
          <el-row>
            <el-col :span="16">Overall Yield</el-col>
            <el-col :span="8">98.71%</el-col>
          </el-row>
          <el-row>
            <el-col :span="16">Overall Yield</el-col>
            <el-col :span="8">98.71%</el-col>
          </el-row>
          <el-row>
            <el-col :span="16">DefectName</el-col>
            <el-col :span="4">Fail Qty</el-col>
            <el-col :span="4">Rate</el-col>
          </el-row>
          <!-- 数据 -->
          <el-row v-for="item in 15" :key="item">
            <el-col :span="16">DPC</el-col>
            <el-col :span="4">32</el-col>
            <el-col :span="4">0.69%</el-col>
          </el-row>
          <el-row>
            <el-col :span="16">Total</el-col>
            <el-col :span="4">69</el-col>
            <el-col :span="4">1.28%</el-col>
          </el-row>
        </div>
      </div>
    </dv-border-box-12>
  </div>
</template>

<script>
export default {
  name: "defectdetail",
  props: {},
  components: {},
  data() {
    return {
      value: "EOL",
      options: [
        { value: "EOL", label: "EOL" },
        { value: "FOL", label: "FOL" }
      ]
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "Top 25 0  Detail")
  },
  methods: {
    changeValue(value) {
      console.log("value", value)
      this.$refs.carousel.setActiveItem(value)
    }
  }
}
</script>

<style lang="scss">
.el-select-dropdown__item.hover {
  color: #fff;
  background: #274be8 !important;
}
</style>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
}
/* 更改下拉框的背景色 */
::v-deep .el-input__inner {
  background: linear-gradient(58deg, #3f77e8, #243d97);
  color: #fff;
  font-size: 15px;
  height: 25px;
  border: none;
}
::v-deep .el-select-dropdown {
  background-color: #000c1a;
  columns: #fff;
}
::v-deep .el-row {
  border-bottom: 1px solid #1adafb;
  &:last-child {
    border: none;
  }
  .el-col {
    height: 25px;
    line-height: 25px;
    border-right: 1px solid #1adafb;
    &:last-child {
      border: none;
    }
  }
}
.defectdetail {
  height: calc(100% - 120px);
  margin-top: 10px;
  position: relative;
}

.wrapper {
  border: 1px solid #1adafb;
  display: inline-block;
  margin-right: 10px;
}

.operate {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  .selsect-container {
    width: 100px;
  }
  .date-container {
    display: flex;
    margin-left: 20px;
    .item {
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #1adafb;
      margin-right: 10px;
    }
  }
}

.show-container {
  display: flex;
  justify-content: space-between;
}
</style>
