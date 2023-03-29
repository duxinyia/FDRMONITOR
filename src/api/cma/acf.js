import request from "@/network"
let { post: $post } = request
// 导入时间处理函数
import { getTime } from "@/utils"

// ACF 数据
export let getACFData = () => $post(`api/MachineIOKanban/8S01/ACF?${getTime()}`)
