# 策略模式

> 定义了一系列算法（策略），并将每个算法封装在一个单独的类（或对象）中。客户端可以根据需要在运行时选择使用哪种策略，使得算法的使用与算法的实现相分离，增加代码的灵活性和可扩展性。

1. 例子

- 当价格类型为“预售价”时，满 100 - 20，不满 100 打 9 折
- 当价格类型为“大促价”时，满 100 - 30，不满 100 打 8 折
- 当价格类型为“返场价”时，满 200 - 50，不叠加
- 当价格类型为“尝鲜价”时，直接打 5 折

> if-else 实现

```javascript
// 询价方法，接受价格标签和原价为入参
function askPrice(tag, originPrice) {
  // 处理预热价
  if (tag === "pre") {
    if (originPrice >= 100) {
      return originPrice - 20;
    }
    return originPrice * 0.9;
  }

  // 处理大促价
  if (tag === "onSale") {
    if (originPrice >= 100) {
      return originPrice - 30;
    }
    return originPrice * 0.8;
  }

  // 处理返场价
  if (tag === "back") {
    if (originPrice >= 200) {
      return originPrice - 50;
    }
    return originPrice;
  }

  // 处理尝鲜价
  if (tag === "fresh") {
    return originPrice * 0.5;
  }
}
```

2. 改造为明确、单一的分工

```javascript
// 处理预热价
function prePrice(originPrice) {
  if (originPrice >= 100) {
    return originPrice - 20;
  }
  return originPrice * 0.9;
}

// 处理大促价
function onSalePrice(originPrice) {
  if (originPrice >= 100) {
    return originPrice - 30;
  }
  return originPrice * 0.8;
}

// 处理返场价
function backPrice(originPrice) {
  if (originPrice >= 200) {
    return originPrice - 50;
  }
  return originPrice;
}

// 处理尝鲜价
function freshPrice(originPrice) {
  return originPrice * 0.5;
}

// 处理新人价
function newUserPrice(originPrice) {
  if (originPrice >= 100) {
    return originPrice - 50;
  }
  return originPrice;
}

function askPrice(tag, originPrice) {
  // 处理预热价
  if (tag === "pre") {
    return prePrice(originPrice);
  }
  // 处理大促价
  if (tag === "onSale") {
    return onSalePrice(originPrice);
  }

  // 处理返场价
  if (tag === "back") {
    return backPrice(originPrice);
  }

  // 处理尝鲜价
  if (tag === "fresh") {
    return freshPrice(originPrice);
  }

  // 处理新人价
  if (tag === "newUser") {
    return newUserPrice(originPrice);
  }
}
```

3. 对象映射

```javascript
// 定义一个询价处理器对象
const priceProcessor = {
  pre(originPrice) {
    if (originPrice >= 100) {
      return originPrice - 20;
    }
    return originPrice * 0.9;
  },
  onSale(originPrice) {
    if (originPrice >= 100) {
      return originPrice - 30;
    }
    return originPrice * 0.8;
  },
  back(originPrice) {
    if (originPrice >= 200) {
      return originPrice - 50;
    }
    return originPrice;
  },
  fresh(originPrice) {
    return originPrice * 0.5;
  },
};
// 询价函数
function askPrice(tag, originPrice) {
  return priceProcessor[tag](originPrice);
}
```
