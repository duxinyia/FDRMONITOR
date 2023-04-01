<template>
  <div class="javi"></div>
</template>

<script>
export default {
  name: "javi",
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
.javi {
}
</style>
