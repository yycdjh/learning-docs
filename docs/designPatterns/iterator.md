# 迭代器模式

> 在 JavaScript 中的实现主要是为了解决遍历集合对象（如数组、对象）时，不暴露集合的内部结构，同时提供统一的遍历方式。在 JavaScript 中，迭代器模式可以通过多种方式实现，包括传统的自定义迭代器、使用内置迭代器接口以及 ES6 引入的迭代器协议。

1. 自定义迭代器

```javascript
function iteratorGenerator(list) {
  // idx记录当前访问的索引
  var idx = 0;
  // len记录传入集合的长度
  var len = list.length;
  return {
    // 自定义next方法
    next: function () {
      // 如果索引还没有超出集合长度，done为false
      var done = idx >= len;
      // 如果done为false，则可以继续取值
      var value = !done ? list[idx++] : undefined;

      // 将当前值与遍历是否完毕（done）返回
      return {
        done: done,
        value: value,
      };
    },
  };
}
const arr = [1, 2, 3, 4, 5];
const iterator = iteratorGenerator(arr);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

2. Generator 函数

```javascript
function* generateNumbers() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generateNumbers();
for (let value of gen) {
  console.log(value);
}
```

- 例子,使 obj 可以使用 for of

```javascript
const obj = {
  a: 1,
  b: 2,
  *[Symbol.iterator]() {
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        yield [key, this[key]];
      }
    }
  },
};

for (const [key, value] of obj) {
  console.log(key, value);
}
```
