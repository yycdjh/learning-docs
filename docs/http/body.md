# body

## 请求体及编码

1. 使用 httpbin 测试 json/form，并观察请求体

```javacript
curl -X POST httpbin.org/post -H "content-type: application/x-www-form-urlencoded" -d "a=3&b=4"
{
"args": {},
"data": "",
"files": {},
"form": {
  "a": "3",
  "b": "4"
},
"headers": {
  "Accept": "*/*",
  "Content-Length": "7",
  "Content-Type": "application/x-www-form-urlencoded",
  "Host": "httpbin.org",
  "User-Agent": "curl/8.4.0",
  "X-Amzn-Trace-Id": "Root=1-665ebe1f-745e59e6255eb17f26db1ba6"
},
"json": null,
"origin": "119.136.145.14",
"url": "http://httpbin.org/post"
}

curl -X POST httpbin.org/post -H "content-type: application/json" -d "{a:3,b:4}"
{
"args": {},
"data": "{a:3,b:4}",
"files": {},
"form": {},
"headers": {
  "Accept": "*/*",
  "Content-Length": "9",
  "Content-Type": "application/json",
  "Host": "httpbin.org",
  "User-Agent": "curl/8.4.0",
  "X-Amzn-Trace-Id": "Root=1-665ebf78-5fd3a08b7d75c9cc38f939f3"
},
"json": null,
"origin": "119.136.145.14",
"url": "http://httpbin.org/post"
}
```

2. 如何对 JSON/Form 数据进行序列化作为 Body 在 fetch API 中发送

   - 配置 content-type
   - 配置为对应 content-type 的 data

     - application/json 可以使用 JSON.stringify()
     - application/x-www-form-urlencoded 可以使用 URLSearchParams API

     ```javascript
     // 对于 application/json 的数据需要手动 JSON.stringify
     await fetch("https://httpbin.org/post", {
       method: "POST",
       body: JSON.stringify({
         a: 3,
         b: 4,
       }),
       headers: {
         "content-type": "application/json",
       },
     }).then((res) => res.json());

     // 对于 application/x-www-form-urlencoded 的数据也需要手动编码
     await fetch("https://httpbin.org/post", {
       method: "POST",
       // body 应该为字符串，但是 fetch API 会自动识别 URLSearchParams
       // 也可使用 new URLSearchParams({ a: 3, b: 4 }).toString() 转化为字符串
       body: new URLSearchParams({ a: 3, b: 4 }),
       headers: {
         "content-type": "application/x-www-form-urlencoded",
       },
     }).then((res) => res.json());
     ```

3. 如何基于 fetch API 实现简单的类似 axios，使得对请求体简单封装

## content-length

1. 如何得知请求报文/响应报文已接收完毕
   - 如果没指定 content-length， TCP 连接关闭时，数据就已经全部接受
   - 如果指明了 content-length， 数据长度达到这个值时，即认为报文接收完毕
2. 使用 Apifox Echo 测试请求头和响应头中的 Content-Length

```javascript
// 测试请求头中的content-length
curl -I https://echo.apifox.com

// 测试响应头中的content-length
curl https://echo.apifox.com/response-headers?content-length=123
{
"Content-Length": [
  "141",
  "123"
],
"Content-Type": "application/json",
"content-length": [
  "141",
```

## 请求体报文

1. 用 nc 测试不同 Content-Type 的 POST 请求(window 可以用 ncat)

```javascript
// 未指定content-type
ncat httpbin.org 80
POST /post HTTP/1.1
Host: httpbin.org
Content-Length: 7

a=3&b=4
HTTP/1.1 200 OK
Date: Thu, 06 Jun 2024 03:12:39 GMT
Content-Type: application/json
Content-Length: 299
Connection: keep-alive
Server: gunicorn/19.9.0
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true

{
  "args": {},
  "data": "a=3&b=4",
  "files": {},
  "form": {},
  "headers": {
    "Content-Length": "7",
    "Host": "httpbin.org",
    "X-Amzn-Trace-Id": "Root=1-66612922-1804c24817394165455bb094"
  },
  "json": null,
  "origin": "119.136.145.197",
  "url": "http://httpbin.org/post"
}

// application/x-www-form-urlencoded
ncat httpbin.org 80
POST /post HTTP/1.1
Host: httpbin.org
Content-Length: 7
Content-Type: application/x-www-form-urlencoded

a=3&b=4
HTTP/1.1 200 OK
Date: Thu, 06 Jun 2024 03:23:07 GMT
Content-Type: application/json
Content-Length: 380
Connection: keep-alive
Server: gunicorn/19.9.0
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true

{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "a": "3",
    "b": "4"
  },
  "headers": {
    "Content-Length": "7",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "X-Amzn-Trace-Id": "Root=1-66612b96-51a93cc854fd91ab05437119"
  },
  "json": null,
  "origin": "119.136.145.14",
  "url": "http://httpbin.org/post"
}

// application/json
ncat httpbin.org 80
POST /post HTTP/1.1
Host: httpbin.org
Content-Length: 7
Content-Type: application/json

{"a":3}
HTTP/1.1 200 OK
Date: Thu, 06 Jun 2024 03:27:37 GMT
Content-Type: application/json
Content-Length: 353
Connection: keep-alive
Server: gunicorn/19.9.0
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true

{
  "args": {},
  "data": "{\"a\":3}",
  "files": {},
  "form": {},
  "headers": {
    "Content-Length": "7",
    "Content-Type": "application/json",
    "Host": "httpbin.org",
    "X-Amzn-Trace-Id": "Root=1-66612ca0-1f6cdf77005af2b60f1680f8"
  },
  "json": {
    "a": 3
  },
  "origin": "119.136.145.14",
  "url": "http://httpbin.org/post"
}
```

## 上传图片

1. 什么是 Blob/File API，以及二者联系

   - Blob API 用以在浏览器中模拟文件资源，在第二个参数中可指定 MIME Type
   - File API 继承自 Blob,相对 Blob 而言，它多了上次修改时间 lastModified 以及文件名 name 两个属性

2. 在上传文件时，如何获得 File 对象

   - 在 input 框设置 onChange 可以在回调里面拿到 file 对象

   ```javascript
   <input type="file" onChange="change">

   function change(e){
      const file = e.target.files[0]
   }
   ```

3. 如何上传图片

```javascript
<input type="file" onChange="change" accept="image/jpeg">

function change(e){
    const file = e.target.files[0]

    //设置请求体
    fetch('url',{
        body: file,
        headers：{
            'content-type': 'image/jpeg'
        }
    })
}
```

4. 如何上传 PDF

```javascript
<input type="file" onChange="change" accept=".pdf">

function change(e){
 const file = e.target.files[0]
 let formData = new FormData()
 formData.append('file', file)

 //设置请求体
 fetch('url',{
     method: 'POST',
     body: formData
 })
}
```

## JSON API 上传图片

1. 如何以 JSON API 的方式上传图片

```javascript
<input type="file" onChange="change" accept="image/jpeg">

function change(e){
  const file = e.target.files[0]
  const unit8= new Unit8Array(file)
  //设置请求体
  fetch('url',{
      body: JSON.stringify({
          image: base64.fromByteArray(unit8),
          title: '如何通过JSON上传图片',
          author: 'jd'
      }),
      headers：{
          'content-type': 'application/json'
      }
  })
}
```

## Form Data

1. 使用 nc、httpie、curl 发送 Form Data 请求
   - 发不出去
