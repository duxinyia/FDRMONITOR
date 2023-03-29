import request from "@/network"
let { post: $post } = request
// 导入时间处理函数
import { getTime } from "@/utils"

// AA 数据
export let getAAData = () => $post(`api/MachineIOKanban/8S01/AA?${getTime()}`)
// GA 数据
export let getGAData = () => $post(`api/MachineIOKanban/8S01/GA?${getTime()}`)
// CT 数据
export let getCTData = () => $post(`api/MachineIOKanban/8S01/CT?${getTime()}`)
