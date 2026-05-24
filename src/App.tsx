import { useEffect, useState } from 'react'
import { MapPin, Brain, Barbell, MusicNotes, EnvelopeSimple, GithubLogo, LinkedinLogo, Heart, ArrowDown, List, X } from '@phosphor-icons/react'

function App() {
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.fade-in')
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: 'Über mich', href: '#about' },
    { label: 'Interessen', href: '#skills' },
    { label: 'Werdegang', href: '#experience' },
    { label: 'Kontakt', href: '#contact' },
  ]

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-body relative">
      {/* Ambient background glow */}
      <div className="ambient-glow" />

      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 md:px-[5%] py-5 nav-bar z-50">
        <a href="#home" className="font-heading text-xl font-semibold text-text-primary tracking-wide">
          K.
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="nav-link">{item.label}</a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 mobile-menu z-40 flex flex-col items-center justify-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-heading text-2xl text-text-primary hover:text-accent transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* ─── Hero Section ─── */}
      <header className="min-h-screen flex items-center justify-center text-center px-6 pt-24 pb-16 relative" id="home">
        <div className="max-w-2xl mx-auto fade-in">
          {/* Avatar */}
          <div className="relative w-[120px] h-[120px] mx-auto mb-10 group">
            <img
              src="avatar.jpg"
              alt="Konstantin"
              className="w-full h-full rounded-full object-cover z-10 relative"
            />
            <div className="avatar-ring" />
          </div>

          {/* Name */}
          <h1 className="font-heading text-5xl md:text-7xl font-semibold text-text-primary mb-4 tracking-tight leading-[1.1]">
            Konstantin
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-text-secondary mb-3 font-light">
            Digital Marketer <span className="text-accent mx-1">→</span> Future Fachinformatiker
          </p>

          {/* Location */}
          <p className="text-sm text-text-tertiary mb-10 flex items-center justify-center gap-2">
            <MapPin size={16} className="text-accent" weight="fill" /> Lübeck, Germany
          </p>

          {/* CTA */}
          <a href="#about" className="btn-outline">
            Mehr erfahren
            <ArrowDown size={16} />
          </a>
        </div>
      </header>

      {/* ─── About Section ─── */}
      <section id="about" className="py-24 px-6 md:px-[5%] max-w-[960px] mx-auto scroll-mt-20">
        <div className="fade-in">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary mb-12 section-heading">
            Wer bin ich?
          </h2>

          <div className="card p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
              {/* Text */}
              <div className="md:col-span-2 space-y-5 text-[15px] md:text-base leading-relaxed text-text-secondary">
                <p>
                  Moin! Ich bin <strong className="text-text-primary font-medium">Kostya</strong> (Jahrgang 1992). Rational, zukunftsorientiert und extrem wissbegierig. Nach meinem Master-Studium im Bereich Werbung (Auszeichnung, 2015) habe ich ein Jahrzehnt lang digitales Marketing für globale Marken aufgebaut.
                </p>
                <p>
                  Jetzt starte ich mein nächstes großes Projekt: den Quereinstieg in die IT-Branche. Mein Ziel ist es, meine tiefen Business- und Marketing-Insights mit handfestem technischem Know-how zu verbinden. Ich suche aktiv nach einer <strong className="text-text-primary font-medium">Ausbildung als Fachinformatiker</strong> im zukunftsträchtigen, KI-gesteuerten Markt hier in Lübeck.
                </p>
              </div>

              {/* Traits */}
              <div className="flex flex-col gap-5 border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-8">
                <div className="flex items-center gap-4">
                  <Brain size={22} className="text-accent" />
                  <span className="text-sm text-text-secondary">Rationalist & Geek</span>
                </div>
                <div className="flex items-center gap-4">
                  <Barbell size={22} className="text-accent" />
                  <span className="text-sm text-text-secondary">Matrix Trainee</span>
                </div>
                <div className="flex items-center gap-4">
                  <MusicNotes size={22} className="text-accent" />
                  <span className="text-sm text-text-secondary">Metal & Sci-Fi Fan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Skills & Languages ─── */}
      <section id="skills" className="py-24 px-6 md:px-[5%] max-w-[960px] mx-auto scroll-mt-20">
        <div className="fade-in">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary mb-12 section-heading">
            Interessen & Focus Areas
          </h2>

          {/* Skill pills */}
          <div className="flex flex-wrap gap-3 mb-16">
            {['Artificial Intelligence', 'Big Data', 'Linux (VPS Setup)', 'Network Security', 'Advanced Computing', 'Obsidian (PKM)', 'Crypto', 'Economics & Philosophy'].map((skill, i) => (
              <span key={i} className="skill-pill">{skill}</span>
            ))}
          </div>

          {/* Languages */}
          <h3 className="font-heading text-xl md:text-2xl font-semibold text-text-primary mb-8">
            Sprachkenntnisse
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Russian */}
            <div className="card p-6">
              <h4 className="font-heading font-semibold text-base mb-4 text-text-primary">Russisch</h4>
              <div className="progress-bar mb-3">
                <div className="progress-fill" style={{ width: '100%' }} />
              </div>
              <p className="text-xs text-text-tertiary">Muttersprache</p>
            </div>

            {/* English */}
            <div className="card p-6">
              <h4 className="font-heading font-semibold text-base mb-4 text-text-primary">Englisch</h4>
              <div className="progress-bar mb-3">
                <div className="progress-fill" style={{ width: '90%' }} />
              </div>
              <p className="text-xs text-text-tertiary">Fließend (C1)</p>
            </div>

            {/* German — highlighted */}
            <div className="card p-6" style={{ borderColor: 'rgba(200, 162, 110, 0.25)' }}>
              <h4 className="font-heading font-semibold text-base mb-4 text-accent">Deutsch</h4>
              <div className="progress-bar mb-3">
                <div className="progress-fill" style={{ width: '60%' }} />
              </div>
              <p className="text-xs text-accent">B1 (Ziel: DTB B2)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Experience Timeline ─── */}
      <section id="experience" className="py-24 px-6 md:px-[5%] max-w-[960px] mx-auto scroll-mt-20">
        <div className="fade-in">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary mb-12 section-heading">
            Werdegang
          </h2>

          <div className="relative timeline-line ml-3 md:ml-6 pl-8 md:pl-10 space-y-10">
            {/* Future Goal */}
            <div className="relative">
              <div className="timeline-dot active absolute -left-[37px] md:-left-[46px] top-[24px]" />
              <div className="card p-6 md:p-8">
                <p className="text-xs font-medium text-accent uppercase tracking-wider mb-2">Zukünftiges Ziel</p>
                <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
                  Ausbildung als Fachinformatiker
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Fokus auf Anwendungsentwicklung und IT-Sicherheit. Praktisches Training mit Linux, Automatisierungs-Skripten und AI auf eigenen Servern (Oracle / Contabo VPS).
                </p>
              </div>
            </div>

            {/* Current job */}
            <div className="relative">
              <div className="timeline-dot absolute -left-[37px] md:-left-[46px] top-[24px]" />
              <div className="card p-6 md:p-8">
                <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">Jan 2026 – Heute</p>
                <h3 className="font-heading text-lg font-semibold text-text-primary mb-1">
                  Reinigungskraft (Minijob)
                </h3>
                <p className="text-xs italic text-text-tertiary mb-3">Hausarzt Praxis, St. Lorenz Süd Lübeck</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Praktische Integration, intensiver Sprachaufbau im Arbeitsalltag und Beweis einer soliden Arbeitsmoral während der Vorbereitungsphase auf die IT-Karriere.
                </p>
              </div>
            </div>

            {/* Relocation */}
            <div className="relative">
              <div className="timeline-dot absolute -left-[37px] md:-left-[46px] top-[24px]" />
              <div className="card p-6 md:p-8">
                <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">2025</p>
                <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
                  Relocation nach Deutschland
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Umzug nach Lübeck (St. Jürgen / St. Hubertus) mit meiner Familie (Ehefrau Anastasia, Tochter Diana, Kater Mukhtar). Erfolgreicher Abschluss des Integrationskurses (B1-Zertifikat).
                </p>
              </div>
            </div>

            {/* Marketing career */}
            <div className="relative">
              <div className="timeline-dot absolute -left-[37px] md:-left-[46px] top-[24px]" />
              <div className="card p-6 md:p-8">
                <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">2015 – 2025</p>
                <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
                  Digital Marketing Professional
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Konzeption, Steuerung und datengetriebene Optimierung von Kampagnen, Analytics und Strategien für globale Marken und Agenturen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer / Contact ─── */}
      <footer id="contact" className="py-20 px-6 md:px-[5%] border-t border-border">
        <div className="max-w-[960px] mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-text-primary mb-3">
            Let's Connect
          </h2>
          <p className="text-sm text-text-tertiary mb-10">
            Ready to deploy new ideas.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-8 mb-12">
            <a href="mailto:mail@example.com" className="social-link">
              <EnvelopeSimple size={18} /> mail@example.com
            </a>
            <a href="https://github.com/grytchyn" target="_blank" rel="noreferrer" className="social-link">
              <GithubLogo size={18} /> GitHub
            </a>
            <a href="#" className="social-link">
              <LinkedinLogo size={18} /> LinkedIn
            </a>
          </div>

          <p className="text-xs text-text-tertiary flex items-center justify-center gap-1.5">
            © 2026 Konstantin. Made with <Heart size={12} weight="fill" className="text-accent" /> and logic.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
