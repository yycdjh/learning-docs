## 单例模式

### 保证一个类仅有一个实例、并提供一个访问它的全局访问点

---

#### 静态方法

```javascript
class SingleDog {
  show() {
    console.log("我是一个单例对象");
  }
  static getInstance() {
    // 判断是否已经new过一个实例
    if (!SingleDog.instance) {
      SingleDog.instance = new SingleDog();
    }

    return SingleDog.instance;
  }
}

const s1 = SingleDog.getInstance();
const s2 = SingleDog.getInstance();

console.log(s1 === s2);
```

---

#### 构造函数

```javascript
class SingleDog {
  constructor() {
    if (!SingleDog.instance) {
      SingleDog.instance = this;
    }
    return SingleDog.instance;
  }
}
const s1 = new SingleDog();
const s2 = new SingleDog();

console.log(s1 === s2);
```

---

#### 闭包

```javascript
class SingleDog {}

SingleDog.getInstance = (function () {
  let instance = null;
  return function () {
    if (!instance) {
      instance = new SingleDog();
    }
    return instance;
  };
})();

const s1 = SingleDog.getInstance();
const s2 = SingleDog.getInstance();

console.log(s1 === s2);
```

---

#### 实现一个 Storage

##### 描述

> 实现 Storage,使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value)和 getItem(key)

```javascript
class Storage {
  static getInstance() {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }

  setItem(key, value) {
    localStorage.setItem(key, value);
  }

  getItem(key) {
    return localStorage.getItem(key);
  }
}

const s1 = Storage.getInstance();
const s2 = Storage.getInstance();
s1.setItem("name", "jd");
s1.getItem("name");
s2.getItem("name");
console.log(s1.getItem("name"));
console.log(s2.getItem("name"));
console.log(s1 === s2);
```

```javascript
class Storage {
  constructor() {
    if (!Storage.instance) {
      Storage.instance = this;
    }
    return Storage.instance;
  }
  setItem(key, value) {
    localStorage.setItem(key, value);
  }

  getItem(key) {
    return localStorage.getItem(key);
  }
}
const s1 = new Storage();
const s2 = new Storage();
s1.setItem("name", "jd2");
s1.getItem("name");
s2.getItem("name");
console.log(s1.getItem("name"));
console.log(s2.getItem("name"));
console.log(s1 === s2);
```

---

#### 实现一个 全局弹窗

##### es5

```javascript
const Modal = (function () {
  let modal = null;
  return function () {
    if (!modal) {
      modal = document.createElement("div");
      modal.innerHTML = "我是全局唯一的Modal";
      modal.id = "modal";
      modal.style.display = "none";
      document.body.appendChild(modal);
    }
    return modal;
  };
})();
document.getElementById("open").addEventListener("click", () => {
  const model = new Modal();
  model.style.display = "block";
});

document.getElementById("close").addEventListener("click", () => {
  const model = new Modal();
  model.style.display = "none";
});
```

---

##### es6

```javascript
class Modal {
  constructor() {
    if (!Modal.instance) {
      Modal.instance = document.createElement("div");
      Modal.instance.innerHTML = "我是全局唯一的Modal";
      Modal.instance.id = "modal";
      Modal.instance.style.display = "none";
      document.body.appendChild(Modal.instance);
    }
    return Modal.instance;
  }
}

document.getElementById("open").addEventListener("click", () => {
  const model = new Modal();
  model.style.display = "block";
});

document.getElementById("close").addEventListener("click", () => {
  const model = new Modal();
  model.style.display = "none";
});
```
