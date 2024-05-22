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
