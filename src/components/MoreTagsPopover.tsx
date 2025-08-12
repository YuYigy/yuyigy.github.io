"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import Tag from './ui/Tag'
import { cn } from '@/lib/utils'

interface MoreTagsPopoverProps {
  tags: string[]
  size?: 'sm' | 'md'
  className?: string
  visibleMin?: number // 最少展示的标签数（即使很挤也至少显示这么多）
}

// 计算是否具备 hover 能力（桌面端）
function useHoverCapable() {
  const [hoverCapable, setHoverCapable] = useState<boolean>(true)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      const mq = window.matchMedia('(hover: hover)')
      setHoverCapable(!!mq.matches)
      const handler = (e: MediaQueryListEvent) => setHoverCapable(!!e.matches)
      mq.addEventListener?.('change', handler)
      return () => mq.removeEventListener?.('change', handler)
    }
  }, [])
  return hoverCapable
}

export default function MoreTagsPopover({ tags, size = 'sm', className, visibleMin = 1 }: MoreTagsPopoverProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [visibleCount, setVisibleCount] = useState<number>(Math.min(tags.length, 3))
  const [open, setOpen] = useState(false)
  const hoverCapable = useHoverCapable()

  // 测量：根据容器宽度和标签宽度，计算一行能放下多少个
  useEffect(() => {
    if (!containerRef.current) return
    if (!tags || tags.length === 0) return

    const containerWidth = containerRef.current.clientWidth
    if (!containerWidth) return

    // 创建隐藏测量容器
    const measure = document.createElement('div')
    measure.style.position = 'absolute'
    measure.style.visibility = 'hidden'
    measure.style.pointerEvents = 'none'
    measure.style.left = '-99999px'
    measure.style.top = '0'
    measure.style.width = `${containerWidth}px`
    measure.style.display = 'flex'
    measure.style.flexWrap = 'nowrap'
    measure.style.gap = '8px'
    document.body.appendChild(measure)

    // 用与 Tag 一样的样式估算宽度
    const tagClass = size === 'sm'
      ? 'inline-flex items-center font-medium rounded-full transition-colors duration-300 whitespace-nowrap px-3 py-1 text-xs'
      : 'inline-flex items-center font-medium rounded-full transition-colors duration-300 whitespace-nowrap px-4 py-2 text-sm'

    let used = 0
    let canShow = 0
    for (let i = 0; i < tags.length; i++) {
      const span = document.createElement('span')
      span.className = tagClass
      span.textContent = tags[i]
      span.style.background = 'transparent'
      span.style.border = '1px solid transparent'
      measure.appendChild(span)
      const rect = span.getBoundingClientRect()
      const w = rect.width
      if (used + (used > 0 ? 8 : 0) + w <= containerWidth) {
        used += (used > 0 ? 8 : 0) + w
        canShow++
      } else {
        break
      }
    }

    // 至少展示 visibleMin，最多不超过 tags.length
    canShow = Math.max(Math.min(canShow, tags.length), Math.min(visibleMin, tags.length))

    // 预留一个位置给 +N（如果有剩余）
    if (canShow < tags.length) {
      // 估计 +N 的宽度（与 Tag 同类）
      const plus = document.createElement('span')
      plus.className = tagClass
      plus.textContent = `+${tags.length - canShow}`
      measure.appendChild(plus)
      const r = plus.getBoundingClientRect()
      const plusWidth = r.width
      if (used + (used > 0 ? 8 : 0) + plusWidth > containerWidth && canShow > visibleMin) {
        canShow -= 1
      }
    }

    setVisibleCount(canShow)
    document.body.removeChild(measure)
  }, [tags, size, visibleMin])

  // 点击外部关闭（移动端/点击触发时）
  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  const rest = useMemo(() => tags.slice(visibleCount), [tags, visibleCount])

  // 触发策略：桌面 hover；移动端 click
  const triggerProps = hoverCapable
    ? {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
      }
    : {
        onClick: () => setOpen(v => !v),
      }

  return (
    <div className={cn('flex flex-wrap gap-2', className)} ref={containerRef}>
      {tags.slice(0, visibleCount).map(tag => (
        <Tag key={tag} size={size}>{tag}</Tag>
      ))}

      {rest.length > 0 && (
        <div className="relative" {...triggerProps}>
          <Tag size={size}>+{rest.length}</Tag>
          {open && (
            <div className="absolute left-0 top-full mt-2 z-20 bg-space-blue/95 border border-slate-gray/30 rounded-lg p-3 shadow-lg w-fit max-w-[80vw] max-h-60 overflow-auto">
              <div className="flex flex-wrap gap-2">
                {rest.map(tag => (
                  <Tag key={tag} size="sm">{tag}</Tag>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

