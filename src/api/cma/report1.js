import request from "@/network"
let { post: $post } = request

export let GetReport1Search = (deviceNo, supply) =>
  $post(`api/FPDCSFR/Search?SearchType=FPDC&Type=AAMC&DeviceNo=${deviceNo}&Supply=${supply}`)
