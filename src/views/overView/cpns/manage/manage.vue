<template>
  <div class="manage-container">
    <div class="title-container">
      <span class="title">{{ showDiv1.length > 0 ? showDiv1[0].belong : '' }}</span>
    </div>
    <div class="project-container">
      <template v-for="(item, index) in showDiv1">
        <div v-if="item.isShow" :key="index" class="container" @click="toProject(item)">
          <el-image class="image" fit="fill" :src="item.imgUrl"></el-image>
          <span class="title">{{ item.title }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
// 导入需要跳转路由配置
import { changeCmaConfig, baseShowArr } from "@/assets/data"
export default {
  name: "manage",
  computed: {
    showDiv1() {
      let { type } = this.$route.params
      // return this.showArr.get(type)
      return this.$store.state.permission.showArr[type]
    }
  },
  data() {
    return {
      showArr: new Map([
        [
          "output",
          [
            {
              id: 9,
              imgUrl: require("@/assets/images/output.png"),
              title: "年度產出總覽",
              target: "output",
              belong: "管理层/產出",
              to: "output"
            },
            {
              id: 11,
              imgUrl: require("@/assets/images/makewar.png"),
              title: "By天產出看板",
              target: "output",
              belong: "管理层/產出",
              to: "makewar"
            },
            {
              id: 10,
              imgUrl: require("@/assets/images/output2.png"),
              title: "By站位產出看板",
              target: "output",
              belong: "管理层/產出",
              to: "output2"
            },
            {
              id: 10,
              imgUrl: require("@/assets/images/aactga.png"),
              title: "AA/GA/CT",
              target: "output",
              belong: "管理层/產出",
              to: "aactga"
            }
          ]
        ],
        [
          "yield",
          [
            {
              id: 13,
              imgUrl: require("@/assets/images/sfc.png"),
              title: "SFC良率By月",
              target: "yield",
              belong: "管理层/良率",
              to: "sfc"
            },
            {
              id: 14,
              imgUrl: require("@/assets/images/tsfc.png"),
              title: "SFC良率Daily",
              target: "yield",
              belong: "管理层/良率",
              to: "tsfc"
            },
            {
              id: 15,
              imgUrl: require("@/assets/images/defect.png"),
              title: "Top 25 Defect",
              target: "yield",
              belong: "管理层/良率",
              to: "defect"
            }
          ]
        ],
        [
          "device",
          [
            {
              id: 1,
              imgUrl: require("@/assets/images/aa.png"),
              title: "AA設備總覽",
              target: "device",
              belong: "管理层/设备",
              to: "aa"
            },
            {
              id: 2,
              imgUrl: require("@/assets/images/fol.png"),
              title: "FOL設備總覽",
              target: "device",
              belong: "管理层/设备",
              to: "fol"
            }
          ]
        ],
        [
          "process",
          [
            {
              id: 4,
              isExternalLink: true,
              imgUrl: require("@/assets/images/spotcheck.jpg"),
              title: "IAA Step看板",
              target: "device",
              belong: "管理层/製程監控",
              to: "http://10.142.117.50:32001/standard/design/#/share/ZC1OY0JP"
            },
            {
              id: 108,
              isExternalLink: true,
              imgUrl: require("@/assets/images/device4.jpg"),
              title: "實時統計",
              target: "process",
              belong: "管理层/製程監控",
              to: "http://10.142.117.50:32001/share.html#/?token=KG3RHWT8"
            },
            {
              id: 109,
              isExternalLink: true,
              imgUrl: require("@/assets/images/device5.png"),
              title: "歷史日統計",
              target: "process",
              belong: "管理层/製程監控",
              to: "http://10.142.117.50:32001/share.html#/?token=PVAX4VH2"
            },
            {
              id: 110,
              isExternalLink: true,
              imgUrl: require("@/assets/images/device6.png"),
              title: "歷史周統計",
              target: "process",
              belong: "管理层/製程監控",
              to: "http://10.142.117.50:32001/share.html#/?token=AMM0V0AE"
            },
            {
              id: 111,
              isExternalLink: true,
              imgUrl: require("@/assets/images/device7.png"),
              title: "歷史月統計",
              target: "process",
              belong: "管理层/製程監控",
              to: "http://10.142.117.50:32001/share.html#/?token=YBWWHR2M"
            }
          ]
        ]
      ])
    }
  },
  methods: {
    toProject({ target, to, isExternalLink = false }) {
      if (isExternalLink) {
        // 打开新窗口
        window.open(to)
      } else {
        let path = this.$route.path
        this.$router.push({ name: to })
        this.$store.commit("fullLoading/SET_PATH", path)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.manage-container {
  width: 100%;
  height: 100%;
  .title-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .title {
      color: var(--cma-title);
      font-size: 25px;
      font-weight: bold;
      &::after {
        content: "";
        display: inline-block;
        width: 5px;
        height: 20px;
        margin: auto 15px;
        background: var(--cma-title);
      }
    }
  }
  .project-container {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(5, 1fr);
    gap: 50px 30px;
    align-content: center;
    .container {
      height: 180px;
      cursor: pointer;
      border: 1px solid var(--cma-container-border);
      position: relative;
      overflow: hidden;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0px 0px 15px var(--cma-box-shadow);
      .image {
        width: 100%;
        height: 100%;
        transition: 0.5s;
        &:hover {
          transform: scale(1.2);
        }
      }
      .title {
        display: inline-block;
        width: 100%;
        height: 35px;
        font-weight: bold;
        text-align: center;
        line-height: 35px;
        background: rgba(204, 204, 204, 0.7);
        color: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        transition: 0.5s;
      }
      &:hover {
        border: 1px solid #56c4f8;
      }
      &:hover .title {
        transform: translateX(-100%);
      }
    }
  }
  @media screen and (max-width: 1600px) {
    .project-container {
      grid-template-rows: repeat(4, 1fr);
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
