"use client"

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ZoomOut, Minimize2, Maximize2, RotateCcw, RotateCw } from 'lucide-react'

interface LightboxImageProps {
  src: string
  alt?: string
  /** 紧凑模式：用于在 Figure 等容器内渲染，去除外层边距和 1/2 宽度限制 */
  compact?: boolean
  /** 自定义外层容器类名 */
  wrapperClassName?: string
}

export default function LightboxImage({ src, alt = '', compact = false, wrapperClassName }: LightboxImageProps) {
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
    setRotate(0)
    setTranslate({ x: 0, y: 0 })
  }

  const [rotate, setRotate] = useState(0)
  const [fitScale, setFitScale] = useState(1)
  const [mode, setMode] = useState<'fit' | 'original'>('fit')

  const onImageLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const img = e.currentTarget
    const vw = Math.max(window.innerWidth * 0.95, 1)
    const vh = Math.max(window.innerHeight * 0.9, 1)
    const fs = Math.min(vw / img.naturalWidth, vh / img.naturalHeight, 1)
    setFitScale(fs)
    setScale(fs)
    setMode('fit')
    setRotate(0)
    setTranslate({ x: 0, y: 0 })
  }

  const zoomIn = () => setScale((s) => clamp(s * 1.2, 0.2, 8))
  const zoomOut = () => setScale((s) => clamp(s / 1.2, 0.2, 8))
  const toggleFitOriginal = () => {
    if (mode === 'fit') {
      setMode('original')
      setScale(1)
    } else {
      setMode('fit')
      setScale(fitScale)
    }
    setTranslate({ x: 0, y: 0 })
  }

  const modal = (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={alt || 'Image preview'}
        className="fixed inset-0 z-[1000]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* 遮罩层（点击关闭） */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />

        {/* 右上角关闭按钮（圆角正方形） */}
        <button
          type="button"
          aria-label="关闭"
          onClick={() => setIsOpen(false)}
          className="fixed top-4 right-4 z-[1001] p-3 rounded-xl bg-black/60 text-white shadow-lg hover:bg-black/80 hover:scale-105 transition-all"
        >
          <X size={20} />
        </button>

        {/* 底部工具栏 */}
        <div className="pointer-events-auto fixed bottom-6 left-1/2 -translate-x-1/2 z-[1001]">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md text-white rounded-xl px-2 py-1 shadow-lg">
            <button className="p-2 rounded-md hover:bg-white/10 transition" onClick={zoomOut} aria-label="缩小"><ZoomOut size={18} /></button>
            <button className="p-2 rounded-md hover:bg-white/10 transition" onClick={zoomIn} aria-label="放大"><ZoomIn size={18} /></button>
            <button className="p-2 rounded-md hover:bg-white/10 transition" onClick={toggleFitOriginal} aria-label="尺寸切换">
              {mode === 'fit' ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
            </button>
            <button className="p-2 rounded-md hover:bg-white/10 transition" onClick={() => setRotate((r) => r - 90)} aria-label="左旋"><RotateCcw size={18} /></button>
            <button className="p-2 rounded-md hover:bg-white/10 transition" onClick={() => setRotate((r) => r + 90)} aria-label="右旋"><RotateCw size={18} /></button>
          </div>
        </div>

        {/* 内容层（阻止冒泡，不可点击关闭） */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
        >
          {/* 图片（framer-motion 控制缩放/旋转/位移） */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src={src}
            alt={alt}
            draggable={false}
            className={`${scale > 1 ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'} rounded-lg shadow-2xl select-none`}
            style={{ maxWidth: mode === 'fit' ? '95vw' : 'none', maxHeight: mode === 'fit' ? '90vh' : 'none' }}
            onLoad={onImageLoad}
            animate={{ scale, rotate, x: translate.x, y: translate.y }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            onDoubleClick={resetView}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )

  const wrapperBase = compact ? 'w-full mx-auto rounded-lg overflow-hidden cursor-pointer' : 'mt-8 mb-2 md:w-1/2 w-full mx-auto rounded-lg overflow-hidden cursor-pointer'

  return (
    <div className={`${wrapperBase} ${wrapperClassName ?? ''}`.trim()}>
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

      {isOpen && typeof window !== 'undefined' && createPortal(modal, document.body)}
    </div>
  )
}

