export default [
  {
    path: "/",
    redirect: () => "login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login5" */ "../views/login/login.vue"),
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
        component: () =>
          import(/* webpackChunkName: "overviewcma" */ "../views/overView/cma/index.vue"),
        children: [
          // 分决策层和管理层
          {
            path: "manage/:type",
            name: "cmamanage",
            component: () =>
              import(/* webpackChunkName: "cmamanage" */ "../views/overView/cma/manage/manage.vue")
          },
          {
            path: "juec/:type",
            name: "cmajuec",
            component: () =>
              import(/* webpackChunkName: "cmajuec" */ "../views/overView/cma/manage/manage.vue")
          }
        ]
      },
      // dp的路由
      {
        path: "dp",
        name: "overviewdp",
        component: () =>
          import(/* webpackChunkName: "overviewdp" */ "../views/overView/dp/index.vue"),
        children: [
          // 分决策层和管理层
          {
            path: "manage/:type",
            name: "dpmanage",
            component: () =>
              import(/* webpackChunkName: "dpmanage" */ "../views/overView/dp/manage/manage.vue")
          },
          {
            path: "juec/:type",
            name: "dpjuec",
            component: () =>
              import(/* webpackChunkName: "dpjuec" */ "../views/overView/cma/manage/manage.vue")
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
        component: () => import(/* webpackChunkName: "maincma" */ "../views/main/cma/index.vue"),
        children: [
          // AA看板的路由
          {
            path: "aa",
            name: "aa",
            component: () => import(/* webpackChunkName: "aa" */ "../views/main/cma/aa/aa.vue")
          },
          // FOL看板的路由
          {
            path: "fol",
            name: "fol",
            component: () => import(/* webpackChunkName: "fol" */ "../views/main/cma/fol/fol.vue")
          },
          // 11/18 新增加EOL的页面
          {
            path: "eol",
            name: "eol",
            component: () => import(/* webpackChunkName: "eol" */ "../views/main/cma/eol/eol.vue")
          },
          // 2/23 新增 AA CT GA 看板
          {
            path: "aactga",
            name: "aactga",
            component: () =>
              import(/* webpackChunkName: "aactga" */ "../views/main/cma/aactga/aactga.vue")
          },
          // 年度產出總覽
          {
            path: "output",
            name: "output",
            component: () =>
              import(/* webpackChunkName: "output" */ "../views/main/cma/output/output.vue")
          },
          // By站位產出看板
          {
            path: "output2",
            name: "output2",
            component: () =>
              import(/* webpackChunkName: "output2" */ "../views/main/cma/output2/output2.vue")
          },
          // 制造层
          {
            path: "make",
            name: "make",
            component: () =>
              import(/* webpackChunkName: "make" */ "../views/main/cma/make/make.vue"),
            meta: { isJump: true, title: "make" }
          },
          //By天產出看板
          {
            path: "makewar",
            name: "makewar",
            component: () =>
              import(/* webpackChunkName: "makewar" */ "../views/main/cma/makewar/makewar.vue")
          },
          // 从 By天產出看板 达成率 跳转过来的路由
          {
            path: "wardetail",
            name: "wardetail",
            component: () =>
              import(
                /* webpackChunkName: "wardetail" */ "../views/main/cma/wardetail/wardetail.vue"
              )
          },
          // 良率看板 SAP良率
          {
            path: "sap",
            name: "sap",
            component: () => import(/* webpackChunkName: "sap" */ "../views/main/cma/sap/sap.vue")
          },
          {
            path: "sfc",
            name: "sfc",
            component: () => import(/* webpackChunkName: "sfc" */ "../views/main/cma/sfc/sfc.vue")
          },
          {
            path: "sfcdetail",
            name: "sfcdetail",
            component: () =>
              import(
                /* webpackChunkName: "sfcdetail" */ "../views/main/cma/sfcdetail/sfcdetail.vue"
              ),
            meta: { isJump: true, title: "sfcdetail" }
          },
          {
            path: "yielddetail",
            name: "yielddetail",
            component: () =>
              import(
                /* webpackChunkName: "yielddetail" */ "../views/main/cma/yielddetail/yielddetail.vue"
              )
          },
          {
            path: "tsfc",
            name: "tsfc",
            component: () =>
              import(/* webpackChunkName: "tsfc" */ "../views/main/cma/tsfc/tsfc.vue")
          },
          {
            path: "defect",
            name: "defect",
            component: () =>
              import(/* webpackChunkName: "defect" */ "../views/main/cma/defect/defect.vue")
          },
          {
            path: "text",
            name: "text",
            component: () =>
              import(/* webpackChunkName: "text" */ "../views/main/cma/text/text.vue")
          },
          {
            path: "va",
            name: "va",
            component: () => import(/* webpackChunkName: "va" */ "../views/main/cma/va/va.vue")
          },
          {
            path: "ga",
            name: "ga",
            component: () => import(/* webpackChunkName: "ga" */ "../views/main/cma/ga/ga.vue")
          },
          {
            path: "wekoutput",
            name: "wekoutput",
            component: () =>
              import(
                /* webpackChunkName: "wekoutput" */ "../views/main/cma/wekoutput/wekoutput.vue"
              )
          },
          {
            path: "acf",
            name: "acf",
            component: () => import(/* webpackChunkName: "acf" */ "../views/main/cma/acf/acf.vue")
          },
          {
            path: "test",
            name: "test",
            component: () =>
              import(/* webpackChunkName: "test" */ "../views/main/cma/test/test.vue")
          },
          {
            path: "avi",
            name: "avi",
            component: () => import(/* webpackChunkName: "test" */ "../views/main/cma/avi/avi.vue")
          },
          // cma的 决策层的
          {
            path: "jtest",
            name: "jtest",
            component: () =>
              import(/* webpackChunkName: "jtest" */ "../views/main/cma/jtest/jtest.vue")
          },
          {
            path: "folyield",
            name: "folyield",
            component: () =>
              import(/* webpackChunkName: "jtest" */ "../views/main/cma/folyield/folyield.vue")
          },
          {
            path: "jsa",
            name: "jsa",
            component: () => import(/* webpackChunkName: "jsa" */ "../views/main/cma/jsa/jsa.vue")
          },
          {
            path: "javi",
            name: "javi",
            component: () =>
              import(/* webpackChunkName: "javi" */ "../views/main/cma/javi/javi.vue")
          }
        ]
      },

      {
        path: "dp",
        component: () => import(/* webpackChunkName: "maindp" */ "../views/main/dp/index.vue"),
        children: [
          {
            path: "outwork",
            name: "dpoutwork",
            component: () =>
              import(/* webpackChunkName: "dpoutwork" */ "../views/main/dp/outwork/outwork.vue")
          },
          {
            path: "output",
            name: "dpoutput",
            component: () =>
              import(/* webpackChunkName: "dpoutput" */ "../views/main/cma/output/output.vue")
          },
          // 制造层
          {
            path: "make",
            name: "dpmake",
            component: () =>
              import(/* webpackChunkName: "dpmake" */ "../views/main/dp/make/make.vue"),
            meta: { isJump: true, title: "make" }
          },
          //By天產出看板
          {
            path: "makewar",
            name: "dpmakewar",
            component: () =>
              import(/* webpackChunkName: "dpmakewar" */ "../views/main/dp/makewar/makewar.vue")
          },
          // By站位產出看板
          {
            path: "output2",
            name: "dpoutput2",
            component: () =>
              import(/* webpackChunkName: "dpoutput2" */ "../views/main/dp/output2/output2.vue")
          },
          {
            path: "equipoutput",
            name: "dpequipoutput",
            component: () =>
              import(
                /* webpackChunkName: "dpdeviceoutput" */ "../views/main/dp/equipOutput/equipOutput.vue"
              )
          }
        ]
      }
    ]
  },

  // 没找到的路由
  {
    path: "*",
    name: "notFound",
    component: () => import(/* webpackChunkName: "notFound" */ "../views/notFound/notFound.vue"),
    meta: {
      title: "notFound"
    }
  }
]
