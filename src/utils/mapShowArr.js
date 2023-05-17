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
            component: () =>
              import(/* webpackChunkName: "cmaoutput" */ "@/views/main/cma/output/output.vue"),
            meta: { parentName: "cma" }
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
                component: () =>
                  import(/* webpackChunkName: "cmamake" */ "@/views/main/cma/make/make.vue"),
                meta: { parentName: "cma", isJump: true }
              }
            ],
            component: () =>
              import(/* webpackChunkName: "cmamakewar" */ "@/views/main/cma/makewar/makewar.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "cmaoutput2" */ "@/views/main/cma/output2/output2.vue"),
            meta: { parentName: "cma" }
          }
        },
        {
          title: "By機臺產出看板",
          imgUrl: require("@/assets/images/cma/aactga.png"),
          belong: "管理层/產出",
          isShow: false,
          to: "aactga",
          route: {
            path: "aactga",
            name: "aactga",
            component: () =>
              import(/* webpackChunkName: "cmaaactga" */ "@/views/main/cma/aactga/aactga.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "cmasfc" */ "@/views/main/cma/sfc/sfc.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "cmatsfc" */ "@/views/main/cma/tsfc/tsfc.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "cmadefect" */ "@/views/main/cma/defect/defect.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "follcb" */ "@/views/main/cma/follcb/index.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "foldpc" */ "@/views/main/cma/foldpc/index.vue"),
            meta: { parentName: "cma" }
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
            component: () => import(/* webpackChunkName: "cmaaa" */ "@/views/main/cma/aa/aa.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "cmafol" */ "@/views/main/cma/fol/fol.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(
                /* webpackChunkName: "cmawekoutput" */ "@/views/main/cma/wekoutput/wekoutput.vue"
              ),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "cmafixtrue" */ "@/views/main/cma/fixtrue/fixtrue.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(
                /* webpackChunkName: "effciency" */ "@/views/main/cma/effciency/effciency.vue"
              ),
            meta: { parentName: "cma" }
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
            component: () =>
              import(
                /* webpackChunkName: "testfirst" */ "@/views/main/cma/testfirst/testfirst.vue"
              ),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "aawar" */ "@/views/main/cma/aawar/aawar.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "testeff" */ "@/views/main/cma/testeff/testeff.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "rerate" */ "@/views/main/cma/rerate/rerate.vue"),
            meta: { parentName: "cma" }
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
            component: () => import(/* webpackChunkName: "ga" */ "@/views/main/cma/ga/ga.vue"),
            meta: { parentName: "cma" }
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
            component: () => import(/* webpackChunkName: "va" */ "@/views/main/cma/va/va.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "jtest" */ "@/views/main/cma/folyield/folyield.vue"),
            meta: { parentName: "cma" }
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
            component: () => import(/* webpackChunkName: "jsa" */ "@/views/main/cma/jsa/jsa.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "javi" */ "@/views/main/cma/javi/javi.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "report1" */ "@/views/main/cma/report1/report1.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "report2" */ "@/views/main/cma/report2/report2.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "report3" */ "@/views/main/cma/report3/report3.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "report4" */ "@/views/main/cma/report4/report4.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "report4" */ "@/views/main/cma/report6/report6.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "report4" */ "@/views/main/cma/report7/report7.vue"),
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
            component: () =>
              import(/* webpackChunkName: "report5" */ "@/views/main/cma/report5/report5.vue"),
            meta: { parentName: "cma" }
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
            component: () =>
              import(/* webpackChunkName: "dpoutput" */ "@/views/main/dp/output/output.vue"),
            meta: { parentName: "dp" }
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
                component: () =>
                  import(/* webpackChunkName: "dpmake" */ "@/views/main/dp/make/make.vue"),
                meta: { parentName: "dp", isJump: true }
              }
            ],
            component: () =>
              import(/* webpackChunkName: "dpmakewar" */ "@/views/main/dp/makewar/makewar.vue"),
            meta: { parentName: "dp" }
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
            component: () =>
              import(/* webpackChunkName: "dpoutput2" */ "../views/main/dp/output2/output2.vue"),
            meta: { parentName: "dp" }
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
            component: () =>
              import(
                /* webpackChunkName: "dpdeviceoutput" */ "@/views/main/dp/equipOutput/equipOutput.vue"
              ),
            meta: { parentName: "dp" }
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
            component: () =>
              import(/* webpackChunkName: "dpoutwork" */ "../views/main/dp/outwork/outwork.vue"),
            meta: { parentName: "dp" }
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
