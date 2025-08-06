import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-dark-slate border border-slate-gray/20 rounded-xl p-6 transition-all duration-300',
        hover && 'hover:border-cyber-cyan/50 hover:shadow-lg hover:shadow-cyber-cyan/10 hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  )
}
