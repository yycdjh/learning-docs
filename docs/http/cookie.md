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
