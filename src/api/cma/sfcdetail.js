import request from "@/network"
let { get: $get, post: $post } = request

// 获取所有的子数组
export let getCloseYield = (params = {}) => {
  let { PlantID = "8S01", DeviceSeries_V0 = "MW" } = params
  return $post(`/api/MESCloseYield/GetCloseFailInfo_DefectType?PlantID=${PlantID}&DeviceSeries_V0=${DeviceSeries_V0}`)
}

// 根据子数组请求对应的详情数据
export let getCloseYieldDetail = (params = {}) => {
  let { PlantID = "8S01", LotType = "MP", DeviceSeries_V0, DefectType } = params
  return $post(
    `/api/MESCloseYield/GetCloseFailInfo_TowM_FourW_DEV?PlantID=${PlantID}&DeviceSeries_V0=${DeviceSeries_V0}&LotType=${LotType}&DefectType=${DefectType}`
  )
}
