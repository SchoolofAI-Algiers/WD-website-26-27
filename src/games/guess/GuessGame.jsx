import { useEffect, useMemo, useRef } from 'react'
import useGuessGame from './useGuessGame.js'
import { MAX_CLUES, shuffle } from './guessUtils.js'
import { CHARACTERS } from '../../data/marvelGuess.js'
import DossierCard from './components/DossierCard.jsx'
import ClueRow from './components/ClueRow.jsx'
import AnswerOption from './components/AnswerOption.jsx'
import ProgressSegments from './components/ProgressSegments.jsx'
import PointsBadge from './components/PointsBadge.jsx'
import ResultsScreen from './components/ResultsScreen.jsx'
import './guess.css'

const STRIP = [
  { points: 3, line: 'Guess with 1 clue' },
  { points: 2, line: 'Need 2 clues' },
  { points: 1, line: 'Use all 3 clues' },
]

// One decorative mystery card (same "?" texture language as the flip).
function TrioCard() {
  return (
    <div className="g2-trio__card">
      <span className="g2-trio__q" aria-hidden="true">?</span>
    </div>
  )
}

function IntroScreen({ onStart }) {
  // Fresh random trio per visit, stable across re-renders.
  const trio = useMemo(() => shuffle(CHARACTERS).slice(0, 3), [])
  // Local starfield: tiny dots plus a few edge-only hero sparkles.
  // Stable per mount; the global body tile stays untouched for other screens.
  const stars = useMemo(() => {
    const dots = Array.from({ length: 34 }, (_, i) => {
      const leftSide = i % 2 === 0
      return {
        id: `d${i}`,
        left: leftSide ? 2 + Math.random() * 20 : 78 + Math.random() * 20,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        gold: Math.random() < 0.3,
        dur: 4 + Math.random() * 3,
        delay: Math.random() * 5,
      }
    })
    const heroes = Array.from({ length: 4 }, (_, i) => {
      const leftSide = i % 2 === 0
      return {
        id: `h${i}`,
        left: leftSide ? 3 + Math.random() * 12 : 85 + Math.random() * 12,
        top: 8 + Math.random() * 84,
        size: 10 + Math.random() * 4,
        gold: i % 2 === 0,
        dur: 5 + Math.random() * 2,
        delay: Math.random() * 5,
      }
    })
    return [...dots, ...heroes]
  }, [])
  const startRef = useRef(null)
  useEffect(() => {
    startRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <div className="g2-screen g2-intro" key="intro">
      <div className="g2-sky" aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.id}
            className={`g2-sky__star${s.size >= 10 ? ' is-hero' : ''}${s.gold ? ' is-gold' : ''}`}
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="g2-trio" aria-hidden="true">
        <div className="g2-trio__burst" />
        {trio.map((c) => (
          <TrioCard key={c.id} character={c} />
        ))}
      </div>
      <h2 className="g2-title">Guess the Character</h2>
      <p className="g2-subtitle">
        Spot the Marvel character from the clues. The fewer clues you use, the more points you earn.
      </p>
      <ul className="g2-strip" aria-label="How it works">
        {STRIP.map(({ points, line }) => (
          <li
            key={points}
            className="g2-strip__card"
            aria-label={`${points} points: ${line.toLowerCase()}`}
          >
            <span className="g2-star g2-star--static" aria-hidden="true">
              <span className="g2-star__num">{points}</span>
            </span>
            <span className="g2-strip__line">{line}</span>
          </li>
        ))}
      </ul>
      <p className="g2-rounds-note">10 rounds. Max score 30.</p>
      <div className="g2-cta-row g2-cta-row--center">
        <button
          ref={startRef}
          type="button"
          className="g2-btn g2-btn--start"
          onClick={onStart}
        >
          <svg className="g2-play" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 2l10 6-10 6z" fill="currentColor" />
          </svg>
          Start game
        </button>
      </div>
      <p className="g2-hint">Press Enter to start</p>
    </div>
  )
}

function RoundScreen({ game }) {
  const {
    roundChar, options, nameById, roundIndex, totalRounds,
    cluesRevealed, selected, score, history,
    announcement, isLastRound,
    reveal, answer, next,
  } = game
  const locked = game.phase === 'feedback'
  const worth = 4 - cluesRevealed
  const lastEntry = history[history.length - 1]

  const optionState = (id) => {
    if (!locked) return selected === id ? 'selected' : 'default'
    if (id === roundChar.id) return 'correct'
    if (id === selected) return 'wrong'
    return 'dimmed'
  }

  return (
    <div className="g2-screen" key={`round-${roundIndex}`}>
      <div className="g2-topbar">
        <ProgressSegments
          total={totalRounds}
          history={history}
          currentIndex={roundIndex}
        />
        <p className="g2-score-line" aria-live="polite">Score {score}</p>
      </div>

      <h3 className="g2-round-title">Round {roundIndex + 1} of {totalRounds}</h3>

      <DossierCard
        character={roundChar}
        revealed={locked}
        flash={locked ? (lastEntry?.correct ? 'hit' : 'miss') : null}
        badge={!locked ? <PointsBadge worth={worth} /> : null}
      >
        {roundChar.clues.map((clue, i) => (
          <ClueRow
            key={`${roundChar.id}-${i}`}
            number={i + 1}
            text={clue}
            revealed={locked || i < cluesRevealed}
          />
        ))}
        {!locked && cluesRevealed < MAX_CLUES && (
          <button type="button" className="g2-btn g2-btn--primary g2-btn--hard g2-reveal" onClick={reveal}>
            Reveal clue {cluesRevealed + 1}
          </button>
        )}
      </DossierCard>

      <div className="g2-options" role="group" aria-label={`Suspects for round ${roundIndex + 1}`}>
        {options.map((id) => (
          <AnswerOption
            key={id}
            name={nameById[id]}
            state={optionState(id)}
            disabled={locked}
            onSelect={() => answer(id)}
          />
        ))}
      </div>

      {locked && lastEntry && (
        <div className="g2-verdict">
          <p className="g2-verdict__text">
            {lastEntry.correct
              ? `Correct! +${lastEntry.points} points`
              : `Not quite, it was ${roundChar.name}`}
          </p>
          <button type="button" className="g2-btn g2-btn--primary g2-btn--hard" onClick={next}>
            {isLastRound ? 'See results' : 'Next'}
          </button>
        </div>
      )}

      <p className="g2-sr" aria-live="polite">{announcement}</p>
    </div>
  )
}

export default function GuessGame() {
  const game = useGuessGame()

  // Preload the next round's portrait so the reveal never flickers.
  useEffect(() => {
    if (game.nextImage) {
      const img = new Image()
      img.src = game.nextImage
    }
  }, [game.nextImage])

  return (
    <section className="g2" aria-labelledby="game-2-title">
      <h2 id="game-2-title" className="g2-sr">Game 2: Guess the Marvel Character</h2>
      {game.phase === 'intro' && <IntroScreen onStart={game.start} />}
      {(game.phase === 'playing' || game.phase === 'feedback') && game.roundChar && (
        <RoundScreen game={game} />
      )}
      {game.phase === 'results' && (
        <ResultsScreen score={game.score} history={game.history} onRestart={game.restart} />
      )}
    </section>
  )
}
