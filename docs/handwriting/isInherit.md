# 如何在 JS 中实现继承

1. 原型链继承

   - 共享父类属性,修改子类实例会影响到所有实例

```javascript
function Coder() {
  this.type = "Coder";
}

Coder.prototype.rap = function () {
  console.log("rap");
};

function Yupi(name) {
  this.name = name;
  this.age = 18;
}

// 原型链继承
Yupi.prototype = new Coder();
Yupi.prototype.constructor = Yupi;

//
const yupi = new Yupi("yupi");
console.log(yupi);

console.log(yupi.type);
yupi.rap();
```

2. 构造函数继承

   - 每个实例都有自己的属性,不会共享父类的属性,但不能继承父类的原型方法

```javascript
function Coder() {
  this.type = "Coder";
}

Coder.prototype.rap = function () {
  console.log("rap");
};

function Yupi(name) {
  Coder.call(this); //调用父类构造函数
  this.name = name;
  this.age = 18;
}

const yupi = new Yupi("yupi");
console.log(yupi);

console.log(yupi.type);
// yupi.rap();  // 构造函数继承无法继承原型链上的方法
```

3. 组合继承

```javascript
function Coder() {
  this.type = "Coder";
}

Coder.prototype.rap = function () {
  console.log("rap");
};

function Yupi(name) {
  Coder.call(this);
  this.name = name;
  this.age = 18;
}

// 原型链继承
Yupi.prototype = new Coder();
Yupi.prototype.constructor = Yupi;

//
const yupi = new Yupi("yupi");
console.log(yupi);

console.log(yupi.type);
yupi.rap();
```

4. 寄生组合继承

```javascript
function Coder() {
  this.type = "Coder";
}

Coder.prototype.rap = function () {
  console.log("rap");
};

function Yupi(name) {
  Coder.call(this);
  this.name = name;
  this.age = 18;
}

// 原型链继承
Yupi.prototype = Object.create(Coder.prototype);
Yupi.prototype.constructor = Yupi;

//
const yupi = new Yupi("yupi");
console.log(yupi);

console.log(yupi.type);
yupi.rap();
```

5. ES6 Class 语法

```javascript
class Coder {
  constructor() {
    this.type = "Coder";
  }

  rap() {
    console.log("rap");
  }
}

class Yupi extends Coder {
  constructor(name) {
    super();
    this.name = name;
    this.age = 18;
  }
}

const yupi = new Yupi("yupi");

console.log(yupi);

console.log(yupi.type);

yupi.rap();
```
