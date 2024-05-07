# 实现发布-订阅

- on: 监听一个事件
- emit: 发布一个事件
- off: 取消一个事件监听
- once: 只监听一次, 后移出

```javascript
class EventEmitter {
  constructor() {
    // map，用于存储事件与回调之间的对应关系
    this.handlers = {};
  }

  on(eventName, cb) {
    //
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(cb);
  }

  emit(eventName, ...args) {
    if (this.handlers[eventName]) {
      const handler = this.handlers[eventName];

      handler.forEach((callback) => {
        callback(args);
      });
    }
  }

  off(eventName, cb) {
    this.handlers[eventName] = this.handlers[eventName].filter((callback) => {
      callback !== cb;
    });
  }

  once(eventName, cb) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      cb(...args);
    };
    this.on(eventName, wrapper);
  }
}
```
