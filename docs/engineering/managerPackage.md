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

## node_modules 拓扑结构

1. 目前版本 npm 的拓扑结构是什么
   - 平铺结构
     ![拓扑结构](structure.png)
2. npm 平铺结构的 node_modules 仍然有什么问题
   - 重复的依赖
3. 使用 npm 安装依赖，观察 node_modules 结构以及 package-lock.json 文件对应关系
   - node_modules 的结构就是 lock 文件 packages 下面的顺序
     ![node_modules 结构以及 package-lock.json 文件对应关系](package.png)
4. 找到你们项目中被安装了多次的重复依赖
   - lodash
5. 使用[pkg-size](https://pkg-size.dev)查看某个 npm 包的 install size 与 bundle size
   - lodash install size 1.4mb
   - lodash bundle size 73kb

## 幽灵依赖

1. 什么是幽灵依赖，它会导致什么问题

   - 如果一个 npm 包没有在 package.json 中声明而直接被项目所依赖，那么这个 npm 包就是幽灵依赖
   - 幽灵依赖存在依赖缺失的问题

## pnpm

1. 什么是软链接和硬链接

   - 软链接：可理解为指向源文件的指针，它是单独的一个文件，仅仅只有几个字节，它拥有独立的 inode
   - 硬链接：与源文件同时指向一个物理地址，它与源文件共享存储数据，它俩拥有相同的 inode

2. pnpm 为何节省资源

   - pnpm 改变了 npm/yarn 的目录结构，采用软链接的方式，避免了 doppelgangers 问题更加节省空间

3. pnpm 是如何解决幽灵依赖以及重复依赖安装的问题

   - 在 pnpm 中，每个依赖都有它自己的 node_modules。这种自我隔离的方式使得每一个项目或者模块都只能访问它们在 package.json 文件中声明的依赖，而不能访问其他未明确声明的依赖，即幽灵依赖，当你使用一个没有在 package.json 文件中声明的包，pnpm 将会引发错误
   - pnpm 使用一个被称为内容寻址的存储策略.每当你安装一个依赖时，pnpm 不会直接将其放在您项目的 node_modules 里。而是将它放在全局的存储区里，然后在你的项目的 node_modules 里创建一个指向全局存储区的链接，这种方式确保了一个特定版本的包，无论被多少个项目所依赖，只需要在全局存储区里存储一次，因此，不同的项目可以共享相同依赖的不同版本，无需重复下载和安装
