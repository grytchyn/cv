import { useScrollReveal } from '../hooks/useScrollReveal';

const About = () => {
  const ref = useScrollReveal<HTMLElement>(0, 'slide-in-left');

  return (
    <section ref={ref} className="px-8 py-16 max-w-[42.5rem] mx-auto opacity-0">
      <p className="font-['JetBrains_Mono',monospace] text-xs text-green tracking-[1px] mb-1">/about</p>
      <div className="w-10 h-px bg-green-dim mb-6"></div>
      <p className="text-sm md:text-[0.92rem] text-green-text-dim leading-relaxed max-w-[500px]">
        10+ Jahre in digitalem Marketing mit engem Kontakt zur Softwareentwicklung — jetzt der Schritt in die IT.
        {' '}<strong className="text-green-text font-medium">Brücke zwischen Fachbereich und Dev-Team.</strong>
        {' '}Konzipierte Kampagnen-Mechaniken, schrieb technische Spezifikationen,
        arbeitete mit Entwicklern an Apps, Websites und Games — von der Anforderung bis zum Debugging.
        Strukturiert, lösungsorientiert, eigenständig.
      </p>
      <div className="mt-4">
        <h3 className="text-base font-semibold text-green mb-2">IT-Kompetenzen</h3>
        <div className="flex flex-wrap gap-2">
          {['IT-Grundlagen', 'Web-Tools (HTML/CSS)', 'MS Office', 'Linux Basics'].map(skill => (
            <span key={skill} className="text-xs px-2.5 py-0.5 rounded-xs bg-green/5">{skill}</span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-base font-semibold text-green mb-2">Soft Skills</h3>
        <div className="flex flex-wrap gap-2">
          {['Teamarbeit', 'Lösungsorientiert', 'Sorgfältig'].map(skill => (
            <span key={skill} className="text-xs px-2.5 py-0.5 rounded-xs bg-green/5">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
