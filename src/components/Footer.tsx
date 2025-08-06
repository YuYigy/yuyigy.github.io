import Link from 'next/link'
import { Github, Mail, Linkedin, Heart } from 'lucide-react'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/yuyigy',
    icon: Github,
  },
  {
    name: 'Email',
    href: 'mailto:your.email@example.com',
    icon: Mail,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/yuyigy',
    icon: Linkedin,
  },
]

const footerLinks = [
  {
    title: '内容',
    links: [
      { name: '技术分享', href: '/categories/技术分享' },
      { name: '前端开发', href: '/categories/前端开发' },
      { name: '思考笔记', href: '/categories/思考笔记' },
    ],
  },
  {
    title: '资源',
    links: [
      { name: '学习资料', href: '/resources' },
      { name: '工具推荐', href: '/resources?tag=工具' },
      { name: '文档收藏', href: '/resources?tag=文档' },
    ],
  },
  {
    title: '关于',
    links: [
      { name: '个人简介', href: '/about' },
      { name: '联系方式', href: '/about#contact' },
      { name: '技能树', href: '/about#skills' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-dark-slate border-t border-slate-gray/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyber-cyan to-soft-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-space-blue font-title font-bold text-lg">Y</span>
              </div>
              <span className="font-title font-bold text-xl text-gradient">
                yuyigy
              </span>
            </Link>
            <p className="text-soft-white/70 text-sm mb-6 leading-relaxed">
              探索代码与思想的边界，分享技术洞见与个人思考。
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-gray hover:text-cyber-cyan hover:bg-cyber-cyan/10 transition-all duration-300 glow"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-title font-semibold text-soft-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-soft-white/70 hover:text-cyber-cyan transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-gray/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-soft-white/60 text-sm">
            © {new Date().getFullYear()} yuyigy. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-soft-white/60 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart size={16} className="text-cyber-cyan mx-1" />
            <span>and</span>
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyber-cyan hover:text-soft-white transition-colors duration-300 ml-1"
            >
              Next.js
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
