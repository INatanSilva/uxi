import './CompaniesMarquee.css';

interface CompaniesMarqueeProps {
  isDarkMode: boolean;
}

const CompaniesMarquee = ({ isDarkMode }: CompaniesMarqueeProps) => {
  const companies = ['PsyConnect', 'AVAX', 'UberEats', 'Spotify'];


  return (
    <div className={`companies-marquee ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="marquee-track">
        {companies.map((company, index) => (
          <div key={index} className="marquee-item">
            <span className="company-name">{company}</span>
            <span className="marquee-separator">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesMarquee;

