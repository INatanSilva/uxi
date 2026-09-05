import { useState } from 'react';
import { services } from '../data/site';
import './Services.css';

interface ServicesProps {
  isDarkMode: boolean;
}

const Services = ({ isDarkMode }: ServicesProps) => {
  const [active, setActive] = useState(0);

  return (
    <section id="servicos" className={`section services ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="section-head">
        <p className="section-eyebrow">Serviços</p>
        <h2 className="section-title">O que fazemos</h2>
        <p className="section-lead">
          Do primeiro rascunho ao produto em produção. Escolhe uma área para ver
          o que entregamos.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, i) => {
          const open = active === i;
          return (
            <article
              key={service.title}
              className={`service-card ${open ? 'open' : ''}`}
            >
              <button
                type="button"
                className="service-card-header"
                aria-expanded={open}
                onClick={() => setActive(open ? -1 : i)}
              >
                <span className="service-card-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="service-card-title">{service.title}</span>
                <span className="service-card-toggle" aria-hidden="true">{open ? '–' : '+'}</span>
              </button>

              <div className="service-card-body">
                <p>{service.description}</p>
                <ul>
                  {service.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
