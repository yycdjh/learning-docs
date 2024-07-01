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

## 垫片: corejs

1. core-js 是一个模块化的标准库，包含了 ECMAScript 5、ECMAScript 6、ECMAScript 7、ECMAScript 8、ECMAScript 9、ECMAScript 10 方法，它的目的是让你能在所有 JavaScript 环境中尽可能方便的使用这些方法。
2. 是一个 JavaScript 的垫片库（polyfill），让你能在老版本的 JavaScript 环境中使用最新的 JavaScript 特性。
3. 在实际开发中，我们往往需要支持各种版本的浏览器，包括一些只兼容 ES5 语法的老版本浏览器，这时候我们在代码中如果使用了 ES6+ 的一些新特性，那在这些老浏览器上就无法运行。而 Babel 允许我们在开发时使用最新版本的 JavaScript 语法，但是它默认只转换新的 JavaScript 句法语法，而不转换新的 API，比如 Iterator、Generator、Set、Maps、Proxy、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码。
4. 所以这个时候我们需要 core-js 来进行垫片填充，让我们写的代码能够在所有支持的浏览器版本上运行。
