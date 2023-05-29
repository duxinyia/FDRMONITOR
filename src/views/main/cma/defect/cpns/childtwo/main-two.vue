<template>
  <dv-border-box-12>
    <div class="main-two">
      <div class="main-row row-one">
        <div class="row-item">Time</div>
        <div class="row-item device" v-for="(item, index) in xData" :key="index" @click="toDetail">
          {{ item }}
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg">DPC</div>
        <div class="row-item" v-for="(item, index) in dpcs" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg">LCB</div>
        <div class="row-item" v-for="(item, index) in lcbs" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg">SFR</div>
        <div class="row-item" v-for="(item, index) in sfrs" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg border-right">VCM</div>
        <div class="row-item" v-for="(item, index) in vcms" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg border-right">FOL Cosmetic</div>
        <div class="row-item" v-for="(item, index) in fol_cosmetic" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg border-right">EOL Cosmetic</div>
        <div class="row-item" v-for="(item, index) in eol_cosmetic" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>

      <div class="main-row">
        <div class="row-item is-bg border-right">FOL Process</div>
        <div class="row-item" v-for="(item, index) in fol_process" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg border-right">EOL Process</div>
        <div class="row-item" v-for="(item, index) in eol_process" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>

      <div class="main-row">
        <div class="row-item is-bg border-right">Others-Test</div>
        <div class="row-item" v-for="(item, index) in others_tests" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg border-right">Others-Fol1</div>
        <div class="row-item" v-for="(item, index) in others_fol1s" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg border-right">Others-Fol2</div>
        <div class="row-item" v-for="(item, index) in others_fol2s" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg border-right">Others-Eol</div>
        <div class="row-item" v-for="(item, index) in others_eols" :key="index">
          <span class="qty">{{ item.qty }}</span>
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg border-right">Total</div>
        <div class="row-item is-bg" v-for="(item, index) in totalNum" :key="index">
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
    "fol_cosmetic",
    "eol_cosmetic",
    "fol_others",
    "eol_others",
    "fol_process",
    "eol_process",
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
      /* width: 7.69%; */
      width: 33.3%;
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
