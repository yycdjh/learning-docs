# 工厂模式

> 简单工厂模式就是将创建对象的过程单独封装

```javascript
function User(name, age, career, work) {
  this.name = name;
  this.age = age;
  this.career = career;
  this.work = wrok;
}

function Factory(name, age, career) {
  let work;
  switch (career) {
    case "coder":
      work = ["写代码"];
      break;
    case "product manager":
      work = ["会议室"];
      break;
    case "boss":
      work = ["开会"];
      break;
    default:
      break;
  }

  return new User(name, age, career, work);
}
```

> 抽象工厂模式-围绕一个超级工厂创建其他工厂

```javascript
class User {
  constructor(name, age, career, work) {
    this.name = name;
    this.age = age;
    this.career = career;
    this.work = wrok;
  }
}

// 定义抽象工厂类
abstract class AbstractFactory {
  abstract createUser(name, age, career): User;
}

// 定义具体工厂类：CoderFactory
class CoderFactory extends AbstractFactory {
  createUser(name, age, career) {
    if (career !== "coder") {
      throw new Error("Invalid career for CoderFactory");
    }
    const work = ["写代码"];
    return new User(name, age, career, work);
  }
}

// 定义具体工厂类：ProductManagerFactory
class ProductManagerFactory extends AbstractFactory {
  createUser(name, age, career) {
    if (career !== "product manager") {
      throw new Error("Invalid career for ProductManagerFactory");
    }
    const work = ["会议室"];
    return new User(name, age, career, work);
  }
}

// 定义具体工厂类：BossFactory
class BossFactory extends AbstractFactory {
  createUser(name, age, career) {
    if (career !== "boss") {
      throw new Error("Invalid career for BossFactory");
    }
    const work = ["开会"];
    return new User(name, age, career, work);
  }
}

// 使用抽象工厂模式创建用户
function createUserWithAbstractFactory(name, age, career, factory) {
  return factory.createUser(name, age, career);
}

// 示例
const coderFactory = new CoderFactory();
const user1 = createUserWithAbstractFactory("Alice", 28, "coder", coderFactory);
console.log(user1);

const productManagerFactory = new ProductManagerFactory();
const user2 = createUserWithAbstractFactory("Bob", 32, "product manager", productManagerFactory);
console.log(user2);

const bossFactory = new BossFactory();
const user3 = createUserWithAbstractFactory("Charlie", 45, "boss", bossFactory);
console.log(user3);
```

> 手机例子

```javascript
// 抽象工厂
class MobilePhoneFactory {
  createOS() {
    throw new Error("抽象工厂的方法、需要重写");
  }
  createHardWare() {
    throw new Error("抽象工厂的方法、需要重写");
  }
}

// 具体工厂 —— 米手机
class MiFactory extends MobilePhoneFactory {
  createOS() {
    return new AndroidOS();
  }
  createHardWare() {
    return new QualcommHardWare();
  }
}

// 定义操作系统这类产品的抽象产品类
class OS {
  controlHardWare() {
    throw new Error("抽象产品方法不允许直接调用，你需要将我重写！");
  }
}

// 定义具体操作系统的具体产品类
class AndroidOS extends OS {
  controlHardWare() {
    console.log("我会用Android的方式去操作硬件");
  }
}

class AppleOS extends OS {
  controlHardWare() {
    console.log("我会用Apple的方式去操作硬件");
  }
}

// 定义手机硬件这类产品的抽象产品类
class HardWare {
  // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
  operateByOrder() {
    throw new Error("抽象产品方法不允许直接调用，你需要将我重写！");
  }
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
  operateByOrder() {
    console.log("我会用高通的方式去运转");
  }
}

class MiWare extends HardWare {
  operateByOrder() {
    console.log("我会用小米的方式去运转");
  }
}
// 这是我的手机
const myPhone = new FakeStarFactory();
// 让它拥有操作系统
const myOS = myPhone.createOS();
// 让它拥有硬件
const myHardWare = myPhone.createHardWare();
// 启动操作系统(输出‘我会用安卓的方式去操作硬件’)
myOS.controlHardWare();
// 唤醒硬件(输出‘我会用高通的方式去运转’)
myHardWare.operateByOrder();
```
