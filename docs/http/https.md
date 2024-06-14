# https

## HSTS

1. 什么是 HSTS
   - http 严格传输安全、如果开启了 HSTS,当你访问 HTTP 站点时，浏览器会自动给你打开 HTTPS 站点
2. 访问http://github.com 跟http://bilibili.com的区别
   - github 返回的 307 Internal Redirect
   - b 站返回的是 301 Moved Permanently
3. 在浏览器控制台查看 307 Internal Redirect
   ![alt text](307.png)

## HTTPS 现状

1. HTTPS 默认端口号
   - 443
2. 如何查看某网站 HTTPS 所使用的 TLS 版本号与密码套件
   - 浏览器控制台 security（安全）
     ![alt text](security.png)

## TLS 简述

1. 简述 TLS 原理
   - 客户端与服务端双方协商支持的 TSL 版本号、支持的密码套件，并且相互传递随机数 Client Random 以及 Server Random
   - 基于非对称加密算法的密钥交换，客户端计算出 对称加密算法的预主密钥（pre-master secret），并由密钥交换算法将其传给服务端
   - 基于对称加密算法的数据加密， 客户端与服务端双方使用 预主秘钥、传递的随机数计算生成会话密钥（master secret），并使用该密钥加密数据
2. 对称加密与非对称加密都有哪些算法
   - 对称加密
     - DES/3DES 已废弃，被 AES 替代
     - AES 高级加密标准 TSL 使用最多的对称加密算法
   - 非对称加密
     - RSA
     - ECDSA: 基于椭圆曲线的数字签名算法
     - ECDHE: 基于椭圆曲线密码学的临时 Diffie-Hellman 密钥交换协议（TSL 握手过程中使用最多的秘钥交换算法）
3. 再 HTTPS 中为什么不一直都是用非对称加密进行传输数据加密
   - 因为非对称加密算法耗时较长、性能较差
   - 在 TSL 中，使用非对称加密仅仅传递对称加密的预主密钥，随后使用性能较好的对称加密进行通信
