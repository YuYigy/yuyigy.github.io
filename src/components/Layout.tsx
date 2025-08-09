import { ReactNode } from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import PageTransition from './PageTransition'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  image?: string
  url?: string
}

export default function Layout({
  children,
  title = "YuYi_gy's Blog - 探索代码与思想的边界",
  description = '个人知识与洞见博客，分享技术文章、思考笔记和学习资源。',
  image = '/images/og-image.jpg',
  url = 'https://yuyigy.github.io',
}: LayoutProps) {
  const fullTitle = title.includes("YuYi_gy's Blog") ? title : `${title} | YuYi_gy's Blog`

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="YuYi_gy's Blog" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        
        {/* Additional Meta Tags */}
        <meta name="author" content="yuyigy" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0A192F" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-16">
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}
