<template>
  <div class="report">
    <el-button type="success" size="mini" @click="$router.go(-1)">返回</el-button>
    <!-- 搜索的表单区域 -->
    <el-form ref="form" inline :model="form" label-width="120px">
      <el-form-item label="Device:">
        <el-input v-model="form.device"></el-input>
      </el-form-item>
      <el-form-item label="Lottype:">
        <el-input v-model="form.lottype"></el-input>
      </el-form-item>
      <el-form-item label="Material Vendor:">
        <el-input v-model="form.vendor"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 显示表格 -->
    <el-table :data="tableData" height="250" border style="width: 100%">
      <el-table-column v-if="isShow" prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "report",
  props: {},
  data() {
    return {
      isShow: true,
      form: {
        device: "",
        age: ""
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.report {
  color: red;
  height: 100%;
  background: #fff;
}
</style>
