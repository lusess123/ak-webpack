# ak-webpack

一个极简的开箱即用的webpack封装

# 如何使用？

## 安装

npm i ak-webpack -D

## 默认使用

script 添加:

"watch": "akwp"

## 定制使用

script 添加:

"watch": " webpack-dev-server  --watch-poll --config ./webconfig.config.js --mode development"





（其中，webconfig.config.js 为配置文件）



```
   const ConsoleWebpack = require("ak-webpack");
   module.exports = ConsoleWebpack({
    // 以下为标准webpack merge 配置
    devServer: {
    https: false ,
   },
   }, 'web-pdm');
```


## 启动

npm run watch 或者 yarn watch

# 配置api

## title

document title

## options

(待完善)

## config

其他的标准webpack merge 配置



# 日志更新

v1.0.13

整理文档


v1.0.12


修复了akwp的日志输出功能
修复内置tsconfig.json忘记添加的bug

v1.0.11

增加内置的tsconfig.json

v1.0.10

升级webpack-merge

v1.0.9

修复路径设置的 bug

v1.0.8

支持ts源文件路径包含的配置


v1.0.7

支持对html title 的配置

v1.0.6

整理路径提示信息

清除对于https设置的提示

优化配置传入部分的代码

v1.0.5

支持 compression-webpack-plugin


v1.0.4

修复对less的支持

v1.0.3

升级依赖包的版本到最新

V1.0.2

新增对https的支持
新增对md文件的支持
