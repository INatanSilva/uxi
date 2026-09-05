import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.body.classList.add('has-custom-cursor');

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const render = () => {
      const t = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      if (ringRef.current) ringRef.current.style.transform = t;
      if (dotRef.current) dotRef.current.style.transform = t;
      frame = 0;
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(render);
    };

    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element && !!el.closest('a, button, input, textarea, select, [role="button"]');

    const onOver = (e: MouseEvent) => {
      ringRef.current?.classList.toggle('hovering', isInteractive(e.target));
      dotRef.current?.classList.toggle('hovering', isInteractive(e.target));
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      if (frame) cancelAnimationFrame(frame);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="custom-cursor" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
