import { useEffect, useState } from 'react';
import { projectPhrases } from '../data/site';
import './AnimatedPlaceholder.css';

interface AnimatedPlaceholderProps {
  isDarkMode: boolean;
}

const AnimatedPlaceholder = ({ isDarkMode }: AnimatedPlaceholderProps) => {
  void isDarkMode;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      setText(projectPhrases[0]);
      return;
    }

    const full = projectPhrases[index];
    let delay = deleting ? 35 : 65;

    if (!deleting && text === full) {
      delay = 2600;
    } else if (deleting && text === '') {
      delay = 300;
    }

    const timeout = setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % projectPhrases.length);
      } else {
        setText(full.slice(0, deleting ? text.length - 1 : text.length + 1));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, index, reduced]);

  return (
    <span className="animated-placeholder">
      {text}
      <span className="cursor" aria-hidden="true">|</span>
    </span>
  );
};

export default AnimatedPlaceholder;
