<template>
  <!-- 主要区域 -->
  <div class="page-main">
    <!-- 左边表格 -->
    <div class="table">
      <el-row align="middle">
        <el-col :span="24" class="top-header">这是一个主要的</el-col>
      </el-row>
      <el-row class="two-header">
        <el-col :span="3" class="station h50">站位</el-col>
        <el-col :span="3" class="plan h50">计划</el-col>
        <el-col :span="3" class="actual h50">实际</el-col>
        <el-col :span="3" class="rate h50">达成率</el-col>
        <el-col :span="3" class="yield h50">良率</el-col>
        <el-col :span="9">
          <el-col :span="24" class="by-produce h25">by</el-col>
          <el-col :span="8" class="l9 h25">L9</el-col>
          <el-col :span="8" class="l21 h25">L21</el-col>
          <el-col :span="8" class="l23 h25">L23</el-col>
        </el-col>
      </el-row>
      <el-row class="three-row" v-for="(item, index) in textArr" :key="index">
        <el-col class="h30" :span="3">{{ item.name }}</el-col>
        <el-col class="h30" :span="3">{{ item.number }}</el-col>
        <el-col class="h30" :span="3">{{ item.shiji }}</el-col>
        <el-col class="h30" :span="3">{{ item.rate }}</el-col>
        <el-col class="h30" :span="3">{{ item.l9 }}</el-col>
        <el-col class="h30" :span="3">{{ item.l21 }}</el-col>
        <el-col class="h30" :span="3">{{ item.l23 }}</el-col>
        <el-col class="h30" :span="3">{{ item.l24 }}</el-col>
      </el-row>
    </div>
    <!-- 右边表格 -->
    <div class="table2">
      <el-row align="middle">
        <el-col :span="24" class="top-header">ML-K WIP 状况</el-col>
      </el-row>
      <el-row class="two-row">
        <el-col :span="3" class="station h50">站位</el-col>
        <el-col :span="21">
          <el-col :span="24" class="plan h10">WIP</el-col>
          <el-col :span="3" class="plan h40">total</el-col>
          <el-col :span="3" class="actual h40">上限</el-col>
          <el-col :span="3" class="rate h40">下限</el-col>
          <el-col :span="3" class="yield h40">良率</el-col>
          <el-col :span="3" class="by-produce h40">config1</el-col>
          <el-col :span="3" class="l9 h40">config2</el-col>
          <el-col :span="3" class="l21 h40">config3</el-col>
          <el-col :span="3" class="l23 h40">config4</el-col>
        </el-col>
      </el-row>
      <el-row class="three-row" v-for="(item, index) in textArr" :key="index">
        <el-col class="h30" :span="3">{{ item.name }}</el-col>
        <el-col class="h30" :span="3">{{ item.number }}</el-col>
        <el-col class="h30" :span="3">{{ item.shiji }}</el-col>
        <el-col class="h30" :span="3">{{ item.rate }}</el-col>
        <el-col class="h30" :span="3">{{ item.l9 }}</el-col>
        <el-col class="h30" :span="3">{{ item.l21 }}</el-col>
        <el-col class="h30" :span="3">{{ item.l23 }}</el-col>
        <el-col class="h30" :span="3">{{ item.l24 }}</el-col>
      </el-row>
    </div>
    <!-- <div class="right-table tx-center" style="width:600px">
      <el-row>
        <el-col :span="24">这是一个主要的表爱他佛挡杀佛</el-col>
      </el-row>
      <el-row>
        <el-col :span="3">站位</el-col>
        <el-col :span="3">计划</el-col>
        <el-col :span="3">站位</el-col>
        <el-col :span="3">计划</el-col>
        <el-col :span="3">站位</el-col>
        <el-col :span="9">
          <el-col :span="24">by</el-col>
          <el-col :span="8">b</el-col>
          <el-col :span="8">b</el-col>
          <el-col :span="8">b</el-col>
        </el-col>
      </el-row>
      <el-row v-for="(item,index) in textArr" :key="index">
        <el-col :span="3">{{item.name}}</el-col>
        <el-col :span="3">{{item.number}}</el-col>
        <el-col :span="3">{{item.shiji}}</el-col>
        <el-col :span="3">{{item.rate}}</el-col>
        <el-col :span="3">{{item.l9}}</el-col>
        <el-col :span="3">{{item.l21}}</el-col>
        <el-col :span="3">{{item.l23}}</el-col>
        <el-col :span="3">{{item.l24}}</el-col>
      </el-row>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "wardetail",
  data() {
    return {
      textArr: [
        {
          name: "GA",
          number: 25000,
          shiji: 30000,
          rate: "100%",
          l9: 12000,
          l21: 15000,
          l23: 3000,
          l24: 3000
        },
        {
          name: "GA",
          number: 25000,
          shiji: 30000,
          rate: "100%",
          l9: 12000,
          l21: 15000,
          l23: 3000,
          l24: 3000
        },
        {
          name: "GA",
          number: 25000,
          shiji: 30000,
          rate: "100%",
          l9: 12000,
          l21: 15000,
          l23: 3000,
          l24: 3000
        },
        {
          name: "GA",
          number: 25000,
          shiji: 30000,
          rate: "100%",
          l9: 12000,
          l21: 15000,
          l23: 3000,
          l24: 3000
        }
      ]
    }
  },
  mounted() {
    // this.$store.commit("fullLoading/SET_TITLE", "By天產出看板")
    // this.$store.commit("fullLoading/SET_FULLLOADING", true)
    // this.initData()
  }
}
</script>

