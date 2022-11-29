import request from "@/network"
let { get: $get, post: $post } = request

// sfc 页面的接口数据
export let getCloseYieldInfo = (params = {}) => {
  let { LotType = "MP" } = params
  return $post(`Mock/MESCloseYield/GetCloseYieldInfo?LotType=${LotType}`)
}
