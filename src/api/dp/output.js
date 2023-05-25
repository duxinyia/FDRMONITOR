import request from "@/network"
let { get: $get } = request
import moment from "moment"

// 1. 获取 左上 右上 的数据
export let getYearOutputInfo = (params = {}) => {
<<<<<<< HEAD
  let { PlantID = "8S01", ProductArea = "EOL", Year = `${moment().format("YYYY")}`, DateTag } = params
  return $get(`api/MESOutPut/GetYearOutputInfo?PlantID=${PlantID}&ProductArea=${ProductArea}&DateTag=${DateTag}`)
=======
  let {
    PlantID = "9S01",
    ProductArea = "EOL",
    Year = `${moment().format("YYYY")}`,
    DateTag
  } = params
  return $get(
    `api/MESDPOutPut/GetYearOutputInfo?PlantID=${PlantID}&ProductArea=${ProductArea}&DateTag=${DateTag}`
  )
>>>>>>> 6de567f93ac883d9a881873065352cd958a52da6
}

// 2. 获取 左下 右下 的数据
export let getDateCodeOutputInfo = (params = {}) => {
<<<<<<< HEAD
  let { PlantID = "8S01", ProductArea = "EOL", Time = `${moment().format("YYYY-MM")}`, DateTag } = params
  return $get(`api/MESOutPut/GetDateCodeOutputInfo?PlantID=${PlantID}&ProductArea=${ProductArea}&DateTag=${DateTag}`)
=======
  let {
    PlantID = "9S01",
    ProductArea = "EOL",
    Time = `${moment().format("YYYY-MM")}`,
    DateTag
  } = params
  return $get(
    `api/MESDPOutPut/GetDateCodeOutputInfo?PlantID=${PlantID}&ProductArea=${ProductArea}&Time=${Time}&DateTag=${DateTag}`
  )
>>>>>>> 6de567f93ac883d9a881873065352cd958a52da6
}

// 3. 获取中间统计区域的和饼图的数据
export let getYearOutputInfoCollection = (params = {}) => {
<<<<<<< HEAD
  let { PlantID = "8S01", ProductArea = "EOL", Year = `${moment().format("YYYY")}` } = params
  return $get(`api/MESOutPut/GetYearOutputInfoCollection?PlantID=${PlantID}&ProductArea=${ProductArea}&Year=${Year}`)
=======
  let { PlantID = "9S01", ProductArea = "EOL", Year = `${moment().format("YYYY")}` } = params
  return $get(
    `api/MESDPOutPut/GetYearOutputInfoCollection?PlantID=${PlantID}&ProductArea=${ProductArea}&Year=${Year}`
  )
>>>>>>> 6de567f93ac883d9a881873065352cd958a52da6
}

// 4. 获取中间区域的折线图部分
export let getMPSOpenLineInfo = (params = {}) => {
  let {
    PlantID = "9S01",
    ProductArea = "EOL",
    St = `${moment().format("YYYY-MM-DD")}`,
    Et = `${moment().add(7, "days").format("YYYY-MM-DD")}`
  } = params
<<<<<<< HEAD
  return $get(`api/MESOutPut/GetMPSOpenLineInfo?PlantID=${PlantID}&ProductArea=${ProductArea}&St=${St}&Et=${Et}`)
=======
  return $get(
    `api/MESDPOutPut/GetMPSOpenLineInfo?PlantID=${PlantID}&ProductArea=${ProductArea}&St=${St}&Et=${Et}`
  )
>>>>>>> 6de567f93ac883d9a881873065352cd958a52da6
}
