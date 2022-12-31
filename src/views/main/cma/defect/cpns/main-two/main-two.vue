<template>
  <dv-border-box-10 :color="changeBoxColor">
    <div class="main-two">
      <div class="main-row row-one">
        <div class="row-item">Time</div>
        <div class="row-item" v-for="(item, index) in xData" :key="index">{{ item }}</div>
      </div>
      <div class="main-row">
        <div class="row-item">Overall Yield</div>
        <div class="row-item" v-for="(item, index) in OverallYield" :key="index">{{ item }}</div>
      </div>
      <div class="main-row">
        <div class="row-item">Target Yield</div>
        <div class="row-item" v-for="(item, index) in TargetYield" :key="index">{{ item }}</div>
      </div>
      <div class="main-row">
        <div class="row-item">DefectName</div>
        <div class="row-item" v-for="item in 12" :key="item">
          <span class="qty">Qty</span>
          <span class="rate">Rate</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg">DPC</div>
        <div class="row-item" v-for="(item, index) in dpcs" :key="index">
          <span class="qty">{{ item.qty }}</span
          >&nbsp;
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg">LCB</div>
        <div class="row-item" v-for="(item, index) in lcbs" :key="index">
          <span class="qty">{{ item.qty }}</span
          >&nbsp;
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg">SFR</div>
        <div class="row-item" v-for="(item, index) in sfrs" :key="index">
          <span class="qty">{{ item.qty }}</span
          >&nbsp;
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg border-right">FOL Cosmetic</div>
        <div class="row-item" v-for="(item, index) in fol_cosmetic" :key="index">
          <span class="qty">{{ item.qty }}</span
          >&nbsp;
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg border-right">EOL Cosmetic</div>
        <div class="row-item" v-for="(item, index) in eol_cosmetic" :key="index">
          <span class="qty">{{ item.qty }}</span
          >&nbsp;
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg border-right">FOL Others</div>
        <div class="row-item" v-for="(item, index) in fol_others" :key="index">
          <span class="qty">{{ item.qty }}</span
          >&nbsp;
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg border-right">EOL Others</div>
        <div class="row-item" v-for="(item, index) in eol_others" :key="index">
          <span class="qty">{{ item.qty }}</span
          >&nbsp;
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg border-right">FOL Process</div>
        <div class="row-item" v-for="(item, index) in fol_process" :key="index">
          <span class="qty">{{ item.qty }}</span
          >&nbsp;
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg border-right">EOL Process</div>
        <div class="row-item" v-for="(item, index) in eol_process" :key="index">
          <span class="qty">{{ item.qty }}</span
          >&nbsp;
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
      <div class="main-row">
        <div class="row-item is-bg border-right">Total</div>
        <div class="row-item is-bg" v-for="(item, index) in totalNum" :key="index">
          <span class="qty">{{ item.total }}</span
          >&nbsp;
          <span class="rate">{{ item.rate }}</span>
        </div>
      </div>
    </div>
  </dv-border-box-10>
</template>

<script>
export default {
  name: "main-two",
  props: [
    "xData",
    "OverallYield",
    "TargetYield",
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
  computed: {
    changeBoxColor() {
      return this.$store.getters.theme == "dark" ? ["#6586ec", "#2cf7fe"] : ["#05dad4", "#2c97e1"]
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .border-box-content {
  padding: 20px;
}
.is-bg {
  background: var(--defect-row-one);
  color: #fff !important;
}
/* .cur-pointer {
  cursor: pointer;
} */
.row-one {
  background: var(--defect-row-one);
  color: #fff !important;
}
.main-two {
  border: 1px solid var(--defect-border);
  color: var(--defect-text);
  .main-row {
    display: flex;
    height: 36px;
    border-bottom: 1px solid var(--defect-border);
    line-height: 36px;
    &:last-child {
      border-bottom: none;
    }
    .row-item {
      width: 7.69%;
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
