export default [
  {
    path: "/",
    redirect: () => "login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "../views/login/login.vue"),
    meta: {
      title: "登录"
    }
  },
  // 登录以后的路由
  {
    path: "/overview",
    name: "overview",
    component: () => import(/* webpackChunkName: "overView" */ "../views/overView/index.vue"),
    meta: {
      title: "首页"
    },
    children: [
      // cma的侧边路由
      {
        path: "cma",
        name: "overviewcma",
        component: () => import(/* webpackChunkName: "overviewcma" */ "../views/overView/cma/index.vue"),
        children: [
          // 分决策层和管理层
          {
            path: "manage/:type",
            name: "cmamanage",
            component: () => import(/* webpackChunkName: "cmamanage" */ "../views/overView/cma/manage/manage.vue")
          },
          {
            path: "juec/:type",
            name: "cmajuec",
            component: () => import(/* webpackChunkName: "cmajuec" */ "../views/overView/cma/manage/manage.vue")
          },
          {
            path: "report/:type",
            name: "cmareport",
            component: () => import(/* webpackChunkName: "cmareport" */ "../views/overView/cma/manage/manage.vue")
          }
        ]
      },
      // dp的路由
      {
        path: "dp",
        name: "overviewdp",
        component: () => import(/* webpackChunkName: "overviewdp" */ "../views/overView/dp/index.vue"),
        children: [
          // 分决策层和管理层
          {
            path: "manage/:type",
            name: "dpmanage",
            component: () => import(/* webpackChunkName: "dpmanage" */ "../views/overView/cma/manage/manage.vue")
          },
          {
            path: "juec/:type",
            name: "dpjuec",
            component: () => import(/* webpackChunkName: "dpjuec" */ "../views/overView/cma/manage/manage.vue")
          },
          {
            path: "report/:type",
            name: "dpreport",
            component: () => import(/* webpackChunkName: "dpreport" */ "../views/overView/cma/manage/manage.vue")
          }
        ]
      }
    ]
  },
  // 主路由
  {
    path: "/main",
    name: "main",
    component: () => import(/* webpackChunkName: "main" */ "../views/main/index.vue"),
    meta: {
      title: "总览"
    },
    children: [
      // 这里也分 cma 路由 和 dp路由
      {
        path: "cma",
        name: "cma",
        component: () => import(/* webpackChunkName: "maincma" */ "../views/main/cma/index.vue"),
        // 动态添加的路由放这里
        children: []
      },
      {
        path: "dp",
        name: "dp",
        component: () => import(/* webpackChunkName: "maindp" */ "../views/main/dp/index.vue"),
        // 动态添加的路由放这里
        children: []
      }
    ]
  }
]

