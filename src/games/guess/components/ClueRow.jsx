// Speech bubble. Locked clues are slim collapsed bubbles (lock icon +
// "Clue N locked"), never big empty boxes. The number badge marks the
// order; there is no label column.
function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

export default function ClueRow({ number, text, revealed }) {
  return (
    <div className={`g2-bubble${revealed ? ' is-open' : ''}`}>
      <span className="g2-bubble__num" aria-hidden="true">{number}</span>
      <div className="g2-bubble__collapsible" aria-hidden={!revealed}>
        <div className="g2-bubble__inner">
          <p className="g2-bubble__text">{text}</p>
        </div>
      </div>
      {!revealed && (
        <p className="g2-bubble__locked">
          <LockIcon /> Clue {number} locked
        </p>
      )}
    </div>
  )
}
