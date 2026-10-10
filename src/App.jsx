import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import HeroSection from './components/sections/HeroSection.jsx'
import CountdownSection from './components/sections/CountdownSection.jsx'
import WhoAreWeSection from './components/sections/WhoAreWeSection.jsx'
import DepartmentsSection from './components/sections/DepartmentsSection.jsx'
import ArcadeSection from './components/sections/ArcadeSection.jsx'
import QuizSection from './components/quiz/QuizSection.jsx'
import GuessGame from './games/guess/GuessGame.jsx'
import { GAME_ROUTES } from './config/arcade.js'
import Footer from './components/Footer.jsx'

// Standalone game pages, reachable only via their secret URLs until the
// arcade cabinets unlock and link to them (see src/config/arcade.js —
// flipping the flag there is the only edit needed). Hash routes keep
// static hosting working with no router dependency.
const GAME1_HASH = GAME_ROUTES.sorcerer
const GAME2_HASH = GAME_ROUTES.guess

function currentRoute() {
  const hash = window.location.hash
  if (hash === GAME1_HASH) return 'game1'
  if (hash === GAME2_HASH) return 'game2'
  return 'main'
}

function App() {
  const [route, setRoute] = useState(() => currentRoute())

  useEffect(() => {
    const onHashChange = () => {
      const next = currentRoute()
      setRoute(next)
      // Let the new route render first, then jump to any section anchor
      // (e.g. footer links clicked from a game page).
      requestAnimationFrame(() => {
        if (next !== 'main') {
          window.scrollTo(0, 0)
          return
        }
        const id = window.location.hash.replace(/^#\/?/, '')
        const el = id ? document.getElementById(id) : null
        if (el) el.scrollIntoView()
        else window.scrollTo(0, 0)
      })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (route === 'game1') {
    return (
      <>
        <Navbar minimal />
        <main>
          <QuizSection />
        </main>
        <Footer />
      </>
    )
  }

  if (route === 'game2') {
    return (
      <>
        <Navbar minimal />
        <main>
          <GuessGame />
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CountdownSection />
        <WhoAreWeSection />
        <DepartmentsSection />
        <ArcadeSection />
      </main>
      <Footer />
    </>
  )
}

export default App
