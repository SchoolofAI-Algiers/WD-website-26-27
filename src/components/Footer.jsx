const containerStyle = {
  padding: '2rem',
  borderTop: '1px solid #e5e5e5',
  textAlign: 'center',
}

function Footer() {
  return (
    <footer className="footer" style={containerStyle}>
      <div className="footer__inner">
        <p className="footer__text">
          Placeholder footer — links, contact info, and credits go here.
        </p>
        <p className="footer__copy">© 2026 WD-website-26-27. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
