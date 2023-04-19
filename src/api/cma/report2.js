import request from "@/network"

let { post: $post, get: $get, bodypost: $bodypost } = request

// export let GetReport1Search = (deviceNo, supply) =>
//   $post(`api/FPDCSFR/Search?SearchType=FPDC&Type=AAMC&DeviceNo=${deviceNo}&Supply=${supply}`)

//获取Device下拉框数据
export let GetDeviceInfo = () => $get(`/api/VCM/Load_Device`)

//获取Lottype下拉框数据
export let GetLotTypeInfo = () => $get(`/api/VCM/Load_LotType`)

//获取Tester下拉框数据
export let GetTesterInfo = (params) => {
  let { DeviceNo } = params
  return $get(`/api/VCM/Load_Tester?DeviceNo=${DeviceNo}`)
}

//获取Test station下拉框数据
export let GetTestStationInfo = (params) => {
  let { DeviceNo, Tester } = params
  return $get(`/api/VCM/Load_Test_Station?DeviceNo=${DeviceNo}&Tester=${Tester}`)
}

//获取Material下拉框数据 获取Material Vendor下拉框数据
export let GetMaterialInfo = (params) => {
  let { DeviceNo, Material } = params
  return $get(`/api/VCM/Load_Material_Vendor?DeviceNo=${DeviceNo}&Material=${Material}`)
}

//获取MProcess下拉框数据
export let GetProcessInfo = (params) => {
  let { DeviceNo } = params
  return $get(`/api/VCM/Load_Process?DeviceNo=${DeviceNo}`)
}

//查询表格数据
export let getTableDate = (params) => $bodypost("/api/VCM/Search", params)
