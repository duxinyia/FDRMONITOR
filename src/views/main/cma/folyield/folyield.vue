<template>
  <div class="folyield"></div>
</template>

<script>
export default {
  name: "folyield",
  props: {},
  components: {},
  data() {
    return {}
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "FOL Yield Report")
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.folyield {
}
</style>
