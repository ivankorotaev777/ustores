'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type AnimateOnViewProps = {
  children: ReactNode;
  className?: string;
  /** Задержка появления (мс), для каскада карточек */
  delay?: number;
};

export function AnimateOnView({ children, className = '', delay = 0 }: AnimateOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          ob.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } motion-reduce:opacity-100 motion-reduce:translate-y-0 ${className}`}
      style={visible && delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
