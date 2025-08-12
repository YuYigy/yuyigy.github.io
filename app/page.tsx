import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import dynamic from 'next/dynamic'

const ViewCounter = dynamic(() => import('@/components/ViewCounter'), { ssr: false })

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-title font-bold text-gradient mb-6">
          什么鬼？
        </h1>
        <p className="text-xl text-soft-white/80 max-w-2xl mx-auto leading-relaxed">
          你怎么发现这里的？
          逗我呢？
        </p>
      </div>

      {/* Posts List */}
      <div className="space-y-8">
        <h2 className="text-2xl font-title font-bold text-soft-white mb-8">
          最新文章
        </h2>
        
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-dark-slate border border-slate-gray/20 flex items-center justify-center">
              <span className="text-3xl">📝</span>
            </div>
            <h3 className="text-xl font-title font-semibold text-soft-white mb-2">
              即将发布
            </h3>
            <p className="text-soft-white/60">
              正在制作中...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-dark-slate border border-slate-gray/20 rounded-xl p-6 hover:border-cyber-cyan/50 hover:shadow-lg hover:shadow-cyber-cyan/10 transition-all duration-300 group"
              >
                <Link href={`/posts/${post.slug}`} className="block">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      {/* Category */}
                      {post.category && (
                        <div className="mb-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyber-cyan/20 text-cyber-cyan">
                            {post.category}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-title font-bold text-soft-white mb-3 group-hover:text-cyber-cyan transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* Description */}
                      {post.description && (
                        <p className="text-soft-white/70 mb-4 leading-relaxed">
                          {post.description}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center space-x-4 text-sm text-soft-white/60">
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <ViewCounter slug={post.slug} />
                        </div>
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-1 rounded text-xs bg-slate-gray/20 text-slate-gray"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="relative group inline-flex items-center px-2 py-1 rounded text-xs bg-slate-gray/20 text-slate-gray">
                              +{post.tags.length - 3}
                              <span className="absolute left-0 top-full mt-2 z-20 hidden group-hover:block bg-space-blue/95 border border-slate-gray/30 rounded-lg p-3 shadow-lg w-fit max-w-[80vw]">
                                <span className="flex flex-wrap gap-2 max-w-xs">
                                  {post.tags.slice(3).map((tag) => (
                                    <span key={tag} className="inline-flex items-center px-2 py-1 rounded text-xs bg-slate-gray/20 text-slate-gray">{tag}</span>
                                  ))}
                                </span>
                              </span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Read More Arrow */}
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <div className="flex items-center text-cyber-cyan text-sm font-medium group-hover:text-soft-white transition-colors duration-300">
                        <span>阅读更多</span>
                        <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
