<template>
  <div class="page-main">
    <dv-border-box-12 class="wrapper-container">
      <!-- 使用轮播图来展示数据 -->
      <el-carousel
        style="height: 1000px"
        indicator-position="none"
        :interval="15 * 10000"
        ref="carousel"
        arrow="never"
        @change="changeCarousel"
      >
        <el-carousel-item v-for="(item, index) in 4" :key="index" :name="item">
          <el-row :gutter="20" style="margin-top: 25px">
            <el-col :span="12">
              <ces-table :tableData="tableData" :tableCols="tableCols" tableHeight="900">
                <template #batch="{ row }">
                  <span class="batch" @click="openDetail">{{ row.batch }}</span>
                </template>
              </ces-table>
            </el-col>
            <el-col :span="12">
              <ces-table :tableData="tableData" :tableCols="tableCols" tableHeight="900"> </ces-table
            ></el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
      <el-dialog
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        :before-close="toClose"
        :close-on-click-modal="false"
      >
        <dv-border-box-11 title="ACF Cube Plasma 看板" class="dialog">
          <svg-icon class="closeIcon" icon-class="close" @click="toClose" />
          <el-row class="des">
            <el-col :span="12">幾種:MW-E</el-col>
            <el-col :span="12">Plasma machineno:MW-E</el-col>
            <el-col :span="12">批號:MW-E</el-col>
            <el-col :span="12">Plasma 上機時間:MW-E</el-col>
          </el-row>
          <ces-table :tableData="tableData1" :tableCols="tableCols1" tableHeight="300"> </ces-table>
        </dv-border-box-11>
      </el-dialog>
      <!-- 自定义两个切换按钮 -->
      <change-switch
        :leftConfig="{ left: '25px', top: '15px' }"
        :rightConfig="{ right: '25px', top: '15px' }"
        @directionChange="handleDirection"
      />
    </dv-border-box-12>
  </div>
</template>
<script>
// 导入左右切换的组件
import ChangeSwitch from "@/components/change-switch/change-switch.vue"
export default {
  name: "stang",
  components: {
    ChangeSwitch
  },
  data() {
    return {
      dialogVisible: false,
      // 表格的数据
      tableData: [
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" },
        { device: "MW-E", machineno: "cp9201", time: "2023/02/19 12:00", batch: "k000599", Stangingtime: "2.1H" }
      ],
      // 表格列配置
      tableCols: [
        { id: "device", name: "幾種" },
        { id: "machineno", name: "Plasma machineno" },
        { id: "time", name: "Plasma 上機時間" },
        { id: "batch", name: "批號" },
        { id: "Stangingtime", name: "Stangingtime" }
      ],
      // 表格的數據
      tableData1: [
        { device: "Cube Plasma tray 1", machineno: "2023/02/10 07:398", time: "4.35" },
        { device: "Cube Plasma tray 1", machineno: "2023/02/10 07:398", time: "4.35" },
        { device: "Cube Plasma tray 1", machineno: "2023/02/10 07:398", time: "4.35" },
        { device: "Cube Plasma tray 1", machineno: "2023/02/10 07:398", time: "4.35" }
      ],
      // 表格的列配置
      tableCols1: [
        { id: "device", name: "Tray ID" },
        { id: "machineno", name: "Tray Plasma时间" },
        { id: "time", name: "Stanging Time" }
      ]
    }
  },
  mounted() {
    this.$store.commit("fullLoading/SET_TITLE", "Stangging Time 看板")
  },
  methods: {
    openDetail() {
      console.log("openDetail")
      this.dialogVisible = true
    },
    toClose() {
      this.dialogVisible = false
    },
    handleDirection(direction) {
      direction == "left" ? this.$refs.carousel.prev() : this.$refs.carousel.next()
    }
  }
}
</script>

<style lang="scss" scoped>
.page-main {
  height: calc(100% - 120px);
  margin-top: 10px;
}
::v-deep .el-carousel__container {
  height: 100%;
}
/* 重置  的样式 */

.wrapper-container {
  /* padding: 20px !important; */
  ::v-deep .border-box-content {
    padding: 20px;
    position: relative;
  }
}
.dialog {
  ::v-deep .border-box-content {
    padding: 60px 20px 20px 20px;
  }
}
// 弹出框的样式
::v-deep .el-dialog__header {
  display: none;
}
::v-deep .el-dialog__body {
  padding: 0px;
  background: #00132a;
}
.batch {
  cursor: pointer;
}
.closeIcon {
  position: absolute;
  right: 4px;
  top: 2px;
  width: 30px;
  height: 30px;
  color: #2d66e2;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transform: rotate(90deg);
  }
}

.des {
  color: #fff;
  font-size: 16px;
  ::v-deep .el-col {
    padding-left: 20px;
    margin-bottom: 10px;
  }
}
</style>
