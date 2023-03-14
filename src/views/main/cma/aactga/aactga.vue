<template>
  <div class="page-main">
    <!-- AA生产看板 -->
    <div>
      <dv-border-box-11 title="AA生产看板">
        <div class="container">
          <div class="item">
            <div class="header">
              <div class="header-item">Device</div>
              <div class="header-item">Machine</div>
              <div class="header-item">Target</div>
              <div class="header-item">OutPut</div>
              <div class="header-item">HitRate</div>
              <div class="header-item">1st Yield</div>
            </div>
            <div v-for="(item, index) in showArr" :key="index" class="every-item one-item">
              <div class="show">{{ item.Device }}</div>
              <div class="show">{{ item.Machine }}</div>
              <div class="show">{{ item.Target }}</div>
              <div class="show">{{ item.OutPut }}</div>
              <div class="show">{{ item.HitRate }}</div>
              <div class="show">{{ item["1st Yield"] }}</div>
            </div>
          </div>
          <div class="item">
            <div class="header">
              <div class="header-item">Device</div>
              <div class="header-item">Machine</div>
              <div class="header-item">Target</div>
              <div class="header-item">OutPut</div>
              <div class="header-item">HitRate</div>
              <div class="header-item">1st Yield</div>
            </div>
            <div v-for="(item, index) in showArr" :key="index" class="every-item">
              <div class="show">{{ item.Device }}</div>
              <div class="show">{{ item.Machine }}</div>
              <div class="show">{{ item.Target }}</div>
              <div class="show">{{ item.OutPut }}</div>
              <div class="show">{{ item.HitRate }}</div>
              <div class="show">{{ item["1st Yield"] }}</div>
            </div>
          </div>
          <div class="item">
            <div class="header">
              <div class="header-item">Device</div>
              <div class="header-item">Machine</div>
              <div class="header-item">Target</div>
              <div class="header-item">OutPut</div>
              <div class="header-item">HitRate</div>
              <div class="header-item">1st Yield</div>
            </div>
            <div v-for="(item, index) in showArr" :key="index" class="every-item">
              <div class="show">{{ item.Device }}</div>
              <div class="show">{{ item.Machine }}</div>
              <div class="show">{{ item.Target }}</div>
              <div class="show">{{ item.OutPut }}</div>
              <div class="show">{{ item.HitRate }}</div>
              <div class="show">{{ item["1st Yield"] }}</div>
            </div>
          </div>
        </div>
      </dv-border-box-11>
    </div>

    <div>
      <dv-border-box-11 title="CT生產看板">
        <div class="container">
          <div class="item">
            <div class="header">
              <div class="header-item">Device</div>
              <div class="header-item">Machine</div>
              <div class="header-item">Target</div>
              <div class="header-item">OutPut</div>
              <div class="header-item">HitRate</div>
              <div class="header-item">1st Yield</div>
            </div>
            <div v-for="(item, index) in showArr" :key="index" class="every-item">
              <div class="show">{{ item.Device }}</div>
              <div class="show">{{ item.Machine }}</div>
              <div class="show">{{ item.Target }}</div>
              <div class="show">{{ item.OutPut }}</div>
              <div class="show">{{ item.HitRate }}</div>
              <div class="show">{{ item["1st Yield"] }}</div>
            </div>
          </div>
          <div class="item">
            <div class="header">
              <div class="header-item">Device</div>
              <div class="header-item">Machine</div>
              <div class="header-item">Target</div>
              <div class="header-item">OutPut</div>
              <div class="header-item">HitRate</div>
              <div class="header-item">1st Yield</div>
            </div>
            <div v-for="(item, index) in showArr" :key="index" class="every-item">
              <div class="show">{{ item.Device }}</div>
              <div class="show">{{ item.Machine }}</div>
              <div class="show">{{ item.Target }}</div>
              <div class="show">{{ item.OutPut }}</div>
              <div class="show">{{ item.HitRate }}</div>
              <div class="show">{{ item["1st Yield"] }}</div>
            </div>
          </div>
          <div class="item">
            <div class="header">
              <div class="header-item">Device</div>
              <div class="header-item">Machine</div>
              <div class="header-item">Target</div>
              <div class="header-item">OutPut</div>
              <div class="header-item">HitRate</div>
              <div class="header-item">1st Yield</div>
            </div>
            <div v-for="(item, index) in showArr" :key="index" class="every-item">
              <div class="show">{{ item.Device }}</div>
              <div class="show">{{ item.Machine }}</div>
              <div class="show">{{ item.Target }}</div>
              <div class="show">{{ item.OutPut }}</div>
              <div class="show">{{ item.HitRate }}</div>
              <div class="show">{{ item["1st Yield"] }}</div>
            </div>
          </div>
        </div>
      </dv-border-box-11>
    </div>

    <div>
      <dv-border-box-11 title="GA生產看板">
        <div class="container">
          <div class="item">
            <div class="header">
              <div class="header-item">Device</div>
              <div class="header-item">Machine</div>
              <div class="header-item">Target</div>
              <div class="header-item">OutPut</div>
              <div class="header-item">HitRate</div>
              <div class="header-item">1st Yield</div>
            </div>

            <div v-for="(item, index) in showArr" :key="index" class="every-item">
              <div class="show">{{ item.Device }}</div>
              <div class="show">{{ item.Machine }}</div>
              <div class="show">{{ item.Target }}</div>
              <div class="show">{{ item.OutPut }}</div>
              <div class="show">{{ item.HitRate }}</div>
              <div class="show">{{ item["1st Yield"] }}</div>
            </div>
          </div>
          <div class="item">
            <div class="header">
              <div class="header-item">Device</div>
              <div class="header-item">Machine</div>
              <div class="header-item">Target</div>
              <div class="header-item">OutPut</div>
              <div class="header-item">HitRate</div>
              <div class="header-item">1st Yield</div>
            </div>
            <div v-for="(item, index) in showArr" :key="index" class="every-item">
              <div class="show">{{ item.Device }}</div>
              <div class="show">{{ item.Machine }}</div>
              <div class="show">{{ item.Target }}</div>
              <div class="show">{{ item.OutPut }}</div>
              <div class="show">{{ item.HitRate }}</div>
              <div class="show">{{ item["1st Yield"] }}</div>
            </div>
          </div>
          <div class="item">
            <div class="header">
              <div class="header-item">Device</div>
              <div class="header-item">Machine</div>
              <div class="header-item">Target</div>
              <div class="header-item">OutPut</div>
              <div class="header-item">HitRate</div>
              <div class="header-item">1st Yield</div>
            </div>

            <div v-for="(item, index) in showArr" :key="index" class="every-item three-item">
              <div class="show">{{ item.Device }}</div>
              <div class="show">{{ item.Machine }}</div>
              <div class="show">{{ item.Target }}</div>
              <div class="show">{{ item.OutPut }}</div>
              <div class="show">{{ item.HitRate }}</div>
              <div class="show is-red">{{ item["1st Yield"] }}</div>
            </div>
          </div>
        </div>
      </dv-border-box-11>
    </div>
  </div>
</template>

<script>
// 导入发送请求的函数
import { getData } from "@/api/aagact.js"
export default {
  name: "aactga",
  data() {
    return {
      showArr: [
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        },
        {
          Device: "JU",
          Machine: "AA1206",
          Target: "16,000",
          OutPut: "2,434",
          HitRate: "88.37 %",
          "1st Yield": "98.73 %"
        }
      ]
    }
  },
  created() {
    this.$store.commit("fullLoading/SET_TITLE", "AA/GA/CT")
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 60px 20px 20px 20px;
}
/* .is-red {
  background: rgb(228, 52, 52) !important;
} */
.page-main {
  width: 100%;
  height: 950px;
  padding-top: 20px;
  text-align: center;
}
.container {
  display: flex;
  height: 230px;
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

/* .three-item {
  .show {
    &:nth-child(3) {
      background: #92d050;
    }
  }
} */

/* .one-item {
  .show {
    &:nth-child(6) {
      background: #ff9;
      color: #000;
    }
  }
} */
</style>
