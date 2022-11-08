// 通过cookie将密码保存7天
const Base64 = require("js-base64").Base64 //引入加密方式
class LocalCookie {
  // 设置cookie
  setCookie(userName, password, days) {
    let date = new Date() // 获取时间
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days) // 保存的天数
    // 字符串拼接cookie
    window.document.cookie = "userName" + "=" + userName + ";path=/;expires=" + date.toGMTString()
    window.document.cookie =
      "password" + "=" + Base64.encode(password) + ";path=/;expires=" + date.toGMTString()
  }
  // 读取cookie 将用户名和密码回显到input框中
  getCookie() {
    if (document.cookie.length > 0) {
      //分割成一个个独立的“key=value”的形式
      let arr = document.cookie.split("; ")
      for (let i = 0; i < arr.length; i++) {
        // 再次切割，arr2[0]为key值，arr2[1]为对应的value
        let arr2 = arr[i].split("=")
        if (arr2[0] === "userName") {
          this.ruleForm.userName = arr2[1]
        } else if (arr2[0] === "password") {
          this.ruleForm.password = Base64.decode(arr2[1]) // base64解密
          this.checked = true
        }
      }
    }
  }
}
export default new LocalCookie()
