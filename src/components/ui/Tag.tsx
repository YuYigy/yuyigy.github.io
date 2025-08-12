import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TagProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary'
  size?: 'sm' | 'md'
  className?: string
}

export default function Tag({
  children,
  variant = 'default',
  size = 'sm',
  className,
}: TagProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors duration-300 whitespace-nowrap'
  
  const variants = {
    default: 'bg-slate-gray/20 text-slate-gray hover:bg-slate-gray/30',
    primary: 'bg-cyber-cyan/20 text-cyber-cyan hover:bg-cyber-cyan/30',
    secondary: 'bg-soft-white/10 text-soft-white hover:bg-soft-white/20',
  }
  
  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
  }

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