// children: [
//   // AA看板的路由
//   {
//     path: "aa",
//     name: "aa",
//     component: () => import(/* webpackChunkName: "aa" */ "../views/main/cma/aa/aa.vue")
//   },
//   // FOL看板的路由
//   {
//     path: "fol",
//     name: "fol",
//     component: () => import(/* webpackChunkName: "fol" */ "../views/main/cma/fol/fol.vue")
//   },
//   // 11/18 新增加EOL的页面
//   {
//     path: "eol",
//     name: "eol",
//     component: () => import(/* webpackChunkName: "eol" */ "../views/main/cma/eol/eol.vue")
//   },
//   // 2/23 新增 AA CT GA 看板
//   {
//     path: "aactga",
//     name: "aactga",
//     component: () =>
//       import(/* webpackChunkName: "aactga" */ "../views/main/cma/aactga/aactga.vue")
//   },
//   // 年度產出總覽
//   {
//     path: "output",
//     name: "output",
//     component: () =>
//       import(/* webpackChunkName: "cmaoutput" */ "../views/main/cma/output/output.vue")
//   },
//   // By站位產出看板
//   {
//     path: "output2",
//     name: "output2",
//     component: () =>
//       import(/* webpackChunkName: "output2" */ "../views/main/cma/output2/output2.vue")
//   },
//   // 制造层
//   {
//     path: "make",
//     name: "make",
//     component: () =>
//       import(/* webpackChunkName: "make" */ "../views/main/cma/make/make.vue"),
//     meta: { isJump: true, title: "make" }
//   },
//   //By天產出看板
//   {
//     path: "makewar",
//     name: "makewar",
//     component: () =>
//       import(/* webpackChunkName: "makewar" */ "../views/main/cma/makewar/makewar.vue")
//   },
//   // 从 By天產出看板 达成率 跳转过来的路由
//   {
//     path: "wardetail",
//     name: "wardetail",
//     component: () =>
//       import(
//         /* webpackChunkName: "wardetail" */ "../views/main/cma/wardetail/wardetail.vue"
//       )
//   },
//   // 良率看板 SAP良率
//   {
//     path: "sap",
//     name: "sap",
//     component: () => import(/* webpackChunkName: "sap" */ "../views/main/cma/sap/sap.vue")
//   },
//   {
//     path: "sfc",
//     name: "sfc",
//     component: () => import(/* webpackChunkName: "sfc" */ "../views/main/cma/sfc/sfc.vue")
//   },
//   {
//     path: "sfcdetail",
//     name: "sfcdetail",
//     component: () =>
//       import(
//         /* webpackChunkName: "sfcdetail" */ "../views/main/cma/sfcdetail/sfcdetail.vue"
//       ),
//     meta: { isJump: true, title: "sfcdetail" }
//   },
//   {
//     path: "yielddetail",
//     name: "yielddetail",
//     component: () =>
//       import(
//         /* webpackChunkName: "yielddetail" */ "../views/main/cma/yielddetail/yielddetail.vue"
//       )
//   },
//   {
//     path: "tsfc",
//     name: "tsfc",
//     component: () =>
//       import(/* webpackChunkName: "tsfc" */ "../views/main/cma/tsfc/tsfc.vue")
//   },
//   {
//     path: "defect",
//     name: "defect",
//     component: () =>
//       import(/* webpackChunkName: "defect" */ "../views/main/cma/defect/defect.vue")
//   },
//   {
//     path: "text",
//     name: "text",
//     component: () =>
//       import(/* webpackChunkName: "text" */ "../views/main/cma/text/text.vue")
//   },
//   {
//     path: "va",
//     name: "va",
//     component: () => import(/* webpackChunkName: "va" */ "../views/main/cma/va/va.vue")
//   },
//   {
//     path: "ga",
//     name: "ga",
//     component: () => import(/* webpackChunkName: "ga" */ "../views/main/cma/ga/ga.vue")
//   },
//   {
//     path: "wekoutput",
//     name: "wekoutput",
//     component: () =>
//       import(
//         /* webpackChunkName: "wekoutput" */ "../views/main/cma/wekoutput/wekoutput.vue"
//       )
//   },
//   // Test治具良率看板
//   {
//     path: "fixtrue",
//     name: "fixtrue",
//     component: () =>
//       import(/* webpackChunkName: "fixtrue" */ "../views/main/cma/fixtrue/fixtrue.vue")
//   },
//   {
//     path: "effciency",
//     name: "effciency",
//     component: () =>
//       import(
//         /* webpackChunkName: "effciency" */ "../views/main/cma/effciency/effciency.vue"
//       )
//   },
//   {
//     path: "aawar",
//     name: "aawar",
//     component: () =>
//       import(/* webpackChunkName: "aawar" */ "../views/main/cma/aawar/aawar.vue")
//   },
//   {
//     path: "testeff",
//     name: "testeff",
//     component: () =>
//       import(/* webpackChunkName: "testeff" */ "../views/main/cma/testeff/testeff.vue")
//   },
//   {
//     path: "testfirst",
//     name: "testfirst",
//     component: () =>
//       import(
//         /* webpackChunkName: "testfirst" */ "../views/main/cma/testfirst/testfirst.vue"
//       )
//   },

//   // cma的 决策层的
//   {
//     path: "jtest",
//     name: "jtest",
//     component: () =>
//       import(/* webpackChunkName: "jtest" */ "../views/main/cma/jtest/jtest.vue")
//   },
//   {
//     path: "folyield",
//     name: "folyield",
//     component: () =>
//       import(/* webpackChunkName: "jtest" */ "../views/main/cma/folyield/folyield.vue")
//   },
//   {
//     path: "jsa",
//     name: "jsa",
//     component: () => import(/* webpackChunkName: "jsa" */ "../views/main/cma/jsa/jsa.vue")
//   },
//   {
//     path: "javi",
//     name: "javi",
//     component: () =>
//       import(/* webpackChunkName: "javi" */ "../views/main/cma/javi/javi.vue")
//   },
//   // 4/15 新增报表的路由
//   {
//     path: "report1",
//     name: "cmamainreport",
//     component: () =>
//       import(/* webpackChunkName: "report1" */ "../views/main/cma/report1/report1.vue")
//   },
//   {
//     path: "report2",
//     name: "cmamainreport2",
//     component: () =>
//       import(/* webpackChunkName: "report2" */ "../views/main/cma/report2/report2.vue")
//   }
// ]

// children: [
//   {
//     path: "outwork",
//     name: "dpoutwork",
//     component: () =>
//       import(/* webpackChunkName: "dpoutwork" */ "../views/main/dp/outwork/outwork.vue")
//   },
//   {
//     path: "output",
//     name: "dpoutput",
//     component: () =>
//       import(/* webpackChunkName: "dpoutput" */ "../views/main/dp/output/output.vue")
//   },
//   // 制造层
//   {
//     path: "make",
//     name: "dpmake",
//     component: () =>
//       import(/* webpackChunkName: "dpmake" */ "../views/main/dp/make/make.vue"),
//     meta: { isJump: true, title: "make" }
//   },
//   //By天產出看板
//   {
//     path: "makewar",
//     name: "dpmakewar",
//     component: () =>
//       import(/* webpackChunkName: "dpmakewar" */ "../views/main/dp/makewar/makewar.vue")
//   },
//   // By站位產出看板
//   {
//     path: "output2",
//     name: "dpoutput2",
//     component: () =>
//       import(/* webpackChunkName: "dpoutput2" */ "../views/main/dp/output2/output2.vue")
//   },
//   {
//     path: "equipoutput",
//     name: "dpequipoutput",
//     component: () =>
//       import(
//         /* webpackChunkName: "dpdeviceoutput" */ "../views/main/dp/equipOutput/equipOutput.vue"
//       )
//   }
// ]
