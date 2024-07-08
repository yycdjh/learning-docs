# 模块化

## CommonJS

1. exports 与 module.exports 有何区别
   - exports 是 module.exports 的快捷方式，初始化时指向 module.exports
     - module.exports 最终决定了模块的导出内容
     - exports 只是 module.exports 的一个引用。重新赋值 exports 不会影响 module.exports
2. 如何确定一个文件时 CommonJS
   - 目前，如果一个文件以.cjs 结尾，则代表它是一个 commonjs 模块

## ES module

1. 什么是 import(module)
   - 动态加载模块 API

## pure esm package

1. 什么是 pure esm package

   - 即纯粹的 esm 的 npm 包，无需中间编译为 cjs 的格式供使用。在它们的 package.jsom 中有 type: module

2. esm package 与 cjs package 如何相互引用

   - Commonjs 无法 require pure esm 的 npm 包，但是可以通过动态的 import()API 加载
   - Esm 可以直接 import commonjs 的 npm 包
