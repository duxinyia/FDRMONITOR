<template>
  <div class="switch-btns">
    <span class="left-icon-container" @click="directionChange('left')" :style="leftConfig">
      <i class="iconfont icon-shangyiye icon2"></i>
      <i class="iconfont icon-shangyiye icon1"></i>
      <i class="iconfont icon-shangyiye icon"></i>
    </span>
    <span @click="directionChange('right')" :style="rightConfig">
      <i class="iconfont icon-xiayiye icon"></i>
      <i class="iconfont icon-xiayiye icon1"></i>
      <i class="iconfont icon-xiayiye icon2"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "change-switch",
  props: ["leftConfig", "rightConfig"],
  data() {
    return {}
  },
  created() {},
  methods: {
    directionChange(direction) {
      this.$emit("directionChange", direction)
    }
  }
}
</script>

<style lang="scss" scoped>
.switch-btns {
  span {
    position: absolute;
    width: 120px;
    height: 50px;
    text-align: center;
    animation: twinkle 2s infinite;
    cursor: pointer;
    .icon {
      font-weight: bold;
      font-size: 25px;
      color: var(--aa-bottom-icon);
    }
    .icon1 {
      font-weight: bold;
      font-size: 25px;
      color: var(--aa-bottom-icon1);
    }
    .icon2 {
      font-weight: 800;
      font-size: 25px;
      color: var(--aa-bottom-icon2);
    }
  }
}

@keyframes twinkle {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  to {
    opacity: 1;
  }
}
</style>
