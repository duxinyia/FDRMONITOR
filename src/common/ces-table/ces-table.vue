<template>
  <!-- 外层表格包裹元素 -->
  <section class="ces-table-page">
    <!-- 表格上面的操作按钮 -->
    <section class="ces-handle" v-if="isHandle">
      <!-- 这里放置表格的操作按钮，比如新建，导出数据，导入数据 -->
      <section class="ces-handle">
        <el-button
          v-for="item in tableHandles"
          :size="item.size || size"
          :type="item.type"
          :icon="item.icon"
          :key="item.label"
          @click="item.handle()"
        >
          {{ item.label }}
        </el-button>
      </section>
    </section>

    <!-- 是否需要动态显示什么列 -->
    <div class="setting" style="float: right; padding-right: 5px">
      <el-tooltip class="item" effect="dark" placement="bottom-end">
        <div slot="content">
          <div class="column" v-for="item in tableCols" :key="item.name">
            <el-checkbox v-model="item.show">{{ item.name }}</el-checkbox>
          </div>
        </div>
        <span><i class="el-icon-s-tools" style="cursor: pointer"></i></span>
      </el-tooltip>
    </div>
    <!-- 表格组件 -->
    <section class="ces-table">
      <el-table
        :header-cell-style="headerCellStyle"
        :data="tableData"
        :border="isBorder"
        v-loading="isloading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 1)"
        :height="tableHeight"
        :span-method="objectSpanMethod"
      >
        <!-- 是否有前面的多选效果 -->
        <el-table-column type="selection" width="55" align="center" v-if="false"> </el-table-column>
        <!-- 是否显示前面的序号 -->
        <el-table-column v-if="false" type="index" :label="indexLabel" align="center" width="50"> </el-table-column>
        <!-- 表格的每一项：表格列数据 -->
        <template v-for="(item, index) in tableCols">
          <el-table-column
            :prop="item.id"
            :label="item.name"
            align="center"
            :key="item.id"
            v-if="item.show"
            :sortable="item.isSortable || false"
            :width="tableWidths[index]"
            show-overflow-tooltip
          >
            <!-- 如果嵌套标题 -->
            <template v-if="item.chileColumn">
              <el-table-column
                v-for="(childitem, chileIndex) in item.chileColumn"
                :prop="childitem.id"
                :label="childitem.name"
                align="center"
                :key="childitem.id"
                :sortable="childitem.isSortable || false"
                :width="tableWidths[index + chileIndex]"
                show-overflow-tooltip
              >
                <template v-if="childitem.chileColumn">
                  <el-table-column
                    v-for="(childitem2, childIndex2) in childitem.chileColumn"
                    :prop="childitem2.id"
                    :label="childitem2.name"
                    align="center"
                    :key="childitem2.id"
                    :sortable="childitem2.isSortable || false"
                    :width="tableWidths[index + chileIndex + childIndex2]"
                    show-overflow-tooltip
                  >
                    <template #default="scope">
                      <slot :name="childitem2.id" :row="scope.row">
                        {{ scope.row[childitem2.id] || "-" }}
                      </slot>
                    </template>
                  </el-table-column>
                </template>
                <template #default="scope">
                  <slot :name="childitem.id" :row="scope.row">
                    {{ scope.row[childitem.id] || "-" }}
                  </slot>
                </template>
              </el-table-column>
            </template>
            <template #default="scope">
              <slot :name="item.id" :row="scope.row">
                {{ scope.row[item.id] || "-" }}
              </slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </section>
    <!-- 分页组件 -->
    <section class="ces-pagination" v-if="isPagination">
      <el-pagination
        style="display: flex; justify-content: center; height: 100%; align-items: center"
        layout="prev, pager, next"
        background
        @current-change="currentChange"
        @prev-click="prevClick"
        @next-click="nextClick"
        :total="1000"
      >
      </el-pagination>
    </section>
    <!-- 弹框组件 -->
    <!-- <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" :before-close="toClose">
      <div class="column-container">
        <el-col class="column" v-for="item in tableCols" :key="item.name" :span="6">
          <el-checkbox v-model="item.show">{{ item.name }}</el-checkbox>
        </el-col>
      </div>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </el-dialog> -->
  </section>
