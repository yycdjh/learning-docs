# 手写 call 方法

```javascript
Function.prototype.myCall = function (obj, ...args) {
  // 这里的this指的是 调用此方法的函数， 确保this是一个函数
  if (typeof this !== "function") {
    throw new TypeError(this + "is not a function");
  }

  // 处理obj, 如果为null或者undefined 则指向全局
  obj = obj || globalThis;

  // 创建唯一属性
  const fnSymbol = Symbol();

  // 将此函数作为obj的属性
  obj[fnSymbol] = this;

  // 调用函数并返回结果
  const result = obj[fnSymbol](...args);

  // 删除临时属性
  delete obj[fnSymbol];

  return result;
};
```
