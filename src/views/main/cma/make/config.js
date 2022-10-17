import * as $echarts from "echarts"
// 图标一
// 对应的数据
let xData = ["FC", "DT", "AA", "CT", "FVI", "PACK", "ACF", "SA", "FR", "CC", "BD", "TEST"]
let yData = [5.1, 3.2, 6.1, 4.1, 2.7, 4.2, 5.1, 3.2, 6.1, 4.1, 2.7, 4.2]
let yData1 = [5.1, 3.2, 6.1, 4.1, 2.7, 4.2, 5.1, 3.2, 6.1, 4.1, 2.7, 4.2]

export let options1 = {
  // backgroundColor: "#030A41",
  title: {
    text: "By 站位產出達成狀況",
    left: "center",
    textStyle: {
      color: "#369fb5",
      fontWeight: "bold",
      fontSize: 22
    }
  },
  grid: {
    top: 40,
    right: 10,
    left: 20,
    bottom: 20 //图表尺寸大小
  },
  legend: [
    {
      top: 0,
      right: 80,
      textStyle: {
        color: "#FFFFFF",
        fontSize: 12
      },
      data: ["計劃"]
    },
    {
      top: 0,
      right: 8,
      textStyle: {
        color: "#FFFFFF",
        fontSize: 12
      },
      data: ["實際"]
    }
  ],
  xAxis: {
    type: "category",
    color: "#59588D",
    data: xData,
    axisLabel: {
      margin: 10,
      color: "#EEEEEE",
      textStyle: {
        fontSize: 12
      }
      // 坐标轴刻度标签换行处理
      // formatter: function (params) {
      //   let newParams = params
      //   console.log("====", newParams.indexOf("("))

      //   return newParams
      // }
    },
    axisLine: {
      lineStyle: {
        color: "#ffffff",
        opacity: 0.3
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#ffffff",
        opacity: 0.3
      }
    }
  },
  yAxis: [
    {
      min: 0,
      max: 7,
      axisLabel: {
        color: "#EEEEEE",
        textStyle: {
          fontSize: 14
        }
      },
      axisLine: {
        lineStyle: {
          color: "#ffffff",
          opacity: 0.3
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#ffffff",
          opacity: 0.3
        }
      }
    }
    // {
    //   type: "value",
    //   name: "ML-X",
    //   min: 0,
    //   max: 100,
    //   axisLabel: {
    //     formatter: "{value} %"
    //   }
    // }
  ],
  series: [
    {
      type: "bar",
      name: "計劃",
      data: yData,
      barWidth: "16",
      itemStyle: {
        normal: {
          color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(184,123,255,1)"
            },
            {
              offset: 1,
              color: "rgba(45,57,178,1)"
            }
          ])
        }
      },
      label: {
        normal: {
          show: true,
          position: "top",
          fontSize: 12,
          fontWeight: "bold",
          color: "#FFFFFF"
        }
      }
    },
    {
      type: "bar",
      name: "實際",
      data: yData1,
      barWidth: "16",
      itemStyle: {
        normal: {
          color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(48,227,235,1)"
            },
            {
              offset: 1,
              color: "rgba(16,127,212,1)"
            }
          ])
        }
      },
      label: {
        normal: {
          show: true,
          position: "top",
          fontSize: 12,
          fontWeight: "bold",
          color: "#FFFFFF"
        }
      }
    }
    // {
    //   name: "ML-X",
    //   type: "line",
    //   // yAxisIndex: 1,
    //   // tooltip: {
    //   //   valueFormatter: function (value) {
    //   //     return value + " °C"
    //   //   }
    //   // },
    //   data: [5.1, 3.2, 6.1, 4.1, 2.7, 4.2, 5.1, 3.2, 6.1, 4.1, 2.7, 4.2]
    // }
  ]
}

