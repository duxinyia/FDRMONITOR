import request from "@/network"
import moment from "moment"
let { post: $post } = request

export let GetReport1Search = (deviceNo, supply) =>
  // $post(`api/FPDCSFR/Search?SearchType=FPDC&Type=AAMC&DeviceNo=${deviceNo}&Supply=${supply}`)YYYY-MM-DD HH:mm:ss
  $post(`api/FPDCSFR/SearchAAMC?DefectType=SFR&DeviceSeriers=MW&datetime=${moment().format("YYYY-MM-DD")}`)
