import request from "@/network"
import moment from "moment"
let { post: $post } = request
// 获取数据
export let GetReport7TableData = () =>
  // moment().format("YYYY-MM-DD HH:mm:ss")
  $post(
    `api/MaterialWonoBinding/Search?RequestM.DeviceNo=APL007&RequestM.MotherLot=K3043E004&RequestM.Starttime=2023-05-16 06:00&RequestM.Endtime=2023-05-17 06:00`
  )
//获取DefectType下拉框数据
// export let GetDefectTypeInfo = () => $post(`/api/FPDCSFR/Load_DefectType`)

//获取DeviceSeriers下拉框数据
// export let GetDeviceSeriersInfo = () => $post(`/api/FPDCSFR/Load_DeviceSeriers`)
