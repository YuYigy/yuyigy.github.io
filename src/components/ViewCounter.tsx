'use client'

import { useEffect, useState } from 'react'

interface ViewCounterProps {
  slug: string
  className?: string
  increment?: boolean // 是否在挂载时自增（详情页开启，列表/首页关闭）
}

export default function ViewCounter({ slug, className, increment = false }: ViewCounterProps) {
  const [count, setCount] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    let aborted = false

    const fetchViews = async () => {
      try {
        // increment=true 时使用 POST 自增并返回最新值；否则 GET 只读取
        const method = increment ? 'POST' : 'GET'
        const res = await fetch(`/api/views/${encodeURIComponent(slug)}`, { method, cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
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
  }, [slug, increment])

  if (error) {
    return <span className={className}>阅读次数：--</span>
  }

  if (count === null) {
    return <span className={className}>阅读次数：…</span>
  }

  return <span className={className}>阅读次数：{count}</span>
}
