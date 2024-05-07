# test

> test 定义了一组相关的期望。它接收测试名称和报错测试期望的函数。

## test.extend

> 使用 test.extend 来使用自定义的 fixtures 拓展测试上下文。这将返回一个新的 test,它也是可拓展的,因此可以根据需要拓展的 fixtures 或覆盖现有的 fixtures

```javascript
import { expect, test } from "vitest";

const todos = [];

const myTest = test.extend({
  todos: async ({ task }, use) => {
    todos.push(1, 2, 3);
    await use(todos);
    todos.length = 0;
  },
});

myTest("add item", ({ todos }) => {
  expect(todos.length).toBe(3);

  todos.push(4);
  expect(todos.length).toBe(4);
});
```

## test.skip

> 可以通过 test.skip 来跳过这些测试

```javascript
import { assert, test } from "vitest";

test.skip("skipped test", () => {
  // Test skipped, no error
  assert.equal(Math.sqrt(4), 3);
});
```

> 也可以通过在 context 上动态调用 skip 来跳过测试

```javascript
import { assert, test } from "vitest";

test("skipped test", (context) => {
  context.skip();
  // Test skipped, no error
  assert.equal(Math.sqrt(4), 3);
});
```
