import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JD-Path of Learning",
  description: "A VitePress Site",
  base: "/learning-docs/",
  head: [
    // 添加图标
    ["link", { rel: "icon", href: "/logo.svg" }],
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
      text: "手写代码",
      items: [{ text: "如何判断某一个值数组", link: "/handwriting/isArray" }],
      sidebarDepth: 3,
    },
  ];
}
