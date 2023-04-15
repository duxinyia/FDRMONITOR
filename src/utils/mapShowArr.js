// 现在需要将cma 和 dp 分开
let showArrConfig = {
  cma: {
    manage: {
      output: [
        {
          id: 9,
          imgUrl: require("@/assets/images/cma/output.png"),
          title: "年度產出總覽",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "output",
          textRoute: {
            path: "output",
            name: "output",
            component: () =>
              import(/* webpackChunkName: "output" */ "../views/main/cma/output/output.vue")
          }
        },
        {
          id: 11,
          imgUrl: require("@/assets/images/cma/makewar.png"),
          title: "By天產出看板",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "makewar"
        },
        {
          id: 10,
          imgUrl: require("@/assets/images/cma/output2.png"),
          title: "By站位產出看板",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "output2"
        },
        {
          id: 11,
          imgUrl: require("@/assets/images/cma/aactga.png"),
          title: "By機臺產出看板",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "aactga"
        }
      ],
      yield: [
        {
          id: 13,
          imgUrl: require("@/assets/images/cma/sfc.png"),
          title: "SFC良率By月",
          target: "yield",
          belong: "管理层/良率",
          isShow: false,
          to: "sfc"
        },
        {
          id: 14,
          imgUrl: require("@/assets/images/cma/tsfc.png"),
          title: "SFC良率Daily",
          target: "yield",
          belong: "管理层/良率",
          isShow: false,
          to: "tsfc"
        },
        {
          id: 15,
          imgUrl: require("@/assets/images/cma/defect.png"),
          title: "Top 25 Defect",
          target: "yield",
          belong: "管理层/良率",
          isShow: false,
          to: "defect"
        },
        {
          id: 16,
          imgUrl: require("@/assets/images/cma/yielddetail.png"),
          title: "FOL LCB差异层别",
          target: "yield",
          belong: "管理层/良率",
          isShow: false,
          to: "yielddetail"
        },
        {
          id: 17,
          imgUrl: require("@/assets/images/cma/yielddetail.png"),
          title: "FOL DPC差异层别",
          target: "yield",
          belong: "管理层/良率",
          isShow: false,
          to: "yielddetail"
        }
      ],
      device: [
        {
          id: 1,
          imgUrl: require("@/assets/images/cma/aa.png"),
          title: "AA設備總覽",
          target: "device",
          belong: "管理层/设备",
          isShow: false,
          to: "aa",
          config: {
            path: "aa",
            name: "aa",
            component: () => import(/* webpackChunkName: "aa" */ "@/views/main/cma/aa/aa.vue")
          }
        },
        {
          id: 2,
          imgUrl: require("@/assets/images/cma/fol.png"),
          title: "FOL設備總覽",
          target: "device",
          belong: "管理层/设备",
          isShow: false,
          to: "fol"
        },
        {
          id: 3,
          imgUrl: require("@/assets/images/cma/fol.png"),
          title: "周產出/效率看板",
          target: "device",
          belong: "管理层/设备",
          isShow: false,
          to: "wekoutput"
        },
        {
          id: 4,
          imgUrl: require("@/assets/images/cma/fol.png"),
          title: "Test治具良率看板",
          target: "device",
          belong: "管理层/设备",
          isShow: false,
          to: "fixtrue"
        },
        {
          id: 3,
          imgUrl: require("@/assets/images/cma/fol.png"),
          title: "效率看板",
          target: "device",
          belong: "管理层/设备",
          isShow: false,
          to: "effciency"
        },
        {
          id: 5,
          imgUrl: require("@/assets/images/cma/fol.png"),
          title: "Test一次不良Top15",
          target: "device",
          belong: "管理层/设备",
          isShow: false,
          to: "testfirst"
        },
        {
          id: 6,
          imgUrl: require("@/assets/images/cma/fol.png"),
          title: "AA 機況排行榜",
          target: "device",
          belong: "管理层/设备",
          isShow: false,
          to: "aawar"
        },
        {
          id: 7,
          imgUrl: require("@/assets/images/cma/fol.png"),
          title: "Test效率看板",
          target: "device",
          belong: "管理层/设备",
          isShow: false,
          to: "testeff"
        }
      ],
      process: [
        {
          id: 4,
          isExternalLink: true,
          imgUrl: require("@/assets/images/cma/spotcheck.jpg"),
          title: "IAA Step看板",
          target: "device",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.50:32001/standard/design/#/share/ZC1OY0JP"
        },
        {
          id: 108,
          isExternalLink: true,
          imgUrl: require("@/assets/images/cma/device4.jpg"),
          title: "實時統計",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.50:32001/share.html#/?token=KG3RHWT8"
        },
        {
          id: 109,
          isExternalLink: true,
          imgUrl: require("@/assets/images/cma/device5.png"),
          title: "歷史日統計",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.50:32001/share.html#/?token=PVAX4VH2"
        },
        {
          id: 110,
          isExternalLink: true,
          imgUrl: require("@/assets/images/cma/device6.png"),
          title: "歷史周統計",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.50:32001/share.html#/?token=AMM0V0AE"
        },
        {
          id: 111,
          isExternalLink: true,
          imgUrl: require("@/assets/images/cma/device7.png"),
          title: "歷史月統計",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.50:32001/share.html#/?token=YBWWHR2M"
        },
        {
          id: 112,
          imgUrl: require("@/assets/images/cma/ga.png"),
          title: "GA製程監控",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "ga"
        },
        {
          id: 113,
          imgUrl: require("@/assets/images/cma/va.png"),
          title: "VA製程監控",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "va"
        }
      ]
    },
    juec: {
      output: [
        {
          id: 1,
          imgUrl: require("@/assets/images/cma/output.png"),
          title: "TEST",
          target: "output",
          belong: "決策層/產出",
          isShow: false,
          to: "test"
        }
      ],
      yield: [
        {
          id: 1,
          imgUrl: require("@/assets/images/cma/output.png"),
          title: "FOL Yield Report",
          target: "output",
          belong: "決策層/良率",
          isShow: false,
          to: "folyield"
        }
      ],
      device: [
        {
          id: 1,
          imgUrl: require("@/assets/images/cma/aa.png"),
          title: "SA效率看板",
          target: "device",
          belong: "決策層/设备",
          isShow: false,
          to: "jsa"
        }
      ],
      process: [
        {
          id: 1,
          imgUrl: require("@/assets/images/cma/ga.png"),
          title: "AVI效率看板",
          target: "process",
          belong: "決策層/製程監控",
          isShow: false,
          to: "javi"
        }
      ]
    },
    // 4/15 新增的
    report: {
      // 所有从报表
      all: [
        {
          id: 1,
          imgUrl: require("@/assets/images/cma/output.png"),
          title: "cma第一个报表",
          target: "report",
          belong: "报表/所有",
          isShow: false,
          to: "cmamainreport"
        }
      ]
    }
  },
  dp: {
    manage: {
      output: [
        {
          id: 9,
          imgUrl: require("@/assets/images/cma/output.png"),
          title: "年度產出總覽",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "dpoutput"
        },
        {
          id: 11,
          imgUrl: require("@/assets/images/cma/makewar.png"),
          title: "By天產出看板",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "dpmakewar"
        },
        {
          id: 10,
          imgUrl: require("@/assets/images/cma/output2.png"),
          title: "By站位產出看板",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "dpoutput2"
        },
        {
          id: 13,
          imgUrl: require("@/assets/images/dp/equipoutput.png"),
          title: "設備產出看板",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "dpequipoutput"
        },
        {
          id: 12,
          imgUrl: require("@/assets/images/dp/outwork.png"),
          title: "人員出勤率看板",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "dpoutwork"
        }
      ]
    },
    juec: {},
    // 4/15 新增的
    report: {
      // 所有从报表
      all: [
        {
          id: 1,
          imgUrl: require("@/assets/images/cma/output.png"),
          title: "dp第一个报表",
          target: "report",
          belong: "报表/所有",
          isShow: false,
          to: "output"
        }
      ]
    }
  }
}

