// 挂载moment
import moment from "moment"
// 挂载echarts
import * as echarts from "echarts"
// 挂载全局的变量
import globalData from "@/assets/data"
// 挂在element ui 的 message
import { Message } from "element-ui"
// 保证vuex和localstorage中数据的统一
import { updateStoreData } from "@/store"
// 导入 animate.css
import "animate.css"
// echarts 水位图
import "echarts-liquidfill"
// 一些基本的样式
import "@/assets/scss/index.scss"
// 挂载svg组件
import "@/assets/icons"
//
import "font-awesome/css/font-awesome.css"


import eIconPicker from "e-icon-picker"
import "e-icon-picker/lib/symbol.js" //基本彩色图标库
import "e-icon-picker/lib/index.css" // 基本样式，包含基本图标
import "font-awesome/css/font-awesome.min.css" //font-awesome 图标库
import "element-ui/lib/theme-chalk/icon.css" //element-ui 图标库

export default function (app) {
  app.prototype.$moment = moment
  app.prototype.$echarts = echarts
  app.prototype.$globalData = globalData
  app.prototype.$message = Message
  updateStoreData()
  app.use(eIconPicker, { FontAwesome: true, ElementUI: true, eIcon: true, eIconSymbol: true })
}
