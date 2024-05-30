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
