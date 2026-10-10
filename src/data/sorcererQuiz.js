// Game 1: "Which Sorcerer Are You at ESI?" — 16-question pool.
// Presentation-only layer: scoring mirrors the game doc (each answer +1 to
// its 2 characters, winner = highest score, ties broken randomly).
// Per attempt: shuffle the pool, take the first 10, shuffle each question's
// answers when shown. Points live on the answer object, never on position.
// Text only — no Marvel character images (copyright); the quiz renders its
// existing initial-letter placeholder style.

export const QUESTIONS_PER_ATTEMPT = 10

import agathaAvatar from '../assets/marvel_avaters/Agatha_Harkness_avater.png'
import mordoAvatar from '../assets/marvel_avaters/Baron_mordo_avater.jpeg'
import cleaAvatar from '../assets/marvel_avaters/clear_avater.webp'
import strangeAvatar from '../assets/marvel_avaters/dr_strange_avater.png'
import lokiAvatar from '../assets/marvel_avaters/loki_avater.jpg'
import wandaAvatar from '../assets/marvel_avaters/screler_avater.png'
import ancientAvatar from '../assets/marvel_avaters/the_ancient_one_avater.webp'
import wongAvatar from '../assets/marvel_avaters/wong_avater.jpg'

export const CHARACTERS = [
  { id: 'strange', name: 'Doctor Strange', title: 'The Strategist', initial: 'S', accent: '#63b8ff', avatar: strangeAvatar, cutout: true, description: 'Brilliant, proud and willing to bend time to protect the world. You solve problems by out-thinking them, and you learn from every failure.' },
  { id: 'wanda', name: 'Scarlet Witch', title: 'The Passionate One', initial: 'W', accent: '#f486be', avatar: wandaAvatar, cutout: true, description: 'Powerful and deeply emotional. You feel everything strongly, and that passion is your biggest strength. Just keep it under control.' },
  { id: 'wong', name: 'Wong', title: 'The Loyal One', initial: 'W', accent: '#8bda80', avatar: wongAvatar, cutout: false, description: 'Loyal, dry-humored and dependable. You know the rules, you keep the library in order, and everyone relies on you when it counts.' },
  { id: 'ancient', name: 'The Ancient One', title: 'The Wise One', initial: 'A', accent: '#c5a1ff', avatar: ancientAvatar, cutout: true, description: 'Calm, wise and a natural teacher. You see the big picture and guide others without needing the spotlight.' },
  { id: 'mordo', name: 'Baron Mordo', title: 'The Disciplined One', initial: 'M', accent: '#f6c900', avatar: mordoAvatar, cutout: false, description: 'Disciplined and principled. You believe rules protect people, and you hold the line even when it is unpopular.' },
  { id: 'agatha', name: 'Agatha Harkness', title: 'The Curious One', initial: 'A', accent: '#ff5c38', avatar: agathaAvatar, cutout: false, description: 'Clever, curious and a little mischievous. You love secrets and you are always three steps ahead.' },
  { id: 'loki', name: 'Loki', title: 'The Trickster', initial: 'L', accent: '#f6c900', avatar: lokiAvatar, cutout: false, description: 'Charming, unpredictable and quick-witted. You bend the rules and turn chaos into opportunity.' },
  { id: 'clea', name: 'Clea', title: 'The Fearless One', initial: 'C', accent: '#00bfff', avatar: cleaAvatar, cutout: false, description: 'Bold and independent. You trust your own path and move between worlds with confidence.' },
]

export const characterById = Object.fromEntries(CHARACTERS.map((c) => [c.id, c]))