let tempArr = []

export let mapShowArr = (allRouters) => {
  let cmaNames = []
  let dpNames = []
  allRouters.forEach((item) => {
    if (item.name.includes("cma") && item.children) {
      cmaNames = childHandle(item.children)
    }
    tempArr = []
    if (item.name.includes("dp") && item.children) {
      dpNames = childHandle(item.children)
    }
  })
  //console.log("cmaNames", cmaNames) // 所有返回的cma的地址
  //console.log("dpNames", dpNames) // 所有返回的dp的地址
  // 循环 cma 的地址
  showArrConfig.cma.manage.output = showArrConfig.cma.manage.output.map((item) => {
    return { ...item, isShow: cmaNames.includes(item.title) }
  })
  showArrConfig.cma.manage.yield = showArrConfig.cma.manage.yield.map((item) => {
    return { ...item, isShow: cmaNames.includes(item.title) }
  })
  showArrConfig.cma.manage.device = showArrConfig.cma.manage.device.map((item) => {
    return { ...item, isShow: cmaNames.includes(item.title) }
  })
  showArrConfig.cma.manage.process = showArrConfig.cma.manage.process.map((item) => {
    return { ...item, isShow: cmaNames.includes(item.title) }
  })
  // 处理cma 决策层的
  showArrConfig.cma.juec.output = showArrConfig.cma.juec.output.map((item) => {
    return { ...item, isShow: cmaNames.includes(item.title) }
  })
  showArrConfig.cma.juec.yield = showArrConfig.cma.juec.yield.map((item) => {
    return { ...item, isShow: cmaNames.includes(item.title) }
  })
  showArrConfig.cma.juec.device = showArrConfig.cma.juec.device.map((item) => {
    return { ...item, isShow: cmaNames.includes(item.title) }
  })
  showArrConfig.cma.juec.process = showArrConfig.cma.juec.process.map((item) => {
    return { ...item, isShow: cmaNames.includes(item.title) }
  })
  // 处理cma 报表的
  showArrConfig.cma.report.all = showArrConfig.cma.report.all.map((item) => {
    return { ...item, isShow: cmaNames.includes(item.title) }
  })
  // 处理dp的管理层地址
  showArrConfig.dp.manage.output = showArrConfig.dp.manage.output.map((item) => {
    return { ...item, isShow: dpNames.includes(item.title) }
  })
  // 处理dp的报表地址
  showArrConfig.dp.report.all = showArrConfig.dp.report.all.map((item) => {
    return { ...item, isShow: dpNames.includes(item.title) }
  })
  return showArrConfig
}
function childHandle(routers) {
  routers.forEach((item) => {
    tempArr.push(item.meta.title)
    if (item.children) {
      childHandle(item.children)
    }
  })
  return tempArr
}
