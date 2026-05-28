const Hero = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center px-6 py-20 md:py-24 relative max-w-[42.5rem] mx-auto">
      <p className="font-['JetBrains_Mono',monospace] text-xs text-green-muted mb-5">
        <span className="text-gold">$</span> cat about.json
      </p>

      <h1 className="font-['JetBrains_Mono',monospace] text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.15] mb-4 text-green-text">
        <span className="text-green">Kostiantyn Grytchyn</span>
        <span className="cursor-blink"></span>
      </h1>

      <p className="text-base md:text-lg font-light text-green-muted mb-6 max-w-[480px]">
        IT-Specialist in Ausbildung · aus Leidenschaft und Überzeugung
      </p>

      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm mb-7 text-green-text-dim">
        <span><span className="text-green">📍</span> Lübeck, 23562</span>
        <span><span className="text-green">🟢</span> ab sofort</span>
        <span><span className="text-green">🚗</span> Führerschein B</span>
        <span>
          <span className="text-green">🌍</span>{' '}
          <span className="text-gold">DE</span>(B1↗B2) · EN(B2) · UA · RU
        </span>
      </div>

      <div className="flex gap-3 flex-wrap">
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

      <div className="absolute bottom-6 left-6 font-['JetBrains_Mono',monospace] text-xs text-green-muted opacity-40 md:opacity-100">
        <span className="inline-block animate-bounce-down">↓</span> scroll
      </div>
    </section>
  );
};

export default Hero;
