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

## npm update/dedupe

1. 重复包安装会导致什么问题，如 postcss/@types/react 以及一些页面所依赖的 npm 包
   - 安装体积变大
   - postcss 中的编译流程将要重复跑两次，而编译是极其耗时的
   - 如果重复版本为 react/lodash 等页面依赖内容，则会增加打包体积
   - 如果重复版本为 @types/react 等 ts 的 type, 则可能无法编译成功
2. npm update/dedupe 有何作用
   - npm update
     - 将会使 package.json/package-lock.json 中的依赖升级到符合其版本号范围的最新版本
     - pnpm update 与 npm 不同的是，它将把 package.json 中的依赖升级到至符合该版本范围的最新版本，并重新写入 package.json。效果类似于 npm update --save
   - npm dedupe
     - 可以将包均升级符合 npm 包范围的共同版本，例如
       - a 依赖于 postcss@^8.4.10，依赖升级后为postcss@8.4.29
       - b 依赖于postcss@8.4.28，依赖升级后为postcss@8.4.28
       - 此时可以使用 npm dedupe，将二者均升级为符合二者 npm 包范围的共同版本
3. npm install/pnpm install
   - npm install 将会下载符合 npm 包依赖的最新版本号，此时会存在两个 postcss，需手动 npm dedupe
   - pnpm install 可理解为自带 pnpm dedupe 过程，只会存在一个 postcss
