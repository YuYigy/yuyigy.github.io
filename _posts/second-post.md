---
title: "Next.js App Router 深度解析"
description: "深入探讨 Next.js 13+ 的 App Router 特性，包括路由系统、布局、加载状态等核心概念。"
date: "2025-08-06"
category: "前端开发"
tags: ["Next.js", "React", "App Router", "前端架构"]
featured: true
---

# Next.js App Router 深度解析

Next.js 13 引入的 App Router 是一个革命性的更新，它基于 React Server Components 构建，为我们提供了更强大、更灵活的路由系统。

## App Router vs Pages Router

### 传统的 Pages Router

在传统的 Pages Router 中，我们的文件结构是这样的：

```
pages/
  index.js          # /
  about.js          # /about
  posts/
    [slug].js       # /posts/[slug]
```

### 新的 App Router

而在 App Router 中，文件结构变成了：

```
app/
  page.js           # /
  about/
    page.js         # /about
  posts/
    [slug]/
      page.js       # /posts/[slug]
```

## 核心概念

### 1. 文件约定

App Router 使用特殊的文件名来定义不同的功能：

- `page.js` - 定义页面组件
- `layout.js` - 定义布局组件
- `loading.js` - 定义加载状态
- `error.js` - 定义错误处理
- `not-found.js` - 定义 404 页面

### 2. 布局系统

布局是 App Router 的一个强大特性：

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <header>导航栏</header>
        <main>{children}</main>
        <footer>页脚</footer>
      </body>
    </html>
  )
}
```

### 3. 服务器组件

默认情况下，App Router 中的组件都是服务器组件：

```typescript
// 这是一个服务器组件
export default async function PostsPage() {
  const posts = await getPosts() // 可以直接在组件中获取数据
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
```

## 数据获取

### 静态生成

```typescript
// 生成静态参数
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// 页面组件
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  return <article>{/* 渲染文章 */}</article>
}
```

### 元数据生成

```typescript
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  
  return {
    title: post.title,
    description: post.description,
  }
}
```

## 优势总结

1. **更好的性能** - 服务器组件减少了客户端 JavaScript
2. **更灵活的布局** - 嵌套布局和共享状态
3. **更好的开发体验** - 类型安全和更清晰的文件结构
4. **更强的 SEO** - 服务器端渲染和静态生成

## 迁移建议

如果你正在考虑从 Pages Router 迁移到 App Router，建议：

1. 先在新项目中尝试 App Router
2. 逐步迁移现有项目的页面
3. 充分利用服务器组件的优势
4. 注意客户端组件的使用场景

App Router 代表了 Next.js 的未来方向，值得每个 React 开发者深入学习和掌握。

---

*下一篇文章我们将探讨如何在 App Router 中优化性能和用户体验。*
