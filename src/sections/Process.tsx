import { process } from '../data/site';
import './Process.css';

interface ProcessProps {
  isDarkMode: boolean;
}

const Process = ({ isDarkMode }: ProcessProps) => {
  return (
    <section id="processo" className={`section process ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="section-head">
        <p className="section-eyebrow">Processo</p>
        <h2 className="section-title">Como trabalhamos</h2>
        <p className="section-lead">
          Um caminho simples e previsível, do primeiro contacto à evolução contínua.
        </p>
      </div>

      <ol className="process-list">
        {process.map((step, i) => (
          <li key={step.title} className="process-step">
            <span className="process-step-num">{String(i + 1).padStart(2, '0')}</span>
            <div className="process-step-body">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Process;
