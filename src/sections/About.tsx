import { about, founders } from '../data/site';
import './About.css';

interface AboutProps {
  isDarkMode: boolean;
}

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

const About = ({ isDarkMode }: AboutProps) => {
  return (
    <section id="sobre" className={`section about ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="section-head">
        <p className="section-eyebrow">Sobre</p>
        <h2 className="section-title">{about.title}</h2>
        <p className="section-lead">{about.text}</p>
      </div>

      <div className="about-team">
        {founders.map((f) => (
          <article key={f.name} className="about-member">
            <div className="about-avatar" aria-hidden="true">{initials(f.name)}</div>
            <h3>{f.name}</h3>
            <p className="about-role">{f.role}</p>
            <p className="about-bio">{f.bio}</p>
            <div className="about-links">
              {f.github && (
                <a href={f.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              )}
              {f.linkedin && (
                <a href={f.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default About;
