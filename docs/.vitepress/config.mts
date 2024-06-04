import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JD-Path of Learning",
  description: "A VitePress Site",
  base: "/learning-docs/",
  head: [
    // 添加图标
    ["link", { rel: "icon", type: "image/x-icon", href: "/logo.svg" }],
  ],
  themeConfig: {
    logo: "/logo.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "前端", link: "/engineering/knowPackage" },
    ],

    sidebar: {
      "/": getSidebar(),
    },

    socialLinks: [{ icon: "github", link: "https://github.com/yycdjh" }],
    // 自定义配置上次更新的文本和日期格式
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },
    // 开启本地搜索
    search: {
      provider: "local",
    },
  },
});
function getSidebar() {
  return [
    {
      text: "工程化训练营",
      items: [
        { text: "认识包package", link: "/engineering/knowPackage" },
        { text: "包管理器", link: "/engineering/managerPackage" },
      ],
      sidebarDepth: 3,
    },
    {
      text: "http训练营",
      items: [
        { text: "资源", link: "/http/resource" },
        { text: "报文", link: "/http/message" },
        { text: "头部", link: "/http/header" },
        { text: "缓存", link: "/http/cache" },
        { text: "跨域", link: "/http/cross" },
        { text: "cookie", link: "/http/cookie" },
        { text: "状态码", link: "/http/statusCode" },
        { text: "Body", link: "/http/body" },
      ],
      sidebarDepth: 3,
    },
    {
      text: "算法",
      items: [{ text: "数组", link: "" }],
      sidebarDepth: 3,
    },
    {
      text: "VitePress",
      items: [{ text: "部署", link: "/vitepress/deploy" }],
      sidebarDepth: 3,
    },
    {
      text: "javascript设计模式",
      items: [
        { text: "工厂模式", link: "/designPatterns/factory" },
        { text: "单例模式", link: "/designPatterns/single" },
        { text: "原型模式", link: "/designPatterns/prototype" },
        { text: "装饰器模式", link: "/designPatterns/decorator" },
        { text: "适配器模式", link: "/designPatterns/adapter" },
        { text: "代理模式", link: "/designPatterns/proxy" },
        { text: "策略模式", link: "/designPatterns/strategy" },
        { text: "状态模式", link: "/designPatterns/state" },
        { text: "观察者模式", link: "/designPatterns/observer" },
        { text: "迭代器模式", link: "/designPatterns/iterator" },
      ],
      sidebarDepth: 3,
    },
    {
      text: "手写代码",
      items: [
        { text: "如何判断某一个值数组", link: "/handwriting/isArray" },
        { text: "深拷贝", link: "/handwriting/isDeepClone" },
        { text: "防抖", link: "/handwriting/isDebounce" },
        { text: "节流", link: "/handwriting/isThrottle" },
        { text: "发布-订阅", link: "/handwriting/eventEmitter" },
      ],

      sidebarDepth: 3,
    },
    {
      text: "Vitest",
      items: [{ text: "test", link: "/vitest/test" }],
      sidebarDepth: 3,
    },
  ];
}
