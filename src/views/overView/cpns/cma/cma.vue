<template>
  <div class="cma-container">
    <div class="wrapper" v-for="(item, index) in divArr" :key="index">
      <h3 class="name">{{ title[index] }}</h3>
      <div class="child-container">
        <div v-for="child in item" :key="child.id" class="child" @click="childClick(child)">
          <el-image class="image" fit="fill" :src="child.imgUrl"> </el-image>
          <span class="info">{{ child.info }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cma",
  data() {
    return {
      title: ["设备总览", "制造总览", "良率总览"],
      divArr: [
        // 设备总览
        [
          {
            id: 1,
            imgUrl: require("@/assets/images/aa.png"),
            info: "AA設備總覽",
            to: "aa"
          },
          {
            id: 2,
            imgUrl: require("@/assets/images/fol.png"),
            info: "FOL設備總覽",
            to: "fol"
          },
          {
            id: 3,
            imgUrl: require("@/assets/images/output.png"),
            info: "產出可視化平台",
            to: "output"
          }
        ],
        // 制造总览
        [
          {
            id: 4,
            imgUrl: require("@/assets/images/output2.png"),
            info: "九宮格產出看板",
            to: "output2"
          },
          // {
          //   id: 5,
          //   imgUrl: require("@/assets/images/aa.png"),
          //   info: "製造層",
          //   to: "make"
          // },
          {
            id: 6,
            imgUrl: require("@/assets/images/makewar.png"),
            info: "製造戰情中心",
            to: "makewar"
          }
        ],
        [
          // 良率总览
          {
            id: 7,
            imgUrl: require("@/assets/images/sap.png"),
            info: "SAP良率",
            to: "sap"
          },
          {
            id: 8,
            imgUrl: require("@/assets/images/sap.png"),
            info: "SFC良率",
            to: "sfc"
          },
          {
            id: 9,
            imgUrl: require("@/assets/images/tsfc.png"),
            info: "SFC总良率预览",
            to: "tsfc"
          }
        ]
      ]
    }
  },
  methods: {
    childClick({ to }) {
      this.$router.push({ name: to })
    }
  }
}
</script>

<style lang="scss" scoped>
.cma-container {
  .wrapper {
    .name {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 5px;
      color: aqua;
    }
    .child-container {
      display: flex;
      margin-bottom: 30px;
      .child {
        cursor: pointer;
        border: 3px solid transparent;
        position: relative;
        overflow: hidden;
        margin-right: 30px;
        border-radius: 5px;
        .image {
          width: 300px;
          height: 200px;
          transition: 0.5s;
          &:hover {
            transform: scale(1.2);
          }
        }
        .info {
          display: inline-block;
          width: 100%;
          height: 35px;
          font-weight: bold;
          text-align: center;
          line-height: 35px;
          background: rgba(204, 204, 204, 0.4);
          color: rgba(255, 255, 255, 0.8);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          transition: 0.5s;
        }
        &:hover {
          border: 3px solid #ccc;
        }
        &:hover .info {
          transform: translateX(-100%);
        }
      }
    }
  }
}
</style>
