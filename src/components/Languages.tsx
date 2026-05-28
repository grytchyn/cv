import { useRef, useEffect } from 'react';

interface Lang {
  flag: string;
  name: string;
  level: string;
  width: number;
  gold?: boolean;
}

const languages: Lang[] = [
  { flag: '🇺🇦', name: 'Ukrainian', level: 'Muttersprache', width: 100 },
  { flag: '🇷🇺', name: 'Russian', level: 'Muttersprache', width: 100 },
  { flag: '🇬🇧', name: 'English', level: 'B2 — Independent', width: 75 },
  { flag: '🇩🇪', name: 'Deutsch', level: 'B1 → B2 · Prüfung 20.08.2026', width: 55, gold: true },
];

function LangCard({ lang, delay }: { lang: Lang; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1';
            el.classList.add('animate-fade-in-up');
            // Trigger bar fill
            const fill = el.querySelector('.lang-fill') as HTMLElement;
            if (fill) fill.style.width = lang.width + '%';
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, lang.width]);

  return (
    <div
      ref={ref}
      className="p-4 rounded-xs border border-[var(--border)] opacity-0 transition-all duration-400 hover:border-green/25 hover:scale-[1.02]"
      style={{ borderColor: lang.gold ? 'rgba(212,175,55,0.15)' : undefined }}
    >
      <p className="text-sm font-semibold text-green-text mb-0.5">{lang.flag} {lang.name}</p>
      <p className={`text-xs mb-2 ${lang.gold ? 'text-gold' : 'text-green-text-dim'}`}>{lang.level}</p>
      <div className="h-[3px] bg-white/5 rounded-sm overflow-hidden">
        <div
          className="lang-fill h-full rounded-sm"
          style={{
            width: '0%',
            background: lang.gold
              ? 'linear-gradient(90deg, var(--green), var(--gold))'
              : 'var(--green)',
          }}
        ></div>
      </div>
    </div>
  );
}

const Languages = () => {
  return (
    <section className="px-6 py-16 max-w-[42.5rem] mx-auto">
      <p className="font-['JetBrains_Mono',monospace] text-xs text-green tracking-[1px] mb-1">/languages</p>
      <div className="w-10 h-px bg-green-dim mb-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {languages.map((lang, i) => (
          <LangCard key={lang.name} lang={lang} delay={i * 100} />
        ))}
      </div>
    </section>
  );
};

export default Languages;
