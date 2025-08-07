"use client"

import { useCallback } from "react"
import type { Container, Engine } from "tsparticles-engine"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"

const ParticlesComponent = () => {
  // 使用 useCallback 优化性能，避免不必要的重渲染
  const particlesInit = useCallback(async (engine: Engine) => {
    // 加载 slim 版本，减少打包体积
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // 粒子系统加载完成的回调（可选）
    console.log("Particles loaded:", container)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        // 背景色与网站主题完全融合
        background: {
          color: {
            value: "#0A192F",
          },
        },
        // 限制帧率，优化性能
        fpsLimit: 60,
        // 交互配置
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push", // 点击时添加新粒子
            },
            onHover: {
              enable: true,
              mode: "repulse", // 鼠标悬停时粒子排斥效果
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4, // 每次点击添加的粒子数量
            },
            repulse: {
              distance: 80, // 排斥距离
              duration: 0.4, // 排斥持续时间
            },
          },
        },
        // 粒子配置
        particles: {
          color: {
            value: "#64FFDA", // 品牌青色
          },
          // 粒子间连线配置
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.1, // 低透明度，营造神秘感
            width: 1,
          },
          // 粒子移动配置
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce", // 边界反弹
            },
            random: false,
            speed: 1, // 缓慢移动，营造宁静氛围
            straight: false,
          },
          // 粒子数量
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          // 粒子透明度
          opacity: {
            value: 0.5,
            random: {
              enable: true,
              minimumValue: 0.1,
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              sync: false,
            },
          },
          // 粒子形状
          shape: {
            type: "circle",
          },
          // 粒子大小
          size: {
            value: { min: 1, max: 3 }, // 随机大小，增加层次感
            random: {
              enable: true,
              minimumValue: 1,
            },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 1,
              sync: false,
            },
          },
        },
        // 高分辨率屏幕优化
        detectRetina: true,
        // 全屏覆盖
        fullScreen: {
          enable: true,
          zIndex: 0, // 确保在背景层
        },
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  )
}

export default ParticlesComponent
