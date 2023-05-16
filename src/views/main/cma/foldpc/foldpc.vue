<template>
  <ces-table
    :tableData="tableData"
    :tableCols="tableCols"
    :tableWidths="tableWidths"
    tableHeight="900"
    :handleColumn="objectSpanMethod"
    isHasHandle
  >
    <template v-for="column in columns" #[column]="{ row }">
      <div class="lamp-container" :key="column">
        <span class="lamp" :style="changeStyle(row, column)"></span>
        <span class="text">{{ row[column] || "-" }}</span>
      </div>
    </template>
  </ces-table>
</template>

<script>
import { getTableList } from "@/api/cma/yielddetail.js"
export default {
  name: "follcb",
  props: ["device"],
  data() {
    return {
      tableData: [],
      columns: ["5-0", "6-0", "7-0", "8-0", "9-0", "10-0", "11-0"],
      tableCols: [],
      tableWidths: [80, 80, 400, 100, 100],
      targetArr: {},
      // 红 绿  黄
      colors1: ["rgba(255, 0, 102, 0.9)", "rgba(0, 255, 0, 0.9)", "rgba(255, 255, 0, 0.9)"],
      colors: [
        "radial-gradient(50% 50%, rgba(255, 0, 102, 0.5) 50%, rgba(255, 0, 102, 1) 100%)",
        "radial-gradient(50% 50%, rgba(0, 255, 0, 0.5) 50%, rgba(0, 255, 0, 1) 100%)",
        "radial-gradient(50% 50%, rgba(255, 255, 0, 0.5) 50%, rgba(255, 255, 0, 1) 100%)"
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      let res = await getTableList({ device: this.device, DefectType: "DPC" })
      console.log("res", res)
      this.tableCols = res.columns
      // 循环 columns 找到以为 - 的数据，现成一个对象
      res.columns.forEach((column) => {
        if (column.chileColumn.length > 0) {
          let { id, name } = column.chileColumn[0]
          this.targetArr[id] = name
        }
      })
      let tempArr = []
      res.rows.forEach((item) => {
        let tempObj = {}
        item.forEach((childItem) => {
          let { columnID, value } = childItem
          tempObj[columnID] = value
        })
        tempArr.push(tempObj)
      })
      this.tableData = tempArr
    },
    changeStyle(row, columnId) {
      // console.log("row", row, columnId)
      // 取出 row 中的 columnId 的值
      let result = parseFloat(row[columnId])
      // 取出target
      let target = parseFloat(this.targetArr[columnId])
      if (!isNaN(result) && target) {
        // console.log(result, target)
        if (result < target) {
          // 绿色
          return { background: this.colors[1], color: this.colors[1] }
        } else if (result > target * 2) {
          return { background: this.colors[0], color: this.colors[0] }
        } else {
          return { background: this.colors[2], color: this.colors[2] }
        }
      }
      return { background: "transparent", color: "transparent" }
    },

    /**表格合并单元格 */
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 判断哪一列 如果需要处理多了 使用 || 进行处理即可
      if (columnIndex === 1) {
        const _row = this.flitterData(this.tableData).one[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 0) {
        const _row = this.flitterData1(this.tableData).one[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    /**合并表格的第一列，处理表格数据 */
    flitterData(arr) {
      let spanOneArr = []
      let concatOne = 0
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1)
        } else {
          // 注意这里的data是表格绑定的字段，根据自己的需求来改
          if (item["1"] === arr[index - 1]["1"]) {
            //第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1
            spanOneArr.push(0)
          } else {
            spanOneArr.push(1)
            concatOne = index
          }
        }
      })
      return {
        one: spanOneArr
      }
    },
    flitterData1(arr) {
      let spanOneArr = []
      let concatOne = 0
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1)
        } else {
          // 注意这里的data是表格绑定的字段，根据自己的需求来改
          if (item["0"] === arr[index - 1]["0"]) {
            //第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1
            spanOneArr.push(0)
          } else {
            spanOneArr.push(1)
            concatOne = index
          }
        }
      })
      return {
        one: spanOneArr
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lamp-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
</style>
