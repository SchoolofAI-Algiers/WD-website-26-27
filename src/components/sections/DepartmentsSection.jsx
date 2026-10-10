import { useRef, useState } from 'react'
import ironManPoster from '../../assets/dep/Art Plate (1).png'
import lokiPoster from '../../assets/dep/Art Plate (2).png'
import strangePoster from '../../assets/dep/Art Plate (4).png'
import visionPoster from '../../assets/dep/Art Plate (3).png'
import doomPoster from '../../assets/dep/Art Plate (5).png'
import cyclopsPoster from '../../assets/dep/Art Plate (6).png'

const DEPARTMENTS = [
  // [id, name, slogan, description, accent, mark, poster, posterWidth, posterHeight]
  ['01', 'LEAD', 'ONE CALL ASSEMBLES US ALL', 'Oversees all of SOAI — takes the lead on every project and always has the final say.', '#f6c900', 'LEAD', ironManPoster, 672, 825],
  ['02', 'CONTENT CREATION', 'CONJURING STORIES FROM THE MULTIVERSE', 'Scripts, shoots and edits reels, recaps and interviews that make SOAI impossible to ignore.', '#ff5c38', 'CC', strangePoster, 336, 413],
  ['03', 'EVENTS & LOGISTICS', 'MISCHIEF, MANAGED TO PERFECTION', 'Turns chaos into flawless Welcome Days, summits and workshops — venues, planning and backstage magic.', '#8bda80', 'EV', lokiPoster, 336, 413],
  ['04', 'TECHNICAL', 'BUILT TO LEARN. BORN TO BUILD.', 'Ships AI workshops, projects and challenges — Python, ML and code that powers everything SOAI creates.', '#f486be', 'TECH', visionPoster, 336, 413],
  ['05', 'MARKETING', 'EYES ON EVERY TIMELINE', 'Puts SOAI on every feed — strategy, comms and partnerships that keep the community locked in.', '#63b8ff', 'MKT', cyclopsPoster, 684, 792],
  ['06', 'DESIGN', 'DOOM DESIGNS. ALL ELSE OBEYS.', 'Crafts posters, identities and stages with iron precision — every pixel rules with purpose.', '#c5a1ff', 'DES', doomPoster, 684, 789],
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
  const [activeDot, setActiveDot] = useState(0)
  const marqueeRef = useRef(null)
  const togglePaused = () => setPaused((value) => !value)
  const handleTrackKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      togglePaused()
    }
  }
  const handleMarqueeScroll = () => {
    const el = marqueeRef.current
    if (!el) return
    const cards = Array.from(el.querySelectorAll('.department-card-wrap')).filter(
      (card) => card.offsetWidth > 0,
    )
    if (cards.length === 0) return
    const center = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let bestDist = Infinity
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const dist = Math.abs(cardCenter - center)
      if (dist < bestDist) {
        bestDist = dist
        best = index
      }
    })
    setActiveDot((prev) => (prev === best ? prev : best))
  }
  const scrollToCard = (index) => {
    const el = marqueeRef.current
    if (!el) return
    const cards = Array.from(el.querySelectorAll('.department-card-wrap')).filter(
      (card) => card.offsetWidth > 0,
    )
    cards[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <section id="departments" className="departments-section" aria-labelledby="departments-title">
      <div className="departments-section__inner bg-700-red">
        <header className="departments-section__header">
          <div>
            <h2 id="departments-title" className="departments-section__title">PICK YOUR<br />DEPARTMENT</h2>
          </div>
        </header>
        <div className="departments-marquee" ref={marqueeRef} onScroll={handleMarqueeScroll}>
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
        <div className="departments-mobile-hint">
          <span className="departments-mobile-hint__label" aria-hidden="true">swipe →</span>
          <span className="departments-mobile-dots" role="tablist" aria-label="Department cards">
            {DEPARTMENTS.map(([id], index) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={index === activeDot}
                aria-label={`Go to department ${id}`}
                tabIndex={0}
                className={index === activeDot ? 'is-active' : undefined}
                onClick={() => scrollToCard(index)}
              />
            ))}
          </span>
        </div>
      </div>
    </section>
  )
}

export default DepartmentsSection
