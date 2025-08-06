// src/components/Spoiler.tsx (V2 - 优化版)

import React from 'react';
import { cn } from '@/lib/utils';

interface SpoilerProps {
  placeholder: string;
  children: React.ReactNode;
  className?: string;
}

export default function Spoiler({ placeholder, children, className }: SpoilerProps) {
  return (
    // 使用 inline-grid 布局，这是一个解决此问题的关键技巧
    <span
      className={cn(
        'group relative inline-grid place-items-center cursor-pointer align-middle transition-all duration-300',
        className
      )}
    >
      {/*
        第一层：不可见的"占位"层。
        它包含了真实内容，但完全透明。
        它的唯一作用就是将整个容器的宽度撑开到最终需要的宽度。
      */}
      <span className="invisible col-start-1 row-start-1 font-semibold text-cyan-300 px-2 py-1">
        {children}
      </span>

      {/*
        第二层：遮盖层。
        它也位于网格的同一个单元格中，默认可见。
        鼠标悬停时，它会变得透明。
      */}
      <span
        className="col-start-1 row-start-1 w-full h-full flex items-center justify-center
                   bg-slate-700 group-hover:bg-slate-800/50 text-white rounded-md
                   group-hover:opacity-0 transition-all duration-300"
      >
        <span className="font-mono opacity-80">{placeholder}</span>
      </span>

      {/*
        第三层：真实内容层。
        它也位于同一个单元格，默认透明。
        鼠标悬停时，它会变得可见。
      */}
      <span
        className="col-start-1 row-start-1 opacity-0 group-hover:opacity-100
                   transition-opacity duration-300 font-semibold text-cyan-300"
      >
        {children}
      </span>
    </span>
  );
}
