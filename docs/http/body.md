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

## Form Data 上传图片

1. 通过 FormData API 在浏览器上传图片

```javascript
<body>
  <input type="file" accept="image/*" onchange="uploadFile(event)">

  <script>

    function uploadFile(e) {

      const file = e.target.files[0];

      const formData = new FormData();

      formData.append('file', file);
      formData.append('name', 'jd');

      fetch('httpbin.org', {
        method: 'POST',
        body: formData
      }).then(res => {
        console.log(res);
      })
    }
  </script>
</body>
```

2. 通过 curl/httpie 上传图片

```javascript
curl httpbin.org/post --form a=3 --form b=4 --form image=./Desktop/qingwa.jpg
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "a": "3",
    "b": "4",
    "image": "./Desktop/qingwa.jpg"
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "366",
    "Content-Type": "multipart/form-data; boundary=------------------------9SYian5r6X501ocWBEEqFl",
    "Host": "httpbin.org",
    "User-Agent": "curl/8.4.0",
    "X-Amzn-Trace-Id": "Root=1-66665ec7-425bb1f1447e0ebf15d7d8a4"
  },
  "json": null,
  "origin": "14.153.4.109",
  "url": "http://httpbin.org/post"
}
```

## 分段传输

1. HTTP 客户端如何得知响应体（Response Body）已全部接受完毕呢？
   - 通过 Content-Length 可知响应体大小，从而得知是否接受完毕
   - 但是有一种情况无法得知 Content-Length，那便是服务器流式传输，也可以称为块式传输
     - 响应头 transfer-encoding: chunked
2. chunked 报文格式是什么样子？

   - Length + CRLF + body +CRLF 为分段数据，其中 length 为 十六进制，指明了该段数据的大小
   - 0CRLFCRLF 为最后一段，表明响应体已接收完毕

   ```javascript
   ncat httpbin.org 80
   GET /stream/3 HTTP/1.1
   Host: httpbin.org

   HTTP/1.1 200 OK
   Date: Tue, 11 Jun 2024 01:59:00 GMT
   Content-Type: application/json
   Transfer-Encoding: chunked
   Connection: keep-alive
   Server: gunicorn/19.9.0
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Credentials: true

   bb
   {"url": "http://httpbin.org/stream/3", "args": {}, "headers": {"Host": "httpbin.org", "X-Amzn-Trace-Id": "Root=1-6667af6
   4-72198a8c7bcaebab34b81312"}, "origin": "219.133.68.187", "id": 0}

   bb
   {"url": "http://httpbin.org/stream/3", "args": {}, "headers": {"Host": "httpbin.org", "X-Amzn-Trace-Id": "Root=1-6667af6
   4-72198a8c7bcaebab34b81312"}, "origin": "219.133.68.187", "id": 1}

   bb
   {"url": "http://httpbin.org/stream/3", "args": {}, "headers": {"Host": "httpbin.org", "X-Amzn-Trace-Id": "Root=1-6667af6
   4-72198a8c7bcaebab34b81312"}, "origin": "219.133.68.187", "id": 2}

   0
   ```

## 分段传输示例

1. 服务器代码流式传输 HTML，并在浏览器查看渲染效果

```javascript
import { createServer } from "http";

const sleep = (seconds) =>
  new Promise((resolve) => setTimeout(resolve, seconds));

// Transfer-Encoding: chunked 是在何时进行配置的
const server = createServer(async (req, res) => {
  res.write(`
        <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>测试页面</title>
    </head>
    <body>`);

  await sleep(3000);
  res.write("<h1>hello, jd</h1>");
  await sleep(3000);
  res.write("<div>这里是大段文字，将会延迟三秒才会正常渲染</div>");
  await sleep(3000);
  res.write("<div>这里又是大段文字，将会延迟三秒才会正常渲染</div>");
  res.end(`
    </body>
    </html>
  `);
});

server.listen(3000);
```

2. 并通过 nc 查看流水传输效果(不行)

```javascript
ncat localhost 3000
GET / HTTP/1.1

HTTP/1.1 400 Bad Request
Connection: close
Date: Tue, 11 Jun 2024 08:35:22 GMT
Transfer-Encoding: chunked

//用curl可以
curl -i localhost:3000
HTTP/1.1 200 OK
transfer-encoding: chunked
Date: Wed, 12 Jun 2024 01:33:52 GMT
Connection: keep-alive
Keep-Alive: timeout=5


        <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>测试页面</title>
    </head>
    <body><h1>hello, jd</h1><div>这里是大段文字，将会延迟三秒才会正常渲染</div><div>这里又是大段文字，将会延迟三秒才会正
常渲染</div>
    </body>
    </html>

//用bash
printf 'GET / HTTP/1.1\r\nHost: localhost\r\n\r\n' | ncat localhost 3000
HTTP/1.1 200 OK
Date: Wed, 12 Jun 2024 01:48:11 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

90

        <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>测试页面</title>
    </head>
    <body>
```

## 大文件上传

1. 如何实现大文件上传

   - 分片上传 通过 blob.slice 切片上传

   ```javascript
   <body>
   <input type="file" accept="image/*" onchange="uploadFile(event)">

   <script>

     async function uploadFile(e) {

       const file = e.target.files[0];
       const chunks = createChunks(file, 1024);
       await uploadChunks(chunks)
     }

     function createChunks(blob, chunkSize) {
       const chunks = [];
       let id = 0;
       let start = (id * chunkSize);
       while (start < blob.size) {
         chunks.push({
           blob: blob.slice(start, start + chunkSize),
           id: id
         });
         id++
         start = (id * chunkSize)
       }
       return chunks;
     }

     async function uploadChunks(chunks) {
       for (const chunk of chunks) {
         const form = new FormData()
         form.append('blob', chunk.blob)
         form.append('id', chunk.id)

         // 分片上传大文件
         await fetch('http://localhost:3000/upload-bigfile', {
           body: form,
           method: 'post'
         })
       }
       // 全部分片上传完成之后，可以通知服务器端合并所有分片
       await fetch('http://localhost:3000/upload-bigfile/merge')
     }
   </script>

   </body>
   ```
