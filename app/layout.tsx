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
  title: 'YuYi_gy的个人博客 - 其实是杂物间',
  description: '啥都往里塞，前提是想起来了/憨笑',
  keywords: ['个人博客', '学习分享', '杂物间', '羊驼'],
  authors: [{ name: 'yuyigy' }],
  creator: 'yuyigy',
  openGraph: {
    title: 'YuYi_gy的个人博客 - 其实是杂物间',
    description: '啥都往里塞，前提是想起来了/憨笑',
    url: 'https://yuyigy.github.io',
    siteName: 'YuYi_gy的个人博客',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YuYi_gy的个人博客 - 其实是杂物间',
    description: '啥都往里塞，前提是想起来了/憨笑',
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
                © {new Date().getFullYear()} YuYi_gy的个人博客. Made with ❤️ and 🦙
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
