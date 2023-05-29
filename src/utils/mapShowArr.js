// 现在需要将cma 和 dp 分开
let showArrConfig = {
  cma: {
    manage: {
      output: [
        {
          title: "年度產出總覽",
          imgUrl: require("@/assets/images/cma/output.png"),
          belong: "管理层/產出",
          isShow: false,
          to: "output",
          route: {
            path: "output",
            name: "output",
            component: () => import("@/views/main/cma/output/output.vue"),
            meta: { parentName: "cma", pageName: "年度產出總覽" }
          }
        },
        {
          title: "By天產出看板",
          imgUrl: require("@/assets/images/cma/makewar.png"),
          belong: "管理层/產出",
          isShow: false,
          to: "makewar",
          route: {
            path: "makewar",
            name: "makewar",
            isHasDetailArr: [
              {
                path: "make",
                name: "make",
                component: () => import("@/views/main/cma/make/make.vue"),
                meta: { parentName: "cma", isJump: true }
              }
            ],
            component: () => import("@/views/main/cma/makewar/makewar.vue"),
            meta: { parentName: "cma", pageName: "By天產出看板" }
          }
        },
        {
          title: "By站位產出看板",
          imgUrl: require("@/assets/images/cma/output2.png"),
          belong: "管理层/產出",
          isShow: false,
          to: "output2",
          route: {
            path: "output2",
            name: "output2",
            component: () => import("@/views/main/cma/output2/output2.vue"),
            meta: { parentName: "cma", pageName: "By站位產出看板" }
          }
        },
        {
          title: "By機臺產出看板",
          imgUrl: require("@/assets/images/other/repair.png"),
          belong: "管理层/產出",
          isShow: false,
          to: "aactga",
          route: {
            path: "aactga",
            name: "aactga",
            component: () => import("@/views/main/cma/aactga/aactga.vue"),
            meta: { parentName: "cma", pageName: "By機臺產出看板" }
          }
        }
      ],
      yield: [
        {
          title: "SFC良率By月",
          imgUrl: require("@/assets/images/cma/sfc.png"),
          belong: "管理层/良率",
          isShow: false,
          to: "sfc",
          route: {
            path: "sfc",
            name: "sfc",
            isHasDetailArr: [
              {
                path: "sfcdetail",
                name: "sfcdetail",
                component: () => import("@/views/main/cma/sfcdetail/sfcdetail.vue"),
                meta: { parentName: "cma", isJump: true }
              }
            ],
            component: () => import("@/views/main/cma/sfc/sfc.vue"),
            meta: { parentName: "cma", pageName: "SFC良率By月" }
          }
        },
        {
          title: "SFC良率Daily",
          imgUrl: require("@/assets/images/cma/tsfc.png"),
          belong: "管理层/良率",
          isShow: false,
          to: "tsfc",
          route: {
            path: "tsfc",
            name: "tsfc",
            component: () => import("@/views/main/cma/tsfc/tsfc.vue"),
            meta: { parentName: "cma", pageName: "SFC良率Daily" }
          }
        },
        {
          title: "Top 25 Defect",
          imgUrl: require("@/assets/images/cma/defect.png"),
          belong: "管理层/良率",
          isShow: false,
          to: "defect",
          route: {
            path: "defect",
            name: "defect",
            isHasDetailArr: [
              {
                path: "defectdetail",
                name: "defectdetail",
                component: () => import("@/views/main/cma/defectdetail/defectdetail.vue"),
                meta: { parentName: "cma", isJump: true }
              }
            ],
            component: () => import("@/views/main/cma/defect/defect.vue"),
            meta: { parentName: "cma", pageName: "Top 25 Defect" }
          }
        },
        {
          title: "FOL LCB差异层别",
          imgUrl: require("@/assets/images/cma/follcb.png"),
          belong: "管理层/良率",
          isShow: false,
          to: "follcb",
          route: {
            path: "follcb",
            name: "follcb",
            component: () => import("@/views/main/cma/follcb/index.vue"),
            meta: { parentName: "cma", pageName: "FOL LCB差异层别" }
          }
        },
        {
          title: "FOL DPC差异层别",
          imgUrl: require("@/assets/images/cma/foldpc.png"),
          belong: "管理层/良率",
          isShow: false,
          to: "foldpc",
          route: {
            path: "foldpc",
            name: "foldpc",
            component: () => import("@/views/main/cma/foldpc/index.vue"),
            meta: { parentName: "cma", pageName: "FOL DPC差异层别" }
          }
        }
      ],
      device: [
        {
          title: "AA設備總覽",
          imgUrl: require("@/assets/images/cma/aa.png"),
          belong: "管理层/设备",
          isShow: false,
          to: "aa",
          route: {
            path: "aa",
            name: "aa",
            component: () => import("@/views/main/cma/aa/aa.vue"),
            meta: { parentName: "cma", pageName: "AA設備總覽" }
          }
        },
        {
          title: "FOL設備總覽",
          imgUrl: require("@/assets/images/cma/fol.png"),
          belong: "管理层/设备",
          isShow: false,
          to: "fol",
          route: {
            path: "fol",
            name: "fol",
            component: () => import("@/views/main/cma/fol/fol.vue"),
            meta: { parentName: "cma", pageName: "FOL設備總覽" }
          }
        },
        {
          title: "周產出/效率看板",
          imgUrl: require("@/assets/images/other/repair.png"),
          belong: "管理层/设备",
          isShow: false,
          to: "wekoutput",
          route: {
            path: "wekoutput",
            name: "wekoutput",
            component: () => import("@/views/main/cma/wekoutput/wekoutput.vue"),
            meta: { parentName: "cma", pageName: "周產出/效率看板" }
          }
        },
        {
          title: "Test治具良率看板",
          imgUrl: require("@/assets/images/other/repair.png"),
          belong: "管理层/设备",
          isShow: false,
          to: "fixtrue",
          route: {
            path: "fixtrue",
            name: "fixtrue",
            component: () => import("@/views/main/cma/fixtrue/fixtrue.vue"),
            meta: { parentName: "cma", pageName: "Test治具良率看板" }
          }
        },
        {
          title: "效率看板",
          imgUrl: require("@/assets/images/other/repair.png"),
          belong: "管理层/设备",
          isShow: false,
          to: "effciency",
          route: {
            path: "effciency",
            name: "effciency",
            component: () => import("@/views/main/cma/effciency/effciency.vue"),
            meta: { parentName: "cma", pageName: "效率看板" }
          }
        },
        {
          title: "Test一次不良Top15",
          imgUrl: require("@/assets/images/other/repair.png"),
          belong: "管理层/设备",
          isShow: false,
          to: "testfirst",
          route: {
            path: "testfirst",
            name: "testfirst",
            component: () => import("@/views/main/cma/testfirst/testfirst.vue"),
            meta: { parentName: "cma", pageName: "Test一次不良Top15" }
          }
        },
        {
          title: "AA 機況排行榜",
          imgUrl: require("@/assets/images/other/repair.png"),
          belong: "管理层/设备",
          isShow: false,
          to: "aawar",
          route: {
            path: "aawar",
            name: "aawar",
            component: () => import("@/views/main/cma/aawar/aawar.vue"),
            meta: { parentName: "cma", pageName: "AA 機況排行榜" }
          }
        },
        {
          title: "Test效率看板",
          imgUrl: require("@/assets/images/other/repair.png"),
          belong: "管理层/设备",
          isShow: false,
          to: "testeff",
          route: {
            path: "testeff",
            name: "testeff",
            component: () => import("@/views/main/cma/testeff/testeff.vue"),
            meta: { parentName: "cma", pageName: "Test效率看板" }
          }
        },
        {
          title: "Lens Reject rate",
          imgUrl: require("@/assets/images/other/repair.png"),
          belong: "管理层/设备",
          isShow: false,
          to: "rerate",
          route: {
            path: "rerate",
            name: "rerate",
            component: () => import("@/views/main/cma/rerate/rerate.vue"),
            meta: { parentName: "cma", pageName: "Lens Reject rate" }
          }
        },
        {
          title: "Stangging Time 看板",
          imgUrl: require("@/assets/images/other/repair.png"),
          belong: "管理层/设备",
          isShow: false,
          to: "stang",
          route: {
            path: "stang",
            name: "stang",
            component: () => import("@/views/main/cma/stang/stang.vue"),
            meta: { parentName: "cma", pageName: "Stangging Time 看板" }
          }
        },
        // 看板的内容  text
        {
          title: "Stangging Time 看板",
          imgUrl: require("@/assets/images/other/repair.png"),
          belong: "管理层/设备",
          isShow: false,
          to: "text",
          route: {
            path: "text",
            name: "text",
            component: () => import("@/views/main/cma/text/text.vue"),
            meta: { parentName: "cma", pageName: "Stangging Time 看板" }
          }
        }
      ],
      process: [
        {
          isExternalLink: true,
          imgUrl: require("@/assets/images/cma/spotcheck.jpg"),
          title: "AA 膠型AI檢測",
          target: "device",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.50:32001/standard/design/#/share/ZC1OY0JP"
        },
        {
          isExternalLink: true,
          imgUrl: require("@/assets/images/cma/device4.jpg"),
          title: "AA AI實時統計",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.50:32001/share.html#/?token=KG3RHWT8"
        },
        {
          isExternalLink: true,
          imgUrl: require("@/assets/images/cma/device5.png"),
          title: "AA AI歷史日統計",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.50:32001/share.html#/?token=PVAX4VH2"
        },
        {
          isExternalLink: true,
          imgUrl: require("@/assets/images/cma/device6.png"),
          title: "AA AI歷史周統計",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.50:32001/share.html#/?token=AMM0V0AE"
        },
        {
          isExternalLink: true,
          imgUrl: require("@/assets/images/cma/device7.png"),
          title: "AA AI歷史月統計",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.50:32001/share.html#/?token=YBWWHR2M"
        },

        {
          isExternalLink: true,
          imgUrl: require("@/assets/images/cma/device8.png"),
          title: "ACF 鏡頭AI檢測",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.51:32001/share.html#/?token=BGZC2DMS"
        },
        {
          isExternalLink: true,
          imgUrl: require("@/assets/images/cma/device9.png"),
          title: "ACF AI日統計",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.51:32001/share.html#/?token=5NV6LK5V"
        },
        {
          isExternalLink: true,
          imgUrl: require("@/assets/images/cma/device10.png"),
          title: "ACF AI歷史周統計",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.51:32001/share.html#/?token=HSMAUVEN"
        },
        {
          isExternalLink: true,
          imgUrl: require("@/assets/images/cma/device11.png"),
          title: "ACF AI歷史月統計",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.51:32001/share.html#/?token=6LV6R28M"
        },

        {
          title: "GA製程監控",
          imgUrl: require("@/assets/images/cma/ga.png"),
          belong: "管理层/製程監控",
          isShow: false,
          to: "ga",
          route: {
            path: "ga",
            name: "ga",
            component: () => import("@/views/main/cma/ga/ga.vue"),
            meta: { parentName: "cma", pageName: "GA製程監控" }
          }
        },
        {
          title: "VA製程監控",
          imgUrl: require("@/assets/images/cma/va.png"),
          belong: "管理层/製程監控",
          isShow: false,
          to: "va",
          route: {
            path: "va",
            name: "va",
            component: () => import("@/views/main/cma/va/va.vue"),
            meta: { parentName: "cma", pageName: "VA製程監控" }
          }
        }
      ]
    },
    juec: {
      output: [
        // {
        //   imgUrl: require("@/assets/images/cma/output.png"),
        //   title: "TEST",
        //   target: "output",
        //   belong: "決策層/產出",
        //   isShow: false,
        //   to: "test"
        // }
      ],
      yield: [
        {
          title: "FOL Yield Report",
          imgUrl: require("@/assets/images/cma/output.png"),
          belong: "決策層/良率",
          isShow: false,
          to: "folyield",
          route: {
            path: "folyield",
            name: "folyield",
            component: () => import("@/views/main/cma/folyield/folyield.vue"),
            meta: { parentName: "cma", pageName: "FOL Yield Report" }
          }
        }
      ],
      device: [
        {
          title: "SA效率看板",
          imgUrl: require("@/assets/images/cma/aa.png"),
          belong: "決策層/设备",
          isShow: false,
          to: "jsa",
          route: {
            path: "jsa",
            name: "jsa",
            component: () => import("@/views/main/cma/jsa/jsa.vue"),
            meta: { parentName: "cma", pageName: "SA效率看板" }
          }
        }
      ],
      process: [
        {
          title: "AVI效率看板",
          imgUrl: require("@/assets/images/cma/ga.png"),
          belong: "決策層/製程監控",
          isShow: false,
          to: "javi",
          route: {
            path: "javi",
            name: "javi",
            component: () => import("@/views/main/cma/javi/javi.vue"),
            meta: { parentName: "cma", pageName: "AVI效率看板" }
          }
        }
      ]
    },
    // 4/15 新增的
    report: {
      // 所有从报表
      all: [
        {
          title: "Defect BY AAMC",
          imgUrl: require("@/assets/images/cma/report1.png"),
          belong: "报表/所有",
          isShow: false,
          to: "cmamainreport",
          route: {
            path: "report1",
            name: "cmamainreport",
            component: () => import("@/views/main/cma/report1/report1.vue"),
            meta: { parentName: "cma", pageName: "Defect BY AAMC" }
          }
        },
        {
          title: "Yield Loss Track(VCM)",
          imgUrl: require("@/assets/images/cma/report2.png"),
          belong: "报表/所有",
          isShow: false,
          to: "cmamainreport2",
          route: {
            path: "report2",
            name: "cmamainreport2",
            component: () => import("@/views/main/cma/report2/report2.vue"),
            meta: { parentName: "cma", pageName: "Yield Loss Track(VCM)" }
          }
        },
        {
          title: "Defect BY Tooling",
          imgUrl: require("@/assets/images/cma/report3.png"),
          belong: "报表/所有",
          isShow: false,
          to: "cmamainreport3",
          route: {
            path: "report3",
            name: "cmamainreport3",
            component: () => import("@/views/main/cma/report3/report3.vue"),
            meta: { parentName: "cma", pageName: "Defect BY Tooling" }
          }
        },
        {
          title: "Defect BY Lens Lot",
          imgUrl: require("@/assets/images/cma/report4.png"),
          belong: "报表/所有",
          isShow: false,
          to: "cmamainreport4",
          route: {
            path: "report4",
            name: "cmamainreport4",
            component: () => import("@/views/main/cma/report4/report4.vue"),
            meta: { parentName: "cma", pageName: "Defect BY Lens Lot" }
          }
        },
        {
          title: "数据分析",
          imgUrl: require("@/assets/images/cma/report4.png"),
          belong: "报表/所有",
          isShow: false,
          to: "cmamainreport6",
          route: {
            path: "report6",
            name: "cmamainreport6",
            component: () => import("@/views/main/cma/report6/report6.vue"),
            meta: { parentName: "cma", pageName: "数据分析" }
          }
        },
        {
          title: "报表查询",
          imgUrl: require("@/assets/images/cma/report4.png"),
          belong: "报表/所有",
          isShow: false,
          to: "cmamainreport7",
          route: {
            path: "report7",
            name: "cmamainreport7",
            component: () => import("@/views/main/cma/report7/report7.vue"),
            meta: { parentName: "cma", pageName: "报表查询" }
          }
        },
        {
          title: "FDR MONITOR",
          imgUrl: require("@/assets/images/cma/report4.png"),
          belong: "报表/所有",
          isShow: false,
          to: "cmamainreport8",
          route: {
            path: "report8",
            name: "cmamainreport8",
            component: () => import(/* webpackChunkName: "report4" */ "@/views/main/cma/report8/report8.vue"),
            meta: { parentName: "cma" }
          }
        },
        {
          title: "cma的第五个报表",
          imgUrl: require("@/assets/images/cma/output.png"),
          belong: "报表/所有",
          isShow: false,
          to: "cmamainreport5",
          route: {
            path: "report5",
            name: "cmamainreport5",
            component: () => import("@/views/main/cma/report5/report5.vue"),
            meta: { parentName: "cma", pageName: "cma的第五个报表" }
          }
        }
      ]
    }
  },
  dp: {
    manage: {
      output: [
        {
          title: "年度產出總覽",
          imgUrl: require("@/assets/images/cma/output.png"),
          belong: "管理层/產出",
          isShow: false,
          to: "dpoutput",
          route: {
            path: "output",
            name: "dpoutput",
            component: () => import("@/views/main/dp/output/output.vue"),
            meta: { parentName: "dp", pageName: "年度產出總覽" }
          }
        },
        {
          title: "By天產出看板",
          imgUrl: require("@/assets/images/cma/makewar.png"),
          belong: "管理层/產出",
          isShow: false,
          to: "dpmakewar",
          route: {
            path: "makewar",
            name: "dpmakewar",
            isHasDetailArr: [
              {
                path: "make",
                name: "dpmake",
                component: () => import("@/views/main/dp/make/make.vue"),
                meta: { parentName: "dp", isJump: true }
              }
            ],
            component: () => import("@/views/main/dp/makewar/makewar.vue"),
            meta: { parentName: "dp", pageName: "By天產出看板" }
          }
        },
        {
          title: "By站位產出看板",
          imgUrl: require("@/assets/images/cma/output2.png"),
          belong: "管理层/產出",
          isShow: false,
          to: "dpoutput2",
          route: {
            path: "output2",
            name: "dpoutput2",
            component: () => import("../views/main/dp/output2/output2.vue"),
            meta: { parentName: "dp", pageName: "By站位產出看板" }
          }
        },
        {
          title: "設備產出看板",
          imgUrl: require("@/assets/images/dp/equipoutput.png"),
          belong: "管理层/產出",
          isShow: false,
          to: "dpequipoutput",
          route: {
            path: "equipoutput",
            name: "dpequipoutput",
            component: () => import("@/views/main/dp/equipOutput/equipOutput.vue"),
            meta: { parentName: "dp", pageName: "設備產出看板" }
          }
        },
        {
          title: "人員出勤率看板",
          imgUrl: require("@/assets/images/dp/outwork.png"),
          belong: "管理层/產出",
          isShow: false,
          to: "dpoutwork",
          route: {
            path: "outwork",
            name: "dpoutwork",
            component: () => import("../views/main/dp/outwork/outwork.vue"),
            meta: { parentName: "dp", pageName: "人員出勤率看板" }
          }
        }
      ]
    },
    juec: {},
    // 4/15 新增的
    report: {
      // 所有从报表
      all: [
        // {
        //   imgUrl: require("@/assets/images/cma/output.png"),
        //   title: "dp第一个报表",
        //   belong: "报表/所有",
        //   isShow: false,
        //   to: "output"
        // }
      ]
    }
  }
}

