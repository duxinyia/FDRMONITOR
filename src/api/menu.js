import request from "@/network"
let { get: $get } = request


// 获取菜单的
export let getMenus = (userJob, nickName, appName = "战情中心") =>
  $get('system/menu/getLoginUserRouters', { userJob, nickName, appName }, { isMenu: true })

