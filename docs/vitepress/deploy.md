## 部署 github-pages

1. 在 github 上创建新的仓库(项目名称跟 vitepress 配置的 base 有关)
   ![init_project](/public/init_project.png)

2. 创建代码空间(没有创建代码空间访问 404)
   ![create_codespaces](/public/create_codespaces.png)

3. 初始化项目

```javascript
#安装vitepress
npm install -D vitepress

#构建项目
npx vitepress init

#运行项目
npm run dosc:dev
```

4. 在.vitepress 的 config 文件 defineConfig 里面添加 base(创建的 gitub 仓库名)

```javascript
export default defineConfig({
  title: "",
  description: "",
  base: "/learning-docs/",
  head: [
    // 添加图标
    ["link", { rel: "icon", href: "/logo.svg" }],
  ],
});
```

5. 在项目添加.github/workflows 文件夹，workflows 文件夹添加 deploy.yml 文件

```javascript
# Sample workflow for building and deploying a VitePress site to GitHub Pages
#
name: Deploy VitePress site to Pages

on:
  # Runs on pushes targeting the `main` branch. Change this to `master` if you're
  # using the `master` branch as the default branch.
  push:
    branches: [main]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0 # Not needed if lastUpdated is not enabled
      # - uses: pnpm/action-setup@v2 # Uncomment this if you're using pnpm
      # - uses: oven-sh/setup-bun@v1 # Uncomment this if you're using Bun
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm # or pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Install dependencies
        run: npm ci # or pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: |
          npm run docs:build # or pnpm docs:build / yarn docs:build / bun run docs:build
          touch docs/.vitepress/dist/.nojekyll
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: docs/.vitepress/dist

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

6. 提交代码到 github(步骤一的仓库地址)

7. 设置 github 仓库的 setting 的 pages
   ![setting_pages](/public/setting_pages.png)
