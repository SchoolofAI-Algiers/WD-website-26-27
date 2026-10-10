import joystickIcon from '../../assets/arcade-joystick.svg'
import padlockIcon from '../../assets/padlock-yellow.svg'
import { ARCADE_UNLOCKED, formatHiScore, getArcadeGames, getHiScore } from '../../config/arcade.js'

const PIXEL_YELLOW = '#ffce05'

// Pixel-art icons on a 12x12 grid (no external images). Same yellow and
// same 120x120 slot as the padlock.
function WizardHatIcon() {
  const rects = [
    [5, 0, 2, 1], [5, 1, 2, 2], [4, 3, 4, 1], [4, 4, 4, 1],
    [3, 5, 6, 1], [3, 6, 6, 1], [2, 7, 8, 1], [1, 8, 10, 2],
    [1, 3, 1, 3], [0, 4, 3, 1],
    [10, 1, 1, 3], [9, 2, 3, 1],
  ]
  return (
    <svg className="arcade-card__padlock" viewBox="0 0 12 12" shapeRendering="crispEdges" aria-hidden="true">
      {rects.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={PIXEL_YELLOW} />
      ))}
    </svg>
  )
}

function QuestionBlockIcon() {
  const rects = [
    [2, 1, 8, 1], [2, 10, 8, 1], [2, 2, 1, 8], [9, 2, 1, 8],
    [4, 3, 4, 1], [7, 4, 1, 1], [7, 5, 1, 1], [6, 6, 1, 1],
    [5, 7, 1, 1], [5, 9, 1, 1],
  ]
  return (
    <svg className="arcade-card__padlock" viewBox="0 0 12 12" shapeRendering="crispEdges" aria-hidden="true">
      {rects.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={PIXEL_YELLOW} />
      ))}
    </svg>
  )
}

const GAME_ICONS = {
  sorcerer: <WizardHatIcon />,
  guess: <QuestionBlockIcon />,
}

function LockedCabinet({ label }) {
  return (
    <article className="arcade-card" aria-label={label} aria-disabled="true">
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
            WILL BE OPEN SOON
          </span>
        </p>
      </div>
    </article>
  )
}

function UnlockedCabinet({ game }) {
  return (
    <a
      className="arcade-card is-unlocked"
      href={game.route}
      aria-label={`Play ${game.title}`}
    >
      <div className="arcade-card__inner is-powered">
        <div className="arcade-card__scores">
          <div className="arcade-score">
            <span className="arcade-score__label arcade-score__label--white">
              1UP
            </span>
            <span className="arcade-score__value">00000</span>
          </div>
          {game.id !== 'sorcerer' ? (
            <div className="arcade-score arcade-score--right">
              <span className="arcade-score__label">HI-SCORE</span>
              <span className="arcade-score__value">{formatHiScore(getHiScore(game.id))}</span>
            </div>
          ) : (
            /* Invisible twin keeps the header row the same height on both cards. */
            <div className="arcade-score arcade-score--right" aria-hidden="true" style={{ visibility: 'hidden' }}>
              <span className="arcade-score__label">HI-SCORE</span>
              <span className="arcade-score__value">00000</span>
            </div>
          )}
        </div>
        <div className="arcade-card__lock">
          {GAME_ICONS[game.id] ?? <WizardHatIcon />}
          <p className="arcade-card__locked">{game.title}</p>
        </div>
        <p className="arcade-card__unlock">
          <span className="arcade-card__unlock-label">{game.tagline}</span>
          <span className="arcade-card__unlock-date arcade-blink">
            PRESS START
          </span>
        </p>
      </div>
    </a>
  )
}

function ArcadeSection() {
  const games = getArcadeGames()
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
          {ARCADE_UNLOCKED ? 'Two mini games. Pick one and play.' : 'TWO MINI GAMES. LOCKED FOR NOW.'}
        </p>
        <p className="arcade-subtitle arcade-subtitle--yellow">
          {ARCADE_UNLOCKED ? 'The arcade is open. Beat the high score.' : 'They unlock on Welcome Day. Are you ready to play?'}
        </p>

        <ul className="arcade-cabinets">
          {games.map((game) => (
            <li key={game.id}>
              {game.unlocked
                ? <UnlockedCabinet game={game} />
                : <LockedCabinet label={`Locked game cabinet: ${game.title}`} />}
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
