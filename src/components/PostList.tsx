'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { PostMeta } from '@/lib/mdx'
import { formatDate } from '@/lib/utils'
import Tag from './ui/Tag'
import ViewCounter from './ViewCounter'

interface PostListProps {
  posts: PostMeta[]
  selectedCategory: string | null
}

export default function PostList({ posts, selectedCategory }: PostListProps) {
  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory)
    : posts

  if (filteredPosts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-dark-slate border border-slate-gray/20 flex items-center justify-center">
          <span className="text-3xl">📝</span>
        </div>
        <h3 className="text-xl font-title font-semibold text-soft-white mb-2">
          {selectedCategory ? `暂无"${selectedCategory}"分类的文章` : '暂无文章'}
        </h3>
        <p className="text-soft-white/60">
          {selectedCategory ? '请选择其他分类或查看全部文章' : '正在准备精彩内容，敬请期待！'}
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-title font-bold text-soft-white">
          {selectedCategory ? `${selectedCategory} (${filteredPosts.length})` : `全部文章 (${filteredPosts.length})`}
        </h2>
        
        <div className="text-sm text-soft-white/60">
          按发布时间排序
        </div>
      </div>

      <div className="space-y-6">
        {filteredPosts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <Link href={`/posts/${post.slug}`}>
              <div className="bg-dark-slate border border-slate-gray/20 rounded-xl p-6 transition-all duration-300 hover:border-cyber-cyan/50 hover:shadow-lg hover:shadow-cyber-cyan/10 hover:-translate-y-1">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    {/* 分类标签 */}
                    <div className="mb-3">
                      <Tag variant="primary" size="sm">
                        {post.category}
                      </Tag>
                    </div>

                    {/* 标题 */}
                    <h3 className="text-xl font-title font-bold text-soft-white mb-3 group-hover:text-cyber-cyan transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* 描述 */}
                    <p className="text-soft-white/70 mb-4 line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>

                    {/* 标签 */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Tag key={tag} size="sm">
                            {tag}
                          </Tag>
                        ))}
                        {post.tags.length > 3 && (
                          <div className="relative group">
                            <Tag size="sm">+{post.tags.length - 3}</Tag>
                            <div className="absolute left-0 top-full mt-2 z-20 hidden group-hover:block bg-space-blue/95 border border-slate-gray/30 rounded-lg p-3 shadow-lg">
                              <div className="flex flex-wrap gap-2 max-w-xs">
                                {post.tags.slice(3).map((tag) => (
                                  <Tag key={tag} size="sm">{tag}</Tag>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 元信息 */}
                    <div className="flex items-center space-x-4 text-sm text-soft-white/60">
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

                  {/* 阅读更多按钮 */}
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <div className="flex items-center text-cyber-cyan text-sm font-medium group-hover:text-soft-white transition-colors duration-300">
                      <span>阅读更多</span>
                      <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
