# HTTP/2

## ALPN

1. 查看更大网站提供的 ALPN

```javascript
curl https://www.baidu.com -vvv --head
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0*   Trying 183.2.172.185:443...
* Connected to www.baidu.com (183.2.172.185) port 443 (#0)
* ALPN, offering h2
* ALPN, offering http/1.1
* successfully set certificate verify locations:
*  CAfile: C:/Program Files/Git/mingw64/ssl/certs/ca-bundle.crt
*  CApath: none
} [5 bytes data]
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
} [512 bytes data]
* TLSv1.3 (IN), TLS handshake, Server hello (2):
{ [102 bytes data]
* TLSv1.2 (IN), TLS handshake, Certificate (11):
{ [4768 bytes data]
* TLSv1.2 (IN), TLS handshake, Server key exchange (12):
{ [333 bytes data]
* TLSv1.2 (IN), TLS handshake, Server finished (14):
{ [4 bytes data]
* TLSv1.2 (OUT), TLS handshake, Client key exchange (16):
} [70 bytes data]
* TLSv1.2 (OUT), TLS change cipher, Change cipher spec (1):
} [1 bytes data]
* TLSv1.2 (OUT), TLS handshake, Finished (20):
} [16 bytes data]
* TLSv1.2 (IN), TLS handshake, Finished (20):
{ [16 bytes data]
* SSL connection using TLSv1.2 / ECDHE-RSA-AES128-GCM-SHA256
* ALPN, server accepted to use http/1.1
* Server certificate:
*  subject: C=CN; ST=beijing; L=beijing; O=Beijing Baidu Netcom Science Technology Co., Ltd; CN=baidu.com
*  start date: Jul  6 01:51:06 2023 GMT
*  expire date: Aug  6 01:51:05 2024 GMT
*  subjectAltName: host "www.baidu.com" matched cert's "*.baidu.com"
*  issuer: C=BE; O=GlobalSign nv-sa; CN=GlobalSign RSA OV SSL CA 2018
*  SSL certificate verify ok.
} [5 bytes data]
> HEAD / HTTP/1.1
> Host: www.baidu.com
> User-Agent: curl/7.73.0
> Accept: */*
>
{ [5 bytes data]
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Accept-Ranges: bytes
< Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform
< Connection: keep-alive
< Content-Length: 277
< Content-Type: text/html
< Date: Fri, 14 Jun 2024 02:23:47 GMT
< Etag: "575e1f71-115"
< Last-Modified: Mon, 13 Jun 2016 02:50:25 GMT
< Pragma: no-cache
< Server: bfe/1.0.8.18
<
  0   277    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform
Connection: keep-alive
Content-Length: 277
Content-Type: text/html
Date: Fri, 14 Jun 2024 02:23:47 GMT
Etag: "575e1f71-115"
Last-Modified: Mon, 13 Jun 2016 02:50:25 GMT
Pragma: no-cache
Server: bfe/1.0.8.18


* Connection #0 to host www.baidu.com left intact

* ALPN, offering h2
* ALPN, offering http/1.1

* ALPN, server accepted to use http/1.1
```

## Frame

1. 什么是 Frame 以及 Stream
   - Frame 是 HTTP2 中通信的最小单位
   - 多个 Frame 组成一个 Stream
2. 如何判断某个请求已接收完毕
   - 在 HTTP/1.1 中，可通过 Content-length 以及 Transfer-Encoding 来判断
   - 在 HTTP/2 中，通过 DATA Frame 的 END_STREAM Flag 来判断请求报文/响应报文是否接收完毕
3. 如何取消请求发送
   - HTTP/1.1：当取消一个 HTTP 请求时，一般就是关闭 TCP 连接
   - HTTP/：当取消一个 HTTP 请求时，可以发送一个 RST_STREAM Frame,仅中止特定的流，而不影响同一个 TCP 连接中的其他流
4. HTTP2 是如何进行多路复用的
   - 在 HTTP 连接上，可以同时并发存在多个 Stream,即多个请求同时请求并响应，这就是多路复用。多路复用通过 SETTINGS Frame 的 SETTINGS_MAX_CONCURRENT_STREAMS 来配置最大并发数
