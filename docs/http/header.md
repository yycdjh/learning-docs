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
