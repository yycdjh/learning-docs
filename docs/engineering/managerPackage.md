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
