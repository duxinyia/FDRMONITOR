import request from "@/network"
let { post: $post } = request
// 导入时间处理函数
import { getTime } from "@/utils"

// 页面的发送请求函数
export let getData = () => $post(`api/MachineIOKanban/8S01/AA`)
