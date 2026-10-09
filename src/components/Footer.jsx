import logo from '../assets/Logo.svg'
import './Footer.css'

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#who-are-we', label: 'Who are we' },
  { href: '#departments', label: 'Departments' },
  { href: '#arcade', label: 'Arcade' },
]

const SOCIAL_LINKS = [
  { href: '#', label: '[Social link]' },
  { href: '#', label: '[Social link]' },
  { href: '#', label: '[Social link]' },
]

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__row">
          <div className="site-footer__brand">
            <img
              className="site-footer__logo"
              src={logo}
              alt="Welcome Day logo"
              width="180"
              height="97"
            />
            <p className="site-footer__meta">
              October 12, 2026 · Main Campus Auditorium (Hall A)
            </p>
          </div>

          <nav className="site-footer__nav" aria-label="Footer sections">
            <p className="site-footer__label">Sections</p>
            <ul className="site-footer__list">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a className="site-footer__link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__social">
            <p className="site-footer__label">Follow</p>
            <ul className="site-footer__list">
              {SOCIAL_LINKS.map((link, index) => (
                <li key={`${link.label}-${index}`}>
                  <a
                    className="site-footer__link"
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer__bar">
          <p className="site-footer__bar-text">© 2026 School of AI - ESI Algiers</p>
          <p className="site-footer__bar-text">SOAI 2026 / 2027</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
