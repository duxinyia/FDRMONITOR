# 项目简介

名称: 战情中心
开始时间: 2022-07-20
前端: 郭小龙 560-82583
后端: 吴思敏 560-23123

# 注: node 版本需要安装@15，不要安装最新的 npm 版本@6

# 对应页面的负责人

吳成龍 22385 wwlh-wwfol-f1aateam@mail.foxconn.com AA 设备模块
馮超 761405 wwlh-wwfol-pme01@mail.foxconn.com FOL 设备模块
杨欧 372435

赵军 75185 wwlh-wweol-pan.gh@mail.foxconn.com 战情中心

# 发布

邮箱:wwlh-mis-dba@mail.foxconn.com
主题:幫我發佈一下頁面
描述:
你好 dba
幫我發佈一下頁面，ftp 地址為 ftp://10.151.128.123/F5460007/GuoXIaoLong/relase，網頁地址為http://10.147.214.130:8093/。
資訊 郭小龍 LH: 560-82583

# git 相关

地址:http://10.151.128.173:8800/GuoXiaoLong/big-screen-manage

提交步骤:

1. git add .
2. 执行脚本: npm run commit
3. 提交到远程：git push

#

lowNum.toLocaleString("en-US")

# 平时使用的一些技巧

https://blog.csdn.net/baidu_41388533/article/details/123645081

<!--
    min: (value) => Math.ceil(value.min - 1), // 指定最小值
    max: () => 100, // 指定最大值
 -->

## svg 使用

<svg-icon className="computer" icon-class="computer" />

# 关于本项目的一些说明:

1. 对于 block 的标题包裹的图标原先是过大了,如果拉取了这个代码，需要更改 dataV 的源码。
   在 node_modules\_@jiaminghi_data-view@2.10.0@@jiaminghi\data-view\lib\components\decoration7\src\main.vue 下

```html
<div class="dv-decoration-7">
  <svg width="21px" height="18px">
    <polyline
      stroke-width="4"
      fill="transparent"
      :stroke="mergedColor[0]"
      points="10, 2 19, 10 10, 18"
    />
    <polyline
      stroke-width="2"
      fill="transparent"
      :stroke="mergedColor[1]"
      points="2, 2 11, 10 2, 18"
    />
  </svg>
  <slot></slot>
  <svg width="21px" height="20px">
    <polyline
      stroke-width="4"
      fill="transparent"
      :stroke="mergedColor[0]"
      points="11, 2 2, 10 11, 18"
    />
    <polyline
      stroke-width="2"
      fill="transparent"
      :stroke="mergedColor[1]"
      points="19, 2 10, 10 19, 18"
    />
  </svg>
</div>
```
