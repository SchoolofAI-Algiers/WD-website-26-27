const containerStyle = {
  padding: '1rem 2rem',
  borderBottom: '1px solid #e5e5e5',
}

function Navbar() {
  return (
    <header className="navbar" style={containerStyle}>
      <nav className="navbar__inner" aria-label="Main navigation">
        <a className="navbar__brand" href="#hero">
          WD-website-26-27
        </a>
        <ul className="navbar__links">
          <li>
            <a href="#hero">Home</a>
          </li>
          <li>
            <a href="#who-are-we">Who Are We</a>
          </li>
          <li>
            <a href="#departments">Departments</a>
          </li>
          <li>
            <a href="#arcade">Arcade</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
