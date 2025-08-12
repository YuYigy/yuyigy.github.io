"use client"

import { useState } from 'react'
import ImageLightbox from './ImageLightbox'

interface MDXImageProps {
  src: string
  alt?: string
}

export default function MDXImage({ src, alt = '' }: MDXImageProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="my-8 md:w-1/2 w-full mx-auto rounded-lg overflow-hidden cursor-pointer">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-auto"
        onClick={() => setOpen(true)}
      />
      {alt && (
        <div className="text-center mt-2 text-sm text-soft-white/60">
          <span>{alt}</span>
        </div>
      )}

      {/* 单图查看器 */}
      <ImageLightbox
        images={[src]}
        currentIndex={0}
        isOpen={open}
        onClose={() => setOpen(false)}
        onNext={() => {}}
        onPrev={() => {}}
      />
    </div>
  )
}

