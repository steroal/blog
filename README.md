# Blog

个人博客。Astro + Starlight，全静态，托管在 Cloudflare Pages。

- 线上地址：https://steroal.pages.dev
- 仓库：https://github.com/steroal/blog
- Cloudflare 项目名：`steroal`（账号 yidian_cha@163.com）

## 写一篇新文章

在 `src/content/docs/` 下对应分类里新建 `.md` 文件即可，侧边栏和首页列表会自动出现，不需要登记。

```
src/content/docs/
├─ index.mdx            首页（一般不用动）
├─ about.md             关于
├─ tinker/              折腾
│  ├─ index.md          分类首页
│  └─ why-static-blog.md
└─ essay/               随笔
   └─ index.md
```

文章开头的 frontmatter：

```markdown
---
title: 标题
description: 一句话摘要，会出现在列表和搜索结果里
sidebar:
  order: 2        # 数字小的排在前面，可省略
---

正文从这里开始。正文里不要再写一次一级标题，页面标题已经由 title 生成。
```

加一个新分类：建一个目录 + 在 `astro.config.mjs` 的 `sidebar` 里加一行 + 在 `src/components/CategoryGrid.astro` 的 `sections` 数组里加一项。

## 发布

改完文章后，运行项目根目录的 `发布.bat`（或在终端里跑 `npm run build` 再 `npx wrangler pages deploy dist --project-name=steroal --branch=main`）。

会先本地构建，再整包上传，约 30 秒。看到 `Deployment complete` 就生效了。

> 注意：**只 push 到 GitHub 不会更新线上**。这个 Pages 项目是「直接上传」模式，没有接 Git 自动构建。想改成 push 自动发布，需要在 Cloudflare 里新建一个 Git 集成的项目，再把域名指过去。

首次运行 `wrangler` 需要登录（浏览器里点一次 Allow），凭据保存在
`C:\Users\<你>\AppData\Roaming\xdg.config\.wrangler\config\default.toml`。

## 常用命令

| 命令 | 作用 |
|---|---|
| `npm run dev` | 本地预览，改文件自动刷新（http://localhost:4321） |
| `npm run build` | 构建到 `dist/` |
| `npx wrangler pages deploy dist --project-name=steroal --branch=main` | 部署 |
| `npx wrangler pages deployment list --project-name=steroal` | 看历史部署，可回滚 |

## 改样式

配色、字体、圆角、卡片样式全在 `src/styles/custom.css`，顶部 `:root` 里的变量改一个值全站生效。

- `--sl-color-accent` 强调色
- `--sl-color-bg` 页面底色
- `--sl-content-width` 正文宽度（现在是 50rem）

## 结构说明

- `src/pages/` 不存在——路由由 Starlight 从 `src/content/docs/` 的内容自动生成
- `src/content.config.ts` 里有个 `generateId`，作用是剥掉文件名的 `.md` 后缀，否则 Astro 5.18 一个页面都生成不出来（详见第一篇）
- `dist/` 和 `node_modules/` 不进 Git

## 备份

内容和代码都在 `git` 里，`git log` 可以回退任何一版。另外 Cloudflare 保留每次部署的产物，可以在控制台的 Deployments 里回滚。

## 同步源码到 GitHub

远端已经配好（`origin` → `https://github.com/steroal/blog`），本地已有多次提交，**但还没推上去**。推送前需要先做一步：

**GitHub 上的仓库现在叫 `zhetengji`，要改成 `blog`。** 打开
<https://github.com/steroal/zhetengji/settings> → 第一栏 **Repository name** 改成 `blog` → 点 **Rename**。
GitHub 会自动把旧地址重定向到新地址，所以本地 `origin` 已经是 `blog` 也没问题。

然后把代码推上去（首次推送会弹一次浏览器登录）：

```bash
cd M:/Wiki/projects/blog
git push -u origin main
```

弹出的凭据窗口里选「Sign in with your browser」，浏览器里点一次 Authorize 就行。之后 `git push` 不再需要授权。

推上去只是备份源码，**跟线上部署没有关系**（线上是 `发布.bat` 直接上传的）。

