import moment from "moment"
const os = require("os")
/**
 * @param {Function} fn 防抖函数
 * @param {Number} delay 延迟时间
 */
export function debounce(fn, delay) {
  var timer
  return function () {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
/**
 * @param {date} time 需要转换的时间
 * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 */
export function formatTime(time, fmt) {
  if (!time) return ""
  else {
    const date = new Date(time)
    const o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "H+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    for (const k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
        )
      }
    }
    return fmt
  }
}

/**
 * 获取当前时间
 */
export function getCurrentTime() {
  var now = new Date()
  var year = now.getFullYear() //得到年份
  var month = now.getMonth() //得到月份
  var date = now.getDate() //得到日期
  //var day = now.getDay();//得到周几
  var hour = now.getHours() //得到小时
  var minu = now.getMinutes() //得到分钟
  var sec = now.getSeconds() //得到秒
  month = month + 1
  if (month < 10) month = "0" + month
  if (date < 10) date = "0" + date
  if (hour < 10) hour = "0" + hour
  if (minu < 10) minu = "0" + minu
  if (sec < 10) sec = "0" + sec
  var time = ""
  //精确到天
  time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec
  return time
}

/**
 * 返回多少天的时间和当前的时间 YYYY-MM-DD HH:mm:ss
 * @param {*} pre
 * @returns
 */
export let getTime = (preTime = "") => {
  let curTime = ""
  // 如果没传开始时间
  if (!preTime) {
    // 先判断一下当前时间是否超过今天的六点
    if (new Date(`${moment().format("YYYY-MM-DD 06:00:00")}`).getTime() < Date.now()) {
      // 已经超过了6点
      preTime = moment().format("YYYY-MM-DD 06:00:00")
    } else {
      // 还在6点以前
      preTime = moment().subtract(1, "days").format("YYYY-MM-DD") + " 06:00:00"
    }
    curTime = moment().format("YYYY-MM-DD HH:mm:ss")
  } else {
    curTime =
      moment().format("YYYY-MM-DD") == preTime
        ? moment().format("YYYY-MM-DD HH:mm:ss")
        : moment(preTime).subtract(-1, "days").format("YYYY-MM-DD 06:00:00")
    // curTime =
    //   moment().format("YYYY-MM-DD") == preTime
    //     ? moment().format("YYYY-MM-DD HH:mm:ss")
    //     : `${preTime} 24:00:00`
    preTime = `${preTime} 06:00:00`
    // console.log(preTime, curTime, moment().format("YYYY-MM-DD"))
  }
  return `St=${preTime}&Et=${curTime}`
}

// 获取当前时间和多少小时前的时间  hours 24 => 昨天的时间到今天的时间    hours -24 => 今天的时间到明天的时间
export let getTimeAgo = (hours = 12, special = false) => {
  // 当前时间
  let currentTime = moment().format("YYYY-MM-DD HH:mm:ss")
  // 多少小时前的时间
  let agoTime = moment().subtract(hours, "hours").format("YYYY-MM-DD HH:mm:ss")
  if (special) {
    agoTime = moment().subtract(hours, "hours").format("YYYY-MM-DD 06:00:00")
  }
  return hours > 0 ? `St=${agoTime}&Et=${currentTime}` : `Et=${agoTime}&St=${currentTime}`
}

// 获取完整的一天时间
export let getOneDay = () => {
  // 拿到一天前的六点
  let oneDayAgo = moment().subtract(1, "days").format("YYYY-MM-DD 06:00:00")
  // 拿到当天的六点
  let currentDay = moment().format("YYYY-MM-DD 06:00:00")
  return `St=${oneDayAgo}&Et=${currentDay}`
}

/**
 * "20.20%" -> 20 "30.00%" -> 30
 * @param {string} str
 */
export function strToNum(str) {
  return str.split(".")[0]
}

/**
 * 对象深拷贝函数
 * @param {*} target
 * @returns
 */
export function deepClone(target) {
  // 定义一个变量
  let result
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === "object") {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = [] // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {}
      for (let i in target) {
        result[i] = deepClone(target[i])
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target
  }
  // 返回最终结果
  return result
}
// 获取ip地址
export function getNetworkIp() {
  let needHost = "" // 打开的host
  try {
    // 获得网络接口列表
    let network = os.networkInterfaces()
    // console.log("network",network)
    for (let dev in network) {
      let iface = network[dev]
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i]
        if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
          needHost = alias.address
          // console.log("alias.address",alias.address)
        }
        // console.log("alias",alias)
      }
    }
  } catch (e) {
    needHost = "localhost"
  }
  return needHost
}

/**
 * 获取一个范围的随机数
 */
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 *
 * @param {*} array 需要拆分的数组
 * @param {*} size  需要分成的大小
 * @returns
 */
export function splitArray(array, size) {
  let tempArr = []
  for (let i = 0; i < array.length; i += size) {
    tempArr.push(array.slice(i, i + size))
  }
  return tempArr
}
