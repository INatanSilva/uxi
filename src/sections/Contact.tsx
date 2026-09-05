import { contact, whatsappHref } from '../data/site';
import './Contact.css';

interface ContactProps {
  isDarkMode: boolean;
  onOpenModal: () => void;
}

const Contact = ({ isDarkMode, onOpenModal }: ContactProps) => {
  return (
    <section id="contacto" className={`section contact ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="contact-inner">
        <h2 className="section-title">Tens um projeto em mente?</h2>
        <p className="section-lead">
          Conta-nos o que precisas. Respondemos em 24–48h, sem compromisso.
        </p>

        <div className="contact-actions">
          <button type="button" className="contact-btn contact-btn-primary" onClick={onOpenModal}>
            Enviar projeto
          </button>
          <a
            className="contact-btn contact-btn-ghost"
            href={whatsappHref(contact.whatsapp[0].number)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar no WhatsApp
          </a>
        </div>

        <div className="contact-direct">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          {contact.whatsapp.map((w) => (
            <a key={w.number} href={whatsappHref(w.number)} target="_blank" rel="noopener noreferrer">
              +{w.number.replace(/^(\d{3})(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3 $4')}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
