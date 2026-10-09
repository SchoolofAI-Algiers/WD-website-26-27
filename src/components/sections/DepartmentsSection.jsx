import { useState } from 'react'
import ironManPoster from '../../assets/dep/Art Plate (1).png'
import lokiPoster from '../../assets/dep/Art Plate (2).png'
import strangePoster from '../../assets/dep/Art Plate (4).png'
import visionPoster from '../../assets/dep/Art Plate (3).png'
import doomPoster from '../../assets/dep/Art Plate (5).png'
import cyclopsPoster from '../../assets/dep/Art Plate (6).png'

const DEPARTMENTS = [
  // [id, name, slogan, description, accent, mark, poster, posterWidth, posterHeight]
  ['01', '[DEPARTMENT 1]', '[DEPARTMENT SLOGAN]', '[Department description]', '#f6c900', 'AI', ironManPoster, 672, 825],
  ['02', '[DEPARTMENT 2]', '[DEPARTMENT SLOGAN]', '[Department description]', '#ff5c38', '</>', strangePoster, 336, 413],
  ['03', '[DEPARTMENT 3]', '[DEPARTMENT SLOGAN]', '[Department description]', '#8bda80', '{ }', lokiPoster, 336, 413],
  ['04', '[DEPARTMENT 4]', '[DEPARTMENT SLOGAN]', '[Department description]', '#f486be', 'RO', visionPoster, 336, 413],
  ['05', '[DEPARTMENT 5]', '[DEPARTMENT SLOGAN]', '[Department description]', '#63b8ff', 'SEC', doomPoster, 684, 789],
  ['06', '[DEPARTMENT 6]', '[DEPARTMENT SLOGAN]', '[Department description]', '#c5a1ff', 'SOAI', cyclopsPoster, 684, 792],
]

// Single source of truth for the card markup. Rendered twice for the
// seamless marquee loop; the second copy is hidden from assistive tech.
function DepartmentCards({ hidden = false }) {
  return DEPARTMENTS.map(([id, name, slogan, description, accent, mark, poster, posterWidth, posterHeight], index) => (
    <li className="department-card-wrap" key={hidden ? `${id}-duplicate` : id} style={{ '--card-index': index }}>
      <article
        className="department-card"
        style={{ '--department-accent': accent }}
        tabIndex={hidden ? -1 : undefined}
      >
        <div className="department-card__top">
          <span>DEPT. {id}</span>
          <span className="department-card__status"><i aria-hidden="true" />OPEN</span>
        </div>
        <div className={`department-card__art${poster ? ' department-card__art--poster' : ''}`} aria-hidden="true">
          {poster ? (
            <img
              className="department-card__poster"
              src={poster}
              alt=""
              loading="lazy"
              decoding="async"
              width={posterWidth}
              height={posterHeight}
              draggable={false}
            />
          ) : (
            <>
              <span className="department-card__art-orbit" />
              <span className="department-card__art-number">{id}</span>
              <span className="department-card__art-mark">{mark}</span>
              <span className="department-card__art-label">{name}</span>
            </>
          )}
        </div>
        <div className="department-card__copy">
          <h3>{name}</h3>
          <p className="department-card__slogan">{slogan}</p>
          <p className="department-card__description">{description}</p>
        </div>
        <footer className="department-card__footer">
          <span>SOAI - 2026 / 2027</span>
          <span className="department-card__bars" aria-hidden="true"><i /><i /><i /></span>
        </footer>
      </article>
    </li>
  ))
}

function DepartmentsSection() {
  const [paused, setPaused] = useState(false)
  const togglePaused = () => setPaused((value) => !value)
  const handleTrackKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      togglePaused()
    }
  }

  return (
    <section id="departments" className="departments-section" aria-labelledby="departments-title">
      <div className="departments-section__inner bg-700-red">
        <header className="departments-section__header">
          <div>
            <h2 id="departments-title" className="departments-section__title">PICK YOUR<br />DEPARTMENT</h2>
          </div>
        </header>
        <div className="departments-marquee">
          <div
            className={`departments-track${paused ? ' is-paused' : ''}`}
            role="button"
            tabIndex={0}
            aria-pressed={paused}
            aria-label="School of AI departments. Cards scroll automatically. Activate to pause or resume."
            onClick={togglePaused}
            onKeyDown={handleTrackKeyDown}
          >
            <ul className="departments-list">
              <DepartmentCards />
            </ul>
            <ul className="departments-list departments-list--duplicate" aria-hidden="true">
              <DepartmentCards hidden />
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DepartmentsSection
