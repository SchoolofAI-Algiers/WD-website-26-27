// Pure helpers for Game 2. No React, no side effects — safe to unit test.

export const ROUNDS_PER_ATTEMPT = 10
export const OPTIONS_PER_ROUND = 4
export const MAX_CLUES = 3
export const MAX_SCORE = 30

// Fisher-Yates shuffle. Returns a new array, never mutates the input.
export function shuffle(list, rand = Math.random) {
  const arr = [...list]
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Draw an attempt: shuffled pool → first `count` character ids.
export function drawRounds(pool, count = ROUNDS_PER_ATTEMPT, rand = Math.random) {
  return shuffle(pool.map((c) => c.id), rand).slice(0, count)
}

// Build the 4 options for a round: the correct id plus 3 wrong ones picked
// at random from the rest (no duplicates, never the correct one twice),
// shuffled so position carries no signal.
export function buildOptions(pool, correctId, rand = Math.random) {
  const wrong = shuffle(
    pool.map((c) => c.id).filter((id) => id !== correctId),
    rand,
  ).slice(0, OPTIONS_PER_ROUND - 1)
  return shuffle([correctId, ...wrong], rand)
}

// Points for a locked round: 3/2/1 for 1/2/3 clues used, 0 when wrong.
export function pointsFor(cluesRevealed, isCorrect) {
  if (!isCorrect) return 0
  return 4 - cluesRevealed
}

// Initials for the no-image fallback badge, e.g. "Iron Man" → "IM".
export function initialsFor(name) {
  return name
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function rankFor(score) {
  if (score >= 25) return { title: 'Director Level', message: 'SHIELD wants you on the next mission.' }
  if (score >= 18) return { title: 'Field Agent', message: 'Cleared for field duty. Stay sharp out there.' }
  if (score >= 10) return { title: 'Recruit', message: 'Solid start. A few more cases and you rank up.' }
  return { title: 'Rookie, time to rewatch the movies', message: 'Every legend starts with a first case file.' }
}
