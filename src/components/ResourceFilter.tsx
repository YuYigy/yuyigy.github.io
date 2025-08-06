'use client'

import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ResourceFilterProps {
  searchTerm: string
  selectedTag: string | null
  availableTags: string[]
  onSearchChange: (term: string) => void
  onTagChange: (tag: string | null) => void
}

export default function ResourceFilter({
  searchTerm,
  selectedTag,
  availableTags,
  onSearchChange,
  onTagChange,
}: ResourceFilterProps) {
  return (
    <div className="mb-12">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* 搜索框 */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-soft-white/40" size={20} />
          <input
            type="text"
            placeholder="搜索资源..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-dark-slate border border-slate-gray/20 rounded-lg text-soft-white placeholder-soft-white/40 focus:outline-none focus:border-cyber-cyan/50 focus:ring-2 focus:ring-cyber-cyan/20 transition-all duration-300"
          />
        </div>

        {/* 标签过滤 */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-soft-white/70">
            <Filter size={18} />
            <span className="text-sm font-medium">标签筛选:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* 全部标签 */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTagChange(null)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                selectedTag === null
                  ? 'bg-cyber-cyan text-space-blue'
                  : 'bg-dark-slate border border-slate-gray/20 text-soft-white hover:border-cyber-cyan/50 hover:text-cyber-cyan'
              )}
            >
              全部
            </motion.button>

            {/* 各个标签 */}
            {availableTags.slice(0, 6).map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTagChange(tag)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                  selectedTag === tag
                    ? 'bg-cyber-cyan text-space-blue'
                    : 'bg-dark-slate border border-slate-gray/20 text-soft-white hover:border-cyber-cyan/50 hover:text-cyber-cyan'
                )}
              >
                {tag}
              </motion.button>
            ))}

            {availableTags.length > 6 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-dark-slate border border-slate-gray/20 text-soft-white hover:border-cyber-cyan/50 hover:text-cyber-cyan transition-all duration-300"
              >
                +{availableTags.length - 6}
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* 活动过滤器显示 */}
      {(searchTerm || selectedTag) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center space-x-4"
        >
          <span className="text-sm text-soft-white/60">当前过滤:</span>
          
          {searchTerm && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/20 rounded-lg">
              <span className="text-sm text-cyber-cyan">搜索: "{searchTerm}"</span>
              <button
                onClick={() => onSearchChange('')}
                className="text-cyber-cyan hover:text-soft-white transition-colors duration-300"
              >
                ×
              </button>
            </div>
          )}
          
          {selectedTag && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/20 rounded-lg">
              <span className="text-sm text-cyber-cyan">标签: {selectedTag}</span>
              <button
                onClick={() => onTagChange(null)}
                className="text-cyber-cyan hover:text-soft-white transition-colors duration-300"
              >
                ×
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
