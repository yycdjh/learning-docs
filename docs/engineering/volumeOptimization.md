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

## browserslist 与 垫片体积

1. 前端打包体积与垫片的关系 -由于低浏览器版本的存在，垫片是必不可少的
   - 垫片越少，则打包体积越小
   - 浏览器版本越新，则垫片越少
2. browserslist 配置
   - 根据用户份额
     - `> 5%`: 在全球用户份额大于 5%的浏览器
     - `> 5% in CN`: 在中国用户份额大于 5%的浏览器
   - 根据最新浏览器版本
     - last 2 versions: 所有浏览器的最新两个版本
     - last 2 Chrome version: Chrome 浏览器的最新两个版本
   - 不再维护的浏览器
     - dead: 官方不再维护已过两年，比如：IE10
   - 浏览器版本号
     - chrome > 90: Chrome 大于 90 版本号的浏览器

## Tree Shaking

1. Tree Shaking 的原理是什么
   - Tree Shaking 指基于 ES Module 进行静态分析，通过 AST 将用不到的函数进行移除，从而减小打包体积。

## 图片体积优化

1. 有哪几种图片文件格式，其体积如何
   - JPEG/PNG/WEBP/AVIF。相同质量的图片体积，avif 体积最小，webp 其次，而 jpeg 体积最大
2. 当你们网站中使用 avif 优化图片时，如果浏览器不支持 avif 如何处理
   - 可以使用更先进的图片标签 picture。它可以根据浏览器对图片格式的支持情况，来降级处理。如此一来，它即时不支持 avif 图片格式，也可以优雅的降级到 webp 甚至 jpeg。
3. 在前端项目中，如何自动化处理图片
   - 使用 webpack 可以借助 imagemin-webpack-plugin 来完成自动化图片压缩
4. 仅使用 canvas 优化图片，有哪些局限
   - 浏览器兼容问题
   - 性能问题

## 图片体积运行时优化

1. 编译时与运行时优化图片的区别在哪里

   - 无响应式图片。无法将代码中的 img 标签转换为 picture 标签进行响应式图片
   - 无高度、宽度优化。如在浏览器中图片的渲染高度为 100x100,但是图片真是大小为 1000x1000,将会浪费极大的体积
   - 无小图片的 DataURL 处理
   - 无域名图片的支持，域外图片不受编译控制

2. 如何编写一个 Image 组件进行优化图片处理

```javascript
<template>
  <div>
    <template v-if="path.startWith('data')">
      <img :src="path" />
    </template>
    <template v-else>
      <picture>
        <source :srcset="avifPath" type="image/avif" />
        <source :srcset="webpPath" type="image/webp" />
        <img :src="path" :width="width" :height="height" loading="lazy" />
      </picture>
    </template>
  </div>
</template>

<script setup lang="ts">
interface Props {
  path: string;
  width: number;
  height: number;
}
// oss域名
const avifPath = "path.avif";
const webpPath = "path.webp";
</script>

<style scoped></style>
```
