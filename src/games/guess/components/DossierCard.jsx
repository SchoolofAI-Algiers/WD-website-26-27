import { useEffect, useState } from 'react'
import { initialsFor } from '../guessUtils.js'

// Circular flip medallion: front shows the silhouette + "?", the back the
// real avatar. One flip on reveal. Same image URL on both faces (single
// load). Falls back to initials when the file is missing, so the game
// plays with zero images present.
function Portrait({ character, revealed, flash, badge }) {
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    setFailed(false)
  }, [character.image])
  const showImg = character.image && !failed

  return (
    <div className={`g2-portrait-wrap${revealed ? ' is-revealed' : ''}${flash ? ` is-${flash}` : ''}`}>
      <div className="g2-portrait__burst" aria-hidden="true" />
      <div className="g2-flip">
        <div className="g2-flip__face g2-flip__front" aria-hidden={revealed}>
          <span className="g2-flip__mystery" aria-hidden="true">?</span>
        </div>
        <div className="g2-flip__face g2-flip__back" aria-hidden={!revealed}>
          {showImg ? (
            <img
              className={`g2-flip__img${character.framed ? ' is-photo' : ''}`}
              src={character.image}
              alt={character.name}
              draggable={false}
            />
          ) : (
            <span className="g2-flip__initials" aria-hidden="true">
              {initialsFor(character.name)}
            </span>
          )}
        </div>
      </div>
      {!revealed && (
        <span className="g2-portrait__q" aria-hidden="true">?</span>
      )}
      {badge}
    </div>
  )
}

// Comic card shell: flip medallion + body (bubbles, reveal button).
export default function DossierCard({ character, revealed, flash, badge, children }) {
  return (
    <div className="g2-game-card">
      <Portrait character={character} revealed={revealed} flash={flash} badge={badge} />
      <div className="g2-card-main">{children}</div>
    </div>
  )
}
