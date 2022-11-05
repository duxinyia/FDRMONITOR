<template>
  <!-- 漏斗图 -->
  <div class="funnel-chart">
    <p class="title">{{ title }}</p>
    <base-echart :options="options" />
  </div>
</template>

<script>
import baseEchart from "@/common/echart"
export default {
  name: "funnel-chart",
  props: {
    title: {
      type: String,
      default: "當日當機Top5:"
    },
    alloptions: {
      type: Array,
      default: () => [
        { value: 60, name: "Visit" },
        { value: 40, name: "Inquiry" },
        { value: 20, name: "Order" },
        { value: 80, name: "Click" },
        { value: 100, name: "Show" }
      ]
    }
  },
  components: {
    baseEchart
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "Funnel",
            type: "funnel",
            left: "10%",
            top: 60,
            bottom: 60,
            width: "90%",
            min: 0,
            max: 100,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 2,
            label: {
              show: true,
              position: "inside"
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid"
              }
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: this.alloptions
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "@/assets/scss/variables.scss";
.title {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 5px;
  color: $title-color;
  // color: var(--chart-title);
  padding-left: 5px;
  // border-left: 4px solid var(--chart-slip);
  border-left: 4px solid #bb98fa;
}
</style>
