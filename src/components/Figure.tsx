"use client"

import Image from 'next/image'
import React from 'react'

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
}

export function FigureImage({ src, alt, className }: FigureImageProps) {
  return (
    <div className={cx('mx-auto w-full', className)}>
      {/* 使用 unoptimized 以兼容外链图片与静态托管，无需额外域名配置 */}
      <Image
        src={src}
        alt={alt}
        unoptimized
        width={1600}
        height={900}
        className="w-full h-auto rounded-lg shadow-lg"
        sizes="(max-width: 768px) 100vw, 768px"
        priority={false}
      />
    </div>
  )
}

export default Figure

