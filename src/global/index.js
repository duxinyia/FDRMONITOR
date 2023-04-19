// 减少打包体积,局部导入datav
import registerDatav from "./register-datav"
import registerElement from "./register-element"
import registerOthers from "./register-others"

// fade/zoom 等
import "element-ui/lib/theme-chalk/base.css"
// collapse 展开折叠
import CollapseTransition from "element-ui/lib/transitions/collapse-transition"

export default function globalRegister(app) {
  app.use(registerDatav)
  app.use(registerElement)
  app.use(registerOthers)
  app.component(CollapseTransition.name, CollapseTransition)
}
