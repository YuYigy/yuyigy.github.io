import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
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
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-title font-bold text-gradient mb-6 leading-tight">
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
              <span>{post.readingTime} 分钟阅读</span>
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
      <div 
        className="prose prose-invert prose-lg max-w-none
          prose-headings:font-title prose-headings:text-soft-white
          prose-h1:text-3xl prose-h1:text-gradient prose-h1:mb-6
          prose-h2:text-2xl prose-h2:text-soft-white prose-h2:border-b prose-h2:border-slate-gray/30 prose-h2:pb-2
          prose-h3:text-xl prose-h3:text-soft-white
          prose-p:text-soft-white/90 prose-p:leading-relaxed
          prose-a:text-cyber-cyan prose-a:no-underline hover:prose-a:text-soft-white prose-a:transition-colors
          prose-strong:text-soft-white prose-strong:font-semibold
          prose-code:text-cyber-cyan prose-code:bg-dark-slate prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          prose-pre:bg-dark-slate prose-pre:border prose-pre:border-slate-gray/20
          prose-blockquote:border-l-cyber-cyan prose-blockquote:bg-dark-slate/50 prose-blockquote:text-soft-white/80
          prose-ul:text-soft-white/90 prose-ol:text-soft-white/90
          prose-li:text-soft-white/90
          prose-img:rounded-lg prose-img:shadow-lg"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* Post Footer */}
      <footer className="mt-16 pt-8 border-t border-slate-gray/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="text-soft-white/60 text-sm mb-2">
              感谢阅读！如果这篇文章对你有帮助，欢迎分享给更多人。
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-soft-white/40 text-xs">
              最后更新：{formatDate(post.date)}
            </p>
          </div>
        </div>
      </footer>
    </article>
  )
}
