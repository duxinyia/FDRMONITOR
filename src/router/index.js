import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes.js"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import cache from "@/utils/cache.js"
import store from "../store"

// 防止连续点击多次路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
let hasRoles = true
// 用于动态添加路由
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 如果去的路由的 login
  if (to.path.includes("login")) {
    if (cache.getCache("user")) {
      next("/overview")
    } else {
      next()
    }
  } else {
    if (hasRoles && store.state.permission.menus.length == 0) {
      await store.dispatch("permission/getUserRoutes", {
        userJob: store.state.user.user.username,
        nickName: store.state.user.user.fullName
      })
      hasRoles = false
      // gxl 动态添加路由的方法
      // router.addRoute("cma", {
      //   path: "aa",
      //   name: "aa",
      //   component: () => import(/* webpackChunkName: "aa" */ "@/views/main/cma/aa/aa.vue")
      // })
      next({ ...to, replace: true })
      // router.addRoute()
      // next()
    } else {
      next()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

export default router
