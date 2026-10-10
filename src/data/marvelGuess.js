// Game 2: "Guess the Marvel Character" — text-only guessing game.
// 20-character pool, each with 3 clues ordered hardest → easiest.
// Portraits come from src/assets/guess_marvel/ (opaque photos get a
// framed cover treatment, transparent PNGs render as true cut-outs).
// black-panther has no file yet and uses the initials fallback.

import blackPantherImg from '../assets/guess_marvel/black_panther_v2.jpg'
import antManImg from '../assets/guess_marvel/ant_man.jpg'
import blackWidowImg from '../assets/guess_marvel/black_widow.jpg'
import captainAmericaImg from '../assets/guess_marvel/captain_america.jpeg'
import captainMarvelImg from '../assets/guess_marvel/captain_marvel.jpeg'
import drStrangeImg from '../assets/guess_marvel/dr_strange.jpg'
import gamoraImg from '../assets/guess_marvel/gamora_v2.jpg'
import grootImg from '../assets/guess_marvel/groot.webp'
import hawkeyeImg from '../assets/guess_marvel/hawkeye.jpg'
import hulkImg from '../assets/guess_marvel/hulk_v2.jpeg'
import ironManImg from '../assets/guess_marvel/iron_man_v2.jpg'
import lokiImg from '../assets/guess_marvel/loki.jpg'
import nickFuryImg from '../assets/guess_marvel/nick_fury_v2.webp'
import rocketImg from '../assets/guess_marvel/rocket.png'
import scarletWitchImg from '../assets/guess_marvel/scarlet_witch.png'
import spiderManImg from '../assets/guess_marvel/spiderman.png'
import starLordImg from '../assets/guess_marvel/star_lord.png'
import thanosImg from '../assets/guess_marvel/thanos-png.png'
import thorImg from '../assets/guess_marvel/thor.jpeg'
import visionImg from '../assets/guess_marvel/vision.png'

