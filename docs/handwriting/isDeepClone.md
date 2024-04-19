## 实现简单的深拷贝

```javascript
function _deepClone(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  let result = {};

  if ({}.toString.call(obj) === "[object Array]") {
    result = [];
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = _deepClone(obj[key]);
    }
  }
  return result;
}

let obj1 = {
  a: [1, 2, 3],
  b: {
    c: 2,
  },
};
let obj2 = _deepClone(obj1);
obj2.a.splice(0, 1);
console.log(obj1);
console.log(obj2);
```
