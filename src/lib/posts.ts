import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), '_posts')

export interface PostData {
  slug: string
  title: string
  date: string
  description?: string
  category?: string
  tags?: string[]
  featured?: boolean
  readingTime?: number
}

export interface Post extends PostData {
  content: string
  contentHtml: string
}

// 计算阅读时间（基于平均阅读速度 200 字/分钟）
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// 获取所有文章列表
export async function getPosts(): Promise<PostData[]> {
  // 检查 _posts 目录是否存在
  if (!fs.existsSync(postsDirectory)) {
    console.warn('_posts directory does not exist')
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString().split('T')[0],
          description: data.description || '',
          category: data.category || '',
          tags: data.tags || [],
          featured: data.featured || false,
          readingTime: calculateReadingTime(content),
        } as PostData
      })
  )

  // 按日期排序（最新的在前）
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// 根据 slug 获取单篇文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    // 检查文件是否存在
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // 将 Markdown 转换为 HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content)
    
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      description: data.description || '',
      category: data.category || '',
      tags: data.tags || [],
      featured: data.featured || false,
      readingTime: calculateReadingTime(content),
      content,
      contentHtml,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// 获取所有文章的 slug（用于静态生成）
export async function getAllPostSlugs(): Promise<string[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''))
}

// 获取精选文章
export async function getFeaturedPosts(): Promise<PostData[]> {
  const allPosts = await getPosts()
  return allPosts.filter(post => post.featured)
}

// 根据分类获取文章
export async function getPostsByCategory(category: string): Promise<PostData[]> {
  const allPosts = await getPosts()
  return allPosts.filter(post => post.category === category)
}

// 获取所有分类
export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getPosts()
  const categories = allPosts
    .map(post => post.category)
    .filter((category): category is string => category !== undefined && category.trim() !== '')

  return Array.from(new Set(categories))
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getPosts()
  const tags = allPosts
    .flatMap(post => post.tags || [])
    .filter(tag => tag && tag.trim() !== '')
  
  return Array.from(new Set(tags))
}
