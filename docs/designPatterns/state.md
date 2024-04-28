# 状态模式

> 它允许对象在内部状态改变时改变其行为。状态模式通过将与特定状态相关的操作封装在不同的状态对象中，使对象在不同状态下表现出不同的行为，同时隐藏状态转换的复杂性。这样，对象就可以根据其当前状态来决定应该做什么，而不是依赖于复杂的条件判断。

1. 简单状态模式

```javascript
class State {
  constructor(state) {
    this.state = state;
  }
  handle() {
    switch (this.state) {
      case "active":
        console.log("处于活跃状态");
        break;
      case "inactive":
        console.log("处于非活跃状态");
        break;
      default:
        console.log("未知状态");
    }
  }
}

// 创建状态对象
const state = new State("active");
state.handle();
state.state = "inactive";
state.handle();
```

2. 优化后

```javascript
class State {
  constructor(state) {
    this.state = state;
  }
  handle() {
    if (!this.stateToProcessor[this.state]) {
      return;
    }
    this.stateToProcessor[this.state]();
  }
  stateToProcessor = {
    that: this,
    active() {
      console.log("处于活跃状态");
    },
    inactive() {
      console.log("处于非活跃状态");
    },
  };
}

// 创建状态对象
const state = new State("active");
state.handle();
state.state = "inactive";
state.handle();
```
