<template>
  <div class="rerate">
    <ces-table :tableData="tableData" :tableCols="tableCols"> </ces-table>
  </div>
</template>

<script>
export default {
  name: "rerate",
  props: {},
  components: {},
  data() {
    return {
      tableData: [],
      tableCols: [
        {
          id: "",
          name: "Cft",
          chileColumn: [{ id: "device", name: "機種" }]
        },
        {
          id: "",
          name: "Mc",
          chileColumn: [{ id: "device", name: "機種" }]
        },
        {
          id: "",
          name: "History Input",
          chileColumn: [
            {
              id: "device",
              name: "投入數量",
              chileColumn: [
                { id: "device", name: "Today-3" },
                { id: "device", name: "Today-2" },
                { id: "device", name: "Today-1" }
              ]
            }
          ]
        },
        {
          id: "",
          name: "History Fail Qty",
          chileColumn: [
            {
              id: "device",
              name: "不良數量",
              chileColumn: [
                { id: "device", name: "Today-3" },
                { id: "device", name: "Today-2" },
                { id: "device", name: "Today-1" }
              ]
            }
          ]
        },
        {
          id: "",
          name: "History Rate%",
          chileColumn: [
            {
              id: "device",
              name: "不良比率",
              chileColumn: [
                { id: "device", name: "Today-3" },
                { id: "device", name: "Today-2" },
                { id: "device", name: "Today-1" }
              ]
            }
          ]
        },
        {
          id: "",
          name: "Input",
          chileColumn: [{ id: "device", name: "投入数量" }]
        },
        {
          id: "",
          name: "Fail QTY",
          chileColumn: [{ id: "device", name: "不良数" }]
        },
        {
          id: "",
          name: "Rate%",
          chileColumn: [{ id: "device", name: "不良比率" }]
        },
        {
          id: "",
          name: "Rate%",
          chileColumn: [{ id: "device", name: "不良比率" }]
        }
      ]
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "Lens Reject rate")
    this.tableData = []
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
