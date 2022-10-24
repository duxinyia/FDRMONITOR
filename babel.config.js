const prodPlugins = []
if (process.env.NODE_ENV === "production") {
  // 生产环境下去除console信息
  prodPlugins.push("transform-remove-console")
}
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    ...prodPlugins,
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
}
