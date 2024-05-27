# 跨域

## 跨域与 CORS

1. 什么是跨域
   - 跨域问题是浏览器环境中特有的问题
   - 发送请求时，协议、域名、端口三者有一个不一样，就是跨域
2. 使用 CORS 如何解决跨域
   - 在服务器设置响应头，例如：Access-Control-Allow-Oringin: \*
3. CORS 全称是什么
   - cross-oringin-resource-sharing 跨域资源共享

## 预检请求

1. 什么是简单请求
   - Method： 请求方法是 GET、POST、HEAD
   - Header： 请求头是 Content-type、Accept-Language、Content-Language
   - Content-Type: 请求类型为 application/x-www-form-urlencoded、multipart/form-data、text/plain
2. 什么情况下会发送 OPTIONS 预检请求
   - 当一个请求跨域且不是简单请求时，就会首先发起一个 OPTIONS 请求
3. 如何避免过多 OPTIONS 请求造成的性能损耗
   - 利用简单请求
   - 利用反向代理避免跨域

## 跨域的权限

1. 在跨域时，服务端如何配置才能使 cookie 发送

   - 配置响应头 access-control-allow-credentials:true
   - 无法向配置 access-control-allow-origin: \* 的域名发送 Cookie

2. 在跨域时，如何发送 cookie 权限信息

   - 在使用 fetch 发送请求时，配置 credentials
     - Omit: 从不发送 cookie
     - Same-origin: 同源时发送 cookie
     - include： 同源与跨域时都发送 cookie
