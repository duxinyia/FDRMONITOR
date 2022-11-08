import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes.js"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error)
}
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
// 前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
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
