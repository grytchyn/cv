import { useEffect, useState } from 'react'
import { MapPin, Brain, Barbell, MusicNotes, EnvelopeSimple, GithubLogo, LinkedinLogo, Heart } from '@phosphor-icons/react'

function App() {
  const glitchText = 'Konstantin'

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.fade-in')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Simple glitch effect text shadow simulator
  const [glitchStyle, setGlitchStyle] = useState<React.CSSProperties>({})
  useEffect(() => {
    const interval = setInterval(() => {
      const x1 = Math.random() * 6 - 3
      const y1 = Math.random() * 6 - 3
      const x2 = Math.random() * -6 + 3
      const y2 = Math.random() * -6 + 3
      setGlitchStyle({
        textShadow: `${x1}px ${y1}px 0 rgba(0,240,255,0.7), ${x2}px ${y2}px 0 rgba(138,43,226,0.7)`
      })

      setTimeout(() => {
        setGlitchStyle({})
      }, 150)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-bg-dark text-[#e0e0e0] font-body relative">
      {/* Animated Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(circle_at_top_left,rgba(0,240,255,0.04),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(138,43,226,0.04),transparent_40%)]" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-[5%] py-4 glass-nav z-50">
        <div className="font-heading font-extrabold text-xl tracking-[2px] text-white glitch-shadow">
          K//OS
        </div>
        <ul className="flex gap-8 text-sm uppercase tracking-wider">
          <li><a href="#about" className="hover:text-neon-blue transition-all duration-300">Über mich</a></li>
          <li><a href="#skills" className="hover:text-neon-blue transition-all duration-300">Tech Stack</a></li>
          <li><a href="#experience" className="hover:text-neon-blue transition-all duration-300">Erfahrung</a></li>
          <li><a href="#contact" className="hover:text-neon-blue transition-all duration-300">Kontakt</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="min-h-screen flex items-center justify-center text-center px-4 pt-[100px] pb-[40px] relative" id="home">
        <div className="max-w-2xl mx-auto fade-in">
          <div className="relative w-[150px] h-[150px] mx-auto mb-8">
            <img
              src="/avatar.jpg"
              alt="Konstantin Avatar"
              className="w-full h-full rounded-full object-cover border-2 border-neon-purple z-10 relative"
            />
            <div className="absolute -inset-1 rounded-full glow-ring z-0 animate-pulse-slow" />
          </div>
          <h1
            style={glitchStyle}
            className="font-heading text-5xl md:text-7xl font-extrabold text-white mb-2 tracking-tight transition-all duration-100 select-none"
          >
            {glitchText}
          </h1>
          <h2 className="text-xl text-gray-400 mb-4">
            Digital Marketer <span className="text-neon-blue font-bold">-&gt;</span> Future Fachinformatiker
          </h2>
          <p className="text-sm text-gray-500 mb-8 flex items-center justify-center gap-2">
            <MapPin size={18} className="text-neon-blue" /> Lübeck, Germany
          </p>
          <div>
            <a
              href="#about"
              className="inline-block px-8 py-3 border border-neon-blue bg-[rgba(0,240,255,0.07)] hover:bg-neon-blue hover:text-black font-semibold uppercase tracking-widest text-xs rounded transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_#00f0ff] cursor-pointer"
            >
              Init_Sequence()
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 px-[5%] max-w-[1200px] mx-auto scroll-mt-20">
        <div className="fade-in">
          <h2 className="font-heading text-4xl font-bold mb-12 relative inline-block text-white after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-1/2 after:h-[3px] after:bg-neon-purple after:shadow-[0_0_10px_#8a2be2]">
            Wer bin ich? <span className="text-sm font-light text-gray-500 opacity-70 ml-2">(Who am I?)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center glass-card p-8 md:p-12">
            <div className="md:col-span-2 space-y-6 text-base md:text-lg leading-relaxed text-gray-300">
              <p>
                Moin! Ich bin <strong>Kostya</strong> (Jahrgang 1992). Rational, zukunftsorientiert und extrem wissbegierig. Nach meinem Master-Studium im Bereich Werbung (Auszeichnung, 2015) habe ich ein Jahrzehnt lang digitales Marketing für globale Marken aufgebaut.
              </p>
              <p>
                Jetzt starte ich mein nächstes großes Projekt: den Quereinstieg in die IT-Branche. Mein Ziel ist es, meine tiefen Business- und Marketing-Insights mit handfestem technischem Know-how zu verbinden. Ich suche aktiv nach einer <strong>Ausbildung als Fachinformatiker</strong> im zukunftsträchtigen, KI-gesteuerten Markt hier in Lübeck.
              </p>
            </div>
            <div className="flex flex-col gap-6 border-t md:border-t-0 md:border-l border-gray-800 pt-6 md:pt-0 md:pl-8">
              <div className="flex items-center gap-4">
                <Brain size={28} className="text-neon-blue" />
                <span className="text-sm font-semibold">Rationalist & Geek</span>
              </div>
              <div className="flex items-center gap-4">
                <Barbell size={28} className="text-neon-blue" />
                <span className="text-sm font-semibold">Matrix Trainee</span>
              </div>
              <div className="flex items-center gap-4">
                <MusicNotes size={28} className="text-neon-blue" />
                <span className="text-sm font-semibold">Metal & Sci-Fi Fan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack & Interests */}
      <section id="skills" className="py-24 px-[5%] max-w-[1200px] mx-auto scroll-mt-20">
        <div className="fade-in">
          <h2 className="font-heading text-4xl font-bold mb-12 relative inline-block text-white after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-1/2 after:h-[3px] after:bg-neon-purple after:shadow-[0_0_10px_#8a2be2]">
            Interessen & Focus Areas
          </h2>

          <div className="flex flex-wrap gap-4 mb-16">
            {['Artificial Intelligence', 'Big Data', 'Linux (VPS Setup)', 'Network Security', 'Advanced Computing', 'Obsidian (PKM)', 'Crypto', 'Economics & Philosophy'].map((skill, index) => (
              <span
                key={index}
                className="px-5 py-2.5 bg-white/5 border border-gray-800 rounded-full text-sm hover:border-neon-blue hover:bg-neon-blue/10 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </div>

          <h3 className="font-heading text-2xl font-bold mb-8 text-white">
            Sprachkenntnisse <span className="text-sm font-light text-gray-500 opacity-70 ml-2">(Languages)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <h4 className="font-heading font-bold text-lg mb-3">Russisch</h4>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_10px_#00f0ff]" style={{ width: '100%' }} />
              </div>
              <p className="text-xs text-gray-400">Muttersprache</p>
            </div>
            <div className="glass-card p-6">
              <h4 className="font-heading font-bold text-lg mb-3">Englisch</h4>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_10px_#00f0ff]" style={{ width: '90%' }} />
              </div>
              <p className="text-xs text-gray-400">Fließend (C1)</p>
            </div>
            <div className="glass-card p-6 border-neon-purple/50 shadow-[0_0_15px_rgba(138,43,226,0.1)]">
              <h4 className="font-heading font-bold text-lg mb-3 text-neon-blue">Deutsch</h4>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_10px_#00f0ff]" style={{ width: '60%' }} />
              </div>
              <p className="text-xs text-neon-blue">B1 (Ziel: DTB B2)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-24 px-[5%] max-w-[1200px] mx-auto scroll-mt-20">
        <div className="fade-in">
          <h2 className="font-heading text-4xl font-bold mb-12 relative inline-block text-white after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-1/2 after:h-[3px] after:bg-neon-purple after:shadow-[0_0_10px_#8a2be2]">
            Werdegang <span className="text-sm font-light text-gray-500 opacity-70 ml-2">(Timeline)</span>
          </h2>

          <div className="relative border-l-2 border-gray-800 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
            <div className="relative">
              <div className="absolute -left-[41px] md:-left-[57px] top-[6px] w-4 h-4 rounded-full bg-neon-blue shadow-[0_0_10px_#00f0ff]" />
              <div className="glass-card p-6 md:p-8 hover:translate-y-[-4px] transition-all duration-300">
                <h3 className="font-heading text-xl font-bold text-neon-blue mb-1">Zukünftiges Ziel</h3>
                <h4 className="text-lg font-semibold mb-4 text-white">Ausbildung als Fachinformatiker</h4>
                <p className="text-gray-300 leading-relaxed">
                  Fokus auf Anwendungsentwicklung und IT-Sicherheit. Praktisches Training mit Linux, Automatisierungs-Skripten und AI auf eigenen Servern (Oracle / Contabo VPS).
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] md:-left-[57px] top-[6px] w-4 h-4 rounded-full bg-gray-700" />
              <div className="glass-card p-6 md:p-8 hover:translate-y-[-4px] transition-all duration-300">
                <h3 className="font-heading text-xl font-bold text-gray-400 mb-1">Jan 2026 - Heute</h3>
                <h4 className="text-lg font-semibold mb-1 text-white">Reinigungskraft (Minijob)</h4>
                <p className="text-sm italic text-gray-500 mb-4">Hausarzt Praxis, St. Lorenz Süd Lübeck</p>
                <p className="text-gray-300 leading-relaxed">
                  Praktische Integration, intensiver Sprachaufbau im Arbeitsalltag und Beweis einer soliden Arbeitsmoral während der Vorbereitungsphase auf die IT-Karriere.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] md:-left-[57px] top-[6px] w-4 h-4 rounded-full bg-gray-700" />
              <div className="glass-card p-6 md:p-8 hover:translate-y-[-4px] transition-all duration-300">
                <h3 className="font-heading text-xl font-bold text-gray-400 mb-1">2025</h3>
                <h4 className="text-lg font-semibold mb-4 text-white">Relocation nach Deutschland</h4>
                <p className="text-gray-300 leading-relaxed">
                  Umzug nach Lübeck (St. Jürgen / St. Hubertus) mit meiner Familie (Ehefrau Anastasia, Tochter Diana, Kater Mukhtar). Erfolgreicher Abschluss des Integrationskurses (B1-Zertifikat).
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] md:-left-[57px] top-[6px] w-4 h-4 rounded-full bg-gray-700" />
              <div className="glass-card p-6 md:p-8 hover:translate-y-[-4px] transition-all duration-300">
                <h3 className="font-heading text-xl font-bold text-gray-400 mb-1">2015 - 2025</h3>
                <h4 className="text-lg font-semibold mb-4 text-white">Digital Marketing Professional</h4>
                <p className="text-gray-300 leading-relaxed">
                  Konzeption, Steuerung und datengetriebene Optimierung von Kampagnen, Analytics und Strategien für globale Marken und Agenturen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 px-[5%] border-t border-gray-800 bg-black/40 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold mb-4 text-white">Let's Connect!</h2>
          <p className="text-gray-400 mb-8">Ready to deploy new ideas.</p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8 text-base">
            <a href="mailto:mail@example.com" className="flex items-center justify-center gap-2 hover:text-neon-purple transition-colors">
              <EnvelopeSimple size={20} /> mail@example.com
            </a>
            <a href="https://github.com/grytchyn" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 hover:text-neon-purple transition-colors">
              <GithubLogo size={20} /> GitHub
            </a>
            <a href="#" className="flex items-center justify-center gap-2 hover:text-neon-purple transition-colors">
              <LinkedinLogo size={20} /> LinkedIn
            </a>
          </div>

          <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5 mt-8">
            © 2026 Konstantin. Compiled with <Heart size={14} weight="fill" className="text-neon-purple" /> and raw logic.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
