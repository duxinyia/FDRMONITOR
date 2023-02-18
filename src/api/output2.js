import request from "@/network"
let { post: $post } = request

// 导入时间处理函数
import { getTime } from "@/utils"

//
export let GetKeyStationRunningInfo = (area = "ALL") =>
  $post(
    `api/MESOutPut/GetKeyStationRunningInfo?PlantID=8S01&ProductArea=${area}&ShowTag=ALL&LotType=MP&${getTime()}`
  )


// 2/16 获取机台的名称
export let GetStationName = (area = "ALL") =>
  $post(`api/MESOutPut/Get_DeviceSet_KeyStation_Info?PlantID=8S01&ShowTag=ALL&ProductArea=${area}`)

// 根据名称获取对应的机台
export let GetDeviceInfo = (area, device) => {
  return $post(`api/MESOutPut/Get_Device_KeyStationRunningInfo?PlantID=8S01&ProductArea=${area}&ShowTag=ALL&LotType=MP&${getTime()}&Device=${device}`)
}

