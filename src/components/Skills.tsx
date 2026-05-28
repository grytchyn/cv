import { useScrollReveal } from '../hooks/useScrollReveal';

const skillCategories = [
  {
    label: '// technical',
    skills: ['IT-Grundlagen', 'MS Office', 'Web-Tools', 'Dokumentation', 'Linux Basics'],
  },
  {
    label: '// soft',
    skills: ['Teamarbeit', 'Organisation', 'Selbstständig', 'Lösungsorientiert', 'Sorgfältig', 'Zuverlässig'],
  },
];

const Skills = () => {
  const ref = useScrollReveal<HTMLElement>(0, 'fade-in-up');

  return (
    <section ref={ref} className="px-8 py-16 max-w-[42.5rem] mx-auto" style={{ opacity: 0 }}>
      <p className="font-['JetBrains_Mono',monospace] text-xs text-green tracking-[1px] mb-1">/skills</p>
      <div className="w-10 h-px bg-green-dim mb-6"></div>

      <div className="flex flex-wrap gap-1.5">
        {skillCategories.map((cat) => (
          <div key={cat.label} className="w-full flex flex-wrap gap-1.5">
            <p className="w-full font-['JetBrains_Mono',monospace] text-xs text-green-muted tracking-[0.5px] mb-2 mt-4 first:mt-0">
              {cat.label}
            </p>
            {cat.skills.map((skill) => (
              <span
                key={skill}
                className="text-sm px-3.5 py-1 rounded-xs border border-[var(--border)] text-green-text transition-all duration-250 hover:border-green hover:text-green hover:bg-green/5 hover:scale-105"
                style={{ cursor: 'default' }}
              >
                {skill}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
