import request from "@/network"
import moment from "moment"
let { post: $post } = request

export let GetReport1Search = (type, ser) =>
  // $post(
  //   `api/FPDCSFR/Search?SearchType=FPDC&Type=AAMC&DeviceNo=${type}&Supply=${ser}&datetime=${moment().format(
  //     "YYYY-MM-DD"
  //   )}`
  // )// YYYY-MM-DD HH:mm:ss

  $post(`api/FPDCSFR/SearchAAMC?DefectType=${type}&DeviceSeriers=${ser}&datetime=${moment().format("YYYY-MM-DD")}`)
