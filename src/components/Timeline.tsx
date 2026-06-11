import { useScrollReveal } from '../hooks/useScrollReveal';

interface TimelineItem {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  gold?: boolean;
}

const educationItems: TimelineItem[] = [
  {
    date: '2009 — 2015',
    title: 'M.A. Werbung & Öffentlichkeitsarbeit',
    subtitle: '★ Mit Auszeichnung',
    description: 'Master of Arts — Grundstein für Kommunikation, Strategie und digitales Marketing.',
    gold: true,
  },
];

const careerItems: TimelineItem[] = [
  {
    date: '2025 — heute',
    title: 'IT-Ausbildung · AI-Augmented Delivery',
    subtitle: 'Lübeck, Deutschland',
    description: 'Eigenständige Projekte mit React, TypeScript, Docker und CI/CD. Orchestriere Multi-Agent-Workflows, designe Systemarchitekturen und deploye auf Linux-VPS. Systematische Problemlösung mit Diagnose-Framework.',
  },
  {
    date: '2022 — 2024',
    title: 'Online-Texter (Englisch)',
    subtitle: 'AltRecipe · Kyiv',
    description: 'Internationale Content-Produktion auf Englisch, enge Zusammenarbeit mit Dev-Team an Website-Features, Workflow-Management und Bug-Triage.',
  },
  {
    date: '2017 — 2022',
    title: 'Digital Marketing & Dev-Bridge',
    subtitle: 'Wizard Digital · Kyiv',
    description: 'Konzipierte Kampagnen-Mechaniken, schrieb technische Spezifikationen für Developer. Gemeinsames Debugging von Webapps und Landing Pages — Brücke zwischen Fachbereich und Code.',
  },
];

function TimelineItemRow({ item, delay }: { item: TimelineItem; delay: number }) {
  const ref = useScrollReveal<HTMLDivElement>(delay, 'slide-in-left');

  return (
    <div
      ref={ref}
      className="flex gap-5 py-4 pl-5 border-l border-[var(--border)] relative opacity-0 transition-all duration-300 hover:pl-6"
      style={{ borderLeftColor: item.gold ? 'var(--gold)' : 'var(--border)' }}
    >
      <div
        className="absolute left-[-3px] top-5 w-[6px] h-[6px] rounded-full transition-all duration-300"
        style={{
          background: item.gold ? 'var(--gold)' : 'var(--green)',
          boxShadow: item.gold ? '0 0 8px rgba(212,175,55,0.5)' : '0 0 4px rgba(0,200,83,0.3)',
        }}
      ></div>
      <div className="font-['JetBrains_Mono',monospace] text-xs text-green-muted min-w-[80px] shrink-0 pt-0.5">
        {item.date}
      </div>
      <div className="flex-1">
        <h3 className="text-[0.92rem] font-semibold text-green-text mb-0.5">{item.title}</h3>
        <p className={`text-sm mb-1 ${item.gold ? 'text-gold' : 'text-green-muted'}`}>
          {item.subtitle}
        </p>
        <p className="text-sm text-green-text-dim leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}

const Education = () => {
  return (
    <section className="px-8 py-16 max-w-[42.5rem] mx-auto">
      <p className="font-['JetBrains_Mono',monospace] text-xs text-green tracking-[1px] mb-1">/education</p>
      <div className="w-10 h-px bg-green-dim mb-6"></div>
      {educationItems.map((item) => (
        <TimelineItemRow key={item.title} item={item} delay={0} />
      ))}
    </section>
  );
};

const Career = () => {
  return (
    <section id="career" className="px-8 py-16 max-w-[42.5rem] mx-auto scroll-mt-20">
      <p className="font-['JetBrains_Mono',monospace] text-xs text-green tracking-[1px] mb-1">/career</p>
      <div className="w-10 h-px bg-green-dim mb-6"></div>
      {careerItems.map((item, i) => (
        <TimelineItemRow key={item.title} item={item} delay={i * 100} />
      ))}
    </section>
  );
};

export { Education, Career };
