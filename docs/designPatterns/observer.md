# 观察者模式

> 用于实现对象之间的解耦通信，让一个对象（被观察者，Subject）可以通知多个依赖它的对象（观察者，Observers）关于状态变化的情况。这种模式允许你定义一种一对多的依赖关系，当被依赖的对象状态改变时，所有依赖于它的对象都会得到通知并自动更新。

```javascript
// 定义发布者类
class Publisher {
  constructor() {
    this.observers = [];
    console.log("Publisher created");
  }

  // 新增订阅者
  add(observer) {
    console.log("Publisher add");
    this.observers.push(observer);
  }

  // 移出订阅者
  remove(observer) {
    console.log("Publisher remove");
    this.observers = this.observers.filter((o) => o !== observer);
  }

  // 通知所有订阅者

  notify(data) {
    console.log("Publisher notify");
    this.observers.forEach((o) => {
      o.update(data);
    });
  }
}

// 定义订阅者类
class Observer {
  constructor() {
    console.log("Observer created");
  }

  update(data) {
    console.log("Observer update");
  }
}

// 定义一个具体的发布类
class ConcreatePublish extends Publisher {
  constructor() {
    super();
    this.state = "";
  }

  setState(newState) {
    this.state = newState;
    this.notify(newState);
  }
}

class ConcreateObserver extends Observer {
  update(data) {
    console.log("Observer update:" + data);
  }
}

const publish = new ConcreatePublish();
const observer1 = new ConcreateObserver();
const observer2 = new ConcreateObserver();

publish.add(observer1);
publish.add(observer2);
publish.setState("active");
```
