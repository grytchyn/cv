import { useRef, useEffect } from 'react';

type AnimationType = 'fade-in-up' | 'fade-in-scale' | 'slide-in-left';

export function useScrollReveal<T extends HTMLElement>(
  delay = 0,
  animation: AnimationType = 'fade-in-up'
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add(`animate-${animation}`);
            el.style.opacity = '1';
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, animation]);

  return ref;
}
