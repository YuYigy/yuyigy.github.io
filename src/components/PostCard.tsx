import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { PostMeta } from '@/lib/mdx'
import { formatDate } from '@/lib/utils'
import Card from './ui/Card'
import Tag from './ui/Tag'
import MoreTagsPopover from './MoreTagsPopover'
import ViewCounter from './ViewCounter'

interface PostCardProps {
  post: PostMeta
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Card className={featured ? 'h-full' : ''}>
      <Link href={`/posts/${post.slug}`} className="group block">
        {/* 特色图片 */}
        {post.image && (
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-blue/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* 分类标签 */}
        <div className="mb-3">
          <Tag variant="primary" size="sm">
            {post.category}
          </Tag>
        </div>

        {/* 标题 */}
        <h3 className={`font-title font-bold text-soft-white mb-3 group-hover:text-cyber-cyan transition-colors duration-300 ${
          featured ? 'text-xl' : 'text-lg'
        }`}>
          {post.title}
        </h3>

        {/* 描述 */}
        <p className="text-soft-white/70 mb-4 line-clamp-3 leading-relaxed">
          {post.description}
        </p>

        {/* 元信息 */}
        <div className="flex items-center justify-between text-sm text-soft-white/60 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <ViewCounter slug={post.slug} />
            </div>
          </div>
        </div>

        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-4">
            <MoreTagsPopover tags={post.tags} size="sm" />
          </div>
        )}

        {/* 阅读更多 */}
        <div className="flex items-center text-cyber-cyan text-sm font-medium group-hover:text-soft-white transition-colors duration-300">
          <span>阅读更多</span>
          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </Link>
    </Card>
  )
}
