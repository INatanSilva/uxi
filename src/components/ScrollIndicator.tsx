import './ScrollIndicator.css';

interface ScrollIndicatorProps {
  isDarkMode: boolean;
}

const ScrollIndicator = ({ isDarkMode }: ScrollIndicatorProps) => {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <button
      type="button"
      className={`scroll-indicator ${isDarkMode ? 'dark' : 'light'}`}
      onClick={handleClick}
      aria-label="Continuar a ver"
    >
      <span className="scroll-indicator-mouse">
        <span className="scroll-indicator-wheel"></span>
      </span>
      <span className="scroll-indicator-arrow" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </span>
    </button>
  );
};

export default ScrollIndicator;

