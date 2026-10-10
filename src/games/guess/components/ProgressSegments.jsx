// 10 small segments: filled green/red for completed rounds, pulsing
// outline for the current one. Text alternative via aria-label.
export default function ProgressSegments({ total, history, currentIndex }) {
  return (
    <div
      className="g2-progress"
      role="img"
      aria-label={`Round ${currentIndex + 1} of ${total}, ${history.length} answered`}
    >
      {Array.from({ length: total }, (_, i) => {
        const done = history[i]
        const cls = done
          ? (done.correct ? ' is-hit' : ' is-miss')
          : (i === currentIndex ? ' is-current' : '')
        return <span key={i} className={`g2-progress__seg${cls}`} />
      })}
    </div>
  )
}
