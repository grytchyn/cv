import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import { Education, Career } from './components/Timeline'
import Languages from './components/Languages'
import Project from './components/Project'
import Contact from './components/Contact'
import './index.css'

function App() {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <Education />
      <Career />
      <Languages />
      <Project />
      <Contact />
    </div>
  )
}

export default App
