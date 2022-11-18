<template>
  <div class="main-two">
    <div class="contaienr">
      <div class="floor-name">F20-4F</div>
      <div v-for="item in textArr" :style="changeStyle(item)" :key="item.type">{{item.type}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-two",
  data() {
    return {
      textArr: [
        {
          type: "1",
          x: "10px",
          y: "10px",
          w: "50px",
          h: "50px"
        },
        {
          type: "2",
          x: "200px",
          y: "30px",
          w: "50px",
          h: "50px"
        }
      ]
    }
  },
  methods: {
    changeStyle(item) {
      let { x, y, w, h } = item
      return {
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        display: "inline-block",
        border: "1px solid red"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.contaienr {
  position: relative;
  .floor-name {
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 20px;
    background: #00b0f0;
  }
}
</style>