export const CHARACTERS = [
  { id: 'iron-man', name: 'Iron Man', image: ironManImg, framed: true, clues: ['A billionaire inventor who built his first armor while held captive in a cave.', 'A glowing arc reactor keeps him alive and powers his suit.', 'His real name is Tony Stark.'] },
  { id: 'captain-america', name: 'Captain America', image: captainAmericaImg, framed: true, clues: ['A soldier from the 1940s who was frozen for decades.', 'His weapon is a round vibranium shield.', 'His real name is Steve Rogers.'] },
  { id: 'thor', name: 'Thor', image: thorImg, framed: true, clues: ['A prince from a realm outside Earth.', 'He wields a magical hammer called Mjolnir.', 'He is the God of Thunder.'] },
  { id: 'hulk', name: 'Hulk', image: hulkImg, framed: true, clues: ['A scientist transformed by a lab accident with gamma radiation.', 'The angrier he gets, the stronger he becomes.', 'His real name is Bruce Banner.'] },
  { id: 'black-widow', name: 'Black Widow', image: blackWidowImg, framed: true, clues: ['A former spy trained in the Red Room.', 'She is a founding Avenger with no superpowers.', 'Her real name is Natasha Romanoff.'] },
  { id: 'spider-man', name: 'Spider-Man', image: spiderManImg, framed: true, clues: ['A teenager from Queens, New York.', 'He got his powers from a radioactive spider bite.', 'His real name is Peter Parker.'] },
  { id: 'black-panther', name: 'Black Panther', image: blackPantherImg, framed: true, clues: ['A king who protects a hidden, technologically advanced nation.', 'His suit is woven with vibranium.', 'He rules Wakanda.'] },
  { id: 'thanos', name: 'Thanos', image: thanosImg, framed: true, clues: ['A Titan who believes the universe is overpopulated.', 'He collects all the Infinity Stones.', 'He wipes out half of all life with a snap.'] },
  { id: 'groot', name: 'Groot', image: grootImg, framed: true, clues: ['An alien who looks like a tree.', 'He can only say three words.', "He is a Guardian of the Galaxy and Rocket's best friend."] },
  { id: 'rocket', name: 'Rocket', image: rocketImg, framed: false, clues: ['A genetically engineered animal who loves building weapons.', 'He is a sharp-tongued Guardian of the Galaxy.', "He's a raccoon, and Groot is his partner."] },
  { id: 'captain-marvel', name: 'Captain Marvel', image: captainMarvelImg, framed: true, clues: ['A former US Air Force pilot.', 'An explosion gave her cosmic energy powers.', 'Her real name is Carol Danvers.'] },
  { id: 'hawkeye', name: 'Hawkeye', image: hawkeyeImg, framed: true, clues: ['An Avenger with no superpowers.', 'His weapon is a bow with specialty arrows.', 'His real name is Clint Barton.'] },
  { id: 'ant-man', name: 'Ant-Man', image: antManImg, framed: true, clues: ['A former thief turned hero.', 'His suit uses Pym particles.', 'He can shrink to the size of an insect.'] },
  { id: 'vision', name: 'Vision', image: visionImg, framed: false, clues: ['An android with a glowing gem on his forehead.', "He was created with help from Ultron and Tony Stark's AI, J.A.R.V.I.S.", 'He is one of the few who could lift Thor’s hammer.'] },
  { id: 'loki', name: 'Loki', image: lokiImg, framed: true, clues: ['An adopted prince with a famous brother.', 'He is the God of Mischief.', 'He led the invasion of New York in the first Avengers movie.'] },
  { id: 'doctor-strange', name: 'Doctor Strange', image: drStrangeImg, framed: true, clues: ['A brilliant surgeon whose career ended after a car crash.', 'He trained in the mystic arts at Kamar-Taj.', 'He wears the Eye of Agamotto and the Cloak of Levitation.'] },
  { id: 'scarlet-witch', name: 'Scarlet Witch', image: scarletWitchImg, framed: false, clues: ['A young woman from Sokovia with a twin brother.', 'She controls chaos magic.', 'Her real name is Wanda Maximoff.'] },
  { id: 'star-lord', name: 'Star-Lord', image: starLordImg, framed: false, clues: ['He was taken from Earth as a child.', 'He loves 80s music on his old cassette player.', 'He leads the Guardians of the Galaxy, and his real name is Peter Quill.'] },
  { id: 'gamora', name: 'Gamora', image: gamoraImg, framed: true, clues: ['An adopted daughter of a powerful warlord.', 'Called the deadliest woman in the galaxy.', "She is a Guardian of the Galaxy and Thanos's daughter."] },
  { id: 'nick-fury', name: 'Nick Fury', image: nickFuryImg, framed: true, clues: ['The head of a secret spy organization.', 'He wears an eyepatch.', 'He started the Avengers Initiative.'] },
]

export const characterById = Object.fromEntries(CHARACTERS.map((c) => [c.id, c]))

// Dev-only data check: exactly 20 characters, unique ids, each with
// exactly 3 non-empty clues. Logs loudly in dev, returns issues otherwise.
export function validateGuessData() {
  const issues = []
  if (CHARACTERS.length !== 20) {
    issues.push(`pool has ${CHARACTERS.length} characters, expected 20`)
  }
  const ids = CHARACTERS.map((c) => c.id)
  if (new Set(ids).size !== ids.length) {
    issues.push('duplicate character ids in pool')
  }
  CHARACTERS.forEach((c) => {
    if (!Array.isArray(c.clues) || c.clues.length !== 3) {
      issues.push(`"${c.id}": has ${Array.isArray(c.clues) ? c.clues.length : 0} clues, expected 3`)
      return
    }
    c.clues.forEach((clue, i) => {
      if (typeof clue !== 'string' || clue.trim() === '') {
        issues.push(`"${c.id}" clue ${i + 1}: empty or missing`)
      }
    })
  })
  return issues
}

const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV === true
if (isDev) {
  const issues = validateGuessData()
  console.assert(
    issues.length === 0,
    '[marvelGuess] data check failed:\n' + issues.join('\n'),
  )
}
