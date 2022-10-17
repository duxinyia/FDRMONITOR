<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :before-close="toClose"
    :close-on-click-modal="false"
    top="20vh"
    width="40%"
  >
    <dv-border-box-11 title="戰情中心" :key="dialogKey">
      <svg-icon className="closeIcon" icon-class="close" @click="toClose" />
      <div class="container">
        <router-link
          tag="div"
          v-for="item in screenArr"
          :to="{ name: item.path }"
          :key="item.id"
          class="project"
        >
          <span class="name">{{ item.name }}</span>
        </router-link>
      </div>
    </dv-border-box-11>
  </el-dialog>
</template>

<script>
export default {
  name: "project-dialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogKey: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      screenArr: [
        { id: 1, name: "AA設備總覽", path: "aa" },
        { id: 2, name: "FOL設備總覽", path: "fol" },
        { id: 3, name: "產出可視化平台", path: "output" },
        { id: 4, name: "九宮格產出看板", path: "output2" },
        // { id: 5, name: "製造層", path: "make" },
        { id: 6, name: "製造戰情中心", path: "makewar" }
      ]
    }
  },
  methods: {
    toClose() {
      this.$emit("update:dialogVisible", false)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  display: none;
}
::v-deep .el-dialog__body {
  padding: 10px 5px 5px 5px;
  background: #00132a;
}
::v-deep .border-box-content {
  padding: 60px 20px 20px 20px;
}
.container {
  padding: 10px;
  display: grid;
  gap: 20px 15px;
  color: #fff;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  .project {
    height: 40px;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: inset 0 0 10px rgb(139, 111, 255);
    .name {
      z-index: 9;
    }
    &::before {
      content: "";
      width: 0;
      height: 100%;
      align-self: center;
      position: absolute;
      background: rgba(139, 111, 255, 0.4);
      transform: skewX(-45deg);
      transition: all 0.5s;
    }
    &:hover::before {
      width: 120%;
    }
  }
}
.router-link-active {
  background: rgba(139, 111, 255, 0.8);
}
.closeIcon {
  position: absolute;
  right: 4px;
  top: 2px;
  width: 30px;
  height: 30px;
  color: #2d66e2;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transform: rotate(90deg);
  }
}
</style>
