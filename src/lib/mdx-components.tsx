import Image from 'next/image'
import LightboxImage from '@/components/LightboxImage'
import { Figure, FigureImage } from '@/components/Figure'
import { ReactNode } from 'react'
import Spoiler from '@/components/Spoiler'

interface MDXComponentsProps {
  [key: string]: any
}

export const mdxComponents: MDXComponentsProps = {
  // 自定义图片组件（使用支持 Portal 的 LightboxImage，保持原样式）
  img: ({ src, alt }: { src: string; alt: string }) => (
    <LightboxImage src={src} alt={alt} />
  ),
  
  // 自定义标题组件
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-4xl font-title font-bold text-gradient mb-6 mt-8">
      {children}
    </h1>
  ),
  
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-3xl font-title font-bold text-soft-white mb-4 mt-8 border-b border-slate-gray/30 pb-2">
      {children}
    </h2>
  ),
  
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-2xl font-title font-semibold text-soft-white mb-3 mt-6">
      {children}
    </h3>
  ),
  
  // 自定义段落
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-soft-white/90 leading-relaxed mb-3">
      {children}
    </p>
  ),
  
  // 自定义链接
  a: ({ href, children }: { href: string; children: ReactNode }) => (
    <a
      href={href}
      className="link glow"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  
  // 自定义列表
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-none space-y-2 mb-4 ml-4">
      {children}
    </ul>
  ),
  
  li: ({ children }: { children: ReactNode }) => (
    <li className="flex items-start">
      <span className="text-cyber-cyan mr-3 mt-1">▸</span>
      <span className="text-soft-white/90">{children}</span>
    </li>
  ),
  
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 ml-4 text-soft-white/90">
      {children}
    </ol>
  ),
  
  // 自定义引用块
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-cyber-cyan bg-dark-slate/50 pl-6 pr-6 py-4 my-6 not-italic text-soft-white/40">
      {children}
    </blockquote>
  ),
  
  // 自定义代码块（内联）
  code: ({ children }: { children: ReactNode }) => (
    <code className="bg-dark-slate px-2 py-1 rounded text-cyber-cyan font-mono text-sm">
      {children}
    </code>
  ),
  
  // 自定义表格
  table: ({ children }: { children: ReactNode }) => (
    <div className="overflow-x-auto my-4 md:w-1/2 w-full mx-auto">
      <table className="w-full border-collapse border border-slate-gray/30 text-soft-white/90 text-[15px] leading-relaxed">
        {children}
      </table>
    </div>
  ),
  
  th: ({ children }: { children: ReactNode }) => (
    <th className="border border-slate-gray/30 bg-dark-slate px-4 py-2 text-left font-semibold text-cyber-cyan text-[15px]">
      {children}
    </th>
  ),
  
  td: ({ children }: { children: ReactNode }) => (
    <td className="border border-slate-gray/30 px-4 py-2 text-soft-white/90 text-[15px]">
      {children}
    </td>
  ),

  // 自定义 Spoiler 组件
  Spoiler: Spoiler,

  // 图文容器组件（供 MDX 使用）
  Figure,
  FigureImage,
}
