'use client'

import { useState, useEffect } from 'react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { mdxComponents } from '@/lib/mdx-components'
import ImageLightbox from './ImageLightbox'

interface PostContentProps {
  content: MDXRemoteSerializeResult
  rawContent: string
}

export default function PostContent({ content, rawContent }: PostContentProps) {
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  useEffect(() => {
    // 提取文章中的所有图片
    const imageRegex = /!\[.*?\]\((.*?)\)/g
    const images: string[] = []
    let match

    while ((match = imageRegex.exec(rawContent)) !== null) {
      images.push(match[1])
    }

    setLightboxImages(images)

    // 为文章中的图片添加点击事件
    const handleImageClick = (e: Event) => {
      const target = e.target as HTMLImageElement
      if (target.tagName === 'IMG' && target.src) {
        e.preventDefault()
        const imageIndex = images.findIndex(img => target.src.includes(img))
        if (imageIndex !== -1) {
          setCurrentImageIndex(imageIndex)
          setIsLightboxOpen(true)
        }
      }
    }

    // 添加事件监听器
    const articleElement = document.querySelector('.mdx-content')
    if (articleElement) {
      articleElement.addEventListener('click', handleImageClick)
      return () => articleElement.removeEventListener('click', handleImageClick)
    }
  }, [rawContent])

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === lightboxImages.length - 1 ? 0 : prev + 1
    )
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? lightboxImages.length - 1 : prev - 1
    )
  }

  // 自定义 MDX 组件，添加图片点击功能
  const customComponents = {
    ...mdxComponents,
    img: ({ src, alt, ...props }: { src: string; alt: string }) => {
      const handleClick = () => {
        const imageIndex = lightboxImages.findIndex(img => src.includes(img))
        if (imageIndex !== -1) {
          setCurrentImageIndex(imageIndex)
          setIsLightboxOpen(true)
        }
      }

      return (
        <div className="my-8 rounded-lg overflow-hidden cursor-pointer group">
          <img
            src={src}
            alt={alt}
            onClick={handleClick}
            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
            {...props}
          />
          <div className="text-center mt-2 text-sm text-soft-white/60">
            {alt && <span>{alt}</span>}
            <span className="block text-xs text-cyber-cyan/70 mt-1">
              点击查看大图
            </span>
          </div>
        </div>
      )
    },
  }

  return (
    <>
      <div className="mdx-content prose prose-invert max-w-none">
        <MDXRemote {...content} components={customComponents} />
      </div>

      <ImageLightbox
        images={lightboxImages}
        currentIndex={currentImageIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />
    </>
  )
}
