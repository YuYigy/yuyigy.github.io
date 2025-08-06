'use client'

import { motion } from 'framer-motion'
import { Github, Mail, Linkedin, Twitter, Globe, MapPin } from 'lucide-react'

const contactMethods = [
  {
    name: 'Email',
    value: 'your.email@example.com',
    href: 'mailto:your.email@example.com',
    icon: Mail,
    description: '工作合作或技术交流',
    color: 'hover:text-red-400',
  },
  {
    name: 'GitHub',
    value: '@yuyigy',
    href: 'https://github.com/yuyigy',
    icon: Github,
    description: '开源项目和代码分享',
    color: 'hover:text-gray-400',
  },
  {
    name: 'LinkedIn',
    value: 'yuyigy',
    href: 'https://linkedin.com/in/yuyigy',
    icon: Linkedin,
    description: '职业网络和经历',
    color: 'hover:text-blue-400',
  },
  {
    name: 'Twitter',
    value: '@yuyigy',
    href: 'https://twitter.com/yuyigy',
    icon: Twitter,
    description: '技术动态和思考分享',
    color: 'hover:text-blue-400',
  },
]

const personalInfo = [
  {
    label: '位置',
    value: '中国',
    icon: MapPin,
  },
  {
    label: '网站',
    value: 'yuyigy.github.io',
    icon: Globe,
  },
]

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-title font-bold text-gradient mb-2">
          联系方式
        </h3>
        <p className="text-soft-white/70">
          欢迎与我交流技术话题或合作机会
        </p>
      </div>

      {/* 个人信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-dark-slate/50 border border-slate-gray/20 rounded-xl p-6"
      >
        <h4 className="text-lg font-title font-semibold text-cyber-cyan mb-4">
          基本信息
        </h4>
        
        <div className="space-y-3">
          {personalInfo.map((info, index) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <info.icon className="w-5 h-5 text-cyber-cyan" />
              <span className="text-soft-white/60 min-w-[60px]">
                {info.label}:
              </span>
              <span className="text-soft-white">
                {info.value}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 联系方式 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-dark-slate/50 border border-slate-gray/20 rounded-xl p-6"
      >
        <h4 className="text-lg font-title font-semibold text-cyber-cyan mb-4">
          社交媒体
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactMethods.map((contact, index) => (
            <motion.a
              key={contact.name}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group block p-4 bg-space-blue/30 border border-slate-gray/20 rounded-lg hover:border-cyber-cyan/50 hover:bg-dark-slate/30 transition-all duration-300"
            >
              <div className="flex items-start space-x-3">
                <contact.icon className={`w-6 h-6 text-cyber-cyan group-hover:scale-110 transition-transform duration-300 ${contact.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-medium text-soft-white group-hover:text-cyber-cyan transition-colors duration-300">
                      {contact.name}
                    </h5>
                  </div>
                  <p className="text-sm text-soft-white/60 mb-1">
                    {contact.value}
                  </p>
                  <p className="text-xs text-soft-white/40">
                    {contact.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* 合作邀请 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-cyber-cyan/10 to-soft-white/5 border border-cyber-cyan/20 rounded-xl p-6 text-center"
      >
        <h4 className="text-lg font-title font-semibold text-cyber-cyan mb-2">
          开放合作
        </h4>
        <p className="text-soft-white/70 mb-4">
          我对以下类型的合作机会感兴趣：
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {['技术咨询', '开源项目', '技术写作', '演讲分享', '代码审查'].map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-cyber-cyan/20 text-cyber-cyan rounded-full text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