export let options2 = {
  // backgroundColor: "#030A41",
  title: {
    text: "ML-K AA時段產出",
    left: "center",
    textStyle: {
      color: "#369fb5",
      fontWeight: "bold",
      fontSize: 22
    }
  },
  grid: {
    top: 40,
    right: 30,
    left: 30,
    bottom: 30 //图表尺寸大小
  },
  legend: [
    {
      top: 0,
      right: 80,
      textStyle: {
        color: "#FFFFFF",
        fontSize: 12
      },
      data: ["計劃"]
    },
    {
      top: 0,
      right: 8,
      textStyle: {
        color: "#FFFFFF",
        fontSize: 12
      },
      data: ["實際"]
    },
    {
      top: 0,
      right: 150,
      textStyle: {
        color: "#FFFFFF",
        fontSize: 12
      },
      data: ["ML-X"]
    }
  ],
  xAxis: {
    type: "category",
    // boundaryGap: false,
    color: "#59588D",
    data: xData,
    axisLabel: {
      margin: 10,
      color: "#EEEEEE",
      textStyle: {
        fontSize: 12
      }
    },
    axisLine: {
      lineStyle: {
        color: "#ffffff",
        opacity: 0.3
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#ffffff",
        opacity: 0.3
      }
    }
  },
  yAxis: [
    {
      // name: "ydata",
      position: "left",
      min: 0, // 指定最小值
      max: 10, // 指定最大值
      axisLabel: {
        color: "#EEEEEE",
        textStyle: {
          fontSize: 14
        }
      },
      axisLine: {
        lineStyle: {
          color: "#ffffff",
          opacity: 0.3
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#ffffff",
          opacity: 0.3
        }
      }
    },
    {
      type: "value",
      // name: "ML-X",
      min: 0, // 指定最小值
      max: 10, // 指定最大值
      position: "right",
      splitLine: {
        show: false
      },
      axisLabel: {
        color: "#EEEEEE",
        textStyle: {
          fontSize: 14
        }
      },
      axisLine: {
        lineStyle: {
          color: "#ffffff",
          opacity: 0.3
        }
      }
    }
  ],
  series: [
    {
      type: "bar",
      name: "計劃",
      data: yData,
      barWidth: "16",
      itemStyle: {
        normal: {
          color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(184,123,255,1)"
            },
            {
              offset: 1,
              color: "rgba(45,57,178,1)"
            }
          ])
        }
      },
      label: {
        normal: {
          show: true,
          position: "top",
          fontSize: 12,
          fontWeight: "bold",
          color: "#FFFFFF"
        }
      }
    },
    {
      type: "bar",
      name: "實際",
      data: yData1,
      barWidth: "16",
      itemStyle: {
        normal: {
          color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(48,227,235,1)"
            },
            {
              offset: 1,
              color: "rgba(16,127,212,1)"
            }
          ])
        }
      },
      label: {
        normal: {
          show: true,
          position: "top",
          fontSize: 12,
          fontWeight: "bold",
          color: "#FFFFFF"
        }
      }
    },
    {
      name: "ML-X",
      type: "line",
      symbolSize: 8,
      //smooth: true, // 设置拆线平滑
      itemStyle: {
        normal: {
          color: "#52fea2"
        }
      },
      data: [5, 3, 6, 4, 2, 4, 5, 3, 6, 4, 2, 4]
    }
  ]
}

export let options3 = {
  // backgroundColor: "#030A41",
  title: {
    text: "By 站位WIP狀況",
    left: "center",
    textStyle: {
      color: "#369fb5",
      fontWeight: "bold",
      fontSize: 22
    }
  },
  grid: {
    top: 40,
    right: 10,
    left: 20,
    bottom: 30 //图表尺寸大小
  },
  legend: [
    {
      top: 0,
      right: 80,
      textStyle: {
        color: "#FFFFFF",
        fontSize: 12
      },
      data: ["計劃"]
    },
    {
      top: 0,
      right: 8,
      textStyle: {
        color: "#FFFFFF",
        fontSize: 12
      },
      data: ["實際"]
    }
  ],
  xAxis: {
    type: "category",
    boundaryGap: false,
    color: "#59588D",
    data: xData,
    axisLabel: {
      margin: 10,
      color: "#EEEEEE",
      textStyle: {
        fontSize: 12
      }
    },
    axisLine: {
      lineStyle: {
        color: "#ffffff",
        opacity: 0.3
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#ffffff",
        opacity: 0.3
      }
    }
  },
  yAxis: [
    {
      min: 0,
      max: 7,
      axisLabel: {
        color: "#EEEEEE",
        textStyle: {
          fontSize: 14
        }
      },
      axisLine: {
        lineStyle: {
          color: "#ffffff",
          opacity: 0.3
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#ffffff",
          opacity: 0.3
        }
      }
    }
  ],
  series: [
    {
      type: "line",
      name: "計劃",
      data: [3.5, 3.8, 6.1, 5.1, 4.7, 3.2, 5.1, 6.2, 4.1, 3.1, 3.7, 2.2],
      barWidth: "16",
      itemStyle: {
        normal: {
          color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(184,123,255,1)"
            },
            {
              offset: 1,
              color: "rgba(45,57,178,1)"
            }
          ]),
          areaStyle: {
            //区域填充样式
            color: new $echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "rgba(109, 101, 197, 0.1)"
              },
              {
                offset: 1,
                color: "rgba(109, 101, 197, 0.5)"
              }
            ])
          }
        }
      },
      label: {
        normal: {
          show: true,
          position: "top",
          fontSize: 12,
          fontWeight: "bold",
          color: "#FFFFFF"
        }
      }
    },
    {
      type: "line",
      name: "實際",
      data: yData1,
      barWidth: "16",
      itemStyle: {
        normal: {
          color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(48,227,235,1)"
            },
            {
              offset: 1,
              color: "rgba(16,127,212,1)"
            }
          ]),
          areaStyle: {
            //区域填充样式
            color: new $echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "rgba(35, 205, 241, 0.1)"
              },
              {
                offset: 1,
                color: "rgba(35, 205, 241, 0.5)"
              }
            ])
          }
        }
      },
      label: {
        normal: {
          show: true,
          position: "top",
          fontSize: 12,
          fontWeight: "bold",
          color: "#FFFFFF"
        }
      }
    }
  ]
}
