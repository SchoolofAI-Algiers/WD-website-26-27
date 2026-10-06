const containerStyle = {
  padding: '4rem 2rem',
  textAlign: 'center',
}

function HeroSection() {
  return (
    <section id="hero" className="hero-section" style={containerStyle}>
      <div className="hero-section__inner">
        <h1 className="hero-section__title">Hero Section Placeholder</h1>
        <p className="hero-section__subtitle">
          Headline, tagline, and call-to-action buttons go here.
        </p>
      </div>
    </section>
  )
}

export default HeroSection
