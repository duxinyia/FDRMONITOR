<template>
  <el-row class="main-one">
    <el-col :span="12" class="table-one">
      <el-row class="header-row">
        <el-col :span="2" class="header-item lh">Device</el-col>
        <el-col :span="2" class="header-item lh">Machine</el-col>
        <el-col :span="2" class="header-item lh">Station</el-col>
        <el-col :span="2" class="header-item lh">Target</el-col>
        <el-col :span="8" class="header-item header-split">
          <el-col :span="24" class="split-top">Total</el-col>
          <el-col :span="4" class="split-item">Avg</el-col>
          <el-col :span="4" class="split-item">03/16</el-col>
          <el-col :span="4" class="split-item">03/17</el-col>
          <el-col :span="4" class="split-item">03/18</el-col>
          <el-col :span="4" class="split-item">03/19</el-col>
          <el-col :span="4" class="split-item">03/20</el-col>
        </el-col>
        <el-col :span="8" class="header-item header-split">
          <el-col :span="24" class="split-top">03/20</el-col>
          <el-col :span="6" class="split-item">Efficiency</el-col>
          <el-col :span="6" class="split-item">Routine</el-col>
          <el-col :span="6" class="split-item">Idle</el-col>
          <el-col :span="6" class="split-item">Down</el-col>
        </el-col>
      </el-row>
      <el-row class="data-row" v-for="(item, index) in showArr1" :key="index">
        <el-col :span="2" class="data-item">{{ item.Device }}</el-col>
        <el-col :span="2" class="data-item">{{ item.Machine }}</el-col>
        <el-col :span="2" class="data-item">{{ item.Station }}</el-col>
        <el-col :span="2" class="data-item">{{ item.Target }}</el-col>
        <el-col :span="8">
          <el-col :span="4" class="data-item">{{ item.Avg }}</el-col>
          <el-col :span="4" class="data-item">{{ item["03/16"] }}</el-col>
          <el-col :span="4" class="data-item">{{ item["03/17"] }}</el-col>
          <el-col :span="4" class="data-item">{{ item["03/18"] }}</el-col>
          <el-col :span="4" class="data-item">{{ item["03/19"] }}</el-col>
          <el-col :span="4" class="data-item">{{ item["03/20"] }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="6" class="data-item">{{ item.Efficiency }}</el-col>
          <el-col :span="6" class="data-item">{{ item.Routine }}</el-col>
          <el-col :span="6" class="data-item">{{ item.Idle }}</el-col>
          <el-col :span="6" class="data-item">{{ item.Down }}</el-col>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="5" class="table-one">
      <el-row class="header-row">
        <el-col :span="3" class="header-item lh">Target</el-col>
        <el-col :span="21" class="header-item header-split">
          <el-col :span="24" class="split-top">D</el-col>
          <el-col :span="4" class="split-item">03/16</el-col>
          <el-col :span="4" class="split-item">03/17</el-col>
          <el-col :span="4" class="split-item">03/18</el-col>
          <el-col :span="4" class="split-item">03/19</el-col>
          <el-col :span="4" class="split-item">03/20</el-col>
        </el-col>
      </el-row>
      <el-row class="data-row" v-for="(item, index) in showArr2" :key="index">
        <el-col :span="3" class="data-item">{{ item.Target }}</el-col>
        <el-col :span="21">
          <el-col :span="4" class="data-item">{{ item["03/16"] }}</el-col>
          <el-col :span="4" class="data-item">{{ item["03/17"] }}</el-col>
          <el-col :span="4" class="data-item">{{ item["03/18"] }}</el-col>
          <el-col :span="4" class="data-item">{{ item["03/19"] }}</el-col>
          <el-col :span="4" class="data-item">{{ item["03/20"] }}</el-col>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="5" class="table-one">
      <el-row class="header-row">
        <el-col :span="3" class="header-item lh">Target</el-col>
        <el-col :span="21" class="header-item header-split">
          <el-col :span="24" class="split-top">D</el-col>
          <el-col :span="4" class="split-item">03/16</el-col>
          <el-col :span="4" class="split-item">03/17</el-col>
          <el-col :span="4" class="split-item">03/18</el-col>
          <el-col :span="4" class="split-item">03/19</el-col>
          <el-col :span="4" class="split-item">03/20</el-col>
        </el-col>
      </el-row>
      <el-row class="data-row" v-for="(item, index) in showArr2" :key="index">
        <el-col :span="3" class="data-item">{{ item.Target }}</el-col>
        <el-col :span="21">
          <el-col :span="4" class="data-item">{{ item["03/16"] }}</el-col>
          <el-col :span="4" class="data-item">{{ item["03/17"] }}</el-col>
          <el-col :span="4" class="data-item">{{ item["03/18"] }}</el-col>
          <el-col :span="4" class="data-item">{{ item["03/19"] }}</el-col>
          <el-col :span="4" class="data-item">{{ item["03/20"] }}</el-col>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "main-one",
  data() {
    return {
      showArr1: [
        {
          Device: "12",
          Machine: "25",
          Station: "56",
          Target: "56",
          Avg: "58",
          "03/16": "88",
          "03/17": "898",
          "03/18": "878",
          "03/19": "879",
          "03/20": "986",
          Efficiency: "456",
          Routine: "47546",
          Idle: "989",
          Down: "446"
        }
      ],
      showArr2: [
        { Target: "98", "03/16": "56", "03/17": "89", "03/18": "89", "03/19": "45", "03/20": "84" }
      ],
      showArr3: [
        { Target: "98", "03/16": "56", "03/17": "89", "03/18": "89", "03/19": "45", "03/20": "84" }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.main-one {
  text-align: center;
  .table-one {
    border: 1px solid #1683af;
    &:nth-child(2) {
      margin: 0 10px;
    }
    .header-row {
      height: 50px;
      .header-item {
        height: 100%;
        border-right: 1px solid #1683af;

        &:last-child {
          border-right: none;
        }
      }
      .header-split {
        line-height: 25px;
        .split-top {
          height: 50%;
          border-bottom: 1px solid #1683af;
        }
        .split-item {
          border-right: 1px solid #1683af;
          height: 50%;
          &:last-child {
            border-right: none;
          }
        }
      }
      .lh {
        line-height: 50px;
      }
    }
    .data-row {
      border-top: 1px solid #1683af;
      .data-item {
        height: 30px;
        line-height: 30px;
        border-right: 1px solid #1683af;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>
