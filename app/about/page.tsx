import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '关于我 - YuYi_gy的个人博客',
  description: '我是谁？',
  keywords: ['关于我'],
  openGraph: {
    title: '关于我 - YuYi_gy的个人博客',
    description: '我是谁？',
    type: 'profile',
  },
}

// 时间线数据（已注释，保留格式便于日后启用）
/* const timelineData = [
  {
    year: '2020',
    title: '编程启蒙',
    description: '开始接触编程，第一次写下"Hello World"，从此踏上了代码之路。'
  },
  {
    year: '2021',
    title: '深入学习',
    description: '系统学习前端开发技术，掌握了HTML、CSS、JavaScript基础。'
  },
  {
    year: '2022',
    title: '框架探索',
    description: '开始学习React和Vue等现代前端框架，构建了第一个完整的Web应用。'
  },
  {
    year: '2023',
    title: '全栈发展',
    description: '扩展到后端开发，学习Node.js、数据库等技术，成为全栈开发者。'
  },
  {
    year: '2024',
    title: '持续成长',
    description: '专注于代码质量和用户体验，不断学习新技术，分享技术心得。'
  }
 ] */

// 技能数据（已注释，保留格式便于日后启用）
/* const skillsData = [
  {
    category: '编程语言',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++']
  },
  {
    category: '前端框架',
    skills: ['React', 'Vue.js', 'Next.js', 'Nuxt.js', 'Angular']
  },
  {
    category: '后端技术',
    skills: ['Node.js', 'Express', 'Nest.js', 'Spring Boot', 'Django']
  },
  {
    category: '数据库',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite']
  },
  {
    category: '开发工具',
    skills: ['Git', 'Docker', 'VS Code', 'Webpack', 'Vite']
  },
  {
    category: '云服务',
    skills: ['AWS', 'Vercel', 'Netlify', 'GitHub Pages', 'Heroku']
  }
 ] */

// 联系方式数据
const contactData = [
  {
    name: 'GitHub',
    url: 'https://github.com/yuyigy',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  },
  {
    name: 'Email',
    url: 'mailto:your-email@example.com',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* 模块一：个人简介 Hero Section */}
        <section className="mb-20 animate-fade-up">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-title font-bold text-soft-white mb-6">
                你好，我是 <span className="text-cyber-cyan">YuYi_gy</span>
              </h1>
              <p className="text-lg text-slate-gray leading-relaxed">
                这里是我的杂物间。
              </p>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-cyber-cyan/20 to-soft-white/10 p-1 animate-glow">
                  <div className="w-full h-full rounded-full bg-dark-slate flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/avatar.png"
                      alt="YuYi_gy的头像"
                      width={240}
                      height={240}
                      priority
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 模块二：时间线 Timeline Section（完全隐藏，保留代码供后续启用） */}
        {/**
        <section className="mb-20 animate-fade-up">
          <div className="text-3xl font-title font-bold text-soft-white mb-12 text-center">
            我的<span className="text-cyber-cyan">成长历程</span>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-cyan to-slate-gray"></div>
            <div className="space-y-12">
              {timelineData.map((item) => (
                <div key={item.year} className="relative flex items-start">
                  <div className="absolute left-6 w-4 h-4 bg-cyber-cyan rounded-full border-4 border-space-blue shadow-lg shadow-cyber-cyan/50"></div>
                  <div className="ml-20 bg-dark-slate/50 backdrop-blur-sm rounded-lg p-6 border border-slate-gray/20 hover:border-cyber-cyan/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-cyan/10">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-cyber-cyan font-title font-bold text-xl">{item.year}</span>
                      <h3 className="text-soft-white font-semibold text-lg">{item.title}</h3>
                    </div>
                    <p className="text-slate-gray leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        **/}

        {/* 模块三：技能树 Skills Section（完全隐藏，保留代码供后续启用） */}
        {/**
        <section className="mb-20 animate-fade-up">
          <h2 className="text-3xl font-title font-bold text-soft-white mb-12 text-center">
            技能<span className="text-cyber-cyan">树</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((category, index) => (
              <div key={index} className="bg-dark-slate/50 backdrop-blur-sm rounded-lg p-6 border border-slate-gray/20 hover:border-cyber-cyan/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-cyan/10">
                <h3 className="text-soft-white font-title font-semibold text-lg mb-4 text-center">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-cyber-cyan/10 text-cyber-cyan rounded-full text-sm font-medium border border-cyber-cyan/20 hover:bg-cyber-cyan/20 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        **/}

        {/* 模块四：联系方式 Contact Section */}
        <section className="animate-fade-up">
          <h2 className="text-3xl font-title font-bold text-soft-white mb-12 text-center">
            联系<span className="text-cyber-cyan">我</span>
          </h2>
          
          <div className="bg-dark-slate/50 backdrop-blur-sm rounded-lg p-8 border border-slate-gray/20 text-center">
            <p className="text-slate-gray mb-8 text-lg">
              联系方式：
            </p>
            
            <div className="flex justify-center gap-8">
              {contactData.map((contact, index) => (
                <Link
                  key={index}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-cyber-cyan/10 transition-all duration-300"
                >
                  <div className="text-slate-gray group-hover:text-cyber-cyan group-hover:scale-110 transition-all duration-300">
                    {contact.icon}
                  </div>
                  <span className="text-slate-gray group-hover:text-cyber-cyan font-medium transition-colors duration-300">
                    {contact.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
      </div>
    </div>
  )
}
