import type { Metadata } from 'next'
import { Inter, Exo_2 } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/Header'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const exo2 = Exo_2({ 
  subsets: ['latin'],
  variable: '--font-exo2',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Project Stardust - 探索代码与思想的边界',
  description: '个人知识与洞见博客，分享技术文章、思考笔记和学习资源。',
  keywords: ['技术博客', '前端开发', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'yuyigy' }],
  creator: 'yuyigy',
  openGraph: {
    title: 'Project Stardust - 探索代码与思想的边界',
    description: '个人知识与洞见博客，分享技术文章、思考笔记和学习资源。',
    url: 'https://yuyigy.github.io',
    siteName: 'Project Stardust',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Stardust - 探索代码与思想的边界',
    description: '个人知识与洞见博客，分享技术文章、思考笔记和学习资源。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${exo2.variable}`}>
      <body className="bg-space-blue text-soft-white font-body min-h-screen">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-dark-slate border-t border-slate-gray/20 py-8">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <p className="text-soft-white/60">
                © {new Date().getFullYear()} Project Stardust. Made with ❤️ and Next.js
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
