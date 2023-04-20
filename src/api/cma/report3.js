import request from "@/network"

let { post: $post, get: $get, bodypost: $bodypost } = request

//获取第一个表格数据
export let GetTbale1Info = (params) => {
  let { DefectType, DeviceSeriers, Supply, date } = params
  return $post(
    `/api/FPDCSFR/SearchToolingTotal?DefectType=${DefectType}&DeviceSeriers=${DeviceSeriers}&Supply=${Supply}&date=${date}`
  )
}

//获取第二个表格数据
export let GetTbale2Info = (params) => {
  let { DefectType, DeviceSeriers, Supply, date } = params
  return $post(
    `/api/FPDCSFR/SearchTooling?DefectType=${DefectType}&DeviceSeriers=${DeviceSeriers}&Supply=${Supply}&date=${date}`
  )
}
