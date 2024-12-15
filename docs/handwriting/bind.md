# 手写 bind

```javascript
Function.prototype.myBind = function (obj, ...args) {
  // return (...rest) => this.call(obj, ...args, ...rest);
  return (...rest) => this.apply(obj, [...args, ...rest]);
};
```
