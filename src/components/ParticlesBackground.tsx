import { useEffect, useRef } from 'react';
import './ParticlesBackground.css';

interface ParticlesBackgroundProps {
  isDarkMode: boolean;
}

interface P {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  o: number;
}

const ParticlesBackground = ({ isDarkMode }: ParticlesBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const darkRef = useRef(isDarkMode);

  useEffect(() => {
    darkRef.current = isDarkMode;
  }, [isDarkMode]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: P[] = [];
    const LINK_DIST = 120;

    const build = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Densidade por área, com limites — bem menos em ecrãs pequenos.
      const count = Math.min(90, Math.max(24, Math.round((width * height) / 22000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.6 + 0.5,
        vx: Math.random() * 0.4 - 0.2,
        vy: Math.random() * 0.4 - 0.2,
        o: Math.random() * 0.4 + 0.2,
      }));
    };
    build();

    let raf = 0;
    const frame = () => {
      const dark = darkRef.current;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        ctx.fillStyle = dark
          ? `rgba(255,255,255,${p.o})`
          : `rgba(0,0,0,${p.o * 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < LINK_DIST * LINK_DIST) {
            const alpha = 1 - Math.sqrt(distSq) / LINK_DIST;
            ctx.strokeStyle = dark
              ? `rgba(255,255,255,${0.1 * alpha})`
              : `rgba(0,0,0,${0.05 * alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 200);
    };

    start();
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-background" aria-hidden="true" />;
};

export default ParticlesBackground;
