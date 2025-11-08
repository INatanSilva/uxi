import { useState, useEffect } from 'react';
import './AnimatedPlaceholder.css';

interface AnimatedPlaceholderProps {
  isDarkMode: boolean;
}

const AnimatedPlaceholder = ({ isDarkMode }: AnimatedPlaceholderProps) => {
  const phrases = [
    'Eu quero uma landing page',
    'Eu quero um aplicativo',
    'Eu quero automações',
    'Eu quero um site',
    'Eu quero um design',
    'Eu quero uma identidade visual',
    'Eu quero um e-commerce',
    'Eu quero um sistema web',
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (isTyping && !isDeleting) {
      // Digitando
      if (displayedText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 100); // Velocidade de digitação
      } else {
        // Terminou de digitar, espera 9 segundos
        timeout = setTimeout(() => {
          setIsDeleting(true);
          setIsTyping(false);
        }, 9000);
      }
    } else if (isDeleting) {
      // Apagando
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50); // Velocidade de apagar (mais rápido)
      } else {
        // Terminou de apagar, vai para próxima frase
        setIsDeleting(false);
        setIsTyping(true);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => {
      if (timeout !== undefined) {
        clearTimeout(timeout);
      }
    };
  }, [displayedText, isTyping, isDeleting, currentPhraseIndex, phrases]);

  return (
    <span className="animated-placeholder">
      {displayedText}
      <span className="cursor">|</span>
    </span>
  );
};

export default AnimatedPlaceholder;

