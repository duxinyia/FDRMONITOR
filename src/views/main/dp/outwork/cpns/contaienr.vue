<template>
  <!-- <div
    class="page-main-a"
    v-loading="loading"
    element-loading-text="加载中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="#111e40"
  > -->
  <div class="page-main-a">
    <div>
      <dv-border-box-11 :title="`${cIndex}生產看板`">
        <div class="container">
          <div class="item" v-for="(v, i) in 3" :key="i">
            <div class="header">
              <div class="header-item" v-for="(item, index) in tabTitle" :key="index">
                {{ item }}
              </div>
            </div>
            <div v-for="(item, index) in showArr" :key="index" class="every-item">
              <div class="show" v-for="(ii, index) in item" :key="index">
                {{ ii }}
              </div>
            </div>
          </div>
        </div>
      </dv-border-box-11>
    </div>
  </div>
</template>

<script>
export default {
  name: "contaienr",
  props: ["cIndex"],
  data() {
    return {
      loading: true,
      tabTitle: ["Device", "Machine", "Build", "Target", "OutPut", "HitRate", "1st Yield"],
      showArr: [
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Build: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        }
      ]
    }
  },
  watch: {
    showData: {
      handler() {
        // console.log("showData", this.showData)
        this.loading = false
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 60px 20px 20px 20px;
}

.page-main-a {
  width: 173%;
  // height: 950px;
  padding-top: 5px;
  text-align: center;
}
.container {
  margin-top: 51px;
  display: flex;
  // height: 230px;
  .item {
    flex: 1;
    .header {
      display: flex;
      border-top: 1px solid #1683af;
      border-bottom: 1px solid #1683af;
      border-left: 1px solid #1683af;
      line-height: 35px;
      background: #243d97;
      .header-item {
        flex: 1;
        border-right: 1px solid #1683af;
      }
    }

    .every-item {
      display: flex;
      border-bottom: 1px solid #1683af;
      border-left: 1px solid #1683af;
      line-height: 30px;

      .show {
        flex: 1;
        border-right: 1px solid #1683af;
      }
    }

    &:nth-child(2) {
      margin: 0 20px;
    }
  }
}
</style>
