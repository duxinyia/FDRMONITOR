// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const path = require("path")
const os = require("os")
// import { getNetworkIp } from "@/utils"
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
// 获取ip地址
function getNetworkIp() {
  // 打开的 host
  let needHost = ""
  try {
    // 获得网络接口列表
    let network = os.networkInterfaces()
    for (let dev in network) {
      let iface = network[dev]
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i]
        if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
          needHost = alias.address
        }
      }
    }
  } catch (e) {
    needHost = "http://localhost"
  }
  return needHost
}
module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  chainWebpack: (config) => {
    config
      .plugin("webpack-bundle-analyzer")
      .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
      .end()
    // 配置svg图标的使用方法
    config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end()
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end()

    config.plugin("define").tap((args) => {
      let ip = getNetworkIp()
      args[0]["process.env"].BASE_IP = `"http://${ip}"`
      return args
    })
  },
  devServer: {
    open: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/api": {
        target: "http://10.151.128.172:8088/",
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      }
    }
  }
}
