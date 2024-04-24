# 装饰器模式

> 用于在不修改对象（类、方法或属性）原有功能的基础上，为其添加新的行为或责任。装饰器模式遵循“开闭原则”，即对扩展开放，对修改关闭，允许在运行时动态地给对象添加新功能，而不必修改对象的源代码。

> 不想去关心它现有的业务逻辑,只想对它已有的功能做个拓展,只关心拓展出来的那部分新功能如何实现

## es5 函数装饰

```javascript
function logDecorator(func) {
  return function () {
    console.log("Before calling the function...");
    const result = func.apply(this, arguments);
    console.log("After calling the function...");
    return result;
  };
}

function originalFunction() {
  console.log("Original function is called.");
  return "Result from original function.";
}

const decoratedFunction = logDecorator(originalFunction);

console.log(decoratedFunction());
```

## es6 装饰器语法糖

### 类装饰器

> 类装饰器应用于类声明前，可以修改类的行为或添加静态成员：

```javascript
function addStaticProperty(target) {
  target.staticProperty = "decorated";
}

@addStaticProperty
class Myclass {}

console.log(Myclass.staticProperty);
```

### 方法装饰器

> 方法装饰器应用于类方法上，可以修改方法的行为或添加元数据：

```javascript
// 假设有一个方法装饰器
function logMethodCalls(target, key, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    console.log(`Calling method ${key} with arguments`, args);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class MyClass {
  @logMethodCalls
  myMethod(arg1, arg2) {
    // ...
  }
}

const instance = new MyClass();
instance.myMethod("foo", "bar"); // 输出：Calling method myMethod with arguments ['foo', 'bar']
```

### 属性装饰器

> 属性装饰器应用于类的实例属性上，通常用于收集元数据或处理属性的 getter/setter：

```javascript
// 假设有一个属性装饰器
function autoValue(target, key) {
  Object.defineProperty(target, key, {
    get() {
      return `Auto-generated value for ${key}`;
    },
  });
}

class MyClass {
  @autoValue
  myProperty;
}

const instance = new MyClass();
console.log(instance.myProperty); // 输出：Auto-generated value for myProperty
```
