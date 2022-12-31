import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import router from "./router"
import { globalRegister } from "./global"
import i18n from "./lang"
Vue.use(globalRegister)
Vue.config.productionTip = false
new Vue({
  i18n,
  store,
  router,
  render: (h) => h(App)
}).$mount("#app")
