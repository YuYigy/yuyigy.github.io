// src/components/Header.tsx (重构后的完整版本)
"use client"; // 这是一个客户端组件，因为它包含状态和交互

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 用于获取当前路径，高亮活动链接
import { cn } from '@/lib/utils'; // 引入样式辅助函数

// 1. 定义导航链接的类型接口
interface NavLink {
  name: string;
  href: string;
  target?: string; // 可选的target属性，用于控制链接打开方式
}

// 2. 将导航链接数据提取出来，便于管理
const navLinks: NavLink[] = [
  { name: '首页', href: '/' },
  { name: '关于', href: '/about' },
  { name: 'GitHub', href: 'https://github.com/YuYigy', target: '_blank' },
];

export default function Header() {
  // 2. 使用useState来管理菜单的"打开/关闭"状态
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // 3. (可选但推荐) 监听路由变化，在页面跳转时自动关闭菜单
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  // 4. (可选但推荐) 当菜单打开时，禁止背景滚动，提升体验
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // 组件卸载时恢复滚动
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-space-blue/80 backdrop-blur-lg border-b border-slate-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 左侧Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-cyber-cyan to-soft-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-space-blue font-title font-bold text-lg">Y</span>
              </div>
              <span className="font-bold text-lg text-soft-white group-hover:text-cyber-cyan transition-colors">
                YuYi_gy的个人博客
              </span>
            </Link>
          </div>

          {/* 右侧导航 (桌面端) */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    target={link.target}
                    rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "text-cyber-cyan bg-cyber-cyan/10"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 汉堡菜单按钮 (移动端) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">打开主菜单</span>
              {/* 根据isMenuOpen状态切换三横和关闭(X)图标 */}
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 移动端下拉菜单 */}
      {/* 使用CSS transition实现平滑的滑入滑出效果 */}
      <div
        className={cn(
          "md:hidden fixed top-16 inset-x-0 bg-space-blue p-4 transition-transform duration-300 ease-in-out",
          isMenuOpen ? "transform translate-x-0" : "transform -translate-x-full"
        )}
      >
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                target={link.target}
                rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                  pathname === link.href
                    ? "text-cyber-cyan bg-cyber-cyan/10"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
