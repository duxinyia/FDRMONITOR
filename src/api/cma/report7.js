import request from "@/network"
import moment from "moment"
let { post: $post, bodypost: $bodypost } = request
// 获取数据
export let GetReport7TableData = (params) =>
  // moment().format("YYYY-MM-DD HH:mm:ss")
  $bodypost(`/api/MaterialWonoBinding/Search`, params)
//获取机种下拉框数据
export let GetProductNoInfo = () => $post(`api/MaterialWonoBinding/Load_DeviceNo`)
