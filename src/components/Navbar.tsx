import { useEffect, useState } from 'react';
import { navLinks } from '../data/site';
import './Navbar.css';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenModal: () => void;
}

const Navbar = ({ isDarkMode, onToggleTheme, onOpenModal }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const theme = isDarkMode ? 'dark' : 'light';

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${theme} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-content">
        <a href="#inicio" className="navbar-logo" aria-label="UXI — início">
          <img src="/iconuxi.png" alt="UXI" className="logo-image" width="40" height="40" />
        </a>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="navbar-actions">
          <button
            className="navbar-cta"
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onOpenModal();
            }}
          >
            Vamos conversar
          </button>

          <button
            className="navbar-theme-toggle"
            onClick={onToggleTheme}
            aria-label={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            type="button"
          >
            {isDarkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            )}
          </button>

          <button
            className="navbar-burger"
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
