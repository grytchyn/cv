import { useEffect, useState } from 'react';

const links = [
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'career', label: 'career' },
  { id: 'contact', label: 'contact' },
];

const Nav = () => {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { threshold: 0.2, rootMargin: '-80px 0px 0px 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-3 md:gap-5 py-3 px-4 bg-bg/70 backdrop-blur-sm border-b border-[var(--border)]">
      {links.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`font-['JetBrains_Mono',monospace] text-xs md:text-sm tracking-[0.5px] no-underline transition-all duration-200 cursor-pointer bg-transparent border-none ${
            active === id
              ? 'text-green scale-105'
              : 'text-green-muted hover:text-green-text'
          }`}
        >
          <span className={active === id ? 'text-green/60' : 'text-green-dim'}>[</span>
          /{label}
          <span className={active === id ? 'text-green/60' : 'text-green-dim'}>]</span>
        </button>
      ))}
    </nav>
  );
};

export default Nav;