// Each answer links to exactly 2 character ids.
export const QUESTIONS = [
  {
    id: 'q1', tag: 'First day on campus',
    text: 'It’s your first day at ESI and you walk into a room full of strangers. You…',
    answers: [
      { text: 'Introduce yourself to everyone right away', characters: ['loki', 'clea'] },
      { text: 'Sit back and observe first', characters: ['agatha', 'ancient'] },
      { text: 'Help the person who looks lost', characters: ['wong', 'wanda'] },
      { text: 'Check the schedule to make sure you’re in the right room', characters: ['mordo', 'strange'] },
    ],
  },
  {
    id: 'q2', tag: 'First coding assignment',
    text: 'Your first big coding assignment is due tomorrow and nothing works. You…',
    answers: [
      { text: 'Stay up all night until you crack it', characters: ['strange', 'wanda'] },
      { text: 'Look for a clever shortcut', characters: ['loki', 'agatha'] },
      { text: 'Follow the course notes step by step', characters: ['mordo', 'wong'] },
      { text: 'Take a break, then come back with a clear head', characters: ['ancient', 'clea'] },
    ],
  },
  {
    id: 'q3', tag: 'Group project',
    text: 'A teammate isn’t doing their part in a group project. You…',
    answers: [
      { text: 'Talk to them calmly and help them get back on track', characters: ['ancient', 'wong'] },
      { text: 'Do their part yourself, because the project can’t fail', characters: ['wanda', 'strange'] },
      { text: 'Set clear rules and deadlines, and stick to them', characters: ['mordo', 'clea'] },
      { text: 'Find a way around the problem without drama', characters: ['loki', 'agatha'] },
    ],
  },
  {
    id: 'q4', tag: 'Exam week',
    text: 'It’s exam week. How do you study?',
    answers: [
      { text: 'A detailed schedule with color-coded notes', characters: ['mordo', 'wong'] },
      { text: 'Last-minute cramming with total focus', characters: ['loki', 'strange'] },
      { text: 'Studying with friends and explaining things to each other', characters: ['ancient', 'wanda'] },
      { text: 'Going deep on what fascinates you and skipping the rest', characters: ['agatha', 'clea'] },
    ],
  },
  {
    id: 'q5', tag: 'Hackathon',
    text: 'A hackathon is announced. You…',
    answers: [
      { text: 'Sign up at once and lead a team', characters: ['strange', 'clea'] },
      { text: 'Join if your friends join', characters: ['wanda', 'wong'] },
      { text: 'Join to learn something new and meet people', characters: ['ancient', 'agatha'] },
      { text: 'Read the rules first to look for loopholes', characters: ['loki', 'mordo'] },
    ],
  },
  {
    id: 'q6', tag: 'Tough question',
    text: 'The professor asks a question nobody can answer. You…',
    answers: [
      { text: 'Raise your hand, even if you’re not 100% sure', characters: ['clea', 'loki'] },
      { text: 'Think it through, then give a careful answer', characters: ['ancient', 'mordo'] },
      { text: 'Quietly look it up first', characters: ['agatha', 'wong'] },
      { text: 'Answer with confidence because you read ahead', characters: ['strange', 'wanda'] },
    ],
  },
  {
    id: 'q7', tag: 'Bad grade',
    text: 'You get a bad grade on a project you worked hard on. You…',
    answers: [
      { text: 'Feel it deeply, then use it as motivation', characters: ['wanda', 'strange'] },
      { text: 'Ask the professor what went wrong and fix it', characters: ['mordo', 'wong'] },
      { text: 'Shrug it off and move to the next challenge', characters: ['loki', 'clea'] },
      { text: 'Treat it as a lesson for the long run', characters: ['ancient', 'agatha'] },
    ],
  },
  {
    id: 'q8', tag: 'Free time',
    text: 'Where do you spend your free time on campus?',
    answers: [
      { text: 'The library or a quiet corner', characters: ['wong', 'agatha'] },
      { text: 'The lab, building something', characters: ['strange', 'mordo'] },
      { text: 'Out with friends, trying new places', characters: ['clea', 'loki'] },
      { text: 'Wherever someone needs me', characters: ['wanda', 'ancient'] },
    ],
  },
  {
    id: 'q9', tag: 'Years at ESI',
    text: 'What do you want most from your years at ESI?',
    answers: [
      { text: 'To master a field and be the best', characters: ['strange', 'mordo'] },
      { text: 'To discover how everything really works', characters: ['agatha', 'wong'] },
      { text: 'The freedom to build my own path', characters: ['clea', 'loki'] },
      { text: 'To help others grow and leave a mark', characters: ['ancient', 'wanda'] },
    ],
  },
  {
    id: 'q10', tag: 'Reputation',
    text: 'Your classmates would say you’re…',
    answers: [
      { text: 'The reliable one everyone can count on', characters: ['wong', 'mordo'] },
      { text: 'The unpredictable one with the best ideas', characters: ['loki', 'agatha'] },
      { text: 'The intense one who cares a lot', characters: ['wanda', 'clea'] },
      { text: 'The calm one who gives good advice', characters: ['ancient', 'strange'] },
    ],
  },
  {
    id: 'q11', tag: 'First victory',
    text: 'Your team wins first place at a hackathon. Your first reaction?',
    answers: [
      { text: 'Start thinking about the next challenge', characters: ['strange', 'mordo'] },
      { text: 'Thank the whole team and celebrate together', characters: ['wong', 'wanda'] },
      { text: 'Grin and say you knew it all along', characters: ['loki', 'clea'] },
      { text: 'Quietly think about what the win taught you', characters: ['ancient', 'agatha'] },
    ],
  },
  {
    id: 'q12', tag: 'Crash night',
    text: 'Your laptop crashes the night before a deadline. You…',
    answers: [
      { text: 'Restore everything from the backup you made', characters: ['mordo', 'wong'] },
      { text: 'Borrow a friend’s laptop and improvise', characters: ['loki', 'clea'] },
      { text: 'Dig into the logs to understand exactly what broke', characters: ['agatha', 'strange'] },
      { text: 'Take a deep breath and trust you’ll fix it', characters: ['ancient', 'wanda'] },
    ],
  },
  {
    id: 'q13', tag: 'First presentation',
    text: 'You have to present your project to the whole class for the first time. You…',
    answers: [
      { text: 'Prepare every slide and rehearse the timing', characters: ['mordo', 'wong'] },
      { text: 'Improvise and rely on your charisma', characters: ['loki', 'clea'] },
      { text: 'Tell the story behind the idea, not just the code', characters: ['agatha', 'wanda'] },
      { text: 'Stay calm and explain it clearly, step by step', characters: ['ancient', 'strange'] },
    ],
  },
  {
    id: 'q14', tag: 'Exam rumor',
    text: 'The group chat explodes with a rumor about the exam. You…',
    answers: [
      { text: 'Find out what’s actually true', characters: ['agatha', 'strange'] },
      { text: 'Ignore it and wait for the official announcement', characters: ['mordo', 'ancient'] },
      { text: 'Add a funny reply to keep the mood light', characters: ['loki', 'wong'] },
      { text: 'Take charge and calm everyone down', characters: ['wanda', 'clea'] },
    ],
  },
  {
    id: 'q15', tag: 'Free weekend',
    text: 'You get a completely free weekend. You…',
    answers: [
      { text: 'Work on a personal project', characters: ['strange', 'wong'] },
      { text: 'Rest, reset and plan the week ahead', characters: ['ancient', 'mordo'] },
      { text: 'Explore somewhere you’ve never been', characters: ['clea', 'agatha'] },
      { text: 'Spend it with friends and see where the night goes', characters: ['loki', 'wanda'] },
    ],
  },
  {
    id: 'q16', tag: 'Legacy',
    text: 'What do you want people to remember about you at ESI?',
    answers: [
      { text: 'That I was always there for my friends', characters: ['wong', 'wanda'] },
      { text: 'That I was the best at what I did', characters: ['strange', 'mordo'] },
      { text: 'That I understood things others missed', characters: ['agatha', 'ancient'] },
      { text: 'That I did things my own way', characters: ['loki', 'clea'] },
    ],
  },
]

