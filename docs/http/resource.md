# 资源

## 1、资源与 URI

- 什么是 URI

  - Uniform Resource Identifiers,统一资源标识符。适用于多种协议
  - 由协议（protocol）、主机(host)、端口(port)、路径(path)、查询字符串(query)、片段(fragment、hash)组成

- 了解 URL API 与 URLSearchParams API
  - 通过 URL API 可以解析 URL 的各个部分
  - 通过 URLSearchParams 用以处理 URL 的查询字符串

## 2、MIME

> 浏览器通常使用 MIME 类型而不是文件拓展名来决定如何处理 URL，因此 Web 服务器在 Content-Type 响应头中添加正确的 MIME 类型非常重要.如果配置不正确，浏览器可能会曲解文件内容，网站将无法正常工作，并且下载的文件也可能被错误处理

- 有哪些图片常见的 MIME Type

  1. .jpg .jpeg, image/jpeg
  2. .png， image/png
  3. .git, image/gif
  4. .ico, image/vnd.microsoft.icon
  5. .svg, image/svg+xml

- 有哪些前端常见的 MIME Type

  1. HTML 文档： text/html
  2. CSS 样式：text/css
  3. javacript 文件： application/javascript text/javascript
  4. Json application/json
  5. 图片
  6. 视频
  7. 音频
  8. 字体

  > > MIME 类型并不总是唯一，对于某些文件类型可能存在多个可接受的 MIME 类型，例如 JavaScript 文件可以使用 application/javascript 或 text/javascript。

## 3、Data URL 与 base64

- 什么是 Data URL
  1. 即前缀为 data：协议的 URL，其允许内容创建者向文档中嵌入小文件。 它们之前被称为"data URI",直到这个名字被废弃
  2. Data URL 由四部分组成 `（例： data: [<mediatype>][;base64], <data>）` []可选 <>必选
     - 前缀（data:）
     - 指示数据类型的 MIME 类型 (默认值为： text/plain;charset=US-ASCII)
     - 如果二进制数据则为可选的 base64 标记,比如图片
     - 数据
- 什么是 base64
  1. 是一种二进制到文本的编码方案，由 0-9、A-Z、a-z 及 +、/组成
- 什么是 URL Safe Base64

  1.  在 URL 中使用 base64 时，/容易与路径符号发送冲突， URL Safe Base 将 + 替换为 \_ , / 替换为 -

- 为什么 base64 后数据比原来的大 1/3

  1.  通过 base64 编码，每 3*8bit 的字节转换为 4*6 的字节，剩下的两位用 00 补齐，因此就有了常听到的 base64 编码后的数据比原来的大 1/3.

## 4、二进制资源

> 资源分为二进制资源与文本资源,如果想使用文本表示二进制资源，可使用 base64

- 文本资源: 可以使用 unicode 表示, 比如 hello world, 一二三四 等。
- 二进制资源: 一般编码为 UTF-8 的二进制， 在前端中, 使用 UInt8Array 表示 UTF-8 的二进制

1. 为什么资源的后缀是不可信的

   - 因为某一资源的名称是可以自定义的，因此后缀也是自定义的，所以该资源的后缀名与实际类型可能并不匹配

2. 如何确认某二进制资源真正的文件类型

   - 过读取该资源的二进制，一般在资源首部有特定的二进制标志位，可表明该二进制资源的文件类型，该标准被称为 Magic Number。
     - 例如:
       - image/jpeg 以二进制 FF D8 FF DB 开头
       - image/png 以二进制 89 50 4E 47 0D 0A 开头
