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
        { text: "体积优化", link: "/engineering/volumeOptimization" },
        { text: "模块化", link: "/engineering/module" },
        { text: "调试", link: "/engineering/test" },
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
        { text: "安全", link: "/http/security" },
        { text: "HTTPS", link: "/http/https" },
        { text: "HTTP/2", link: "/http/http2" },
      ],
      sidebarDepth: 3,
    },
    {
      text: "算法",
      items: [
        {
          text: "数组",
          items: [
            { text: "二分法", link: "/algorithm/dichotomy" },
            { text: "快慢指针", link: "/algorithm/27" },
            { text: "双指针", link: "/algorithm/977" },
            { text: "滑动窗口", link: "/algorithm/977" },
          ],
        },
        {
          text: "链表",
          items: [
            { text: "移出链表元素", link: "/algorithm/203" },
            { text: "设计链表", link: "/algorithm/707" },
            { text: "翻转链表", link: "/algorithm/206" },
            { text: "两两交换链表中的节点", link: "/algorithm/24" },
            { text: "删除链表的倒数第N个节点", link: "/algorithm/19" },
            { text: "环形链表", link: "/algorithm/142" },
          ],
        },
        {
          text: "哈希表",
          items: [
            { text: "有效的字母异位词", link: "/algorithm/242" },
            { text: "两个数组的交集", link: "/algorithm/349" },
            { text: "两数之和", link: "/algorithm/1" },
            { text: "四数相加", link: "/algorithm/454" },
            { text: "三数之和", link: "/algorithm/15" },
            { text: "四数之和", link: "/algorithm/18" },
          ],
        },
        {
          text: "字符串",
          items: [
            { text: "反转字符串", link: "/algorithm/344" },
            { text: "反转字符串II", link: "/algorithm/541" },
            { text: "翻转字符串里的单词", link: "/algorithm/151" },
            { text: "重复的子字符串", link: "/algorithm/459" },
          ],
        },
        {
          text: "栈与队列",
          items: [
            { text: "用栈实现队列", link: "/algorithm/232" },
            { text: "用队列实现栈", link: "/algorithm/225" },
            { text: "有效的括号", link: "/algorithm/20" },
            { text: "删除字符串中的所有相邻重复项", link: "/algorithm/1047" },
          ],
        },
      ],
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
        { text: "js实现继承", link: "/handwriting/isInherit" },
        { text: "斐波那契数列", link: "/handwriting/fibonacci" },
        { text: "出现最多的单词", link: "/handwriting/words" },
        { text: "call", link: "/handwriting/call" },
        { text: "apply", link: "/handwriting/apply" },
        { text: "bind", link: "/handwriting/bind" },
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
