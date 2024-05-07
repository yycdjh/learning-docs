# 简单的节流函数

---

```javascript
function throttle(fn, delay) {
  let timer;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
}
```
