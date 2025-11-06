import { useState } from 'react';
import AnimatedTitle from './components/AnimatedTitle';
import AnimatedPlaceholder from './components/AnimatedPlaceholder';
import ServiceDialog from './components/ServiceDialog';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de submit
    console.log('Input value:', inputValue);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Hero Section */}
      <section className="hero">
        <AnimatedTitle isDarkMode={isDarkMode} />
        <form className="hero-form" onSubmit={handleSubmit}>
          <div className="hero-input-wrapper">
            <input
              type="text"
              className="hero-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsDialogOpen(true)}
              readOnly
            />
            {!inputValue && (
              <div className="hero-input-placeholder">
                <AnimatedPlaceholder isDarkMode={isDarkMode} />
              </div>
            )}
          </div>
          <button 
            type="button" 
            className="theme-toggle-button" 
            onClick={toggleTheme}
            aria-label="Alternar tema"
          >
            {isDarkMode ? (
              // Lua (Dark Mode)
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="theme-icon"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              // Sol (Light Mode)
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="theme-icon"
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
        </form>
      </section>

      {/* Camp Section */}
      <section className="camp">
        <p className="camp-text">camp</p>
      </section>

      {/* Product Section */}
      <section className="section product">
        <h2 className="section-title">PRODUCT</h2>
      </section>

      {/* Feedback Section */}
      <section className="section feedback">
        <h2 className="section-title">FEEDBACK</h2>
      </section>

      {/* Contact Section */}
      <section className="section contact">
        <h2 className="section-title">CONTACT</h2>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">FOOTER</p>
      </footer>

      {/* Service Dialog */}
      <ServiceDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default App;
