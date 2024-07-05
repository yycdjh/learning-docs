# 模块化

## CommonJS

1. exports 与 module.exports 有何区别
   - exports 是 module.exports 的快捷方式，初始化时指向 module.exports
     - module.exports 最终决定了模块的导出内容
     - exports 只是 module.exports 的一个引用。重新赋值 exports 不会影响 module.exports
2. 如何确定一个文件时 CommonJS
   - 目前，如果一个文件以.cjs 结尾，则代表它是一个 commonjs 模块
