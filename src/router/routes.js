export default [
  {
    path: "/",
    redirect: () => "login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login4" */ "../views/login/login5.vue"),
    meta: {
      title: "登录一"
    }
  },

  {
    path: "/login1",
    name: "login1",
    component: () => import(/* webpackChunkName: "login1" */ "../views/login/login1.vue"),
    meta: {
      title: "登录二"
    }
  },
  {
    path: "/login2",
    name: "login2",
    component: () => import(/* webpackChunkName: "login2" */ "../views/login/login2.vue"),
    meta: {
      title: "登录三"
    }
  },
  {
    path: "/login3",
    name: "login3",
    component: () => import(/* webpackChunkName: "login3" */ "../views/login/login3.vue"),
    meta: {
      title: "登录四"
    }
  },
  {
    path: "/login4",
    name: "login4",
    component: () => import(/* webpackChunkName: "login4" */ "../views/login/login4.vue"),
    meta: {
      title: "登录五"
    }
  },
  {
    path: "/login5",
    name: "login5",
    component: () => import(/* webpackChunkName: "login" */ "../views/login/login.vue"),
    meta: {
      title: "登录五"
    }
  },

  // 登录以后的路由
  {
    path: "/overview",
    name: "overview",
    component: () => import(/* webpackChunkName: "overView" */ "../views/overView/index.vue"),
    redirect: () => "overview/cma/manage/output",
    meta: {
      title: "首页"
    },
    children: [
      // {
      //   path: "cma/manage/:type",
      //   name: "cmamanage",
      //   component: () =>
      //     import(/* webpackChunkName: "cmamanage" */ "../views/overView/cma/manage/manage.vue")
      // },
      // {
      //   path: "dp/manage/:type",
      //   name: "dpmanage",
      //   component: () =>
      //     import(/* webpackChunkName: "dpmanage" */ "../views/overView/dp/manage/manage.vue")
      // }
      // cma的侧边路由
      {
        path: "cma",
        name: "overviewcma",
        component: () =>
          import(/* webpackChunkName: "overviewcma" */ "../views/overView/cma/index.vue"),
        // redirect: () => "cma/manage/device",
        redirect: "cma/manage/device",
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
              import(/* webpackChunkName: "cmamanage" */ "../views/overView/cma/manage/manage.vue")
          }
        ]
      },
      // dp的路由
      {
        path: "dp",
        name: "overviewdp",
        component: () =>
          import(/* webpackChunkName: "overviewdp" */ "../views/overView/dp/index.vue"),
        redirect: "dp/manage/output",
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
              import(/* webpackChunkName: "cmamanage" */ "../views/overView/cma/manage/manage.vue")
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
            component: () => import(/* webpackChunkName: "va" */ "../views/main/cma/ga/ga.vue")
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
              import(/* webpackChunkName: "outwork" */ "../views/main/dp/outwork/outwork.vue")
          },
          {
            path: "output",
            name: "dpoutput",
            component: () =>
              import(/* webpackChunkName: "output" */ "../views/main/cma/output/output.vue")
          },
          //By天產出看板
          {
            path: "makewar",
            name: "dpmakewar",
            component: () =>
              import(/* webpackChunkName: "makewar" */ "../views/main/cma/makewar/makewar.vue")
          },
          // By站位產出看板
          {
            path: "output2",
            name: "dpoutput2",
            component: () =>
              import(/* webpackChunkName: "output2" */ "../views/main/dp/output2/output2.vue")
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
