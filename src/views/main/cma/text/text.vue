<template>
  <div class="page-main">
    <dv-border-box-12 class="wrapper-container">
      <!-- 使用轮播图来展示数据 -->
      <el-carousel style="height: 1000px" indicator-position="none" :interval="15 * 10000" ref="carousel" arrow="never">
        <el-carousel-item v-for="(item, index) in 4" :key="index" :name="item + ''">
          <div style="margin-top: 30px">
            <ces-table :tableData="tableData" :tableCols="tableCols" tableHeight="900">
              <template #time12="{ row }">
                <div class="lamp-container" @click="openDetail">
                  <span class="lamp" :style="changeStyle"></span>
                  <span class="text">{{ row.time12 || "-" }}</span>
                </div>
              </template>
            </ces-table>
          </div>
        </el-carousel-item>
      </el-carousel>
      <!-- <el-dialog
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
      </el-dialog> -->
      <el-dialog
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        :before-close="toClose"
        :close-on-click-modal="false"
      >
        <dv-border-box-11 title="ACF Cube Plasma 看板" class="dialog">
          <svg-icon class="closeIcon" icon-class="close" @click="toClose" />
          <ces-table :tableData="tableData3" :tableCols="tableCols3" tableHeight="300"> </ces-table>
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
      // 红 绿  黄
      colors1: ["rgba(255, 0, 102, 0.9)", "rgba(0, 255, 0, 0.9)", "rgba(255, 255, 0, 0.9)"],
      colors: [
        "radial-gradient(50% 50%, rgba(255, 0, 102, 0.5) 50%, rgba(255, 0, 102, 1) 100%)",
        "radial-gradient(50% 50%, rgba(0, 255, 0, 0.5) 50%, rgba(0, 255, 0, 1) 100%)",
        "radial-gradient(50% 50%, rgba(255, 255, 0, 0.5) 50%, rgba(255, 255, 0, 1) 100%)"
      ],
      dialogVisible: false,
      // 表格的数据
      tableData: [
        {
          machine: "EA1301",
          target: 39840,
          time1: 33031,
          time2: 33031,
          time3: 33031,
          time4: "100.00%",
          time5: "100.00%",
          time6: "100.00%",
          time7: "100.00%",
          time8: "100.00%",
          time9: "100.00%",
          time10: "100.00%",
          time11: "100.00%",
          time12: "100.00%",
          time13: "100.00%",
          time14: "100.00%",
          time15: "100.00%",
          time16: "100.00%"
        },
        {
          machine: "EA1301",
          target: 39840,
          time1: 33031,
          time2: 33031,
          time3: 33031,
          time4: "100.00%",
          time5: "100.00%",
          time6: "100.00%",
          time7: "100.00%",
          time8: "100.00%",
          time9: "100.00%",
          time10: "100.00%",
          time11: "100.00%",
          time12: "100.00%",
          time13: "100.00%",
          time14: "100.00%",
          time15: "100.00%",
          time16: "100.00%"
        },
        {
          machine: "EA1301",
          target: 39840,
          time1: 33031,
          time2: 33031,
          time3: 33031,
          time4: "100.00%",
          time5: "100.00%",
          time6: "100.00%",
          time7: "100.00%",
          time8: "100.00%",
          time9: "100.00%",
          time10: "100.00%",
          time11: "100.00%",
          time12: "100.00%",
          time13: "100.00%",
          time14: "100.00%",
          time15: "100.00%",
          time16: "100.00%"
        }
      ],
      // 表格列配置
      tableCols: [
        {
          id: "",
          name: `StartTime`,
          chileColumn: [{ id: "time1", name: "2023/07/03" }]
        },
        { id: "machine", name: "Machine" },
        { id: "target", name: "Target" },
        {
          id: "",
          name: `Output`,
          chileColumn: [
            { id: "time2", name: "2023/07/03" },
            { id: "time3", name: "2023/07/03" },
            { id: "time4", name: "2023/07/03" }
          ]
        },
        {
          id: "",
          name: `HitRate`,
          chileColumn: [
            { id: "time5", name: "2023/07/03" },
            { id: "time6", name: "2023/07/03" },
            { id: "time7", name: "2023/07/03" }
          ]
        },
        {
          id: "",
          name: `FirstYield`,
          chileColumn: [
            { id: "time8", name: "2023/07/03" },
            { id: "time9", name: "2023/07/03" },
            { id: "time10", name: "2023/07/03" }
          ]
        },
        {
          id: "",
          name: `Effciency`,
          chileColumn: [
            { id: "time11", name: "2023/07/03" },
            { id: "time12", name: "2023/07/03" },
            { id: "time13", name: "2023/07/03" }
          ]
        },
        {
          id: "",
          name: `Alarm`,
          chileColumn: [
            { id: "time14", name: "2023/07/03" },
            { id: "time15", name: "2023/07/03" },
            { id: "time16", name: "2023/07/03" }
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
      ],
      tableData3: [],
      tableCols3: [
        { id: "device", name: "Device" },
        { id: "machine", name: "Machine" },
        {
          id: "",
          name: `####`,
          chileColumn: [{ id: "target", name: "target" }]
        },
        {
          id: "",
          name: `Input`,
          chileColumn: [
            { id: "target", name: "####" },
            { id: "target", name: "####" },
            { id: "target", name: "####" }
          ]
        },
        {
          id: "",
          name: `HitRate`,
          chileColumn: [
            { id: "target", name: "####" },
            { id: "target", name: "####" },
            { id: "target", name: "####" }
          ]
        }
        // {
        //   id: "",
        //   name: `FirstYield`,
        //   chileColumn: [
        //     { id: "target", name: "####" },
        //     { id: "target", name: "####" },
        //     { id: "target", name: "####" }
        //   ]
        // }
        // {
        //   id: "",
        //   name: `Lens area`,
        //   chileColumn: [
        //     { id: "target", name: "####" },
        //     { id: "target", name: "####" },
        //     { id: "target", name: "####" }
        //   ]
        // }
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
    },
    changeStyle() {
      return { background: this.colors[1], color: this.colors1[1] }
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
.lamp-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .lamp {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-left: 8px;
    animation: fade 2s infinite;
  }
  .text {
    padding-right: 8px;
  }
}
@keyframes fade {
  0% {
    box-shadow: inset 0 0 5px currentColor;
  }
  50% {
    box-shadow: inset 0 0 10px currentColor;
  }
  100% {
    box-shadow: inset 0 0 5px currentColor;
  }
}
</style>
