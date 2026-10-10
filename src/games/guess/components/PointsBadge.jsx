// Yellow star-burst badge pinned to the portrait corner. Re-mounts on
// change (key) for the 150ms number pop.
export default function PointsBadge({ worth }) {
  return (
    <p className="g2-star" key={worth} aria-live="polite" aria-label={`Worth ${worth} points`}>
      <span className="g2-star__num" aria-hidden="true">{worth}</span>
      <span className="g2-star__unit" aria-hidden="true">pts</span>
    </p>
  )
}
