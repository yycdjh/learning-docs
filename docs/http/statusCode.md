# 状态码

## 100/101

1. 找到有 100/101 状态码的网站

```javascript
// 掘金
curl -I -H "expect: 100-continue" https://juejin.cn
HTTP/1.1 100 Continue

HTTP/1.1 200 OK
Server: Tengine
Content-Type: text/html; charset=utf-8
Content-Length: 82625
Connection: keep-alive
Date: Thu, 30 May 2024 01:32:32 GMT
Accept-Ranges: none
Etag: "142c1-ihsRFJyQerniX/yO2Puk3zEJrwA"
Server-Timing: inner; dur=140,pp;dur=13, total;dur=128;desc="Nuxt Server Time"
Vary: Accept-Encoding, Accept-Encoding
X-Bytefaas-Execution-Duration: 131.04
X-Bytefaas-Request-Id: 202405300932316F9E5CAF9312E04AFFE4
X-Gw-Dst-Psm: toutiao.fe.xitu_juejin_cn_web_index
X-Powered-By: Goofy Node
X-Tt-Logid: 202405300932316F9E5CAF9312E04AFFE4
x-tt-trace-host: 0168ce3923578fd0c7515548ee194aa043f4cb67faff834e8fc3b7d54b81f19178ebcaef46b094f067dca8699d9a81c2c7b0696
8766a11c506ebc9337b57cad80b66d6c393c04ffb923ea3b4973f3dccd228b9472048ec1bae7bb2ec7c64ed823b
x-tt-trace-tag: id=03;cdn-cache=miss;type=dyn
x-tt-trace-id: 00-2405300932316F9E5CAF9312E04AFFE4-36929C027FC45909-00
X-TT-TIMESTAMP: 1717032752.005
Via: cache6.l2na63-1[145,0], vcache11.cn2219[183,0]
Timing-Allow-Origin: *
EagleId: b73ce41f17170327518343687e
```

2. 101/100 与那些请求头以及响应头有关
   - 100（Expect: 100-continue）
     - 此时服务器会检查请求头是否有问题，如果没问题返回 100 Continue 状态码，否则返回 417 Expectation Failed 状态码
   - 101
     - Upgrade: websocket
     - Connection: Upgrade

## 103 Early Hints

1. 103 状态码是什么意思
   - 早期提示，可以更早地声明对某些资源的提示
1. 103 状态码是如何提升性能的
   - 当服务器收到 GET 请求后，它可能需要一些时间来准备响应。在此期间，服务器可利用这个空闲时间发送 103 状态码和 link 消息头，浏览器可以解析这些报头并预加载所诉资源，从而改善页面加载速度
1. 找到有 103 状态码的网站

## 3、200/201/204/206

1. 201/204/206 状态码分别在什么情况下会出现
   - 201
     - 一般用以 POST 请求，代表服务器资源创建成功。
   - 204（204、304 唯二没有响应体的状态码）
     - PUT 请求，修改某个资源的某个状态，此时 204 代表修改成功，无需响应体
     - DELETE/OPTION 请求
     - 打点 API
2. 206 Partial Content
   - 当客户端指定 Range 范围请求头时，服务器端将会返回部分资源， 即 Partial Content， 此时状态码为 206
     - range/content-range: 客户端发送 range 请求头指定范围，若满足范围，服务器返回响应头 content-range 以及状态码 206. 若不满足，则返回 416 Range Not Satisfiable 状态码
3. 浏览个人常用网站，找到 201/204/206 状态码请求
4. 如何对某个资源进行范围请求，在 axios/fetch/request 等库中如何请求
   - 设置请求头`headers： { Range: 'bytes=0-999'}`
