/** @type {import('next').NextConfig} */
const nextConfig = {
  // 迁移至 Vercel：使用默认的服务器/边缘运行时能力
  // 不再进行静态导出，也不再强制 trailingSlash 或自定义 image loader
  reactStrictMode: true,
}

module.exports = nextConfig
