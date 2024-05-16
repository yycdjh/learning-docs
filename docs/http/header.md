# 头部

## header

1. HTTP 响应头中 Cache-Control，有时为首字母大写，有时为小写，哪个是正确写法
   - HTTP/1.x： 不区分大小写
   - HTTP/2: 只能用小写
2. 什么是伪头
   - HTTP/2 协议中 以:开头被称为伪头，它们用于传递 HTTP 报文初始行数据
     - :authority, 同 Host
     - :method,同 METHOD
     - :path, 同 PATH
     - :scheme, 同 SCHEME，即 HTTPS/HTTP
     - :status, 同 Status Code
3. 如何自定义 HTTP 头部
   - 非标准自定义首部由 X- 作为前缀
4. 观察自己常逛网站的 HTTP 请求头与响应头
   - github、b 站、掘金 protocal 都是 http/2
   - 都有伪头跟自定义 http 头部 X-
5. 通过 curl 与 httpbin 测试请求头部
   - curl --head httpbin.org
