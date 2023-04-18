import request from "@/network"
let { post: $post } = request

// sfc 页面的接口数据
// export let getCloseYieldInfo = (params = {}) => {
//   let { LotType = "MP" } = params
//   return $post(`Mock/MESCloseYield/GetCloseYieldInfo?LotType=${LotType}`)
// }

// 4/13 獲取機種有效的一級分類顯示清單
export let getMESDeviceInfo = () => $post(`/api/MESBaseSetting/GetMESDeviceSeriers_V0?PlantID=8S01`)

// 根据系列请求对应的子数据
export let getMESDeviceDetail = (params) => {
  let { serie } = params
  return $post(`/api/MESCloseYield/GetCloseYieldInfo_TowM_FourW_DEV?PlantID=8S01&LotType=MP&DeviceSeries_V0=${serie}`)
}

// 良率總覽 Close十二月
export let getCloseYieldInfo = () => $post(`/api/MESCloseYield/GetCloseYieldInfo_TwelveM_DS?PlantID=8S01&LotType=MP`)

// 良率總覽 Close兩月四周
export let getCloseYieldInfoTow = () =>
  $post(`/api/MESCloseYield/GetCloseYieldInfo_TowM_FourW_DS?PlantID=8S01&LotType=MP`)
