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

  // 全局点击事件处理器
  const handleGlobalClick = useCallback((event: MouseEvent) => {
    // 播放音效
    playSound()
    
    // 创建视觉特效
    createRipple(event)
  }, [playSound, createRipple])

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
