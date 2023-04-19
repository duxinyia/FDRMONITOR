export default [
  {
    path: "/",
    redirect: () => "login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/login/login.vue")
  },
  // 登录以后的路由
  {
    path: "/overview",
    name: "overview",
    component: () => import(/* webpackChunkName: "overView" */ "@/views/overView/index.vue"),
    children: [
      // cma的侧边路由
      {
        path: "cma",
        name: "overviewcma",
        component: () => import(/* webpackChunkName: "overviewcma" */ "@/views/overView/cma/index.vue"),
        children: [
          // 分决策层和管理层
          {
            path: "manage/:type",
            name: "cmamanage",
            component: () => import(/* webpackChunkName: "cmamanage" */ "@/views/overView/cma/manage/manage.vue")
          },
          {
            path: "juec/:type",
            name: "cmajuec",
            component: () => import(/* webpackChunkName: "cmajuec" */ "@/views/overView/cma/manage/manage.vue")
          },
          {
            path: "report/:type",
            name: "cmareport",
            component: () => import(/* webpackChunkName: "cmareport" */ "@/views/overView/cma/manage/manage.vue")
          }
        ]
      },
      // dp的路由
      {
        path: "dp",
        name: "overviewdp",
        component: () => import(/* webpackChunkName: "overviewdp" */ "@/views/overView/dp/index.vue"),
        children: [
          // 分决策层和管理层
          {
            path: "manage/:type",
            name: "dpmanage",
            component: () => import(/* webpackChunkName: "dpmanage" */ "@/views/overView/cma/manage/manage.vue")
          },
          {
            path: "juec/:type",
            name: "dpjuec",
            component: () => import(/* webpackChunkName: "dpjuec" */ "@/views/overView/cma/manage/manage.vue")
          },
          {
            path: "report/:type",
            name: "dpreport",
            component: () => import(/* webpackChunkName: "dpreport" */ "@/views/overView/cma/manage/manage.vue")
          }
        ]
      }
    ]
  },
  // 主路由
  {
    path: "/main",
    name: "main",
    component: () => import(/* webpackChunkName: "main" */ "@/views/main/index.vue"),
    children: [
      // 这里也分 cma 路由 和 dp路由
      {
        path: "cma",
        name: "cma",
        component: () => import(/* webpackChunkName: "maincma" */ "@/views/main/cma/index.vue"),
        // 动态添加的路由放这里
        children: []
      },
      {
        path: "dp",
        name: "dp",
        component: () => import(/* webpackChunkName: "maindp" */ "@/views/main/dp/index.vue"),
        // 动态添加的路由放这里
        children: []
      }
    ]
  }
]