<style lang="scss" scoped>
.page-main {
  margin-top: 100px;
  display: flex;
  justify-content: space-around;
  .table {
    width: 600px;
    text-align: center;
    border: 1px solid #1478a1;
    .top-header {
      line-height: 50px;
      border: 1px solid #025569;
      background: #025569;
    }
    .two-header {
      /* background: red; */
      border-top: 1px solid #1478a1;
      border-bottom: 1px solid #1478a1;
      .h50 {
        height: 60px;
        line-height: 60px;
        border-right: 1px solid #1478a1;
        /* border: 1px solid blue; */
      }
      .h25 {
        height: 30px;
        line-height: 30px;
        &:nth-child(1) {
          border-bottom: 1px solid #1478a1;
        }
        &:nth-child(3) {
          border-left: 1px solid #1478a1;
          border-right: 1px solid #1478a1;
        }
      }
    }
    .three-row {
      .h30 {
        height: 30px;
        line-height: 30px;
        border-right: 1px solid #1478a1;
        border-bottom: 1px solid #1478a1;
        /* border: 1px solid red; */
        &:last-child {
          border-right: none;
        }
      }
      &:last-child {
        .h30 {
          border-bottom: none;
        }
      }
    }
  }
  .table2 {
    /* margin-top: 50px; */
    width: 600px;
    text-align: center;
    border: 1px solid #1478a1;
    .top-header {
      line-height: 50px;
      border: 1px solid #025569;
      background: #025569;
    }
    .two-row {
      border-top: 1px solid #1478a1;
      border-bottom: 1px solid #1478a1;
      .station {
        border-right: 1px solid #1478a1;
      }
      .h50 {
        height: 70px;
        line-height: 70px;
      }
      .h10 {
        height: 25px;
        line-height: 25px;
        border-bottom: 1px solid #1478a1;
      }
      .h40 {
        height: 45px;
        line-height: 45px;
        border-right: 1px solid #1478a1;
        &:last-child {
          border-right: none;
        }
      }
    }
    .three-row {
      .h30 {
        height: 30px;
        line-height: 30px;
        border-right: 1px solid #1478a1;
        border-bottom: 1px solid #1478a1;
        /* border: 1px solid red; */
        &:last-child {
          border-right: none;
        }
      }
      &:last-child {
        .h30 {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
