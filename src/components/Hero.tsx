'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Code, Lightbulb, Rocket } from 'lucide-react'
import Button from './ui/Button'

const features = [
  {
    icon: Code,
    title: '技术分享',
    description: '深度技术文章与实践经验',
  },
  {
    icon: Lightbulb,
    title: '思考洞见',
    description: '对技术趋势的独特见解',
  },
  {
    icon: Rocket,
    title: '项目实战',
    description: '有趣的项目与代码实现',
  },
]

export default function Hero() {
  const scrollToFeatured = () => {
    const featuredSection = document.getElementById('featured-posts')
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景几何图案 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 border border-cyber-cyan/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-cyber-cyan/30 rotate-45"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-cyber-cyan/10 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-cyber-cyan/20 rotate-12"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-title font-bold mb-6">
            <span className="text-gradient">探索代码与思想的边界</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-soft-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            在这里，我分享技术洞见、编程思考和个人成长的点点滴滴。
            <br />
            让我们一起在代码的世界中寻找灵感与突破。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button size="lg" onClick={scrollToFeatured}>
              开始探索
            </Button>
            <Button variant="secondary" size="lg">
              了解更多
            </Button>
          </motion.div>
        </motion.div>

        {/* 特色功能 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="group"
            >
              <div className="bg-dark-slate/50 border border-slate-gray/20 rounded-xl p-6 transition-all duration-300 hover:border-cyber-cyan/50 hover:bg-dark-slate/70 group-hover:scale-105">
                <feature.icon className="w-12 h-12 text-cyber-cyan mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-title font-semibold text-soft-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-soft-white/70">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 滚动指示器 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col items-center"
        >
          <p className="text-soft-white/60 text-sm mb-4">向下滚动查看精选文章</p>
          <button
            onClick={scrollToFeatured}
            className="p-2 rounded-full border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10 transition-all duration-300 animate-bounce"
          >
            <ArrowDown size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
