<template>
  <dv-border-box-12>
    <div class="main-two">
      <div class="main-row row-one">
        <div class="row-item width10">Time</div>
        <div class="row-item device width45" v-for="(item, index) in xData" :key="index" @click="toDetail">
          {{ item }}
        </div>
      </div>
      <div class="main-row">
        <div class="row-item width10 is-bg">DPC</div>
        <div class="row-item width45" v-for="(item, index) in dpcs" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item width10 is-bg">LCB</div>
        <template v-if="lcbs.length == 0">
          <div class="row-item width45" v-for="(item, index) in [{}, {}]" :key="index">
            <span class="qty">-</span>
            <span class="rate">-</span>
          </div>
        </template>
        <template v-else>
          <div class="row-item width45" v-for="(item, index) in lcbs" :key="index">
            <span class="qty">{{ item.qty || "-" }}</span>
            <span class="rate">{{ item.rate || "-" }}</span>
          </div>
        </template>
      </div>
      <div class="main-row">
        <div class="row-item width10 is-bg">SFR</div>
        <div class="row-item width45" v-for="(item, index) in sfrs" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item width10 is-bg border-right">VCM</div>
        <template v-if="vcms.length == 0">
          <div class="row-item width45" v-for="(item, index) in [{}, {}]" :key="index">
            <span class="qty">-</span>
            <span class="rate">-</span>
          </div>
        </template>
        <template v-else>
          <div class="row-item width45" v-for="(item, index) in vcms" :key="index">
            <span class="qty">{{ item.qty || "-" }}</span>
            <span class="rate">{{ item.rate || "-" }}</span>
          </div>
        </template>
      </div>
      <div class="main-row">
        <div class="row-item width10 is-bg border-right">FOL Cosmetic</div>
        <div class="row-item width45" v-for="(item, index) in fol_cosmetic" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item width10 is-bg border-right">EOL Cosmetic</div>
        <div class="row-item width45" v-for="(item, index) in eol_cosmetic" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>

      <div class="main-row">
        <div class="row-item width10 is-bg border-right">FOL Process</div>
        <div class="row-item width45" v-for="(item, index) in fol_process" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item width10 is-bg border-right">EOL Process</div>
        <div class="row-item width45" v-for="(item, index) in eol_process" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>

      <div class="main-row">
        <div class="row-item width10 is-bg border-right">Others-Test</div>
        <template v-if="others_tests.length == 0">
          <div class="row-item width45" v-for="(item, index) in [{}, {}]" :key="index">
            <span class="qty">-</span>
            <span class="rate">-</span>
          </div>
        </template>
        <template v-else>
          <div class="row-item width45" v-for="(item, index) in others_tests" :key="index">
            <span class="qty">{{ item.qty || "-" }}</span>
            <span class="rate">{{ item.rate || "-" }}</span>
          </div>
        </template>
      </div>
      <div class="main-row">
        <div class="row-item width10 is-bg border-right">Others-Fol1</div>
        <template v-if="others_fol1s.length == 0">
          <div class="row-item width45" v-for="(item, index) in [{}, {}]" :key="index">
            <span class="qty">-</span>
            <span class="rate">-</span>
          </div>
        </template>
        <template v-else>
          <div class="row-item width45" v-for="(item, index) in others_fol1s" :key="index">
            <span class="qty">{{ item.qty || "-" }}</span>
            <span class="rate">{{ item.rate || "-" }}</span>
          </div>
        </template>
      </div>
      <div class="main-row">
        <div class="row-item width10 is-bg border-right">Others-Fol2</div>
        <template v-if="others_fol2s.length == 0">
          <div class="row-item width45" v-for="(item, index) in [{}, {}]" :key="index">
            <span class="qty">-</span>
            <span class="rate">-</span>
          </div>
        </template>
        <template v-else>
          <div class="row-item width45" v-for="(item, index) in others_fol2s" :key="index">
            <span class="qty">{{ item.qty || "-" }}</span>
            <span class="rate">{{ item.rate || "-" }}</span>
          </div>
        </template>
      </div>
      <div class="main-row">
        <div class="row-item width10 is-bg border-right">Others-Eol</div>
        <template v-if="others_eols.length == 0">
          <div class="row-item width45" v-for="(item, index) in [{}, {}]" :key="index">
            <span class="qty">-</span>
            <span class="rate">-</span>
          </div>
        </template>
        <template v-else>
          <div class="row-item width45" v-for="(item, index) in others_eols" :key="index">
            <span class="qty">{{ item.qty || "-" }}</span>
            <span class="rate">{{ item.rate || "-" }}</span>
          </div>
        </template>
      </div>
      <div class="main-row">
        <div class="row-item width10 is-bg border-right">Total</div>
        <div class="row-item is-bg width45" v-for="(item, index) in totalNum" :key="index">
          <span class="qty">{{ item.total }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
    </div>
  </dv-border-box-12>
</template>

<script>
export default {
  name: "main-two",
  props: [
    "xData",
    "dpcs",
    "lcbs",
    "sfrs",
    "vcms",
    "fol_cosmetic",
    "eol_cosmetic",
    "fol_process",
    "eol_process",
    "others_tests",
    "others_fol1s",
    "others_fol2s",
    "others_eols",
    "totalNum"
  ],

  methods: {
    toDetail() {
      this.$router.push({ name: "defectdetail" })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
}
.is-bg {
  background: #264380;
  color: #fff !important;
}

.row-one {
  background: #264380;
  color: #fff !important;
  .device {
    cursor: pointer;
  }
}
.width10 {
  width: 10%;
}
.width45 {
  width: 45%;
}
.main-two {
  border: 1px solid var(--defect-border);
  color: var(--defect-text);
  .main-row {
    display: flex;
    height: 33px;
    border-bottom: 1px solid var(--defect-border);
    line-height: 33px;
    &:last-child {
      border-bottom: none;
    }
    .row-item {
      /* width: 33.3%; */
      text-align: center;
      border-right: 1px solid var(--defect-border);
      &:last-child {
        border-right: none;
      }
      .qty,
      .rate {
        display: inline-block;
        width: 48%;
      }
      .qty {
        border-right: 1px solid var(--defect-border);
      }
    }
  }
}
</style>
