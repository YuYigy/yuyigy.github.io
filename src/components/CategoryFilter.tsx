'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Tag from './ui/Tag'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-title font-bold text-soft-white mb-6">
        按分类筛选
      </h2>
      
      <div className="flex flex-wrap gap-3">
        {/* 全部分类 */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(null)}
          className={cn(
            'px-6 py-3 rounded-lg font-medium transition-all duration-300',
            selectedCategory === null
              ? 'bg-cyber-cyan text-space-blue shadow-lg shadow-cyber-cyan/25'
              : 'bg-dark-slate border border-slate-gray/20 text-soft-white hover:border-cyber-cyan/50 hover:text-cyber-cyan'
          )}
        >
          全部文章
        </motion.button>

        {/* 各个分类 */}
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category)}
            className={cn(
              'px-6 py-3 rounded-lg font-medium transition-all duration-300',
              selectedCategory === category
                ? 'bg-cyber-cyan text-space-blue shadow-lg shadow-cyber-cyan/25'
                : 'bg-dark-slate border border-slate-gray/20 text-soft-white hover:border-cyber-cyan/50 hover:text-cyber-cyan'
            )}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
