import { rehypePrettyCode } from 'rehype-pretty-code'

export const rehypePrettyCodeOptions = {
  theme: {
    dark: 'github-dark-dimmed',
    light: 'github-light'
  },
  keepBackground: false,
  defaultLang: 'plaintext',
  onVisitLine(node: any) {
    // 防止空行折叠
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node: any) {
    // 高亮行样式
    node.properties.className = ['line--highlighted']
  },
  onVisitHighlightedWord(node: any) {
    // 高亮词样式
    node.properties.className = ['word--highlighted']
  },
}

export const rehypePlugins = [
  [rehypePrettyCode, rehypePrettyCodeOptions]
]
