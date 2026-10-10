// Arcade feature flags and game catalogue — the ONLY file to edit to
// open the games. Flip ARCADE_UNLOCKED to true and both cabinets unlock;
// nothing else needs changing.

export const ARCADE_UNLOCKED = false

// Secret per-game routes (hash routes: static-hosting safe, no router).
export const GAME_ROUTES = {
  sorcerer: '#/game-1/hEOCwWO9Vx2ptCvEpJImpWWx',
  guess: '#/game-2/5Q8gRnivxf4jWKWrx4jRmKEc',
}

const GAMES = [
  {
    id: 'sorcerer',
    title: 'Which Wizerd Are You?',
    tagline: 'A personality test',
    route: GAME_ROUTES.sorcerer,
    // Per-game override. Falls back to ARCADE_UNLOCKED when omitted.
    // unlocked: false,
  },
  {
    id: 'guess',
    title: 'Guess the Character',
    tagline: 'Fewer clues, more points',
    route: GAME_ROUTES.guess,
    // unlocked: false,
  },
]

// Games with their resolved unlocked state.
export function getArcadeGames() {
  return GAMES.map((game) => ({
    ...game,
    unlocked: game.unlocked ?? ARCADE_UNLOCKED,
  }))
}

function readHiScore(id) {
  try {
    const raw = window.localStorage.getItem(`arcade-hiscore-${id}`)
    const value = Number.parseInt(raw ?? '', 10)
    return Number.isFinite(value) && value > 0 ? value : 0
  } catch {
    return 0
  }
}

export function getHiScore(id) {
  return readHiScore(id)
}

// Persist the best score per game (keeps the max, never lowers it).
export function saveHiScore(id, score) {
  try {
    const best = Math.max(readHiScore(id), Number(score) || 0)
    window.localStorage.setItem(`arcade-hiscore-${id}`, String(best))
    return best
  } catch {
    return 0
  }
}

export function formatHiScore(value) {
  return String(Math.min(99999, Math.max(0, Number(value) || 0))).padStart(5, '0')
}
