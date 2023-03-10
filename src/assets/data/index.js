export { default as menus } from "./menu"

// 一些不变的量  会被挂载到this.$globalData上
export default {
  TIMEOUT: 10000,
  CYCLE_TIME: 10 * 60 * 1000,
  RESET_PWD_URL: "http://10.151.128.172:8089/Login/Repassword",
  TEST_ADDRESS: "http://10.147.214.111:8085",
  PRODUCTION_ADDRESS: "http://10.147.214.130:8093"
}
