export default [
  {
    path: "/",
    redirect: () => "login5"
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "../views/login/login.vue"),
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
    component: () => import(/* webpackChunkName: "login4" */ "../views/login/login5.vue"),
    meta: {
      title: "登录五"
    }
  },
  {
    path: "/overview",
    name: "overview",
    component: () => import(/* webpackChunkName: "overView" */ "../views/overView/overView.vue"),
    redirect: () => "overview/manage/output",
    meta: {
      title: "首页"
    },
    children: [
      // {
      //   path: "cma/:type",
      //   name: "overview-cma",
      //   component: () =>
      //     import(/* webpackChunkName: "overview/cma" */ "../views/overView/cpns/cma/cma.vue")
      // },
      // 决策层
      // {
      //   path: 'output',
      //   component: () => import(
      //     /* webpackChunkName: "overview/manage11" */ "../views/overView/cpns/cma/output/output.vue"
      //   ),
      // },

      // 管理层
      {
        path: "manage/:type",
        name: "overview-manage",
        component: () =>
          import(
            /* webpackChunkName: "overview/manage" */ "../views/overView/cpns/manage/manage.vue"
          ),
        meta: {
          title: "管理层"
        }
      },

      // {
      //   path: 'manage',
      //   name: 'manage',
      //   component: () =>
      //     import(
      //         /* webpackChunkName: "overview/manage" */ "../views/overView/cpns/manage/manage.vue"
      //     ),
      //   children: [
      //     // 产出 良率  设备 製程監控
      //     {
      //       path: 'output',
      //       component: () =>
      //         import(
      //           /* webpackChunkName: "overview/manage/output" */ "../views/overView/cpns/manage/manage.vue"
      //         ),
      //     },

      //   ]
      // },


      // 关于页面
      {
        path: 'about',
        component: () =>
          import(
          /* webpackChunkName: "overview/about" */ "../views/overView/cpns/about/about.vue"
          ),
      }
    ]
  },
  // main 的路由
  {
    path: "/main",
    name: "main",
    component: () => import(/* webpackChunkName: "main" */ "../views/main/cma/index.vue"),
    meta: {
      title: "总览"
    },
    children: [
      // FOL看板的路由
      {
        path: "fol",
        name: "fol",
        component: () => import(/* webpackChunkName: "fol" */ "../views/main/cma/fol/fol.vue"),
        meta: {
          title: "FOL"
        }
      },
      // AA看板的路由
      {
        path: "aa",
        name: "aa",
        component: () => import(/* webpackChunkName: "aa" */ "../views/main/cma/aa/aa.vue"),
        meta: {
          title: "AA"
        }
      },
      {
        path: "text",
        name: "text",
        component: () => import(/* webpackChunkName: "text" */ "../views/main/cma/text/text.vue"),
        meta: {
          title: "TEXT"
        }
      },
      // 11/18 新增加EOL的页面
      {
        path: "eol",
        name: "eol",
        component: () => import(/* webpackChunkName: "eol" */ "../views/main/cma/eol/eol.vue"),
        meta: {
          title: "EOL"
        }
      },
      // 年度產出總覽
      {
        path: "output",
        name: "output",
        component: () =>
          import(/* webpackChunkName: "output" */ "../views/main/cma/output/output.vue"),
        meta: {
          title: "產出可視化"
        }
      },
      // By站位產出看板
      {
        path: "output2",
        name: "output2",
        component: () =>
          import(/* webpackChunkName: "output2" */ "../views/main/cma/output2/output2.vue"),
        meta: {
          title: "output2"
        }
      },
      // 制造层
      {
        path: "make",
        name: "make",
        component: () => import(/* webpackChunkName: "make" */ "../views/main/cma/make/make.vue"),
        meta: { isJump: true, title: "make" }
      },
      //每日產出看板
      {
        path: "makewar",
        name: "makewar",
        component: () =>
          import(/* webpackChunkName: "makewar" */ "../views/main/cma/makewar/makewar.vue"),
        meta: {
          title: "makewar"
        }
      },
      // 从 每日產出看板 达成率 跳转过来的路由
      {
        path: "wardetail",
        name: "wardetail",
        component: () =>
          import(/* webpackChunkName: "wardetail" */ "../views/main/cma/wardetail/wardetail.vue"),
        meta: {
          title: "wardetail"
        }
      },
      // 良率看板 SAP良率
      {
        path: "sap",
        name: "sap",
        component: () => import(/* webpackChunkName: "sap" */ "../views/main/cma/sap/sap.vue"),
        meta: {
          title: "wardetail"
        }
      },
      {
        path: "sfc",
        name: "sfc",
        component: () => import(/* webpackChunkName: "sfc" */ "../views/main/cma/sfc/sfc.vue"),
        meta: {
          title: "sfc"
        }
      },
      {
        path: "sfcdetail",
        name: "sfcdetail",
        component: () =>
          import(/* webpackChunkName: "sfcdetail" */ "../views/main/cma/sfcdetail/sfcdetail.vue"),
        meta: { isJump: true, title: "sfcdetail" }
      },
      {
        path: "tsfc",
        name: "tsfc",
        component: () => import(/* webpackChunkName: "tsfc" */ "../views/main/cma/tsfc/tsfc.vue"),
        meta: {
          title: "tsfc"
        }
      },
      {
        path: "defect",
        name: "defect",
        component: () =>
          import(/* webpackChunkName: "defect" */ "../views/main/cma/defect/defect.vue"),
        meta: {
          title: "defect"
        }
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
