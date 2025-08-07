"use client"

import { useEffect, useCallback } from 'react'

const ClickEffectComponent = () => {
  // 播放点击音效
  const playSound = useCallback(() => {
    try {
      const audio = new Audio('/sounds/click.mp3')
      audio.volume = 0.2 // 设置较低音量，避免刺耳
      audio.currentTime = 0 // 重置播放位置，支持快速连续点击
      audio.play().catch((error) => {
        // 静默处理音频播放失败（某些浏览器需要用户交互后才能播放音频）
        console.log('Audio play failed:', error)
      })
    } catch (error) {
      // 静默处理音频文件不存在的情况
      console.log('Audio file not found:', error)
    }
  }, [])

  // 创建波纹特效
  const createRipple = useCallback((event: MouseEvent) => {
    // 创建波纹元素
    const ripple = document.createElement('div')

    // 设置波纹的基础样式
    ripple.className = 'click-ripple'

    // 使用CSS变量设置颜色，增强可维护性
    ripple.style.setProperty('--ripple-color', '#64FFDA')

    // 设置波纹的位置和样式
    Object.assign(ripple.style, {
      position: 'fixed',
      left: `${event.clientX}px`,
      top: `${event.clientY}px`,
      width: '0px',
      height: '0px',
      borderRadius: '50%',
      border: '2px solid var(--ripple-color)',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: '9999',
      animation: 'ripple-animation 0.6s ease-out forwards'
    })

    // 将波纹添加到页面
    document.body.appendChild(ripple)

    // 监听动画结束事件，清理DOM节点
    const handleAnimationEnd = () => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple)
      }
      ripple.removeEventListener('animationend', handleAnimationEnd)
    }

    ripple.addEventListener('animationend', handleAnimationEnd)
  }, [])

  // 智能目标判断：检查是否为功能性元素
  const isInteractiveElement = useCallback((target: HTMLElement): boolean => {
    // 检查当前元素及其最多5层父元素
    let currentElement: HTMLElement | null = target

    for (let i = 0; i < 5 && currentElement; i++) {
      // 检查标签名
      const tagName = currentElement.tagName.toLowerCase()
      if (['a', 'button', 'input', 'select', 'textarea'].includes(tagName)) {
        return true
      }

      // 检查交互属性
      if (
        currentElement.hasAttribute('role') ||
        currentElement.hasAttribute('onclick') ||
        currentElement.hasAttribute('tabindex') ||
        currentElement.classList.contains('cursor-pointer') ||
        currentElement.classList.contains('clickable')
      ) {
        return true
      }

      // 检查是否在可点击容器内
      if (currentElement.closest('a, button, [role="button"], [role="link"], [onclick]')) {
        return true
      }

      // 检查特定的组件类名（根据您的项目调整）
      const interactiveClasses = [
        'spoiler', // Spoiler 组件
        'nav-link', // 导航链接
        'post-card', // 文章卡片
        'tag', // 标签
        'menu-item', // 菜单项
      ]

      if (interactiveClasses.some(className => currentElement?.classList.contains(className))) {
        return true
      }

      // 向上遍历到父元素
      currentElement = currentElement.parentElement
    }

    return false
  }, [])

  // 全局点击事件处理器（优化版）
  const handleGlobalClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement

    // 🎯 核心优化：智能判断点击目标
    if (isInteractiveElement(target)) {
      // 如果点击的是功能性元素，不触发特效
      return
    }

    // 只有点击非功能性区域（如背景、普通文本）时才触发特效
    playSound()
    createRipple(event)
  }, [playSound, createRipple, isInteractiveElement])

  // 组件挂载时添加全局事件监听器
  useEffect(() => {
    // 添加点击事件监听器
    document.addEventListener('click', handleGlobalClick, { passive: true })

    // 清理函数：组件卸载时移除事件监听器，防止内存泄漏
    return () => {
      document.removeEventListener('click', handleGlobalClick)
    }
  }, [handleGlobalClick])

  // 该组件不渲染任何UI，仅提供全局交互功能
  return null
}

export default ClickEffectComponent
