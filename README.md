# Project Stardust - 个人知识与洞见博客

> 探索代码与思想的边界

一个采用科技极简主义设计风格的个人博客网站，使用现代 Web 技术栈构建，专注于技术分享、思考笔记和学习资源。

## ✨ 特性

- 🌌 **科技极简主义设计** - 深邃星空蓝配色，营造专业科技感
- 📱 **完全响应式** - 适配所有设备，移动端优化
- ⚡ **高性能** - 静态生成，快速加载
- 🎨 **精美动效** - 流畅的页面过渡和交互动画
- 📝 **MDX 支持** - 强大的 Markdown 扩展，支持 React 组件
- 🔍 **智能搜索** - 文章和资源的快速搜索
- 🏷️ **标签系统** - 灵活的分类和标签管理
- 🖼️ **图片灯箱** - 优雅的图片查看体验
- 📖 **文章目录** - 自动生成的文章导航
- 🎯 **SEO 优化** - 完整的元数据和 Open Graph 支持

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **内容**: MDX + Gray Matter
- **代码高亮**: Shiki
- **图标**: Lucide React
- **部署**: GitHub Pages
- **语言**: TypeScript

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
npm run export
```

生成的静态文件将在 `out` 目录中。

## 📝 内容管理

### 添加新文章

1. 在 `content/posts/` 目录下创建新的 `.md` 或 `.mdx` 文件
2. 添加 Front Matter 元数据：

```markdown
---
title: "文章标题"
description: "文章描述"
date: "2024-01-15"
category: "技术分享"
tags: ["React", "Next.js", "TypeScript"]
featured: true
image: "/images/article-cover.jpg"
---

# 文章内容

这里是文章的正文内容...
```

### 管理资源

编辑 `content/resources/resources.json` 文件：

```json
[
  {
    "title": "资源标题",
    "description": "资源描述",
    "url": "https://example.com",
    "tags": ["标签1", "标签2"],
    "type": "link"
  }
]
```

### 图片管理

将图片放在 `public/images/` 目录下，在文章中使用相对路径引用：

```markdown
![图片描述](/images/your-image.jpg)
```

## 🎨 自定义配置

### 修改主题色彩

编辑 `tailwind.config.js` 中的颜色配置：

```javascript
colors: {
  'space-blue': '#0A192F',      // 背景色
  'soft-white': '#E6F1FF',      // 主文本
  'cyber-cyan': '#64FFDA',      // 主要高亮色
  'slate-gray': '#8892B0',      // 次要高亮色
}
```

### 修改字体

在 `src/styles/globals.css` 中更新字体导入：

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

### 个人信息配置

编辑以下文件中的个人信息：
- `src/components/Footer.tsx` - 页脚联系方式
- `src/components/ContactInfo.tsx` - 关于页面联系信息
- `pages/about.tsx` - 个人介绍内容

## 📦 部署

### GitHub Pages 自动部署

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 `gh-pages` 分支作为源
4. GitHub Actions 将自动构建和部署

### 手动部署

```bash
npm run build
npm run export
# 将 out 目录的内容上传到你的服务器
```

## 📁 项目结构

```
├── .github/workflows/    # GitHub Actions 配置
├── content/             # 内容文件
│   ├── posts/          # 博客文章
│   └── resources/      # 资源数据
├── pages/              # Next.js 页面
├── public/             # 静态资源
├── src/
│   ├── components/     # React 组件
│   ├── lib/           # 工具函数
│   └── styles/        # 样式文件
├── next.config.js     # Next.js 配置
├── tailwind.config.js # Tailwind 配置
└── package.json       # 项目依赖
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有开源项目的贡献者，让这个项目成为可能。

---

**Project Stardust** - 用代码点亮思想的星空 ✨
