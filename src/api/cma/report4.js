import request from "@/network"

let { post: $post, get: $get, bodypost: $bodypost } = request

//获取DefectType下拉框数据
export let GetDefectType = () => $post(`/api/Performance/Load_DefectType`)

//获取 Device下拉框数据
export let GetDevice = () => $post(`/api/Performance/Load_Device`)

//获取表格数据
export let GetTbaleInfo = (params) => {
  let { DefectType, Device, Starttime, Endtime } = params
  return $post(
    `/api/Performance/SearchFPDCSFRperformance?DefectType=${DefectType}&Device=${Device}&Starttime=${Starttime}&Endtime=${Endtime}`
  )
}
