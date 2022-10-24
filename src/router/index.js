import Vue from "vue"
import VueRouter from "vue-router"

import NProgress from "nprogress"
import "nprogress/nprogress.css"
// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error)
}
Vue.use(VueRouter)
const routes = [
  {
    path: "/",
    redirect: () => "login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "../views/login/login.vue")
  },
  {
    path: "/overview",
    name: "overview",
    component: () => import(/* webpackChunkName: "overView" */ "../views/overView/overView.vue"),
    redirect: () => "overview/cma/device",
    children: [
      {
        path: "bg",
        name: "bg",
        component: () =>
          import(/* webpackChunkName: "overview/bg" */ "../views/overView/cpns/bg/bg.vue")
      },
      {
        path: "user",
        name: "user",
        component: () =>
          import(/* webpackChunkName: "overview/user" */ "../views/overView/cpns/user/user.vue")
      },
      {
        path: "cma/:type",
        name: "overview-cma",
        component: () =>
          import(/* webpackChunkName: "overview/cma" */ "../views/overView/cpns/cma/cma.vue")
      },
      {
        path: "dp",
        name: "overview-dp",
        component: () =>
          import(/* webpackChunkName: "overview/dp" */ "../views/overView/cpns/dp/dp.vue")
      },
      {
        path: "about",
        name: "about",
        component: () =>
          import(/* webpackChunkName: "overview/about" */ "../views/overView/cpns/about/about.vue")
      }
    ]
  },
  // cma 的路由
  {
    path: "/cma",
    name: "cma",
    component: () => import(/* webpackChunkName: "main" */ "../views/main/cma/index.vue"),
    // redirect: { name: "aa" },
    children: [
      // FOL看板的路由
      {
        path: "fol",
        name: "fol",
        component: () => import(/* webpackChunkName: "fol" */ "../views/main/cma/fol/fol.vue")
      },
      // AA看板的路由
      {
        path: "aa",
        name: "aa",
        component: () => import(/* webpackChunkName: "aa" */ "../views/main/cma/aa/aa.vue")
      },
      // 產出可視化平台
      {
        path: "output",
        name: "output",
        component: () =>
          import(/* webpackChunkName: "output" */ "../views/main/cma/output/output.vue")
      },
      // 九宮格產出看板
      {
        path: "output2",
        name: "output2",
        component: () =>
          import(/* webpackChunkName: "output" */ "../views/main/cma/output2/output2.vue")
      },
      // 制造层
      {
        path: "make",
        name: "make",
        component: () => import(/* webpackChunkName: "output" */ "../views/main/cma/make/make.vue")
      },
      //製造戰情中心
      {
        path: "makewar",
        name: "makewar",
        component: () =>
          import(/* webpackChunkName: "makewar" */ "../views/main/cma/makewar/makewar.vue")
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
        component: () => import(/* webpackChunkName: "sap" */ "../views/main/cma/sfc/sfc.vue")
      },
      {
        path: "tsfc",
        name: "tsfc",
        component: () => import(/* webpackChunkName: "sap" */ "../views/main/cma/tsfc/tsfc.vue")
      }
    ]
  },
  // dp 的路由
  {
    path: "/dp",
    name: "dp",
    component: () => import(/* webpackChunkName: "main" */ "../views/main/dp/index.vue"),
    children: []
  },
  // 没找到的路由
  {
    path: "*",
    name: "notFound",
    component: () => import(/* webpackChunkName: "notFound" */ "../views/notFound/notFound.vue")
  }
]
const router = new VueRouter({
  routes
})
// 前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 如果有值，直接跳转到主页
  if (to.path == "/login") {
    if (cache.getCache("user")) {
      next("/overview")
    } else {
      next()
    }
  } else {
    next()
  }
})
// 后置守卫
router.afterEach(() => {
  NProgress.done()
})
export default router
