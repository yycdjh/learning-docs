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

## 请求头列表

1. 控制相关
   - Host： 一般一个 ip 地址对应 n 哥应用，通过 host 即可定位到对应的应用
   - Cache-Control: 发送请求时，如何控制客户端的缓存策略
   - Expect： 与 100 状态码有关
   - Range：指定范围请求，与 206 状态码相关
2. 条件相关
   - If-Match: 与 304 状态码相关
   - If-Madified-Since：与 304 状态码相关
   - If-Range： 与 206 状态码相关
3. 内容协商（告知服务器端我需要什么样的资源，比如语言以及压缩编码，如果服务器无法返回对应的资源，则返回 406 状态码）
   - Accept: 客户端需要什么样的资源，比如 json 与 html
   - Accept-Encoding: 客户端需要什么样的压缩编码， 比如 gzip 与 br，如果不配做则可能不进行压缩
   - Accept-Language: 客户端需要什么样的语言，比如 en-US 和 zh-CN
4. 认证相关
   - Authorization: 每次发送请求时，使用该头部携带 token 信息，维护客户端的认证状态
5. 来源相关（通过来源相关，我们可以更好地统计用户信息，也可以以此为依据用来防止爬虫）
   - Referer: 当前页面的上一个页面是哪里，或者说该页面是有哪个页面跳转而来
   - User-Agent: 用户代理是什么，或者说该页面是由哪个客户端（比如浏览器版本号之类的）跳转而来

## 响应头列表

1. 控制相关
   - Date：HTTP 报文在源服务器产生的时间
   - Age：HTTP 报文在缓存服务器，比如 CDN 中的存储时间，以秒作为单位，一般来说，当前时间减去 Date，大约就是 Age 的秒数
   - Cache-Control: HTTP 缓存策略，与 304 状态码相关
   - Location: 新建资源与重定向资源的路径，与 201/30x 状态码
   - Vary: 一般作为缓存的健（key），与内容协商相关。如 Vary： Accept-Encoding
2. 条件相关
   - ETag：Entity Tag，用以标志实体的唯一性，与缓存策略 304 状态码相关
   - Last-Modified：资源上次修改时间，与缓存策略 304 状态码相关

## Host 与 :authority

1. 通过 nc 命令直接发送报文控制 Host 请求头的发送

```javascript
// 有host
ncat httpbin.org 80
GET /get HTTP/1.1
Host: httpbin.org

HTTP/1.1 200 OK
Date: Sun, 19 May 2024 00:59:51 GMT
Content-Type: application/json
Content-Length: 199
Connection: keep-alive
Server: gunicorn/19.9.0
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true

{
"args": {},
"headers": {
  "Host": "httpbin.org",
  "X-Amzn-Trace-Id": "Root=1-66494f07-2eac85f95de9be0d023b96e8"
},
"origin": "119.136.145.14",
"url": "http://httpbin.org/get"
}

// 无Host
ncat httpbin.org 80
GET /get HTTP/1.1

HTTP/1.1 400 Bad Request
Server: awselb/2.0
Date: Sun, 19 May 2024 01:03:49 GMT
Content-Type: text/html
Content-Length: 122
Connection: close

<html>
<head><title>400 Bad Request</title></head>
<body>
<center><h1>400 Bad Request</h1></center>
</body>
</html>
```

2. 如何删除 curl 默认携带的请求头（通过 curl 发送 htto 请求时，将会自动携带 HOST 请求头）
   - 1. 通过 -H HOST: 删除 HOST 请求头。在 curl 中，如果-H 指定的参数以 :结尾，表示不发送该请求头
   - 1. 可以通过 ip + host 方式请求（dig +short） 获取其 ip 地址
     - 1. curl 76.223.126.88 -H "Host: http.devtool.tech"
3. 通过浏览器控制台，查看各个网站的 Host/:authoriry 请求头
