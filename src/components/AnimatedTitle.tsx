import { useState, useEffect } from 'react';
import './AnimatedTitle.css';

interface AnimatedTitleProps {
  isDarkMode: boolean;
}

const AnimatedTitle = ({ isDarkMode }: AnimatedTitleProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const words = ['UXI', 'UX', 'UI'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 5000); // Tempo para ver cada palavra

    return () => clearInterval(interval);
  }, []);

  const currentText = words[currentIndex];

  return (
    <h1 className={`animated-title ${isDarkMode ? 'dark' : 'light'}`}>
      <span className="animated-text-container">
        <span key={currentText} className="animated-text">
          {currentText.split('').map((letter, index) => (
            <span
              key={index}
              className="cascade-letter"
              style={{
                '--cascade-delay': `${index * 0.1}s`,
                animationDelay: `${index * 0.1}s`,
              } as React.CSSProperties}
            >
              {letter}
            </span>
          ))}
        </span>
      </span>
      <span className="static-text">.UXI</span>
    </h1>
  );
};

export default AnimatedTitle;

