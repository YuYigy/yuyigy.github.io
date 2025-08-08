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
        // increment=true 时：使用 sessionStorage 去重，同一会话内同一 slug 只自增一次
        // 若已自增，或 increment=false，则仅 GET 读取
        let method: 'GET' | 'POST' = 'GET'
        const key = `vc:${slug}`

        if (increment) {
          try {
            const marked = typeof window !== 'undefined' ? window.sessionStorage.getItem(key) : null
            if (!marked) {
              // 先写入 pending，避免 React 严格模式下 effect 双调用导致重复 POST
              if (typeof window !== 'undefined') {
                window.sessionStorage.setItem(key, 'pending')
              }
              method = 'POST'
            }
          } catch (_) {
            // 存储不可用时，继续只读 GET 以避免重复计数
            method = 'GET'
          }
        }

        const res = await fetch(`/api/views/${encodeURIComponent(slug)}`, { method, cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        const value =
          typeof data === 'number'
            ? data
            : data?.view_count ?? data?.count ?? data?.views ?? null
        if (!aborted) setCount(typeof value === 'number' ? value : 0)

        // 如果本次做了 POST 且成功，写入去重标记
        if (increment && method === 'POST') {
          try {
            if (typeof window !== 'undefined') {
              window.sessionStorage.setItem(key, Date.now().toString())
            }
          } catch (_) {
            // 忽略存储错误
          }
        }
      } catch (e: any) {
        if (!aborted) setError(e?.message ?? '加载失败')
        // 若 POST 失败，回滚 pending 标记
        try {
          if (increment && typeof window !== 'undefined') {
            const key = `vc:${slug}`
            const val = window.sessionStorage.getItem(key)
            if (val === 'pending') {
              window.sessionStorage.removeItem(key)
            }
          }
        } catch (_) {}
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
