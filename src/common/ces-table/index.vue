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
          >{{ item.label }}</el-button
        >
      </section>
    </section>
    <!-- 表格组件 -->
    <section class="ces-table">
      <el-table
        :header-cell-style="{ background: 'transparent !important', color: '#1adafb' }"
        :data="tableData"
        style="width: 100%"
        :border="isBorder"
        v-loading="loading"
      >
        <!-- 是否有前面的多选效果 -->
        <el-table-column type="selection" width="55" align="center" v-if="isSelection">
        </el-table-column>
        <!-- 是否显示前面的序号 -->
        <el-table-column v-if="isIndex" type="index" :label="indexLabel" align="center" width="50">
        </el-table-column>
        <!-- 表格的每一项：表格列数据 -->
        <el-table-column
          v-for="item in tableCols"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :key="item.prop"
          :sortable="item.isSortable || false"
          :width="item.width"
        >
          <!-- 如果嵌套标题 -->
          <template v-if="item.childColumn">
            <el-table-column
              v-for="childitem in item.childColumn"
              :prop="childitem.prop"
              :label="childitem.label"
              align="center"
              :key="childitem.prop"
              :sortable="childitem.isSortable || false"
              :width="childitem.width"
            >
              <template v-if="childitem.childColumn">
                <el-table-column
                  v-for="childitem2 in childitem.childColumn"
                  :prop="childitem2.prop"
                  :label="childitem2.label"
                  align="center"
                  :key="childitem2.prop"
                  :sortable="childitem2.isSortable || false"
                  :width="childitem2.width"
                >
                  <template #default="scope">
                    <slot :name="childitem2.prop" :row="scope.row">
                      {{ scope.row[childitem2.prop] }}
                    </slot>
                  </template>
                </el-table-column>
              </template>
              <template #default="scope">
                <slot :name="childitem.prop" :row="scope.row">
                  {{ scope.row[childitem.prop] }}
                </slot>
              </template>
            </el-table-column>
          </template>
          <template #default="scope">
            <slot :name="item.prop" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
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
  </section>
</template>

<script>
export default {
  name: "cesTable",
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
    // 8. 表格上面的操作
    isHandle: { type: Boolean, default: false },
    tableHandles: { type: Array, default: () => [] }
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
    }
  }
}
</script>
<style lang="scss" scoped>
/* 修改表格的一些样式 */
/* ::v-deep .el-table {
  background: transparent;
  border: 1px solid #1683af;
}
::v-deep .el-table tr {
  background: transparent;
  color: #fff;
}
::v-deep .el-table th {
  border-right: 1px solid #1683af;
  border-bottom: 1px solid #1683af !important;
}
::v-deep .el-table td {
  border-right: 1px solid #1683af;
  border-bottom: 1px solid #1683af;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background: transparent;
}
::v-deep .el-table .el-table__cell {
  padding: 5px 0px;
}
::v-deep .el-table th.el-table__cell > .cell {
  padding: 0px;
}
::v-deep .el-table::before,
.el-table::after {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
::v-deep .el-table td {
  padding: 7px 0 !important;
  border-right: 1px solid #1683af;
  border-bottom: 1px solid #1683af;
} */

//整个table的背景颜色
::v-deep .el-table {
  font-size: 15px !important;
  color: var(--make-base-text);
  border: 1px solid #1683af;
  background-color: transparent !important; //主体框透明透明
}
::v-deep .cell {
  padding: 0px !important;
}
::v-deep .el-table th {
  padding: 7px 0 !important;
  background-color: transparent;
  border-right: 1px solid #1683af;
  border-bottom: 1px solid #1683af !important;
}
::v-deep .el-table td {
  padding: 7px 0 !important;
  border-right: 1px solid #1683af;
  border-bottom: 1px solid #1683af;
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
</style>
