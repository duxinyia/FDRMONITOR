const path = require("path")
const os = require("os")
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
  lintOnSave: false,
  publicPath: "./",
  productionSourceMap: false,
  chainWebpack: (config) => {
    // 将moment 换成 dayjs
    config.resolve.alias.set("moment", "dayjs")
    if (process.env.NODE_ENV === "production") {
      config.plugin("webpack-bundle-analyzer").use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin).end()
    }
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
    // 获取本地的ip地址 https://bbs.huaweicloud.com/blogs/297823 process.env.BASE_IP
    config.plugin("define").tap((args) => {
      let ip = getNetworkIp()
      args[0]["process.env"].BASE_IP = `"http://${ip}"`
      return args
    })
  },
  // 配置scss全局变量 参考 https://www.jb51.net/article/203031.htm
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/scss/variables.scss";`
      }
    }
  },
  // 配置代理
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
      // "/api1": {
      //   target: "http://10.143.4.103:8083/",
      //   changeOrigin: true,
      //   pathRewrite: { "^/api1": "" }
      // }
    }
  }
}
