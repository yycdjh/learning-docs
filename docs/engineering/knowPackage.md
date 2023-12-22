---
title 认识包package
---

## 1.npm 与 package

1. 如何快速找到某个包的文档

   - npm docs 包名 例如：npm docs axios
   - npm home 包名 例如：npm docs axios

2. 如何快速找到某个包的 Github 仓库地址

   - npm repo 包名 例如：npm repo axios

## 2.semver

1. 什么是 semver

   - 语义化版本 由[major, minor, patch]组成
     - major：大版本更新
     - minor: 小迭代更新
     - patch：修改 bug

2. ^1.2.3 的版本号范围是

   - `>=1.2.3, <2.0.0`

## 3.依赖

1. 你见过将 file: 或 git+ssh: 作为项目依赖的场景吗

   - 没有

2. 如果项目中需要使用到完全不同版本的 eslint，应如何处理

   - 使用 Alias，使用别名进行依赖安装
   - 例如：npm install eslint5@npm:eslint@5
   - npm install eslint6@npm:eslint@6

## 4.开发依赖

1. 当我们 npm i webpack 时，会下载 webpack 的 dependencies 和 devDependencies 吗

   - 不会、只会下载包的 dependencies，devDependencies 只在包的开发环境中使用

2. dependencies 与 devDependencies 有什么区别

   - 对于业务来说没什么区别
   - 对于包开发者来说有严格的区分
     - dependencies:在生产环境中使用
     - devDependencies: 在开发环境中使用

3. 什么是 install size

   - 真正安装包的体积，包含`<package>`的所有依赖以及间接依赖（所有包的 dependencies 的总体积）

4. 什么是零依赖的 npm 包

   - 不需要依赖其他的包、dependencies 是空

## 4.[补]optionalDependencies

1. fsevents 用于监听文件变化，因此大部分项目都会有这个包，观察你们项目中的 fsevents 是否安装
2. 如果你们有 next.js 项目，观察安装了哪一个@next/swc-xxx 包

## 4.[补]peerDependencies

1. peerDependencies 安装策略是什么样的

   - 一个 npm 包的 peerDependencies 如果在整个项目的依赖中不存在，将会默认安装
   - 即使依赖的版本不匹配，它也不会继续安装，但会发出警告

2. 列举出三个具有 peerDependencies(除 react、vue、webpack、eslint 外)的 npm 包

   - rollup 插件、vite、pinia

3. 当我们安装 use-debounce 时，将实际安装那些依赖

   - 如果项目存在 `react` 依赖将不会下载依赖，如果版本不匹配将会警告，也不会继续安装

4. 当我们安装 `zustand` 时，将实际安装那些依赖

   - 会安装 `use-sync-external-store`
   - 在 peerDependenciesMeta 中标识了可选，所以 immer、@types/react、react 这三个都是可选依赖，因此当项目中不存在这三个依赖是，会忽略安装

## 5.engines.md

1. engines 有哪些用处

   - 指定一个项目所需的 node 最小版本

   - 对于版本不匹配将会报错（yarn）或警告（npm）

## 6.node.js LTS

1. 什么是 LTS

   - Long Term Support，长期支持版本

2. node.js 当前的 LTS 是多少

   - 20.9.0

## 7.`npm scripts`

1. 什么是 `npm scripts`

   - 是一种在 `javascript` 项目中定义脚本的简单方法，可以在 `package.json` 中的 `scripts` 字段进行配置
   <!-- - 例如：`{{"scripts": {"dev": "vite"}}` -->

2. 如何配置环境变量

   - `linux: NODE_ENV = production`
   - `windos: corss-env NODE_ENV = production`
   - 在 `vue` 项目可以编写.env 文件 同时在脚本声明 mode 去执行对应的 env 文件

## 8.`pre/post script`

1. 分别使用 npm/yarn/pnpm 对 per/post script 进行验证，观察其输出
   - npm init 新项目 进行观察，npm、yarn 都会执行 per/post，pnpm 不会执行 per/post
2. pre/post 有何安全问题
   - 可以被恶意注册脚本自动挖矿或者执行其他任意脚本

## 9.`lifecycle script`

1. npm pack 做了那些事情
   - 将当前 npm 包的内容进行压缩打包为 tarball，这是实际上传到 npm 仓库的内容
2. npm prepare 在那几个阶段执行
   - npm install 之后
   - npm publish 之前
3. npm publish 做了那些事情
   - 将本地的包进行 npm pack 打包，并上传到 npm 仓库

## 10.lockfile

1. 我们如何得知我们所下载的 package 的准确版本号
   - 看 node_modules 里面包的 package.json
   - 如果有 package-lock.json,可以查看 package-lock.json
   - 可以执行 npm list 查看每个包
2. 如果项目中没有 lockfile，将会出现什么问题
   - 如果没有锁版本，例如 package.json 包为^1.2.3，但是包的最新版本为 1.19.0，满足 dependencies 中依赖^1.2.3 范围，如果此时 pkg 未遵从 semver 规范，在此过程中引入了突破性的变化，如果此时 1.19.0 有问题的话，生产环境中的 1.19.0 将会导致 bug，且难以调试。
3. 项目中拥有 lockfile，在于 package.json 中直接写死版本号有何区别
   - 确定版本：package-lock.json 能确保项目中每个依赖包的版本都是确定的，有助于构建可重复的和可预测的构建环境
   - 快速安装：会记录所有依赖包的精确版本和其依赖关系树，不需要解析 package.json 中的依赖范围，而是直接使用 lockfile 中指定的版本。这可以减少安装时间和网络开销

## 11.side effects

1. sideeffects 有何作用
   - 用于指示 npm 包是否具有副作用
   - 当 sideeffects:false 这将会出发 webpack 等打包器的 Tree Shaking 优化，它会安全地删除未使用的模块，减小最终打包提交

## 12. `main/module/exports`

1. main/module/exports 字段释义
   - main/module 都是指入口文件
     - main 是 commonjs 入口
     - module 是 es module 入口
   - exports 自定义路径映射，可根据模块化方案不同选择不同的入口文件
2. 找到常用 npm 包的 main/modele/exports 字段
   - element-plus

## 13.bin

1. bin 字段释义
   - 指定最终的命令行工具的名字，用作该 npm 包可执行文件的入口
2. npm i -g 原理释义
   - 先把包下载到全局目录 npm (/usr/local/lib/node_modules) yarn(~/.config/yarn/global/node_modules)
   - 根据 npm 包中 package.json 中 bin 字段的指示，把对应的命令行路径通过符号链接（fixed）挂载到系统配置 PATH 路径
3. 列出项目中所有可执行文件
   - windows 可执行 dir node_modules\.bin
