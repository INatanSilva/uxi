import { useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import CompaniesMarquee from './components/CompaniesMarquee';
import CustomCursor from './components/CustomCursor';
import ParticlesBackground from './components/ParticlesBackground';
import ContactModal from './components/ContactModal';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Process from './sections/Process';
import Work from './sections/Work';
import About from './sections/About';
import Contact from './sections/Contact';
import { contact } from './data/site';
import './App.css';

const THEME_KEY = 'uxi-theme';

function getInitialTheme(): boolean {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
  } catch {
    /* localStorage indisponível */
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    return !window.matchMedia('(prefers-color-scheme: light)').matches;
  }
  return true;
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Revela títulos de secção ao entrar no viewport.
  useEffect(() => {
    const titles = document.querySelectorAll('.section-title, .section-head');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      titles.forEach((t) => t.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    titles.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <a href="#servicos" className="skip-link">Saltar para o conteúdo</a>

      <CustomCursor />
      <ParticlesBackground isDarkMode={isDarkMode} />
      <Navbar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} onOpenModal={openModal} />

      <main>
        <Hero isDarkMode={isDarkMode} onOpenModal={openModal} />

        <section className="camp" aria-label="Clientes">
          <CompaniesMarquee isDarkMode={isDarkMode} />
        </section>

        <Services isDarkMode={isDarkMode} />
        <Process isDarkMode={isDarkMode} />
        <Work isDarkMode={isDarkMode} />
        <About isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} onOpenModal={openModal} />
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-brand">UXI</span>
          <span className="footer-tagline">Estúdio de software · Portugal</span>
          <div className="footer-links">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href="#servicos">Serviços</a>
            <a href="#contacto">Contacto</a>
          </div>
          <span className="footer-copy">© {new Date().getFullYear()} UXI</span>
        </div>
      </footer>

      <ContactModal isOpen={isModalOpen} onClose={closeModal} isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
