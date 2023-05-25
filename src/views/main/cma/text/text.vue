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
          <div style="margin-top: 30px">
            <ces-table :tableData="tableData" :tableCols="tableCols" tableHeight="900">
              <template #batch="{ row }">
                <span class="batch" @click="openDetail">{{ row.batch }}</span>
              </template>
            </ces-table>
          </div>
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
          <ces-table :tableData="tableData2" :tableCols="tableCols2" tableHeight="300"> </ces-table>
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
      dialogVisible: true,
      // 表格的数据
      tableData: [],
      // 表格列配置
      tableCols: [
        {
          id: "",
          name: `StartTime`,
          chileColumn: [{ id: "station", name: "2023/07/03" }]
        },
        { id: "machine", name: "Machine" },
        { id: "target", name: "Target" },
        {
          id: "",
          name: `Output`,
          chileColumn: [
            { id: "time", name: "2023/07/03" },
            { id: "time", name: "2023/07/03" },
            { id: "time", name: "2023/07/03" }
          ]
        },
        {
          id: "",
          name: `HitRate`,
          chileColumn: [
            { id: "time", name: "2023/07/03" },
            { id: "time", name: "2023/07/03" },
            { id: "time", name: "2023/07/03" }
          ]
        },
        {
          id: "",
          name: `FirstYield`,
          chileColumn: [
            { id: "time", name: "2023/07/03" },
            { id: "time", name: "2023/07/03" },
            { id: "time", name: "2023/07/03" }
          ]
        },
        {
          id: "",
          name: `Effciency`,
          chileColumn: [
            { id: "time", name: "2023/07/03" },
            { id: "time", name: "2023/07/03" },
            { id: "time", name: "2023/07/03" }
          ]
        }
      ],
      // 表格的數據
      tableData1: [],
      // 表格的列配置
      tableCols1: [
        { id: "device", name: "Device" },
        { id: "machine", name: "Machine" },
        {
          id: "",
          name: `Total/MC`,
          chileColumn: [{ id: "station", name: "/" }]
        },
        {
          id: "",
          name: `TOP1`,
          chileColumn: [{ id: "station", name: "GRR 底部條碼視覺通信接收失敗" }]
        },
        {
          id: "",
          name: `TOP2`,
          chileColumn: [{ id: "station", name: "測試軟體狀態錯誤" }]
        },
        {
          id: "",
          name: `TOP3`,
          chileColumn: [{ id: "station", name: "測試軟體啟動失敗" }]
        },
        {
          id: "",
          name: `TOP4`,
          chileColumn: [{ id: "station", name: "測試軟體啟動失敗" }]
        },
        {
          id: "",
          name: `TOP5`,
          chileColumn: [{ id: "station", name: "主PP 3號吸嘴真空失敗" }]
        },
        {
          id: "",
          name: `TOP6`,
          chileColumn: [{ id: "station", name: "視覺軟體工作託盤產品計數失敗" }]
        },
        {
          id: "",
          name: `TOP7`,
          chileColumn: [{ id: "station", name: "作業託盤取出失敗" }]
        },
        {
          id: "",
          name: `TOP8`,
          chileColumn: [{ id: "station", name: "作業託盤最多數量計數失敗" }]
        }
      ],
      tableData2: [],
      tableCols2: [
        { id: "device", name: "停机项目" },
        { id: "time", name: "时间(min)" }
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
