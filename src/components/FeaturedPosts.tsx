'use client'

import { motion } from 'framer-motion'
import { PostMeta } from '@/lib/mdx'
import PostCard from './PostCard'

interface FeaturedPostsProps {
  posts: PostMeta[]
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <section id="featured-posts" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-title font-bold text-gradient mb-4">
            精选文章
          </h2>
          <p className="text-xl text-soft-white/70 max-w-2xl mx-auto">
            探索最新的技术洞见和深度思考，每一篇都是精心挑选的内容
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-dark-slate border border-slate-gray/20 flex items-center justify-center">
              <span className="text-3xl">📝</span>
            </div>
            <h3 className="text-xl font-title font-semibold text-soft-white mb-2">
              即将发布精彩内容
            </h3>
            <p className="text-soft-white/60">
              正在准备高质量的技术文章，敬请期待！
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="fade-up"
              >
                <PostCard post={post} featured />
              </motion.div>
            ))}
          </div>
        )}

        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="/categories"
              className="inline-flex items-center px-8 py-3 border border-cyber-cyan text-cyber-cyan rounded-lg hover:bg-cyber-cyan hover:text-space-blue transition-all duration-300 hover:shadow-lg hover:shadow-cyber-cyan/25"
            >
              查看所有文章
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
