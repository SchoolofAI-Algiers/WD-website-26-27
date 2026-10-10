import logoImg from '../../assets/Logo.svg'
import './HeroSection.css'

function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-section__inner">
        {/* Logo central */}
        <img
          src={logoImg}
          alt="Welcome Day Logo"
          className="hero__logo"
        />

        {/* Sur-titre */}
        <p className="hero__eyebrow">
          SCHOOL OF AI • ESI ALGIERS • 2026 - 2027
        </p>

        {/* Titre principal */}
        <h1 className="hero__title">
          <span className="hero__title-white">ASSEMBLE YOUR</span>
          <span className="hero__title-yellow">INTELLIGENCE</span>
        </h1>

        {/* Sous-tiitre */}
        <p className="hero__subtitle">
          Welcome Day 2026 • Step into the multiverse of AI.
        </p>

        {/* Capsule details WD */}
        <div className="hero__event-capsule">
          <div className="hero__event-item">
            <span className="hero__event-label">DATE</span>
            <span className="hero__event-value">October 12, 2026</span>
          </div>

          <div className="hero__event-divider" />

          <div className="hero__event-item">
            <span className="hero__event-label">TIME</span>
            <span className="hero__event-value">12:00 - 01:30</span>
          </div>

          <div className="hero__event-divider" />

          <div className="hero__event-item">
            <span className="hero__event-label">VENUE</span>
            <span className="hero__event-value">Green Space</span>
          </div>
        </div>

      </div>
    </section>
  )
}

export default HeroSection