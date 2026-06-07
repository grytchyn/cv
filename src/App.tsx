import Hero from './components/Hero'
import About from './components/About'
import Nav from './components/Nav'
import Skills from './components/Skills'
import { Education, Career } from './components/Timeline'
import Languages from './components/Languages'
import Project from './components/Project'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <div>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Career />
      <Languages />
      <Project />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
