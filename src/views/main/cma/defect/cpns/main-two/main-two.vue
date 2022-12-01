<template>
  <div class="main-two">
    <div class="main-row">
      <div class="row-item">Time</div>
      <div class="row-item" v-for="(item,index) in xData" :key="index">{{item}}</div>
    </div>
    <div class="main-row">
      <div class="row-item">Overall Yield</div>
      <div class="row-item" v-for="(item,index) in OverallYield" :key="index">{{item}}</div>
    </div>
    <div class="main-row">
      <div class="row-item">Target Yield</div>
      <div class="row-item" v-for="(item,index) in TargetYield" :key="index">{{item}}</div>
    </div>
    <div class="main-row">
      <div class="row-item">DefectName</div>
      <div class="row-item" v-for="item in 12" :key="item">
        <span>Qty</span>
        <span>Rate</span>
      </div>
    </div>
    <div class="main-row">
      <div class="row-item">DPC</div>
      <div class="row-item" v-for="(item,index) in dpcs" :key="index">
        <span>{{item.qty}}</span>&nbsp;
        <span>{{item.rate}}</span>
      </div>
    </div>
    <div class="main-row">
      <div class="row-item">LCB</div>
      <div class="row-item" v-for="(item,index) in lcbs" :key="index">
        <span>{{item.qty}}</span>&nbsp;
        <span>{{item.rate}}</span>
      </div>
    </div>
    <div class="main-row">
      <div class="row-item">SFR</div>
      <div class="row-item" v-for="(item,index) in sfrs" :key="index">
        <span>{{item.qty}}</span>&nbsp;
        <span>{{item.rate}}</span>
      </div>
    </div>
    <div class="main-row">
      <div class="row-item">FOL Cosmetic</div>
      <div class="row-item" v-for="(item,index) in fol_cosmetic" :key="index">
        <span>{{item.qty}}</span>&nbsp;
        <span>{{item.rate}}</span>
      </div>
    </div>
    <div class="main-row">
      <div class="row-item">EOL Cosmetic</div>
      <div class="row-item" v-for="(item,index) in eol_cosmetic" :key="index">
        <span>{{item.qty}}</span>&nbsp;
        <span>{{item.rate}}</span>
      </div>
    </div>
    <div class="main-row">
      <div class="row-item">FOL Others</div>
      <div class="row-item" v-for="(item,index) in fol_others" :key="index">
        <span>{{item.qty}}</span>&nbsp;
        <span>{{item.rate}}</span>
      </div>
    </div>
    <div class="main-row">
      <div class="row-item">EOL Others</div>
      <div class="row-item" v-for="(item,index) in eol_others" :key="index">
        <span>{{item.qty}}</span>&nbsp;
        <span>{{item.rate}}</span>
      </div>
    </div>
    <div class="main-row">
      <div class="row-item">FOL Process</div>
      <div class="row-item" v-for="(item,index) in fol_process" :key="index">
        <span>{{item.qty}}</span>&nbsp;
        <span>{{item.rate}}</span>
      </div>
    </div>
    <div class="main-row">
      <div class="row-item">EOL Process</div>
      <div class="row-item" v-for="(item,index) in eol_process" :key="index">
        <span>{{item.qty}}</span>&nbsp;
        <span>{{item.rate}}</span>
      </div>
    </div>
    <div class="main-row">
      <div class="row-item">Total</div>
      <div class="row-item" v-for="(item,index) in 12" :key="index">
        <span>0</span>&nbsp;
        <span>0</span>
      </div>
    </div>
  </div>
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
    "eol_process"
  ]
}
</script>

<style lang="scss" scoped>
.main-row {
  display: flex;
  height: 50px;
  border: 1px solid red;
  line-height: 50px;
  .row-item {
    width: 7.69%;
    text-align: center;
    background: #4bacc6;
  }
}
</style>
