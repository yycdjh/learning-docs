## 完美实现一个月下载量超过一个亿的包: isarray

```javascript
const isArray =
  Array.isArray || ((list) => ({}.toString.call(list) === "[object Array]"));
// console.log(isArray(['1']))
//  true
```
