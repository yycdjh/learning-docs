# 代理模式

> 它允许我们为对象创建一个代理（proxy），代理对象可以作为原对象的代表，控制对原对象的访问。代理模式的核心在于，它在不改变原对象的前提下，通过引入一个代理对象来为原对象提供额外的功能或增强其行为。

## 事件代理

```javascript
// <div id="father">
//   <!-- 循环十次 -->
//   <a href="#">链接1号</a>
//   <a href="#">链接2号</a>
//   <a href="#">链接3号</a>
//   <a href="#">链接4号</a>
//   <a href="#">链接5号</a>
//   <a href="#">链接6号</a>
// </div>
// const aNodes = document
//   .getElementById("father")
//   .getElementsByTagName("a");

// console.log(aNodes);
// for (let i = 0; i < aNodes.length; i++) {
//   aNodes[i].addEventListener("click", function (e) {
//     console.log(aNodes[i]);
//     console.log(`${aNodes[i].innerText}被点击了`);
//     e.preventDefault();
//   });
// }
const father = document.getElementById("father");

father.addEventListener("click", function (e) {
  console.log(e.target);
  console.log(`${e.target.innerText}被点击了`);
  e.preventDefault();
});
```

## 对象代理

```javascript
// 原对象
const target = {
  message: "Hello, world!",
  greet() {
    console.log(this.message);
  },
};

// 代理对象
const proxy = new Proxy(target, {
  get(target, prop, receiver) {
    console.log(`Accessing property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },

  set(target, prop, value, receiver) {
    console.log(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  },

  apply(target, thisArg, argumentsList) {
    console.log(`Calling method with arguments: ${argumentsList}`);
    return Reflect.apply(target, thisArg, argumentsList);
  },
});

// 使用代理对象
console.log(proxy.message); // 输出：Accessing property: message，Hello, world!
proxy.greet(); // 输出：Calling method with arguments: []，Hello, world!
proxy.message = "Hello, proxy!"; // 输出：Setting property: message to Hello, proxy!

console.log(proxy.message); // 输出：Accessing property: message，Hello, proxy!
```
