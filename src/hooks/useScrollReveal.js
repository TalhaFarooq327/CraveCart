import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Immediately add revealed if IntersectionObserver is not available
    if (!('IntersectionObserver' in window)) {
      element.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold || 0.01,
        rootMargin: options.rootMargin || '50px 0px 50px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return ref;
}

