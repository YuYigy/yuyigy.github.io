import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-title font-bold text-gradient mb-4">404</h1>
        <h2 className="text-2xl font-title font-bold text-soft-white mb-4">
          页面未找到
        </h2>
        <p className="text-soft-white/70 mb-8 max-w-md">
          抱歉，您访问的页面不存在。可能已被移动、删除或从未存在过。
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-cyber-cyan text-space-blue rounded-lg hover:bg-cyber-cyan/90 transition-colors duration-300 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          返回首页
        </Link>
      </div>
    </div>
  )
}
