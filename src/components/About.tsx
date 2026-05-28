import { useScrollReveal } from '../hooks/useScrollReveal';

const About = () => {
  const ref = useScrollReveal<HTMLElement>(0, 'slide-in-left');

  return (
    <section ref={ref} className="px-8 py-16 max-w-[42.5rem] mx-auto" style={{ opacity: 0 }}>
      <p className="font-['JetBrains_Mono',monospace] text-xs text-green tracking-[1px] mb-1">/about</p>
      <div className="w-10 h-px bg-green-dim mb-6"></div>
      <p className="text-sm md:text-[0.92rem] text-green-text-dim leading-relaxed max-w-[500px]">
        10+ Jahre in digitalem Marketing und Content-Produktion — jetzt der Schritt in die IT.
        {' '}<strong className="text-green-text font-medium">Strukturiert, lernbereit, lösungsorientiert.</strong>
        {' '}Zuverlässig, sorgfältig, eigenständig.
      </p>
    </section>
  );
};

export default About;
