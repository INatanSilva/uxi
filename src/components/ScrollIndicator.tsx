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
    <div 
      className={`scroll-indicator ${isDarkMode ? 'dark' : 'light'}`}
      onClick={handleClick}
    >
      <div className="scroll-indicator-mouse">
        <div className="scroll-indicator-wheel"></div>
      </div>
      <div className="scroll-indicator-arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </div>
  );
};

export default ScrollIndicator;

