import { useEffect, useState } from 'react'
import { characterById } from '../../../data/marvelGuess.js'
import { saveHiScore } from '../../../config/arcade.js'
import { initialsFor, rankFor } from '../guessUtils.js'

// Small portrait thumbnail with initials fallback (same as the card).
function RecapThumb({ charId, correct }) {
  const c = characterById[charId]
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    setFailed(false)
  }, [charId])
  return (
    <span className={`g2-thumb__frame is-${correct ? 'hit' : 'miss'}`}>
      {!failed && c.image ? (
        <img
          className="g2-thumb__img"
          src={c.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          draggable={false}
        />
      ) : (
        <span className="g2-thumb__fallback" aria-hidden="true">
          {initialsFor(c.name)}
        </span>
      )}
    </span>
  )
}

// Results: stamped rank banner, big score, thumbnail recap, play again.
export default function ResultsScreen({ score, history, onRestart }) {
  const rank = rankFor(score)
  // Persist the best score for the arcade HI-SCORE counter (keeps the max).
  useEffect(() => {
    saveHiScore('guess', score)
  }, [score])
  return (
    <div className="g2-screen" key="results">
      <p className="g2-score-final" aria-live="polite">
        {score} / 30
      </p>
      <div className="g2-stamp" role="img" aria-label={`Rank: ${rank.title}. ${rank.message}`}>
        <p className="g2-stamp__title">{rank.title}</p>
        <p className="g2-stamp__message">{rank.message}</p>
      </div>
      <ol className="g2-recap-grid" aria-label="Characters played">
        {history.map((h, i) => (
          <li key={`${h.charId}-${i}`} className="g2-thumb">
            <RecapThumb charId={h.charId} correct={h.correct} />
            <span className="g2-thumb__name">{h.name}</span>
            <span className={`g2-thumb__pts is-${h.correct ? 'hit' : 'miss'}`}>
              {h.correct ? `+${h.points}` : '+0'}
            </span>
          </li>
        ))}
      </ol>
      <div className="g2-cta-row">
        <button type="button" className="g2-btn g2-btn--primary g2-btn--hard" onClick={onRestart}>
          Play again
        </button>
      </div>
    </div>
  )
}
