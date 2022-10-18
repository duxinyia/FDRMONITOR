import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import router from "./router"

import { globalRegister } from "./global"
Vue.config.productionTip = false

// 挂载moment
import moment from "moment"
Vue.prototype.$moment = moment
Vue.use(globalRegister)

// 挂载element ui
// import ElementUI from "element-ui"
// import "element-ui/lib/theme-chalk/index.css"
import "@/assets/scss/index.scss"
// Vue.use(ElementUI)

import "@/assets/scss/index.scss"

// 挂载svg组件
import "@/assets/icons"

// 挂载echarts
import * as echarts from "echarts"
Vue.prototype.$echarts = echarts
import "echarts-liquidfill"

// 挂载animate.css
import "animate.css"

// 关闭 生产环境的vue图标
const isDebug_mode = process.env.NODE_ENV !== "production"
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

// 保证vuex和localstorage中数据的统一
import { updateUser } from "@/store"
updateUser()
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount("#app")
