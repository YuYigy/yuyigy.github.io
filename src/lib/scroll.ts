export function smoothScrollTo(elementId: string, offset: number = 0) {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

export function useScrollDirection() {
  if (typeof window === 'undefined') return 'up'
  
  let lastScrollY = window.pageYOffset
  let ticking = false

  const updateScrollDirection = () => {
    const scrollY = window.pageYOffset
    const direction = scrollY > lastScrollY ? 'down' : 'up'
    lastScrollY = scrollY > 0 ? scrollY : 0
    ticking = false
    return direction
  }

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollDirection)
      ticking = true
    }
  }

  return { onScroll, updateScrollDirection }
}

export function getScrollProgress(): number {
  if (typeof window === 'undefined') return 0
  
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}
