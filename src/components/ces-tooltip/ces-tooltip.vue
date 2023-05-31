<template>
  <!-- 是否需要动态显示什么列 -->
  <div class="setting" style="float: right; padding-right: 5px">
    <el-tooltip class="item" :effect="effect" :placement="placement">
      <div slot="content">
        <div class="column" v-for="item in tableCols" :key="item.name">
          <el-checkbox :style="checkboxStyle" v-model="item.show">{{ item.name }}</el-checkbox>
        </div>
      </div>
      <span><i class="el-icon-s-tools" style="cursor: pointer"></i></span>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: "ces-tooltip",
  props: {
    // tableCols:列数据
    tableCols: { type: Array, default: () => [] },
    // 主题颜色 "light":白色， "dark"：黑色
    effect: { type: String, default: "dark" },
    //Tooltip 的出现位置,有这些：top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
    placement: { type: String, default: "bottom-end" }
  },
  data() {
    return {}
  },
  computed: {
    checkboxStyle() {
      return this.effect === "dark" ? { color: "#fff" } : { color: "#000" }
    }
  },
  watch: {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