let tempTitleArr = []

export let mapShowArr = (allRouters) => {
  let asyncRoutes = []
  let cmaNamesIds = []
  let dpNamesIds = []
  allRouters.forEach((item) => {
    if (item.name.includes("cma") && item.children) {
      cmaNamesIds = getAllTitleAndId(item.children)
    }
    tempTitleArr = []
    if (item.name.includes("dp") && item.children) {
      dpNamesIds = getAllTitleAndId(item.children)
    }
  })
  //console.log("cmaNames", cmaNames) // 所有返回的cma的地址
  //console.log("dpNames", dpNames) // 所有返回的dp的地址
  // 循环 cma 的地址
  showArrConfig.cma.manage.output = showArrConfig.cma.manage.output.map((item) => {
    let result = cmaNamesIds.find((_item) => _item.pageName == item.title)
    if (result && item.route) {
      asyncRoutes.push({ ...item.route, meta: { ...item.route.meta, pageId: result.pageId } })
    }
    delete item.route
    return { ...item, isShow: Boolean(result) }
  })
  showArrConfig.cma.manage.yield = showArrConfig.cma.manage.yield.map((item) => {
    let result = cmaNamesIds.find((_item) => _item.pageName == item.title)
    if (result && item.route) {
      asyncRoutes.push({ ...item.route, meta: { ...item.route.meta, pageId: result.pageId } })
    }
    delete item.route
    return { ...item, isShow: Boolean(result) }
  })
  showArrConfig.cma.manage.device = showArrConfig.cma.manage.device.map((item) => {
    let result = cmaNamesIds.find((_item) => _item.pageName == item.title)
    if (result && item.route) {
      asyncRoutes.push({ ...item.route, meta: { ...item.route.meta, pageId: result.pageId } })
    }
    delete item.route
    return { ...item, isShow: Boolean(result) }
  })
  showArrConfig.cma.manage.process = showArrConfig.cma.manage.process.map((item) => {
    let result = cmaNamesIds.find((_item) => _item.pageName == item.title)
    if (result && item.route) {
      asyncRoutes.push({ ...item.route, meta: { ...item.route.meta, pageId: result.pageId } })
    }
    delete item.route
    return { ...item, isShow: Boolean(result) }
  })
  // 处理cma 决策层的
  showArrConfig.cma.juec.output = showArrConfig.cma.juec.output.map((item) => {
    let result = cmaNamesIds.find((_item) => _item.pageName == item.title)
    if (result && item.route) {
      asyncRoutes.push({ ...item.route, meta: { ...item.route.meta, pageId: result.pageId } })
    }
    delete item.route
    return { ...item, isShow: Boolean(result) }
  })
  showArrConfig.cma.juec.yield = showArrConfig.cma.juec.yield.map((item) => {
    let result = cmaNamesIds.find((_item) => _item.pageName == item.title)
    if (result && item.route) {
      asyncRoutes.push({ ...item.route, meta: { ...item.route.meta, pageId: result.pageId } })
    }
    delete item.route
    return { ...item, isShow: Boolean(result) }
  })
  showArrConfig.cma.juec.device = showArrConfig.cma.juec.device.map((item) => {
    let result = cmaNamesIds.find((_item) => _item.pageName == item.title)
    if (result && item.route) {
      asyncRoutes.push({ ...item.route, meta: { ...item.route.meta, pageId: result.pageId } })
    }
    delete item.route
    return { ...item, isShow: Boolean(result) }
  })
  showArrConfig.cma.juec.process = showArrConfig.cma.juec.process.map((item) => {
    let result = cmaNamesIds.find((_item) => _item.pageName == item.title)
    if (result && item.route) {
      asyncRoutes.push({ ...item.route, meta: { ...item.route.meta, pageId: result.pageId } })
    }
    delete item.route
    return { ...item, isShow: Boolean(result) }
  })
  // 处理cma 报表的
  showArrConfig.cma.report.all = showArrConfig.cma.report.all.map((item) => {
    let result = cmaNamesIds.find((_item) => _item.pageName == item.title)
    if (result && item.route) {
      asyncRoutes.push({ ...item.route, meta: { ...item.route.meta, pageId: result.pageId } })
    }
    delete item.route
    return { ...item, isShow: Boolean(result) }
  })
  // 处理dp的管理层地址
  showArrConfig.dp.manage.output = showArrConfig.dp.manage.output.map((item) => {
    let result = dpNamesIds.find((_item) => _item.pageName == item.title)
    if (result && item.route) {
      asyncRoutes.push({ ...item.route, meta: { ...item.route.meta, pageId: result.pageId } })
    }
    delete item.route
    return { ...item, isShow: Boolean(result) }
  })
  // 处理dp的报表地址
  showArrConfig.dp.report.all = showArrConfig.dp.report.all.map((item) => {
    let result = dpNamesIds.find((_item) => _item.pageName == item.title)
    if (result && item.route) {
      asyncRoutes.push({ ...item.route, meta: { ...item.route.meta, pageId: result.pageId } })
    }
    delete item.route
    return { ...item, isShow: Boolean(result) }
  })

  return { showArrConfig, asyncRoutes }
}

/**
 * 获取所有的title 比如获取后端返回的所有cma的标题 和 页面 id
 * @param {*} routers
 * @returns
 */
function getAllTitleAndId(routers) {
  routers.forEach((item) => {
    // console.log("子页面id：", routers)
    tempTitleArr.push({ pageName: item.meta.title, pageId: item.id })
    if (item.children) {
      getAllTitleAndId(item.children)
    }
  })
  return tempTitleArr
}
