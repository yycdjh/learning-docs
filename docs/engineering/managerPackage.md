# 包管理器

## resolve 算法

1. 当我们 require('lodash')时，我们是如何找到 lodash 这个 npm 包的
   - 将会在当前路径的 node_modules 中寻找该包，如果找不到则递归上级目录的 node_modules 寻找，直到跟目录

## 包管理器与 corepack

1. 如何使用 corepack
   - corepack enable
2. 了解 npm/yarn/pnpm 的特性对比
   - Npm 是由 node.js 官方推出的包管理器，于 2010 年首次发布，旨在解决 node.js 项目中依赖管理问题，后续也被前端项目所广泛使用
   - Yarn 是由 2016 年推出的另一个包管理器，为了解决当时 npm 的一些性能以及稳定性问题，使用一种全新的算法来优化依赖关系的解析和安装流程。即将当时 npm 的 node_modules 嵌套改为平铺(目前 npm 也是平铺策略)
   - Pnpm 采用了一种全新的依赖解决方案，它使用硬链接和符号链接结合方法显著减小了硬盘空间的占用。最简单的一个示例是：当你拥有 100 个依赖 lodash 的项目，使用 pnpm 磁盘将仅仅占用一份 lodash 的体积大小
3. 如何知道新项目使用的哪个包管理器
   - 可以通过 package.json 的 packageManger 字段
   - .lock 文件

## 包管理器的确认

1. 如何确定项目的包管理器
   - 通过 package.json 中的 packageManamer
   - 通过 lockfile
     - 如果存在多个 lockfile
       - 比较 lockfile 上次修改时间，以最后修改的为准
       - 查看是否有 CI/CD，如果有跟着 CI/CD 中的包管理工具确认
       - 查看是否有 Dockerfile，如果有跟着 Dockerfile 确认
       - 查看是否有文档，如果有跟着文档找
       - 找领导以及同事确认
   - 借助工具：ni / npm i -g @antfu/ni
2. 根据以上方法确认你们项目的包管理器
   - npm->只有 package-lock.json

## npx/dlx

1. 什么是 npx/dlx
   - npx 是 npm 包运行器，它的一个主要用法是在不全局安装包的情况下执行它。
   - dlx 是 yarn 包运行器，它的一个主要用法是在不全局安装包的情况下执行它。
2. 你经常使用 npm/dlx 执行那些命令
   - 基本没有，创建项目有可能用到
3. npx 工作原理是什么
   - npx 会在本地项目的 node_modules/.bin 递归目录(如果当前 node_modules/.bin 目录下无法找到，则去上一级 node_modules/.bin 目录下寻找）下的可执行文件
   - 如果 npx 在本地项目和全局安装包中都没有找到该命令，那么 npx 就会临时下载这个 npm 包，然后把入口点文件执行一次,临时下载的文件在执行后会被清理。不会将其添加到你的项目依赖或全局依赖中。

## npm link 原理与调试

1. 如何更好地去调试某些经编译的 package

   - 使用 npm link 或 yarn link

2. npm link 的原理是什么（以 rollup 为例）

   - 当我们相中依赖 rollup，并 require/import 引入它时，我们将会在 node_modules/rollup 中寻找它。并通过 package.json 中的 exports/main 字段定位到具体文件。
   - 我们可以将 rollup 源码下载到本地，并手动构建，生成 source-map,并将 node_modules/rollup 进行替换
     - 在 rollup 源码目录，通过 npm run watch 进行构建，此时会生成带有 source-map 的构建文件
     - 在 rollup 源码目录，执行 npm link, 它会自动寻找当前目录的 package.json 中的 name 字段，并创建全局目录的软链接至该项目
     - 在自己项目，执行 npm link rollup，将会替换 node_modules/rollup，其软链接至全局目录