</template>

<script>
export default {
  name: "ces-table",
  props: {
    // 1. 表格的尺寸大小 mini,medium,small
    size: { type: String, default: "medium" },
    // 2. 是否需要带边框
    isBorder: { tyep: Boolean, default: true },
    // 3. 是否显示表格索引
    isIndex: { type: Boolean, default: false },
    indexLabel: { type: String, default: "序号" },
    // 4. 是否显示前面的多选效果
    isSelection: { type: Boolean, default: false },
    // 4. 是否显示分页
    isPagination: { type: Boolean, default: false },
    //    分页数据
    pagination: {
      type: Object,
      default: () => ({ pageSize: 10, pageNum: 1, total: 0 })
    },
    // 5. 加载动画
    loading: { type: Boolean, default: false },
    // 6. 表格数据，一般都是发请求过来的
    tableData: { type: Array, default: () => [] },
    // 7. 表格列数据
    tableCols: { type: Array, default: () => [] },
    // 8. 表格各列的宽度
    tableWidths: { type: Array, default: () => [] },
    // 9. 表格上面的操作
    isHandle: { type: Boolean, default: false },
    // 10. 表格的高度 用于显示滚动条
    tableHeight: { type: String, default: "" },
    // 11. 合并表格的方法
    handleColumn: {
      type: Function,
      default: () => {
        return Function
      }
    },
    // 表头样式
    headerCellStyle: {
      type: Object,
      default: () => {
        return { background: "transparent", color: "#1adafb" }
      }
    },
    isHasHandle: { type: Boolean, default: false },
    tableHandles: { type: Array, default: () => [] }
  },
  data() {
    return {
      isloading: false,
      dialogVisible: false
    }
  },
  // computed() {},
  watch: {
    tableData: {
      handler() {
        this.isloading = false
      },
      deep: true
    }
  },
  methods: {
    /**
     * 点击页码的函数，page为传递过来的数字
     */
    currentChange(page) {
      this.$emit("currentChange", page)
    },
    /**
     * 点击上一页的函数
     */
    prevClick(page) {
      this.$emit("prevPageChange", page)
    },
    nextClick(page) {
      this.$emit("nextPageChange", page)
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(this.handleColumn)
      if (!this.isHasHandle) return
      return this.handleColumn({ row, column, rowIndex, columnIndex })
    },
    // 打开弹框
    openDialog() {
      console.log("this.tableCols", this.tableCols)
      this.dialogVisible = true
    },
    toClose() {
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
// 选择列的样式
.el-checkbox {
  color: #fff !important;
}
// 弹出框的样式
::v-deep .el-dialog__header {
  display: none;
}
::v-deep .el-dialog__body {
  padding: 0px;
  /* background: #00132a; */
  background: #ccc;
}
//整个table的背景颜色
::v-deep .el-table {
  font-size: 15px !important;
  color: var(--make-base-text);
  border-top: 1px solid #1683af;
  /* border-left: 1px solid #1683af; */
  /* border-left: none; */
  background-color: transparent !important;
}
::v-deep .cell {
  padding: 0px !important;
}
::v-deep .el-table th {
  padding: 7px 0;
  /* padding: 0px; */
  background-color: transparent;
  /* border-left: 1px solid #1683af; */
  border-right: 1px solid #1683af;
  border-bottom: 1px solid #1683af !important;
  /* &:first-child {
    border-left: 1px solid #1683af;
  } */
}
::v-deep .el-table td {
  padding: 7px 0;
  /* padding: 0px; */
  border-right: 1px solid #1683af;
  border-bottom: 1px solid #1683af;
  /* &:first-child {
    border-left: 1px solid #1683af;
  } */
}
::v-deep .el-table tr {
  background-color: transparent !important; //每一行透明
}
::v-deep .el-table::before,
.el-table::after {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
::v-deep .el-table tbody tr:hover > td {
  background-color: transparent !important;
}
::v-deep .el-table--group {
  border-left-color: #1683af;
}
::v-deep .el-table--border {
  border-left-color: #1683af;
}

.setting {
  // text-align: right;
}

.column-container {
  .colnmn {
    margin-bottom: 10px;
  }
}
</style>
