import { useState, useEffect } from 'react';
import './Navbar.css';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Navbar = ({ isDarkMode, onToggleTheme }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    checkMobile();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled || isMobile ? 'scrolled' : ''} ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="navbar-content">
        <div className="navbar-logo">
          <img src="/iconuxi.png" alt="UXI Logo" className="logo-image" />
          {/*<span className="logo-text">UXI</span>*/}
        </div>

        <div className="navbar-links">
          <a href="#product" className="navbar-link">Product</a>
          <a href="#feedback" className="navbar-link">Feedback</a>
          <a href="#contact" className="navbar-link">Contact</a>
        </div>

        <button 
          className="navbar-theme-toggle" 
          onClick={onToggleTheme}
          aria-label="Alternar tema"
        >
          {isDarkMode ? (
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

