"use client"

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface LightboxImageProps {
  src: string
  alt?: string
}

export default function LightboxImage({ src, alt = '' }: LightboxImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false) // 用于过渡动画

  // Esc 关闭
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  // 打开后下一帧启动淡入动画
  useEffect(() => {
    if (!isOpen) return
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [isOpen])

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Image preview'}
      className="fixed inset-0 z-[1000] flex items-center justify-center"
    >
      {/* 遮罩层 */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* 内容容器 */}
      <div
        className={`relative z-10 p-4 transition-all duration-200 ${
          mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 使用原生 img 以兼容外部域名与静态导出；样式完全由 Tailwind 控制 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
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

