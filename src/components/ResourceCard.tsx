import { ExternalLink, Download, FileText, Link as LinkIcon } from 'lucide-react'
import { Resource } from '@/lib/mdx'
import Card from './ui/Card'
import Tag from './ui/Tag'
import Button from './ui/Button'

interface ResourceCardProps {
  resource: Resource
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const isExternalLink = resource.url.startsWith('http')
  const isFile = resource.type === 'file'

  const handleClick = () => {
    if (isExternalLink) {
      window.open(resource.url, '_blank', 'noopener,noreferrer')
    } else {
      window.open(resource.url, '_blank')
    }
  }

  const getIcon = () => {
    if (isFile) {
      return <Download size={20} />
    } else if (isExternalLink) {
      return <ExternalLink size={20} />
    } else {
      return <LinkIcon size={20} />
    }
  }

  const getButtonText = () => {
    if (isFile) {
      return '下载资源'
    } else if (isExternalLink) {
      return '访问链接'
    } else {
      return '查看详情'
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="flex-1">
        {/* 资源类型图标 */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-cyber-cyan/10 rounded-lg">
            {isFile ? (
              <FileText className="w-6 h-6 text-cyber-cyan" />
            ) : (
              <LinkIcon className="w-6 h-6 text-cyber-cyan" />
            )}
          </div>
          
          <div className="flex items-center space-x-1 text-xs text-soft-white/60">
            {getIcon()}
            <span>{isFile ? '文件' : '链接'}</span>
          </div>
        </div>

        {/* 标题 */}
        <h3 className="text-lg font-title font-semibold text-soft-white mb-3 line-clamp-2">
          {resource.title}
        </h3>

        {/* 描述 */}
        <p className="text-soft-white/70 mb-4 line-clamp-3 leading-relaxed text-sm">
          {resource.description}
        </p>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {resource.tags.map((tag) => (
            <Tag key={tag} size="sm">
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="mt-auto">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleClick}
          className="w-full"
        >
          <span className="flex items-center justify-center space-x-2">
            {getIcon()}
            <span>{getButtonText()}</span>
          </span>
        </Button>
      </div>
    </Card>
  )
}
