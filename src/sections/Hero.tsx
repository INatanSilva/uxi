import AnimatedTitle from '../components/AnimatedTitle';
import AnimatedPlaceholder from '../components/AnimatedPlaceholder';
import { hero } from '../data/site';
import './Hero.css';

interface HeroProps {
  isDarkMode: boolean;
  onOpenModal: () => void;
}

const Hero = ({ isDarkMode, onOpenModal }: HeroProps) => {
  return (
    <section className="hero" id="inicio">
      <p className="hero-eyebrow">{hero.eyebrow}</p>

      <AnimatedTitle isDarkMode={isDarkMode} />

      <p className="hero-subtitle">{hero.subtitle}</p>

      <button
        type="button"
        className="hero-prompt"
        onClick={onOpenModal}
        aria-label="Abrir formulário de contacto"
      >
        <span className="hero-prompt-text">
          <AnimatedPlaceholder isDarkMode={isDarkMode} />
        </span>
        <span className="hero-prompt-arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </span>
      </button>

      <div className="hero-actions">
        <button type="button" className="hero-btn hero-btn-primary" onClick={onOpenModal}>
          {hero.primaryCta}
        </button>
        <a href="#servicos" className="hero-btn hero-btn-ghost">
          {hero.secondaryCta}
        </a>
      </div>
    </section>
  );
};

export default Hero;
