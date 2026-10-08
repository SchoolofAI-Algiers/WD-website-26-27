import joystickIcon from '../../assets/arcade-joystick.svg'
import lightningIcon from '../../assets/lightning.svg'
import padlockIcon from '../../assets/padlock-yellow.svg'
import rocketImage from '../../assets/rocket.svg'

const CABINETS = [
  { id: 'cabinet-1', label: 'Locked game cabinet 1' },
  { id: 'cabinet-2', label: 'Locked game cabinet 2' },
]

function ArcadeSection() {
  return (
    <section id="arcade" className="arcade-section" aria-labelledby="arcade-title">
      <div className="arcade-frame">
        <div className="arcade-frame__header">
          <div className="arcade-frame__title-row">
            <img
              className="arcade-frame__bolt"
              src={lightningIcon}
              alt=""
              aria-hidden="true"
            />
            <h2 id="arcade-title" className="arcade-frame__title">
              ARCADE
            </h2>
            <img
              className="arcade-frame__bolt"
              src={lightningIcon}
              alt=""
              aria-hidden="true"
            />
          </div>
          <div className="arcade-frame__divider">
            <span className="arcade-frame__divider-line" aria-hidden="true" />
            <img
              className="arcade-frame__joystick"
              src={joystickIcon}
              alt=""
              aria-hidden="true"
            />
            <span className="arcade-frame__divider-line" aria-hidden="true" />
          </div>
          <p className="arcade-frame__subtitle arcade-frame__subtitle--white">
            TWO MINI GAMES. LOCKED FOR NOW.
          </p>
          <p className="arcade-frame__subtitle arcade-frame__subtitle--yellow">
            THEY UNLOCK ON WELCOME DAY. ARE YOU READY TO PLAY?
          </p>
        </div>
        <ul className="arcade-cabinets">
          {CABINETS.map((cabinet) => (
            <li key={cabinet.id} className="arcade-cabinet">
              <article className="arcade-card" aria-label={cabinet.label}>
                <div className="arcade-card__scores">
                  <span>1UP&nbsp;&nbsp;00000</span>
                  <span>HI-SCORE&nbsp;&nbsp;00000</span>
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
                  <span className="arcade-card__unlock-label">UNLOCKS ON&nbsp;&nbsp;</span>
                  <span className="arcade-card__unlock-date">OCTOBER 12 2026</span>
                </p>
              </article>
            </li>
          ))}
        </ul>
        <div className="arcade-frame__launch">
          <span className="arcade-frame__launch-line" aria-hidden="true" />
          <img
            className="arcade-frame__rocket"
            src={rocketImage}
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}

export default ArcadeSection
