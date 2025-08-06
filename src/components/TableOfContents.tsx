'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // 解析内容中的标题
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    const headings: TOCItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const title = match[2].trim()
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')

      headings.push({ id, title, level })
    }

    setToc(headings)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    )

    // 观察所有标题元素
    toc.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [toc])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (toc.length < 3) return null

  return (
    <div className="hidden xl:block fixed top-1/2 right-8 transform -translate-y-1/2 z-40">
      <div className="bg-dark-slate/80 backdrop-blur-sm border border-slate-gray/20 rounded-xl p-4 max-w-xs">
        <h3 className="text-sm font-title font-semibold text-cyber-cyan mb-3">
          目录
        </h3>
        <nav className="space-y-1">
          {toc.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={cn(
                'block w-full text-left text-sm transition-colors duration-300 py-1 px-2 rounded',
                item.level === 2 ? 'pl-2' : 'pl-6',
                activeId === item.id
                  ? 'text-cyber-cyan bg-cyber-cyan/10'
                  : 'text-soft-white/70 hover:text-cyber-cyan hover:bg-cyber-cyan/5'
              )}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
