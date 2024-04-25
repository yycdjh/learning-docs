# 适配器模式

> 用于将一个接口（通常是类或对象）转换成另一个接口，使得原本不兼容的接口能够协同工作。适配器模式的主要目的是解决接口不匹配的问题，通过创建适配器类（或对象）来封装原有接口，提供目标接口所需的接口或方法，使得客户端可以透明地使用适配后的接口。

```javascript
// 被适配者（Adaptee）：一个老式的 API
class OldLibrary {
  oldMethod() {
    return 'This is the old method output';
  }
}

// 目标接口（Target）：客户端期望的接口
interface NewLibraryInterface {
  modernMethod(): string;
}

// 适配器（Adapter）：实现目标接口，并适配老式 API
class Adapter implements NewLibraryInterface {
  private adaptee: OldLibrary;

  constructor() {
    this.adaptee = new OldLibrary();
  }

  modernMethod(): string {
    // 转换老式 API 的方法调用以符合目标接口
    const oldResult = this.adaptee.oldMethod();

    // 可能进行一些额外的转换或处理
    const modernizedResult = `Adapted result: ${oldResult}`;

    return modernizedResult;
  }
}

// 客户端代码，使用适配后的接口
function clientCode(library: NewLibraryInterface) {
  console.log(library.modernMethod());
}

// 使用适配器
const adapter = new Adapter();
clientCode(adapter); // 输出：Adapted result: This is the old method output
```
