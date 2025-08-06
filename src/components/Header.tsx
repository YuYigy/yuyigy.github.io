import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-dark-slate/80 backdrop-blur-sm border-b border-slate-gray/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-cyber-cyan to-soft-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-space-blue font-title font-bold text-lg">Y</span>
            </div>
            <span className="font-title font-bold text-xl text-gradient">
              Project Stardust
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-soft-white hover:text-cyber-cyan transition-colors duration-300 font-medium"
            >
              首页
            </Link>
            <Link
              href="/about"
              className="text-soft-white hover:text-cyber-cyan transition-colors duration-300 font-medium"
            >
              关于
            </Link>
            <a
              href="https://github.com/yuyigy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-soft-white hover:text-cyber-cyan transition-colors duration-300 font-medium"
            >
              GitHub
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-soft-white hover:text-cyber-cyan transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
