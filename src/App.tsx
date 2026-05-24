import { useEffect } from 'react'
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'

function App() {
  // Intersection Observer for scroll fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { root: null, rootMargin: '0px', threshold: 0.1 })

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const skills = ['AI & Machine Learning', 'Big Data', 'Linux Administration', 'Network Security', 'Cryptography', 'Knowledge Management', 'Systems Thinking', 'Economics']

  return (
    <div className="min-h-screen bg-bg-main text-text-body font-body relative">

      {/* Navigation */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-[5%] py-5 nav-blur z-50">
        <div className="font-body font-bold text-base tracking-[0.5px] text-text-primary">
          Konstantin Grytchyn
        </div>
        <ul className="flex gap-8 text-[11px] font-medium tracking-[0.3px]">
          <li><a href="#about" className="text-text-muted hover:text-text-primary transition-colors">About</a></li>
          <li><a href="#skills" className="text-text-muted hover:text-text-primary transition-colors">Skills</a></li>
          <li><a href="#experience" className="text-text-muted hover:text-text-primary transition-colors">Experience</a></li>
          <li><a href="#contact" className="text-text-muted hover:text-text-primary transition-colors">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-[120px] pb-[40px]" id="home">
        <div className="max-w-xl mx-auto fade-in">
          <div className="w-[96px] h-[96px] mx-auto mb-5">
            <img
              src="avatar.jpg"
              alt="Konstantin Grytchyn"
              className="w-full h-full rounded-full object-cover border border-border"
            />
          </div>
          <h1 className="font-heading text-[34px] font-semibold text-text-primary mb-1 tracking-[-0.5px] leading-tight">
            Konstantin Grytchyn
          </h1>
          <p className="text-[13px] text-text-secondary mb-1">
            Digital Strategy &amp; IT Infrastructure
          </p>
          <p className="text-[11px] text-text-muted mb-7">
            Lübeck, Germany
          </p>
          <div>
            <a href="#about" className="btn-primary">
              Get in Touch
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 px-[5%] max-w-[720px] mx-auto scroll-mt-20">
        <div className="fade-in">
          <h2 className="section-label mb-5">About</h2>
          <div className="card p-6">
            <p className="text-[13px] leading-relaxed text-text-body mb-3">
              Master's degree in Advertising (2015, with distinction). A decade of scaling digital strategies for global brands across international markets. Currently transitioning into IT — bridging deep business insight with technical execution.
            </p>
            <p className="text-[13px] leading-relaxed text-text-body">
              Actively seeking a <strong className="text-text-primary font-semibold">Fachinformatiker Ausbildung</strong> in Lübeck, with focus on application development and IT security.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-[5%] max-w-[720px] mx-auto scroll-mt-20">
        <div className="fade-in">
          <h2 className="section-label mb-5">Competencies</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="pill">{skill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-20 px-[5%] max-w-[720px] mx-auto scroll-mt-20">
        <div className="fade-in">
          <h2 className="section-label mb-5">Languages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="card p-4">
              <div className="font-semibold text-[12px] text-text-primary mb-1">Russian — Native</div>
              <div className="progress-track mb-1"><div className="progress-fill" style={{ width: '100%' }} /></div>
            </div>
            <div className="card p-4">
              <div className="font-semibold text-[12px] text-text-primary mb-1">English — C1 Fluent</div>
              <div className="progress-track mb-1"><div className="progress-fill" style={{ width: '90%' }} /></div>
            </div>
            <div className="card p-4 border-accent/20">
              <div className="font-semibold text-[12px] text-text-primary mb-1">German — B1 (Target: DTB B2)</div>
              <div className="progress-track mb-1"><div className="progress-fill" style={{ width: '60%', background: '#333' }} /></div>
            </div>
            <div className="card p-4">
              <div className="font-semibold text-[12px] text-text-primary mb-1">Ukrainian — Native</div>
              <div className="progress-track mb-1"><div className="progress-fill" style={{ width: '100%' }} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-20 px-[5%] max-w-[720px] mx-auto scroll-mt-20">
        <div className="fade-in">
          <h2 className="section-label mb-5">Career Path</h2>
          <div className="timeline space-y-6">
            <div>
              <div className="timeline-dot-active" />
              <div className="card-accent p-5">
                <h3 className="text-[12px] font-semibold text-text-primary mb-0.5">2025 — Present</h3>
                <h4 className="text-[13px] font-semibold text-text-primary mb-2">IT Career Transition</h4>
                <p className="text-[12px] leading-relaxed text-text-body">Relocated to Lübeck with family. Completed integration course (B1 certificate). Building Linux &amp; AI expertise on self-hosted infrastructure (Oracle / Contabo VPS).</p>
              </div>
            </div>
            <div>
              <div className="timeline-dot" />
              <div className="card p-5">
                <h3 className="text-[12px] font-semibold text-text-primary mb-0.5">2015 — 2025</h3>
                <h4 className="text-[13px] font-semibold text-text-primary mb-2">Digital Marketing Professional</h4>
                <p className="text-[12px] leading-relaxed text-text-body">Designed and optimized data-driven campaigns, analytics systems, and global brand strategies for leading agencies and international clients.</p>
              </div>
            </div>
            <div>
              <div className="timeline-dot" />
              <div className="card p-5">
                <h3 className="text-[12px] font-semibold text-text-primary mb-0.5">2011 — 2015</h3>
                <h4 className="text-[13px] font-semibold text-text-primary mb-2">M.A. Advertising (Distinction)</h4>
                <p className="text-[12px] leading-relaxed text-text-body">Graduated with honors. Foundation in strategic communication, consumer psychology, and brand management.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 px-[5%] border-t border-border bg-bg-surface/50">
        <div className="max-w-[720px] mx-auto text-center">
          <h2 className="font-heading text-xl font-semibold text-text-primary mb-1">Let's Connect</h2>
          <p className="text-[11px] text-text-muted mb-6">Ready to deploy new ideas.</p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 mb-6 text-[12px]">
            <a href="mailto:mail@example.com" className="flex items-center justify-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors">
              <EnvelopeSimple size={16} /> Email
            </a>
            <a href="https://github.com/grytchyn" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors">
              <GithubLogo size={16} /> GitHub
            </a>
            <a href="#" className="flex items-center justify-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors">
              <LinkedinLogo size={16} /> LinkedIn
            </a>
          </div>

          <p className="text-[9px] text-text-muted flex items-center justify-center gap-1 mt-6">
            © 2026 Konstantin Grytchyn
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
