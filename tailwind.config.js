/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 科技极简主义深色主题色彩方案
        'space-blue': '#0A192F',      // 深邃星空蓝 - 背景色
        'soft-white': '#E6F1FF',      // 柔和亮白色 - 主文本
        'cyber-cyan': '#64FFDA',      // 赛博青 - 主要高亮色
        'slate-gray': '#8892B0',      // 石板灰 - 次要高亮/边框色
        'dark-slate': '#112240',      // 深石板色 - 卡片背景
        'light-slate': '#233554',     // 浅石板色 - 悬停状态
      },
      fontFamily: {
        // 标题字体 - 科技感
        'title': ['Exo 2', 'Orbitron', 'sans-serif'],
        // 正文字体 - 可读性
        'body': ['Inter', 'Lato', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1' }],
        'section': ['2.5rem', { lineHeight: '1.2' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #64FFDA' },
          '100%': { boxShadow: '0 0 20px #64FFDA, 0 0 30px #64FFDA' },
        },
      },
      backgroundImage: {
        'grid-pattern': `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23233554' fill-opacity='0.1'%3e%3cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
      },
      maxWidth: {
        'reading': '80ch',
      },
      typography: {
        invert: {
          css: {
            '--tw-prose-body': '#E6F1FF',
            '--tw-prose-headings': '#64FFDA',
            '--tw-prose-lead': '#8892B0',
            '--tw-prose-links': '#64FFDA',
            '--tw-prose-bold': '#E6F1FF',
            '--tw-prose-counters': '#8892B0',
            '--tw-prose-bullets': '#8892B0',
            '--tw-prose-hr': '#233554',
            '--tw-prose-quotes': '#E6F1FF',
            '--tw-prose-quote-borders': '#64FFDA',
            '--tw-prose-captions': '#8892B0',
            '--tw-prose-code': '#64FFDA',
            '--tw-prose-pre-code': '#E6F1FF',
            '--tw-prose-pre-bg': '#112240',
            '--tw-prose-th-borders': '#233554',
            '--tw-prose-td-borders': '#233554',
            lineHeight: '1.8',
            fontSize: '1.1rem',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
