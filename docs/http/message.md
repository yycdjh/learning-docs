# 报文

## http 报文

1. 什么事 \r\n
   - 换行符
2. 如何找到文件中的 \r\n（windows）
   - 在 bash 中输入 cat -v "filePath"
   - 在编辑器里面打开正则匹配搜索
   - 查看 http 报文的换行符的话,在 bash 使用 curl -s -i baidu.com | cat -e
3. HTTP 报文格式是什么样的
   - 由请求及相应组成

```javascript
// 请求报文
// 首行为 Method Path Version构成
GET / HTTP/1.1
// 以下是请求头，Host是请求的域名
Host: www.baidu.com
User-Agent: curl/8.4.0
Accept: '*/*'
// 响应报文
// 相隔两个 \r\n 将会收到响应报文
// 行首由 Version StatusCode StatusText组成
HTTP/1.1 200 OK
// 以下是响应头
Accept-Ranges: bytes
Cache-Control: no-cache
Connection: keep-alive
Content-Length: 227
Content-Security-Policy: frame-ancestors 'self' https://chat.baidu.com http://mirror-chat.baidu.com https://fj-chat.baidu.com https://hba-chat.baidu.com https://hbe-chat.baidu.com https://njjs-chat.baidu.com https://nj-chat.baidu.com https://hna-chat.baidu.com https://hnb-chat.baidu.com http://debug.baidu-int.com;
Content-Type: text/html
Date: Sun, 12 May 2024 14:41:50 GMT
Pragma: no-cache
Server: BWS/1.1
Set-Cookie: BD_NOT_HTTPS=1; path=/; Max-Age=300
Set-Cookie: PSTM=1715524910; expires=Thu, 31-Dec-37 23:55:55 GMT; max-age=2147483647; path=/; domain=.baidu.com
Set-Cookie: H_PS_PSSID=40299_40080_60142_40463_60175_60269; path=/; expires=Mon, 12-May-25 14:41:50 GMT; domain=.baidu.com
Set-Cookie: BAIDUID=F9C79C8F94153DEA1C460AA59B922595:FG=1; Path=/; Domain=baidu.com; Max-Age=31536000
Set-Cookie: BAIDUID_BFESS=F9C79C8F94153DEA1C460AA59B922595:FG=1; Path=/; Domain=baidu.com; Max-Age=31536000; Secure; SameSite=None
Traceid: 1715524910186625741810703373082228342634
X-Ua-Compatible: IE=Edge,chrome=1
X-Xss-Protection: 1;mode=block
// 响应体
// 相隔两个 \r\n 将会收到响应体
```

4. 我们如何查看某次请求的 http 报文

   -curl -v https://www.baidu.com
