import Image from 'next/image'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Post } from '@/lib/mdx'
import { formatDate } from '@/lib/utils'
import Tag from './ui/Tag'
import ViewCounter from './ViewCounter'

interface PostHeaderProps {
  post: Post
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="relative">
      {/* 返回按钮 */}
      <div className="mb-8">
        <Link
          href="/categories"
          className="inline-flex items-center text-cyber-cyan hover:text-soft-white transition-colors duration-300 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          返回文章列表
        </Link>
      </div>

      {/* 特色图片 */}
      {post.image && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-blue/60 via-transparent to-transparent" />
        </div>
      )}

      {/* 分类标签 */}
      <div className="mb-4">
        <Tag variant="primary" size="md">
          {post.category}
        </Tag>
      </div>

      {/* 标题 */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-title font-bold text-gradient mb-6 leading-tight">
        {post.title}
      </h1>

      {/* 描述 */}
      <p className="text-xl text-soft-white/80 mb-8 leading-relaxed">
        {post.description}
      </p>

      {/* 元信息 */}
      <div className="flex flex-wrap items-center gap-6 text-soft-white/60 mb-8 pb-8 border-b border-slate-gray/20">
        <div className="flex items-center space-x-2">
          <User size={18} />
          <span>yuyigy</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar size={18} />
          <span>{formatDate(post.date)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={18} />
          {/* 阅读次数统计 */}
          <ViewCounter slug={post.slug} />
        </div>
      </div>

      {/* 标签 */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <Tag key={tag} size="md">
              {tag}
            </Tag>
          ))}
        </div>
      )}
    </header>
  )
}
