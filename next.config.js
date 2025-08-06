/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出
  output: 'export',

  // 为静态托管添加尾部斜杠
  trailingSlash: true,

  // 禁用图片优化（静态导出需要）
  images: {
    unoptimized: true,
  },

  // 基础路径配置（如果部署到子目录，取消注释并修改）
  // basePath: '/your-repo-name',

  // 资源前缀（如果使用 CDN，取消注释并修改）
  // assetPrefix: 'https://your-cdn.com',
}

module.exports = nextConfig
