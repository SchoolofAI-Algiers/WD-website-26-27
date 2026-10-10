import { useCallback, useMemo, useState } from 'react'
import { CHARACTERS, characterById } from '../../data/marvelGuess.js'
import {
  MAX_CLUES,
  ROUNDS_PER_ATTEMPT,
  buildOptions,
  drawRounds,
  pointsFor,
} from './guessUtils.js'

// Game state lives here; components stay presentational.
// Phases: intro → playing ⇄ feedback (per round) → results.
function freshAttempt() {
  const order = drawRounds(CHARACTERS, ROUNDS_PER_ATTEMPT)
  return {
    order,
    optionsByRound: Object.fromEntries(
      order.map((id) => [id, buildOptions(CHARACTERS, id)]),
    ),
  }
}

export default function useGuessGame() {
  const [phase, setPhase] = useState('intro')
  const [attempt, setAttempt] = useState(null)
  const [roundIndex, setRoundIndex] = useState(0)
  const [cluesRevealed, setCluesRevealed] = useState(1)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [history, setHistory] = useState([])
  const [announcement, setAnnouncement] = useState('Game ready.')

  const start = useCallback(() => {
    setAttempt(freshAttempt())
    setRoundIndex(0)
    setCluesRevealed(1)
    setSelected(null)
    setScore(0)
    setHistory([])
    setAnnouncement('Round 1 of 10. Clue 1 is on the table.')
    setPhase('playing')
  }, [])

  const roundId = attempt ? attempt.order[roundIndex] : null
  const roundChar = roundId ? characterById[roundId] : null
  const options = roundId && attempt ? attempt.optionsByRound[roundId] : []
  const nameById = useMemo(
    () => Object.fromEntries(CHARACTERS.map((c) => [c.id, c.name])),
    [],
  )

  // Reveal is a no-op once locked, at 3 clues, or off the playing phase —
  // so rapid double-clicks can never skip a round or corrupt the count.
  const reveal = useCallback(() => {
    if (phase !== 'playing' || cluesRevealed >= MAX_CLUES) return
    const next = cluesRevealed + 1
    setCluesRevealed(next)
    setAnnouncement(`Clue ${next} revealed. Worth ${4 - next} points.`)
  }, [phase, cluesRevealed])

  // Answering while locked (feedback phase) does nothing — no double score.
  const answer = useCallback((id) => {
    if (phase !== 'playing' || !roundChar) return
    const isCorrect = id === roundChar.id
    const points = pointsFor(cluesRevealed, isCorrect)
    setSelected(id)
    setScore((s) => s + points)
    setHistory((h) => [
      ...h,
      { charId: roundChar.id, name: roundChar.name, correct: isCorrect, points, cluesUsed: cluesRevealed },
    ])
    setAnnouncement(
      isCorrect
        ? `Correct, +${points} points. Character revealed: ${roundChar.name}.`
        : `Not quite, it was ${roundChar.name}. Character revealed: ${roundChar.name}.`,
    )
    setPhase('feedback')
  }, [phase, roundChar, cluesRevealed])

  const next = useCallback(() => {
    if (phase !== 'feedback' || !attempt) return
    if (roundIndex + 1 >= attempt.order.length) {
      setAnnouncement('That was the last round. Here are your results.')
      setPhase('results')
      return
    }
    const nextIndex = roundIndex + 1
    setRoundIndex(nextIndex)
    setCluesRevealed(1)
    setSelected(null)
    setAnnouncement(`Round ${nextIndex + 1} of ${attempt.order.length}. Clue 1 is on the table.`)
    setPhase('playing')
  }, [phase, attempt, roundIndex])

  const restart = useCallback(() => {
    start()
  }, [start])

  const isLastRound = useMemo(
    () => !!attempt && roundIndex + 1 >= attempt.order.length,
    [attempt, roundIndex],
  )

  // Next round's portrait, so the UI can preload it and avoid flicker.
  const nextImage = useMemo(() => {
    if (!attempt || roundIndex + 1 >= attempt.order.length) return null
    const next = characterById[attempt.order[roundIndex + 1]]
    return next ? next.image : null
  }, [attempt, roundIndex])

  return {
    phase, roundChar, options, nameById, roundIndex,
    totalRounds: attempt ? attempt.order.length : ROUNDS_PER_ATTEMPT,
    cluesRevealed, selected, score, history,
    announcement, isLastRound, nextImage,
    start, reveal, answer, next, restart,
  }
}
