<template>
  <div class="jtest"></div>
</template>

<script>
export default {
  name: "jtest",
  props: {},
  components: {},
  data() {
    return {}
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "TEST")
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.jtest {
}
</style>
