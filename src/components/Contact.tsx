import { useEffect, useRef } from 'react';

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.classList.add('animate-fade-in-scale');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="px-8 py-16 max-w-[42.5rem] mx-auto scroll-mt-20">
      <div
        ref={ref}
        className="rounded-xs border border-[var(--border-hover)] p-8 text-center opacity-0"
      >
        <h2 className="font-['JetBrains_Mono',monospace] text-sm font-normal text-green-muted mb-5">
          $ echo &quot;Sie suchen einen Azubi, der schon liefert?&quot;
        </h2>

        <a
          href="mailto:konstantin.gritsch@gmail.com"
          className="inline-block font-['JetBrains_Mono',monospace] text-sm px-8 py-3 rounded-xs bg-green text-[#0a0a0a] font-semibold no-underline transition-all duration-250 mb-5 hover:shadow-[0_0_32px_rgba(0,200,83,0.35)] hover:-translate-y-0.5"
        >
          ✉️ Nachricht senden
        </a>

        <div className="flex justify-center gap-4 flex-wrap text-sm text-green-text-dim">
          <a
            href="mailto:konstantin.gritsch@gmail.com"
            className="text-green-text-dim no-underline transition-colors duration-200 hover:text-green"
          >
            ✉️ konstantin.gritsch@gmail.com
          </a>
          <a
            href="https://github.com/grytchyn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-text-dim no-underline transition-colors duration-200 hover:text-green"
          >
            🐙 github.com/grytchyn
          </a>
          <span><a href="tel:+491****0018" className="text-green-text-dim no-underline transition-colors duration-200 hover:text-green">📞 +49 177 9740018</a></span>
          <span>📍 23562 Lübeck, DE</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
