// src/components/Spoiler.tsx

import React from 'react';
import { cn } from '@/lib/utils'; // 引入我们之前讨论过的样式辅助函数

// 定义组件接收的参数类型
interface SpoilerProps {
  placeholder: string;      // 遮盖层上显示的文字，例如 "[I4]"
  children: React.ReactNode; // 被遮盖的真实内容，例如 "IDEA"
  className?: string;       // 允许传入额外的CSS类名
}

export default function Spoiler({ placeholder, children, className }: SpoilerProps) {
  return (
    // 'group' 是Tailwind CSS的一个技巧，让内部元素能响应外部容器的:hover状态
    <span
      className={cn(
        'group relative cursor-pointer bg-slate-700 hover:bg-slate-800/50 text-white px-2 py-1 rounded-md transition-all duration-300 align-middle',
        className
      )}
    >
      {/* 遮盖层上显示的文字 */}
      <span className="font-mono opacity-80 group-hover:opacity-0 transition-opacity duration-300">
        {placeholder}
      </span>

      {/* 默认隐藏，鼠标悬停时显示的真实内容 */}
      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold text-cyan-300">
        {children}
      </span>
    </span>
  );
}
