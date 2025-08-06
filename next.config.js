/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出模式
  output: 'export',

  // 推荐：确保所有链接都以斜杠结尾，以避免在GitHub Pages上出现路由问题
  trailingSlash: true,

  // 如果你的项目中使用了next/image，需要配置这个加载器才能在静态导出后正常工作
  images: {
    loader: 'custom',
    loaderFile: './my-image-loader.js',
  },
}

module.exports = nextConfig
