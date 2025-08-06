import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { rehypePlugins } from './rehype-config'
import { calculateReadingTime } from './utils'

export interface PostMeta {
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  featured?: boolean
  image?: string
  slug: string
  readingTime: number
}

export interface Post extends PostMeta {
  content: string
  mdxSource?: MDXRemoteSerializeResult
}

export interface Resource {
  title: string
  description: string
  url: string
  tags: string[]
  type: 'link' | 'file'
}

const postsDirectory = path.join(process.cwd(), 'content/posts')
const resourcesDirectory = path.join(process.cwd(), 'content/resources')

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.(md|mdx)$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug,
        content,
        readingTime: calculateReadingTime(content),
        ...data,
      } as Post
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    let fileContents: string
    
    if (fs.existsSync(fullPath)) {
      fileContents = fs.readFileSync(fullPath, 'utf8')
    } else {
      const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
      if (fs.existsSync(mdxPath)) {
        fileContents = fs.readFileSync(mdxPath, 'utf8')
      } else {
        return null
      }
    }
    
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      content,
      readingTime: calculateReadingTime(content),
      ...data,
    } as Post
  } catch (error) {
    return null
  }
}

export function getFeaturedPosts(): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.featured).slice(0, 6)
}

export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.category === category)
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts()
  const categories = allPosts.map(post => post.category)
  return Array.from(new Set(categories))
}

export function getAllResources(): Resource[] {
  if (!fs.existsSync(resourcesDirectory)) {
    return []
  }

  const fileName = 'resources.json'
  const fullPath = path.join(resourcesDirectory, fileName)

  if (!fs.existsSync(fullPath)) {
    return []
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return JSON.parse(fileContents) as Resource[]
}

export async function getPostWithMDX(slug: string): Promise<Post | null> {
  const post = getPostBySlug(slug)
  if (!post) return null

  try {
    const mdxSource = await serialize(post.content, {
      mdxOptions: {
        rehypePlugins: rehypePlugins,
      },
    })

    return {
      ...post,
      mdxSource,
    }
  } catch (error) {
    console.error('Error serializing MDX:', error)
    return post
  }
}
