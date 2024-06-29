# 体积优化

## terser: JS 体积优化

1. 什么是 terser

   - 进行代码压缩的库

2. 我们可以通过什么策略对 javascript 代码进行压缩

   - 去除多余字符：空格，换行及注释
   - 压缩变量名：变量名，函数名及属性名
   - 解析程序逻辑：
     - 合并声明以及布尔值简化
     - 编译预计算
     - 删除无用的代码

## terser option

1. 有哪些策略可以压缩 javascript 体积

   - mangle： 压缩变量名，函数名以及属性名
   - unused： 移出未使用过的代码
   - 去除多余字符：空格，换行，注释（无需手动配置）
   - if return 将 if(condition)return 转化为 codition || xxx 的形式，来减少代码体积。该选项默认开启
   - comparisons： 布尔值简化
   - evaluate：预编译计算
