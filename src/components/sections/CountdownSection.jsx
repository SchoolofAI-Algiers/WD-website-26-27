import { useEffect, useState } from 'react'
import './CountdownSection.css'

// Welcome Day: 12.10.2026, 14:00
const TARGET_DATE = new Date(2026, 9, 12, 14, 0, 0)

function getTimeLeft(now) {
  const diff = Math.max(0, TARGET_DATE.getTime() - now.getTime())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    mins: Math.floor((totalSeconds % 3600) / 60),
    secs: totalSeconds % 60,
  }
}

const pad = (n) => String(n).padStart(2, '0')

function CountdownSection() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const { days, hours, mins, secs } = getTimeLeft(now)
  const units = [
    { value: pad(days), label: 'Days' },
    { value: pad(hours), label: 'Hours' },
    { value: pad(mins), label: 'Mins' },
    { value: pad(secs), label: 'Secs' },
  ]

  return (
    <section className="countdown-section" aria-label="Countdown to Welcome Day">
      <div className="countdown-section__inner">
        <p className="countdown-section__eyebrow">Next mission launch in</p>

        <div
          className="countdown-row"
          role="timer"
          aria-live="off"
          aria-label={`${days} days, ${hours} hours, ${mins} minutes, ${secs} seconds remaining`}
        >
          {units.map((unit, i) => (
            <div className="countdown-group" key={unit.label}>
              <div className="countdown-unit">
                <span className="countdown-unit__value">{unit.value}</span>
                <span className="countdown-unit__label">{unit.label}</span>
              </div>
              {i < units.length - 1 && (
                <span className="countdown-separator" aria-hidden="true">
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="countdown-section__note">
          Live countdown to 12.10.2026, 14:00&nbsp;&nbsp;|&nbsp;&nbsp;the four
          units update every second.
        </p>
      </div>
    </section>
  )
}

export default CountdownSection
