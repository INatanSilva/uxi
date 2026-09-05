import { work } from '../data/site';
import './Work.css';

interface WorkProps {
  isDarkMode: boolean;
}

const Work = ({ isDarkMode }: WorkProps) => {
  return (
    <section id="trabalho" className={`section work ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="section-head">
        <p className="section-eyebrow">Trabalho</p>
        <h2 className="section-title">Alguns projetos</h2>
        <p className="section-lead">
          Problema, solução e resultado. Exemplos ilustrativos — cases reais em breve.
        </p>
      </div>

      <div className="work-grid">
        {work.map((c) => (
          <article key={c.name} className="work-card">
            <header className="work-card-head">
              <h3>{c.name}</h3>
              <span className="work-card-sector">{c.sector}</span>
            </header>

            <dl className="work-card-story">
              <div>
                <dt>Problema</dt>
                <dd>{c.problem}</dd>
              </div>
              <div>
                <dt>Solução</dt>
                <dd>{c.solution}</dd>
              </div>
              <div>
                <dt>Resultado</dt>
                <dd>{c.result}</dd>
              </div>
            </dl>

            <ul className="work-card-tech">
              {c.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Work;
