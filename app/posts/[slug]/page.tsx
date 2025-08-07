import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/lib/mdx-components'
import type { Metadata } from 'next'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: '文章未找到',
    }
  }

  return {
    title: `${post.title} | Project Stardust`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      {/* 半透明背景面板容器 */}
      <div className="bg-dark-slate/60 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-slate-gray/20 shadow-2xl shadow-space-blue/20">
        {/*
          CSS类详细解释:
          - bg-dark-slate/60: 设置深石板色背景，60%不透明度，让更多动态背景透过，增强视觉层次
          - backdrop-blur-md: 中等强度的毛玻璃效果，模糊背景粒子，提升质感和可读性
          - rounded-2xl: 大圆角设计，现代化的卡片风格，与整体设计语言一致
          - p-8 md:p-12: 响应式内边距，移动端32px，桌面端48px，确保内容有足够呼吸空间
          - border border-slate-gray/20: 纤细的半透明边框，与页脚风格保持一致
          - shadow-2xl shadow-space-blue/20: 大阴影配合品牌色调，增强浮动卡片效果
        */}
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-cyber-cyan hover:text-soft-white transition-colors duration-300 group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回首页
        </Link>
      </div>

      {/* Post Header */}
      <header className="mb-12">
        {/* Category */}
        {post.category && (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyber-cyan/20 text-cyber-cyan">
              {post.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-title font-bold text-gradient mb-6 leading-[1.4] py-1">
          {post.title}
        </h1>

        {/* Description */}
        {post.description && (
          <p className="text-xl text-soft-white/80 mb-8 leading-relaxed">
            {post.description}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-soft-white/60 mb-8 pb-8 border-b border-slate-gray/20">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>yuyigy</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(post.date)}</span>
          </div>
          {post.readingTime && (
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{post.readingTime} 分钟前阅读</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-gray/20 text-slate-gray"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Post Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [],
              rehypePlugins: [],
            },
          }}
        />
      </div>

      {/* Post Footer */}
      <footer className="mt-16 pt-8 border-t border-slate-gray/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="text-soft-white/60 text-sm mb-2">
              感谢阅读！希望这篇文章能帮到你。
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-soft-white/40 text-xs">
              最后更新：{formatDate(post.date)}
            </p>
          </div>
        </div>
      </footer>
      </div> {/* 半透明背景面板容器结束 */}
    </article>
  )
}
