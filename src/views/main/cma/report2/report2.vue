<template>
  <div class="page-mian">
    <h1>hello world</h1>
  </div>
</template>

<script>
export default {
  name: "report1",
  props: {},
  components: {},
  data() {
    return {}
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "CMA的第二个报表")
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.page-mian {
  height: calc(100% - 120px);
  margin-top: 10px;
  border: 1px solid red;
}
</style>
