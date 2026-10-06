import Navbar from './components/Navbar.jsx'
import HeroSection from './components/sections/HeroSection.jsx'
import WhoAreWeSection from './components/sections/WhoAreWeSection.jsx'
import DepartmentsSection from './components/sections/DepartmentsSection.jsx'
import ArcadeSection from './components/sections/ArcadeSection.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WhoAreWeSection />
        <DepartmentsSection />
        <ArcadeSection />
      </main>
      <Footer />
    </>
  )
}

export default App
