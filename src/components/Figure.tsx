"use client"

import React from 'react'
import LightboxImage from './LightboxImage'

/** Utility: join class names safely */
function cx(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/**
 * Figure 容器组件
 *
 * 语义化地使用 <figure>/<figcaption> 包裹任意独立内容块（图片、表格、代码块等），
 * 并可在内容上方（preCaption）和/或下方（postCaption）渲染标题。
 */
export interface FigureProps {
  /** 任意需要被包裹的内容，如表格、图片、代码块等 */
  children: React.ReactNode
  /** 上方标题（可选） */
  preCaption?: string
  /** 下方标题（可选） */
  postCaption?: string
  /** 额外类名（可选），用于场景化微调 */
  className?: string
}

export function Figure({ children, preCaption, postCaption, className }: FigureProps) {
  return (
    <figure className={cx('my-8', className)}>
      {preCaption && (
        <figcaption className="text-lg font-semibold text-gray-300 mb-4 text-center">
          {preCaption}
        </figcaption>
      )}

      {children}

      {postCaption && (
        <figcaption className="text-sm text-gray-400 mt-3 text-center">
          {postCaption}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * FigureImage 辅助组件
 *
 * 用于在 <Figure> 中渲染图片。内部使用 next/image 以获得更好的性能。
 */
export interface FigureImageProps {
  /** 图片链接 */
  src: string
  /** 图片的可访问性描述 */
  alt: string
  /** 额外类名（可选） */
  className?: string
  /** 是否启用点击放大预览（默认 true） */
  lightbox?: boolean
}

export function FigureImage({ src, alt, className, lightbox = true }: FigureImageProps) {
  if (lightbox) {
    return (
      <LightboxImage src={src} alt={alt} compact wrapperClassName={cx('mx-auto w-full', className)} />
    )
  }
  // 非弹出模式下，直接使用 LightboxImage 的缩略图能力，但禁用点击（通过覆盖样式和不传 compact? No: LightboxImage 总是可点击）
  // 这里改为直接渲染一个非交互的 <img> 以保持简单。
  return (
    <div className={cx('mx-auto w-full', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-auto rounded-lg shadow-lg" />
    </div>
  )
}

export default Figure

