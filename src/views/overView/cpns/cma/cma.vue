<template>
  <div class="cma-container">
    <div v-for="(item, index) in showDiv" :key="index" class="container" @click="toProject(item)">
      <el-image class="image" fit="fill" :src="item.imgUrl"> </el-image>
      <span class="info">{{ item.info }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "cma",
  data() {
    return {
      showDivMap: new Map([
        [
          "device",
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
              isExternalLink: true,
              imgUrl: require("@/assets/images/spotcheck.jpg"),
              info: "AA PDI AI 檢測界面",
              to: "http://10.142.117.50:32001/standard/design/#/share/OS4L2ZWV"
            }
          ]
        ],
        [
          "make",
          [
            {
              id: 3,
              imgUrl: require("@/assets/images/output.png"),
              info: "產出可視化平台",
              to: "output"
            },
            {
              id: 4,
              imgUrl: require("@/assets/images/output2.png"),
              info: "九宮格產出看板",
              to: "output2"
            },
            {
              id: 6,
              imgUrl: require("@/assets/images/makewar.png"),
              info: "製造戰情中心",
              to: "makewar"
            }
          ]
        ],
        [
          "yield",
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
      ]),
      showDiv: []
    }
  },
  watch: {
    $route: {
      handler(newValue) {
        let { type } = newValue.params
        this.showDiv = this.showDivMap.get(type)
      },
      immediate: true
    }
  },
  created() {
    let { type } = this.$route.params
    this.showDiv = this.showDivMap.get(type)
  },
  methods: {
    toProject({ to, isExternalLink = false }) {
      if (isExternalLink) {
        // 打开新窗口
        window.open(to)
      } else {
        this.$router.push({ name: to })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cma-container {
  display: flex;
  flex-wrap: wrap;
  .container {
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
</style>
