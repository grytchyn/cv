const Hero = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center px-8 py-20 md:py-24 relative max-w-[42.5rem] mx-auto">
      {/* $ cat about.json — fades in first */}
      <p className="font-['JetBrains_Mono',monospace] text-xs text-green-muted mb-5 hero-fade hero-fade-1">
        <span className="text-gold">$</span> cat about.json
      </p>

      {/* Name — fades in second */}
      <h1 className="font-['JetBrains_Mono',monospace] text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.15] mb-4 hero-fade hero-fade-2">
        <span className="text-green">Konstantin Gritsch</span>
        <span className="cursor-blink"></span>
      </h1>

      {/* Tagline — fades in third */}
      <p className="text-base md:text-lg font-light text-green-muted mb-6 max-w-[480px] hero-fade hero-fade-3">
        IT-Specialist in Ausbildung · aus Leidenschaft und Überzeugung
      </p>

      {/* Meta info — fades in fourth */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm mb-7 text-green-text-dim hero-fade hero-fade-4">
        <span><span className="text-green">📍</span> Lübeck, 23562</span>
        <span><span className="text-green">🟢</span> ab sofort</span>
        <span><span className="text-green">🚗</span> Führerschein B</span>
        <span>
          <span className="text-green">🌍</span>{' '}
          <span className="text-gold">DE</span>(B1↗B2) · EN(B2) · UA · RU
        </span>
      </div>

      {/* Buttons — fade in last */}
      <div className="flex gap-3 flex-wrap hero-fade hero-fade-5">
        <a
          href="mailto:konstantin.gritsch@gmail.com"
          className="font-['JetBrains_Mono',monospace] text-sm px-6 py-2.5 rounded-sm bg-green text-[#0a0a0a] font-semibold no-underline transition-all duration-250 hover:shadow-[0_0_24px_rgba(0,200,83,0.3)] hover:-translate-y-px"
        >
          ✉️ Kontakt
        </a>
        <a
          href="https://github.com/grytchyn"
          target="_blank"
          rel="noopener noreferrer"
          className="font-['JetBrains_Mono',monospace] text-sm px-6 py-2.5 rounded-sm border border-[var(--border)] text-green-text no-underline transition-all duration-250 hover:border-green hover:text-green"
        >
          🐙 GitHub
        </a>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-6 font-['JetBrains_Mono',monospace] text-xs text-green-muted hero-fade hero-fade-6">
        <span className="bounce-down">↓</span> scroll
      </div>
    </section>
  );
};

export default Hero;
