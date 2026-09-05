import { useEffect, useState } from 'react';
import './AnimatedTitle.css';

interface AnimatedTitleProps {
  isDarkMode: boolean;
}

// A marca é UXI — e desdobra-se em UX + UI. O ciclo segura mais tempo em "UXI".
const SEQUENCE = ['UX', 'UI', 'UXI', 'UXI'];

const AnimatedTitle = ({ isDarkMode }: AnimatedTitleProps) => {
  const [step, setStep] = useState(2); // começa em "UXI"

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % SEQUENCE.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const word = SEQUENCE[step];

  return (
    <h1 className={`animated-title ${isDarkMode ? 'dark' : 'light'}`}>
      <span className="animated-text-container">
        <span key={`${word}-${step}`} className="animated-text">
          {word.split('').map((letter, index) => (
            <span
              key={index}
              className="cascade-letter"
              style={{ animationDelay: `${index * 0.08}s` } as React.CSSProperties}
            >
              {letter}
            </span>
          ))}
        </span>
      </span>
    </h1>
  );
};

export default AnimatedTitle;
