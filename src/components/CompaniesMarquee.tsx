import './CompaniesMarquee.css';

interface CompaniesMarqueeProps {
  isDarkMode: boolean;
}

// TODO UXI: substituir por clientes reais (ou remover a secção).
const companies = ['PsyConnect', 'AVAX', 'UberEats', 'Spotify'];

const CompaniesMarquee = ({ isDarkMode }: CompaniesMarqueeProps) => {
  const items = [...companies, ...companies];

  return (
    <div className={`companies-marquee ${isDarkMode ? 'dark' : 'light'}`}>
      <p className="marquee-label">Já trabalhámos com</p>
      <div className="marquee-viewport">
        <div className="marquee-track" aria-hidden="false">
          {items.map((company, index) => (
            <span key={index} className="marquee-item">
              <span className="company-name">{company}</span>
              <span className="marquee-separator" aria-hidden="true">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesMarquee;