// Fisher-Yates shuffle. Returns a new array, never mutates the input.
export function shuffle(list, rand = Math.random) {
  const arr = [...list]
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Draw a fresh attempt: shuffled pool → first QUESTIONS_PER_ATTEMPT,
// each with its own freshly shuffled answer order (pool indices, so
// scoring follows the answer object, never its position).
export function drawAttempt(rand = Math.random) {
  const order = shuffle(
    QUESTIONS.map((_, i) => i),
    rand,
  ).slice(0, QUESTIONS_PER_ATTEMPT)
  const answerOrders = {}
  QUESTIONS.forEach((q, qIdx) => {
    answerOrders[qIdx] = shuffle(
      q.answers.map((_, i) => i),
      rand,
    )
  })
  return { order, answerOrders }
}

// Scoring: all 8 start at 0, each picked answer +1 to its 2 characters,
// winner = highest score, ties broken randomly.
export function scoreAnswers(picks) {
  const scores = Object.fromEntries(CHARACTERS.map((c) => [c.id, 0]))
  picks.forEach((pick) => {
    if (!pick) return
    pick.characters.forEach((id) => {
      scores[id] += 1
    })
  })
  return scores
}

export function pickWinner(scores, rand = Math.random) {
  const best = Math.max(...Object.values(scores))
  const tied = Object.entries(scores)
    .filter(([, s]) => s === best)
    .map(([id]) => id)
  return tied[Math.floor(rand() * tied.length)]
}

// Dev-only balance check: 16 Qs × 4 answers × 2 chars = 128 slots / 8
// characters → every character must hold exactly 16 slots. Also asserts
// every question has exactly 4 answers of 2 distinct, known characters.
// Returns the issue list (empty = balanced); logs loudly in dev.
export function validateBalance() {
  const issues = []
  const known = new Set(CHARACTERS.map((c) => c.id))
  const counts = Object.fromEntries(CHARACTERS.map((c) => [c.id, 0]))
  QUESTIONS.forEach((q, qi) => {
    if (q.answers.length !== 4) {
      issues.push(`Q${qi + 1} (${q.id}): has ${q.answers.length} answers, expected 4`)
    }
    q.answers.forEach((a, ai) => {
      if (a.characters.length !== 2) {
        issues.push(`Q${qi + 1} answer ${ai + 1}: has ${a.characters.length} characters, expected 2`)
      }
      if (new Set(a.characters).size !== a.characters.length) {
        issues.push(`Q${qi + 1} answer ${ai + 1}: duplicate character in [${a.characters}]`)
      }
      a.characters.forEach((id) => {
        if (!known.has(id)) {
          issues.push(`Q${qi + 1} answer ${ai + 1}: unknown character "${id}"`)
        } else {
          counts[id] += 1
        }
      })
    })
  })
  Object.entries(counts).forEach(([id, n]) => {
    if (n !== 16) issues.push(`"${id}": holds ${n} slots, expected 16`)
  })
  return issues
}

const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV === true
if (isDev) {
  const issues = validateBalance()
  console.assert(
    issues.length === 0,
    '[sorcererQuiz] balance check failed:\n' + issues.join('\n'),
  )
}
