<template>
  <div class="jsa"></div>
</template>

<script>
export default {
  name: "jsa",
  props: {},
  components: {},
  data() {
    return {}
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "AVI效率看板")
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.jsa {
}
</style>
