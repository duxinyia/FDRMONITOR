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
    if (hasRoles || store.state.permission.menus.length == 0) {
      let asyncRoutes = await store.dispatch("permission/getUserRoutes", {
        userJob: store.state.user.user.username,
        nickName: store.state.user.user.fullName
      })
      hasRoles = false
      console.log("异步路由", asyncRoutes)
      // 加载异步路由
      asyncRoutes.forEach((route) => {
        if (route.isHasDetailArr) {
          route.isHasDetailArr.forEach((detailRoute) => {
            router.addRoute(detailRoute.meta.parentName, detailRoute)
          })
          delete route.isHasDetailArr
        }
        router.addRoute(route.meta.parentName, route)
      })
      router.addRoute({
        path: "*",
        name: "notFound",
        component: () => import(/* webpackChunkName: "notFound" */ "@/views/notFound/notFound.vue")
      })
      next({ ...to, replace: true })
    } else {
      next()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
