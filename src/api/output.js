import request from "@/network"
let { post: $post, get: $get } = request


// 导入时间处理函数
import { getTime, getTimeAgo } from "@/utils"

// 1. 获取 左上 右上 的数据
export let getYearOutputInfo = (params = {}) => {
  let { PlantID = "8S01", ProductArea = "EOL", Year = "2022", DateTag } = params
  return $get(`api/MESOutPut/GetYearOutputInfo?PlantID=${PlantID}&ProductArea=${ProductArea}&Year=${Year}&DateTag=${DateTag}`)
}

// 2. 获取 左下 右下 的数据
export let getDateCodeOutputInfo = (params = {}) => {
  let { PlantID = "8S01", ProductArea = "EOL", Time = "2022-09", DateTag } = params
  return $get(`api/MESOutPut/GetDateCodeOutputInfo?PlantID=${PlantID}&ProductArea=${ProductArea}&Time=${Time}&DateTag=${DateTag}`)
}

// 3. 获取中间统计区域的和饼图的数据
export let getYearOutputInfoCollection = (params = {}) => {
  let { PlantID = '8S01', ProductArea = "EOL", Year = '2022' } = params
  return $get(`api/MESOutPut/GetYearOutputInfoCollection?PlantID=${PlantID}&ProductArea=${ProductArea}&Year=${Year}`)
}

// 4. 获取中间区域的折线图部分
export let getMPSOpenLineInfo = (params = {}) => {
  let { PlantID = "8S01", ProductArea = "EOL", St = "2022-11-23", Et = "2022-11-30" } = params
  return $get(`api/MESOutPut/GetMPSOpenLineInfo?PlantID=${PlantID}&ProductArea=${ProductArea}&St=${St}&Et=${Et}`)
}
