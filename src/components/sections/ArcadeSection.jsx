import joystickIcon from '../../assets/arcade-joystick.svg'
import padlockIcon from '../../assets/padlock-yellow.svg'

const CABINETS = [
  { id: 'cabinet-1', label: 'Locked game cabinet 1' },
  { id: 'cabinet-2', label: 'Locked game cabinet 2' },
]

function ArcadeSection() {
  return (
    <section id="arcade" className="arcade-section" aria-labelledby="arcade-title">
      <div className="arcade-inner">
        <div className="arcade-top-divider" aria-hidden="true">
          <span className="arcade-line arcade-line--short" />
          <img
            className="arcade-game-icon"
            src={joystickIcon}
            alt=""
          />
          <span className="arcade-line arcade-line--short" />
        </div>

        <h2 id="arcade-title" className="arcade-title">
          ARCADE
        </h2>
        <p className="arcade-subtitle arcade-subtitle--white">
          TWO MINI GAMES. LOCKED FOR NOW.
        </p>
        <p className="arcade-subtitle arcade-subtitle--yellow">
          They unlock on Welcome Day. Are you ready to play?
        </p>

        <ul className="arcade-cabinets">
          {CABINETS.map((cabinet) => (
            <li key={cabinet.id}>
              <article className="arcade-card" aria-label={cabinet.label}>
                <div className="arcade-card__inner">
                  <div className="arcade-card__scores">
                    <div className="arcade-score">
                      <span className="arcade-score__label arcade-score__label--white">
                        1UP
                      </span>
                      <span className="arcade-score__value">00000</span>
                    </div>
                    <div className="arcade-score arcade-score--right">
                      <span className="arcade-score__label">HI-SCORE</span>
                      <span className="arcade-score__value">00000</span>
                    </div>
                  </div>
                  <div className="arcade-card__lock">
                    <img
                      className="arcade-card__padlock"
                      src={padlockIcon}
                      alt=""
                      aria-hidden="true"
                    />
                    <p className="arcade-card__locked">LOCKED</p>
                  </div>
                  <p className="arcade-card__unlock">
                    <span className="arcade-card__unlock-label">UNLOCKS ON</span>
                    <span className="arcade-card__unlock-date">
                      OCTOBER 12 2026
                    </span>
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="arcade-bottom-divider" aria-hidden="true">
          <span className="arcade-line arcade-line--long" />
          <span className="arcade-line arcade-line--long" />
        </div>
      </div>
    </section>
  )
}

export default ArcadeSection
