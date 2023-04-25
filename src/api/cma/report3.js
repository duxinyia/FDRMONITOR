import request from "@/network"

let { post: $post, get: $get, bodypost: $bodypost } = request

//获取DefectType下拉框数据
export let GetDefectType = () => $post(`/api/FPDCSFR/Load_DefectType`)
//获取DeviceSeriers下拉框数据
export let GetDeviceSeriers = () => $post(`/api/FPDCSFR/Load_DeviceSeriers`)
//获取ToolingType下拉框数据
export let ToolingType = () => $post(`/api/FPDCSFR/Load_ToolingType`)
//获取Supply下拉框数据
// export let Supply = (param) => $post(`/api/FPDCSFR/Load_Supply`)

export let Supply = (params) => {
  let { DeviceSeriers } = params
  return $post(`/api/FPDCSFR/Load_Supply?DeviceSeriers=${DeviceSeriers}`)
}

//获取第一个表格数据
export let GetTbale1Info = (params) => {
  let { DefectType, DeviceSeriers, ToolingType, Supply, datetime } = params
  return $post(
    `/api/FPDCSFR/SearchToolingTotal?DefectType=${DefectType}&DeviceSeriers=${DeviceSeriers}&ToolingType=${ToolingType}&Supply=${Supply}&datetime=${datetime}`
  )
}

//获取第二个表格数据
export let GetTbale2Info = (params) => {
  let { DefectType, DeviceSeriers, ToolingType, Supply, datetime } = params
  return $post(
    `/api/FPDCSFR/SearchTooling?DefectType=${DefectType}&DeviceSeriers=${DeviceSeriers}&ToolingType=${ToolingType}&Supply=${Supply}&datetime=${datetime}`
  )
}
