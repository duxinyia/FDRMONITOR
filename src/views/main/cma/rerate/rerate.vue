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
          prop: "",
          label: "Cft",
          childColumn: [{ prop: "device", label: "機種" }]
        },
        {
          prop: "",
          label: "Mc",
          childColumn: [{ prop: "device", label: "機種" }]
        },
        {
          prop: "",
          label: "Mc",
          childColumn: [
            {
              prop: "device",
              label: "投入數量",
              childColumn: [
                { prop: "device", label: "機種" },
                { prop: "device", label: "機種" },
                { prop: "device", label: "機種" }
              ]
            }
          ]
        },
        {
          prop: "",
          label: "Mc",
          childColumn: [
            {
              prop: "device",
              label: "投入數量",
              childColumn: [
                { prop: "device", label: "機種" },
                { prop: "device", label: "機種" },
                { prop: "device", label: "機種" }
              ]
            }
          ]
        }
      ]
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "Lens Reject rate")
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.rerate {
}
</style>
