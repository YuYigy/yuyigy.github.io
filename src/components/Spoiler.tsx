// src/components/Spoiler.tsx (V3 - 最终优化版)

import React from 'react';
import { cn } from '@/lib/utils';

interface SpoilerProps {
  placeholder: string;
  children: React.ReactNode;
  className?: string;
}

export default function Spoiler({ placeholder, children, className }: SpoilerProps) {
  return (
    // 关键修复：使用 align-baseline 实现与文本的完美基线对齐
    <span
      className={cn(
        'group relative inline-grid place-items-center cursor-pointer align-baseline transition-all duration-300',
        className
      )}
    >
      {/*
        第一层：不可见的"占位"层
        使用紧凑的内边距，确定最终容器尺寸
      */}
      <span className="invisible col-start-1 row-start-1 font-semibold text-cyan-300 px-1.5 py-0.5">
        {children}
      </span>

      {/*
        第二层：遮盖层
        关键优化：使用更紧凑的内边距 (px-1.5 py-0.5) 而不是 (px-2 py-1)
        这让背景块更贴合内容，减少不必要的空白
      */}
      <span
        className="col-start-1 row-start-1 w-full h-full flex items-center justify-center
                   bg-slate-700 group-hover:bg-slate-800/50 text-white rounded
                   group-hover:opacity-0 transition-all duration-300"
      >
        {/* 占位符文字使用更小的字体和紧凑间距 */}
        <span className="font-mono opacity-80 text-sm leading-none">{placeholder}</span>
      </span>

      {/*
        第三层：真实内容层
        保持与占位层相同的内边距，确保视觉一致性
      */}
      <span
        className="col-start-1 row-start-1 opacity-0 group-hover:opacity-100
                   transition-opacity duration-300 font-semibold text-cyan-300 leading-none"
      >
        {children}
      </span>
    </span>
  );
}
