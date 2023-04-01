import request from "@/network"
let { post: $post } = request

// 导入时间处理函数
import { getTime } from "@/utils"

//
export let GetAaData = (area) => $post(`api/MachineIOKanban/9S01/${area}?${getTime()}`)
