import { useScrollReveal } from '../hooks/useScrollReveal';

const projects = [
  {
    name: 'AI Compliance Consultant',
    logo: '/ai-verify-logo.svg',
    desc: 'SaaS MVP — prüft automatisch, ob eine Website dem EU AI Act entspricht. Formular → Web-Search → LLM-Analyse → Report in 5 Sprachen (EN/DE/FR/IT/ES). Backend mit Flask + PostgreSQL, günstiges LLM über Ollama Cloud.',
    tags: ['Python', 'Flask', 'PostgreSQL', 'LLM', 'Docker', 'Render'],
    demo: 'https://ai-act-verify.onrender.com/',
    github: 'https://github.com/grytchyn/ai-verify',
  },
  {
    name: 'Hyperreality Key',
    logo: '/hyperreality-logo.svg',
    desc: 'Philosophisches Browserspiel gegen Desinformation — erkennst du Manipulation in Social-Media-Posts? 12 Levels, 10 philosophische Skeletons (Baudrillard, Foucault, Derrida…). Built with React 19 + TypeScript + Vite 8.',
    tags: ['React 19', 'TypeScript', 'Vite 8', 'Tailwind v4', 'LLM', 'Render'],
    demo: 'https://hyperreality-key.onrender.com/',
    github: 'https://github.com/grytchyn/hyperreality-key',
  },
];

const Project = () => {
  const ref = useScrollReveal<HTMLElement>(0, 'fade-in-scale');

  return (
    <section ref={ref} className="px-8 py-16 max-w-[42.5rem] mx-auto opacity-0">
      <p className="font-['JetBrains_Mono',monospace] text-xs text-green tracking-[1px] mb-1">/projects</p>
      <div className="w-10 h-px bg-green-dim mb-6"></div>

      <div className="flex flex-col gap-6">
        {projects.map((p) => (
          <div key={p.name} className="rounded-xs border border-[var(--border)] p-6 transition-all duration-300 hover:border-green/25 hover:-translate-y-1 hover:shadow-[0_0_16px_rgba(0,200,83,0.08)]">
            <div className="flex items-start gap-4 mb-3">
              <img src={p.logo} alt={`${p.name} logo`} className="w-32 h-10 object-contain shrink-0 mt-0.5" />
              <h3 className="text-base font-semibold text-green-text pt-1">{p.name}</h3>
            </div>
            <p className="text-sm text-green-text-dim leading-relaxed mb-4">{p.desc}</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {p.tags.map((tag) => (
                <span key={tag} className="font-['JetBrains_Mono',monospace] text-xs px-2.5 py-0.5 rounded-xs bg-green/5 text-green-muted transition-all duration-200 hover:bg-green/10">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="font-['JetBrains_Mono',monospace] text-sm text-green no-underline transition-all duration-200 hover:text-gold inline-flex items-center gap-1.5 group">
                Live-Demo <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="font-['JetBrains_Mono',monospace] text-sm text-green no-underline transition-all duration-200 hover:text-gold inline-flex items-center gap-1.5 group">
                GitHub <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;