'use client'

import { motion } from 'framer-motion'
import { Code, Database, Globe, Smartphone, Server, Palette } from 'lucide-react'

interface Skill {
  name: string
  level: number
  category: string
  icon?: React.ComponentType<any>
}

const skills: Skill[] = [
  // 前端开发
  { name: 'React', level: 90, category: '前端开发', icon: Code },
  { name: 'Next.js', level: 85, category: '前端开发', icon: Globe },
  { name: 'TypeScript', level: 88, category: '前端开发', icon: Code },
  { name: 'Tailwind CSS', level: 92, category: '前端开发', icon: Palette },
  { name: 'Vue.js', level: 75, category: '前端开发', icon: Code },
  
  // 后端开发
  { name: 'Node.js', level: 80, category: '后端开发', icon: Server },
  { name: 'Python', level: 85, category: '后端开发', icon: Code },
  { name: 'Express.js', level: 78, category: '后端开发', icon: Server },
  { name: 'FastAPI', level: 70, category: '后端开发', icon: Server },
  
  // 数据库
  { name: 'MongoDB', level: 82, category: '数据库', icon: Database },
  { name: 'PostgreSQL', level: 75, category: '数据库', icon: Database },
  { name: 'Redis', level: 68, category: '数据库', icon: Database },
  
  // 移动开发
  { name: 'React Native', level: 72, category: '移动开发', icon: Smartphone },
  { name: 'Flutter', level: 65, category: '移动开发', icon: Smartphone },
]

const skillCategories = Array.from(new Set(skills.map(skill => skill.category)))

export default function SkillTree() {
  const getSkillColor = (level: number) => {
    if (level >= 85) return 'from-cyber-cyan to-soft-white'
    if (level >= 70) return 'from-cyber-cyan/80 to-cyber-cyan'
    return 'from-slate-gray to-slate-gray/60'
  }

  const getSkillText = (level: number) => {
    if (level >= 85) return '精通'
    if (level >= 70) return '熟练'
    return '了解'
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-title font-bold text-gradient mb-2">
          技能树
        </h3>
        <p className="text-soft-white/70">
          我的技术栈和专业技能分布
        </p>
      </div>

      {skillCategories.map((category, categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
          className="bg-dark-slate/50 border border-slate-gray/20 rounded-xl p-6"
        >
          <h4 className="text-lg font-title font-semibold text-cyber-cyan mb-4">
            {category}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills
              .filter(skill => skill.category === category)
              .map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.2 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {skill.icon && (
                        <skill.icon className="w-4 h-4 text-cyber-cyan" />
                      )}
                      <span className="text-soft-white font-medium">
                        {skill.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-soft-white/60">
                        {getSkillText(skill.level)}
                      </span>
                      <span className="text-xs text-cyber-cyan font-mono">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative h-2 bg-slate-gray/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: categoryIndex * 0.2 + index * 0.1 + 0.5 }}
                      className={`h-full bg-gradient-to-r ${getSkillColor(skill.level)} rounded-full relative`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
