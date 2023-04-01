import request from "@/network"
let { get: $get } = request
// 1. 登录的接口  10.151.128.172:8088/Login/InterUserLogin
export let login = (params) => {
  return $get(
    "Login/InterUserLogin",
    { ...params, SystemName: "戰情中心", ipaddress: process.env.BASE_IP },
    { isLogin: true }
  )
}
