import { useLayoutEffect, useRef } from 'react'
import ironManPoster from '../../assets/dep/Art Plate (1).png'
import lokiPoster from '../../assets/dep/Art Plate (2).png'
import strangePoster from '../../assets/dep/Art Plate (4).png'
import visionPoster from '../../assets/dep/Art Plate (3).png'
import doomPoster from '../../assets/dep/Art Plate (5).png'
import cyclopsPoster from '../../assets/dep/Art Plate (6).png'

const DEPARTMENTS = [
  ['01', '[DEPARTMENT 1]', '[DEPARTMENT SLOGAN]', '[Department description]', '#f6c900', 'AI', ironManPoster],
  ['02', '[DEPARTMENT 2]', '[DEPARTMENT SLOGAN]', '[Department description]', '#ff5c38', '</>', strangePoster],
  ['03', '[DEPARTMENT 3]', '[DEPARTMENT SLOGAN]', '[Department description]', '#8bda80', '{ }', lokiPoster],
  ['04', '[DEPARTMENT 4]', '[DEPARTMENT SLOGAN]', '[Department description]', '#f486be', 'RO', visionPoster],
  ['05', '[DEPARTMENT 5]', '[DEPARTMENT SLOGAN]', '[Department description]', '#63b8ff', 'SEC', doomPoster],
  ['06', '[DEPARTMENT 6]', '[DEPARTMENT SLOGAN]', '[Department description]', '#c5a1ff', 'SOAI', cyclopsPoster],
]

function DepartmentsSection() {
  const scrollerRef = useRef(null)

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const resetToStart = () => {
      scroller.style.scrollBehavior = 'auto'
      scroller.scrollLeft = 0
      requestAnimationFrame(() => {
        scroller.style.scrollBehavior = ''
      })
    }
    resetToStart()

    // Restore the initial position after the browser applies any saved scroll state.
    const frame = requestAnimationFrame(() => {
      resetToStart()
      requestAnimationFrame(() => {
        scroller.style.scrollBehavior = ''
      })
    })
    window.addEventListener('pageshow', resetToStart)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pageshow', resetToStart)
    }
  }, [])

  return (
    <section id="departments" className="departments-section" aria-labelledby="departments-title">
      <div className="departments-section__inner bg-700-red">
        <header className="departments-section__header">
          <div>
            <p className="departments-section__eyebrow">03 / DEPARTMENTS</p>
            <h2 id="departments-title" className="departments-section__title">PICK YOUR<br />DEPARTMENT</h2>
          </div>
          <p className="departments-section__intro">Six departments, one lineup.<br />Scroll sideways to meet them all.</p>
        </header>
        <div
          className="departments-section__scroller"
          ref={scrollerRef}
          role="region"
          aria-label="School of AI departments. Scroll horizontally if needed."
          tabIndex={0}
        >
          <ul className="departments-list">
            {DEPARTMENTS.map(([id, name, slogan, description, accent, mark, poster], index) => (
              <li className="department-card-wrap" key={id} style={{ '--card-index': index }}>
                <article className="department-card" style={{ '--department-accent': accent }}>
                  <div className="department-card__top">
                    <span>DEPT. {id}</span>
                    <span className="department-card__status"><i aria-hidden="true" />OPEN</span>
                  </div>
                  <div className={`department-card__art${poster ? ' department-card__art--poster' : ''}`} aria-hidden="true">
                    {poster ? (
                      <img className="department-card__poster" src={poster} alt="" />
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
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default DepartmentsSection
