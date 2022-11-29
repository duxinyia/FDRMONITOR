import request from "@/network"
let { get: $get, post: $post } = request

//
export let getCloseNGYieldInfo = (params = {}) => {
  let { LotType = "MP", tag } = params
  return $post(`Mock/MESCloseYield/GetCloseNGYieldInfo?LotType=${LotType}&ShowTag=${tag}`)
}
