# 安全

## XSS 与 CSP

1. 什么是 XSS 攻击
   - 跨站脚本攻击（Cross-Site Scripting，XSS），它让攻击者能够将恶意脚本注入到其他用户的网页中。这些恶意脚本能够运行在用户的浏览器中，拥有与网页访问同样权限的权限。这样攻击者就可以窃取用户数据，包括用户的登录状态、敏感信息等，或者利用脚本进行其他恶意操作。
2. 如何允许该网站向某域名发送请求
   - Content-Security-Policy: connect-src "域名"
3. 如何允许该网站执行某域名的脚本
   - Content-Security-Policy: script-src "域名"

## CSRF

1. SameSite 有哪些属性
   - None：任何情况下都会向第三方网站请求发送 cookie
   - Lax：只有导航到第三方网站的 Get 链接会发送 Cookie。而跨域的图片 iframe、fetch 请求、form POST 表单都不会发送 Cookie
   - Strict：任何情况下都不会向第三方网站请求发送 Cookie
2. 什么是 CSRF 攻击,如何通过 SameSite 避免 CSRF 攻击
   - CSRF（Cross-site request forgery），跨站请求伪造
   - 设置 SameSite 的值为 Lax 或者 Strict,只在特定的情况发送 Cookie 或者不发送 Cookie 避免 CSRF 攻击

## 点击劫持（ClickJacking）

1. 什么是点击劫持攻击

   - 点击劫持，也被称为 UI Redress（用户界面欺骗攻击）。在点击劫持时，攻击者会将攻击网站以 iframe 的形式嵌入到钓鱼网站中，当用户在看似无害的钓鱼网站上点击某些按钮或链接时，实际上会触发隐藏在被攻击网站中的操作，比如转账、购买、等等。这样的操作通常是用户不知情，并可能导致用户损失财产或个人隐私。

2. 如何避免点击劫持
   - X-Frame-Options:DENY
     - 通过 X-Frame-Options 响应头，可禁止网站以 `<frane>、<iframe>、<object>、<embed>`的方式被嵌入到其他网站中
       - DENY: 始终禁止
       - SAMEORIGIN: 仅同源地址允许嵌入
       - ALLOW-FROM `<domian>`: 可自定义嵌入的域名
   - Content-Security-Policy: frame-ancestors none
