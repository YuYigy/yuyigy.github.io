"use client"

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface LightboxImageProps {
  src: string
  alt?: string
}

export default function LightboxImage({ src, alt = '' }: LightboxImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false) // 用于过渡动画
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragStartRef = useRef<{x: number; y: number} | null>(null)
  const startTranslateRef = useRef<{x: number; y: number}>({ x: 0, y: 0 })

  // Esc 关闭
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  // 打开后下一帧启动淡入动画 & 禁止页面滚动
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const id = requestAnimationFrame(() => setMounted(true))
    return () => {
      document.body.style.overflow = prev
      cancelAnimationFrame(id)
    }
  }, [isOpen])

  const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val))

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    // 缩放（滚轮向上放大，向下缩小）
    const factor = e.deltaY < 0 ? 1.1 : 0.9
    setScale((s) => clamp(s * factor, 0.5, 5))
  }

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setDragging(true)
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    startTranslateRef.current = { ...translate }
  }
  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!dragging || !dragStartRef.current) return
    const dx = e.clientX - dragStartRef.current.x
    const dy = e.clientY - dragStartRef.current.y
    setTranslate({ x: startTranslateRef.current.x + dx, y: startTranslateRef.current.y + dy })
  }
  const endDrag = () => setDragging(false)

  const resetView = () => {
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Image preview'}
      className="fixed inset-0 z-[1000] flex items-center justify-center"
    >
      {/* 遮罩层（点击关闭） */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* 内容容器（阻止冒泡，不可点击关闭） */}
      <div
        className={`relative z-10 p-4 transition-all duration-200 ${
          mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        {/* 关闭按钮 */}
        <button
          type="button"
          aria-label="关闭"
          onClick={() => setIsOpen(false)}
          className="absolute -top-2 -right-2 md:top-0 md:right-0 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-lg z-20"
        >
          ×
        </button>

        {/* 图片（可缩放拖拽） */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          className={`max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl ${
            scale > 1 ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
          }`}
          style={{ transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`, transition: dragging ? 'none' : 'transform 120ms ease-out' }}
          onDoubleClick={resetView}
        />
      </div>
    </div>
  )

  return (
    <div className="my-8 md:w-1/2 w-full mx-auto rounded-lg overflow-hidden cursor-pointer">
      {/* 缩略图 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-auto"
        onClick={() => {
          setIsOpen(true)
          setMounted(false)
          setScale(1)
          setTranslate({ x: 0, y: 0 })
        }}
      />
      {alt && (
        <div className="text-center mt-2 text-sm text-soft-white/60">
          <span>{alt}</span>
        </div>
      )}

      {isOpen && typeof window !== 'undefined' && createPortal(modal, document.body)}
    </div>
  )
}

