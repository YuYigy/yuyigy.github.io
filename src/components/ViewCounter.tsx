'use client'

import { useEffect, useState } from 'react'

interface ViewCounterProps {
  slug: string
  className?: string
}

export default function ViewCounter({ slug, className }: ViewCounterProps) {
  const [count, setCount] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    let aborted = false

    const fetchViews = async () => {
      try {
        const res = await fetch(`/api/views/${encodeURIComponent(slug)}`, { cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        // 兼容可能的数据结构
        const value =
          typeof data === 'number'
            ? data
            : data?.view_count ?? data?.count ?? data?.views ?? null
        if (!aborted) setCount(typeof value === 'number' ? value : 0)
      } catch (e: any) {
        if (!aborted) setError(e?.message ?? '加载失败')
      }
    }

    fetchViews()
    return () => {
      aborted = true
    }
  }, [slug])

  if (error) {
    return <span className={className}>阅读次数：--</span>
  }

  if (count === null) {
    return <span className={className}>阅读次数：…</span>
  }

  return <span className={className}>阅读次数：{count}</span>
}
