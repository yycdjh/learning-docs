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
