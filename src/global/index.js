// 减少打包体积,局部导入datav
import registerDatav from "./register-datav"
import registerElement from "./register-element"

export function globalRegister(app) {
  app.use(registerDatav)
  app.use(registerElement)
}
