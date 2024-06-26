# Cookie

## Cookie 初识

1. 服务器端如何配置携带浏览器的 Cookie
   - 通过 Set-cookie 响应头进行配置
   - 浏览器发送 Cookie 时，应如何发送
2. 服务器端通过 Set-Cookie 配置 Cookie 内容，下次访问同一网站时，浏览器会带上这个 cookie
   - 在浏览器控制台，application 面板，storage/Cookie 选项卡中，可对 Cookie 进行增加、删除、编辑
3. 通过 curl/httpbin 模拟发送 Cookie

   ```javascript
   // 请求该地址，将自动配置 a=3 的 cookie，并 302 重定向到 /cookies 页面
   // 可从第二个请求看到，并没有自动携带 Cookie，因为 Cookie 需要浏览器进行管理
   curl --head -L https://httpbin.org/cookies/set/a/3
   HTTP/1.1 302 FOUND
   Date: Tue, 28 May 2024 02:40:12 GMT
   Content-Type: text/html; charset=utf-8
   Content-Length: 223
   Connection: keep-alive
   Server: gunicorn/19.9.0
   Location: /cookies
   Set-Cookie: a=3; Path=/
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Credentials: true

   HTTP/1.1 200 OK
   Date: Tue, 28 May 2024 02:40:13 GMT
   Content-Type: application/json
   Content-Length: 20
   Connection: keep-alive
   Server: gunicorn/19.9.0
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Credentials: true

   curl https://httpbin.org/cookies -H "cookie: a=3;b=3"
   {
    "cookies": {
      "a": "3",
      "b": "3"
    }
   }
   ```

## Cookie 的属性

1. Cookie 有哪些属性
   - Domain： 为 Cookie 指定的域名
   - Path：为 Cookie 指定的路径
   - Expire/MaxAge: Cookie 在浏览器上的缓存时间
   - HttpOnly： 无法通过 javascript 操作 Cookie，但在浏览器控制台中可以看到该值（可以避免 XSS 跨站脚本攻击）
     - HttpOnly 仅仅能避免 XSS 对 Cookie 窃取的攻击，但 XSS 仍然可以执行脚本进行其他方面的攻击。避免 XSS 攻击的最有效方法是 CSP（内容安全策略），也是通过 HTTP 配置
   - Secure： 仅能通过 HTTPS 协议传输
   - SameSite： 跨站点 Cookie 发送策略（跨站点与跨域略有不同）
2. Cookie HttpOnly 是什么意思
   - 当在 Cookie 中开启了 HTTPOnly 属性后，这个 Cookie 就不能通过 JavaScript 的 document.cookie 以及一些其他客户端脚本进行访问了，只能通过 HTTP 请求头在服务端和客户端之间传递。

## SameSite Cookie

1. SameSite 有哪些属性

   - None：任何情况下都会向第三方网站请求发送 cookie
   - Lax：只有导航到第三方网站的 Get 链接会发送 Cookie。而跨域的图片 iframe、fetch 请求、form POST 表单都不会发送 Cookie
   - Strict：任何情况下都不会向第三方网站请求发送 Cookie

2. 什么是 CSRF 攻击,如何通过 SameSite 避免 CSRF 攻击

   - CSRF（Cross-site request forgery），跨站请求伪造
   - 设置 SameSite 的值为 Lax 或者 Strict,只在特定的情况发送 Cookie 或者不发送 Cookie 避免 CSRF 攻击

## Cookie 的操作

1. 如何通过 Javascript 添加 Cookie

```javascript
// 这样就会在cookie新增
document.cookie = "a=3";
```

2. 如何通过 Javascript 删除 Cookie

```javascript
// 删除 cookie a
document.cookie = "a=3;max-age=-1";
```

3. 如何通过 CookieStore API 增删改查 Cookie

```javascript
// 获取所有 cookie，返回一个数组对象
await cookieStore.getAll();

// 获取单独 key
await cookieStore.get("key");

// 新增/修改
cookieStore.set("key", value);

// 删除
cookieStore.delete("key");
```
