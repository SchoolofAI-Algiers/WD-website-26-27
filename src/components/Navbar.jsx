import { useEffect, useState } from 'react'
import logo from '../assets/Logo.png'

const NAV_LINKS = [
  { id: 'hero', href: '#hero', label: 'HOME' },
  { id: 'who-are-we', href: '#who-are-we', label: 'WHO ARE WE' },
  { id: 'departments', href: '#departments', label: 'DEPARTMENTS' },
  { id: 'arcade', href: '#arcade', label: 'ARCADE' },
]

const barStyle = {
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
}

function Navbar({ minimal = false }) {
  const [activeId, setActiveId] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (section) => section !== null,
    )
    if (sections.length === 0) {
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleLinkClick = (id) => {
    setActiveId(id)
    setIsMenuOpen(false)
  }

  // Standalone quiz page nav: logo + a way back, nothing else.
  if (minimal) {
    return (
      <header className="navbar" style={barStyle}>
        <nav
          className="navbar__inner"
          aria-label="Quiz navigation"
          style={{ position: 'relative' }}
        >
          <a className="navbar__brand" href="#/" aria-label="Back to site home">
            <img className="navbar__logo" src={logo} alt="WD-website-26-27 logo" />
          </a>
          <ul className="navbar__links" style={{ display: 'flex' }}>
            <li className="navbar__item">
              <a className="navbar__link" href="#/">
                ← BACK TO SITE
              </a>
            </li>
          </ul>
        </nav>
      </header>
    )
  }

  return (
    <header className="navbar" style={barStyle}>
      <nav className="navbar__inner" aria-label="Main navigation">
        <a
          className="navbar__brand"
          href="#hero"
          aria-label="WD-website-26-27 home"
          onClick={() => handleLinkClick('hero')}
        >
          <img className="navbar__logo" src={logo} alt="WD-website-26-27 logo" />
        </a>
        <button
          type="button"
          className="navbar__toggle"
          aria-label="Toggle Navigation"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
        <ul
          id="primary-navigation"
          className={isMenuOpen ? 'navbar__links is-open' : 'navbar__links'}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.id} className="navbar__item">
              <a
                href={link.href}
                className={link.id === activeId ? 'navbar__link is-active' : 'navbar__link'}
                aria-current={link.id === activeId ? 'page' : undefined}
                onClick={() => handleLinkClick(link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
