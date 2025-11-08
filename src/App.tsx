import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AnimatedTitle from './components/AnimatedTitle';
import AnimatedPlaceholder from './components/AnimatedPlaceholder';
import ServiceDialog from './components/ServiceDialog';
import CompaniesMarquee from './components/CompaniesMarquee';
import CustomCursor from './components/CustomCursor';
import ParticlesBackground from './components/ParticlesBackground';
import ScrollIndicator from './components/ScrollIndicator';
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

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title) => observer.observe(title));

    return () => {
      sectionTitles.forEach((title) => observer.unobserve(title));
    };
  }, []);

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <CustomCursor />
      <ParticlesBackground isDarkMode={isDarkMode} />
      <Navbar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      
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
        </form>
        <ScrollIndicator isDarkMode={isDarkMode} />
      </section>

      {/* Companies Section */}
      <section className="camp">
        <CompaniesMarquee isDarkMode={isDarkMode} />
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
