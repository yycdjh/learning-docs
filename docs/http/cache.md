# 缓存

## 强制缓存与协商缓存

1. 什么是强缓存和协商缓存
   - 强缓存：当启动强缓存后，如果缓存没有过期，再次请求时无需向服务器发送请求，直接从本地缓存获取资源
     - Expires: 绝对时间，有固定的格式
     - Cache-Control：
       - no-cache： 不缓存
       - max-age=3153600: 浏览器在一年内都不需要向服务器请求资源
   - 协商缓存：再次请求时，需要向服务器校验新鲜度，如果资源是新鲜的，返回 304，从缓存获取资源
2. 如何验证网站某资源添加了强缓存
   - http 状态码为 200 OK (from disk cache)或者 200 OK (from memory cache)
   - 查看响应头是否设置 Expires、Cache-Control
3. 协商缓存如何校验新鲜度
   - Last-Modified/If-Modified-Since,匹配 Response Header 的 Last-Modified 与 Request Header 的 If-Modified-Since 是否一致
   - Etag/If-None-Mach， 匹配 Response Header 的 Etag 与 Request Header 的 If-Node-Match 是否一致

## 强缓存与 age/max-age

1. 使用 node.js 写一段服务器代码测试 age/max-age

```javascript
import { createServer } from "http";

const routes = {
  "/": (req, res) => {
    res.end("hello, world");
  },
  "/cache": (req, res) => {
    res.setHeader("cache-control", "max-age=100");
    res.setHeader("age", "90");
    res.end("Cache 100s");
  },
};
export default function handler(req, res) {
  for (const [path, handle] of Object.entries(routes)) {
    if (req.url === path) {
      handle(req, res);
      return;
    }
  }
  res.end("hello, world");
}

const server = createServer(handler);
server.listen(3005, () => {
  console.log("Listening");
});
```

2. age/max-age 的作用是什么

   - age: http 资源在代理服务器中的储存时间，以秒作为单位。由代理服务器产生，而非源服务器产生
   - max-age：cache-control 响应头指示客户端被客户端缓存多久，以秒作为单位

   ```javascript
     //例子：(该资源仅仅只会被缓存 10 秒)
     Age：90
     Cache-Control:100
   ```

## 启发式缓存

1. 什么是启发式缓存
   - 当对某资源没有配置 Cache-Control/Expires 强缓存响应头时，客户端将会根据以下两个响应头计算出合适的强缓存时间。
     - Date：HTTP 报文在源服务器的产生时间
     - Last-Modified：源服务器上资源的上次修改时间
     - LM-Factor: 它处于[0, 1]之间
     - 强制缓存时间 (Date - Last-Modified) \* n

## 协商缓存响应头生成算法

1. ETag 值是如何生成的
   - 可以针对文件内容进行 hash 计算，得到的 hash 值作为 ETag（但从实现上来说，不会使用这样消耗大量 CPU 的 hash 技术）
   - nginx 由响应头的 Last-Modified 与 Content-Length 表示为十六进制组合而成
2. ETag 与 Last-Modified 有何区别
   - ETag 拥有比 Last-Modified 更高的精确度
   - Last-Modified 的局限性
     - 时间精确度只有秒级，但某文件在一秒内被更改 n 次
     - 某一文件经过修改之后内容未发生变化，比如添加一行在删除该行
3. 如果 http 响应头中 ETag 值改变了，是否意味着文件内容一定已经改变
   - 不一定，在 nginx 中，由响应头的 Last-Modified 与 Content-Length 表示为十六进制组合而成。而文件经过修改之后内容未发生变化，这个时候 Last-Modified 已经发生了改变从而 ETag 值也改变了。
