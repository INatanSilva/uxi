import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  buildContactMessage,
  budgetOptions,
  contactSubject,
  deadlineOptions,
  emptyContactForm,
  validateContactForm,
  type ContactFormData,
  type FieldErrors,
} from '../lib/contactMessage';
import { contact, mailtoHref, projectPhrases, whatsappHref } from '../data/site';
import './ContactModal.css';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  initialProjectType?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])';

const projectTypeOptions = projectPhrases.map((p) => p.replace(/^Quero /, ''));

const ContactModal = ({ isOpen, onClose, isDarkMode, initialProjectType }: ContactModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const titleId = useId();

  const [form, setForm] = useState<ContactFormData>(emptyContactForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);

  const update = <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  // Reset state whenever the modal opens; remember what to focus on close.
  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement;
    setForm({ ...emptyContactForm, projectType: initialProjectType ?? '' });
    setErrors({});
    setSent(false);
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [isOpen, initialProjectType]);

  // ESC to close, body scroll lock, focus trap, focus restore.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;

      const nodes = contentRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const list = Array.from(nodes).filter((n) => n.offsetParent !== null);
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const message = () => buildContactMessage(form);
  const primaryNumber = contact.whatsapp[0].number;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateContactForm(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      contentRef.current
        ?.querySelector<HTMLElement>(`[name="${firstKey}"]`)
        ?.focus();
      return;
    }
    window.open(whatsappHref(primaryNumber, message()), '_blank', 'noopener');
    setSent(true);
  };

  return (
    <div className={`cm-overlay ${isDarkMode ? 'dark' : 'light'}`} onMouseDown={close}>
      <div
        ref={contentRef}
        className={`cm-content ${isDarkMode ? 'dark' : 'light'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="cm-close" onClick={close} aria-label="Fechar" type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {sent ? (
          <div className="cm-success">
            <div className="cm-success-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2 id={titleId} className="cm-title">Estamos quase!</h2>
            <p className="cm-text">
              Abrimos o WhatsApp com a tua mensagem pronta a enviar. Se não abriu,
              usa uma das opções abaixo — respondemos em 24–48h.
            </p>
            <div className="cm-success-actions">
              {contact.whatsapp.map((w) => (
                <a
                  key={w.number}
                  className="cm-btn cm-btn-primary"
                  href={whatsappHref(w.number, message())}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {w.label}
                </a>
              ))}
              <a className="cm-btn cm-btn-ghost" href={mailtoHref(contactSubject, message())}>
                Enviar por email
              </a>
            </div>
            <button className="cm-link" type="button" onClick={() => setSent(false)}>
              Voltar ao formulário
            </button>
          </div>
        ) : (
          <>
            <div className="cm-header">
              <p className="cm-eyebrow">Vamos conversar</p>
              <h2 id={titleId} className="cm-title">Conta-nos sobre o teu projeto</h2>
              <p className="cm-text">
                Poucos campos. Ao enviar, abrimos o WhatsApp com tudo preenchido.
              </p>
            </div>

            <form className="cm-form" onSubmit={handleSubmit} noValidate>
              <div className="cm-row">
                <div className="cm-field">
                  <label htmlFor="cm-name">Nome *</label>
                  <input
                    ref={firstFieldRef}
                    id="cm-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'cm-name-err' : undefined}
                  />
                  {errors.name && <span id="cm-name-err" className="cm-err">{errors.name}</span>}
                </div>

                <div className="cm-field">
                  <label htmlFor="cm-email">Email *</label>
                  <input
                    id="cm-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'cm-email-err' : undefined}
                  />
                  {errors.email && <span id="cm-email-err" className="cm-err">{errors.email}</span>}
                </div>
              </div>

              <div className="cm-row">
                <div className="cm-field">
                  <label htmlFor="cm-company">Empresa <span className="cm-opt">(opcional)</span></label>
                  <input
                    id="cm-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={form.company}
                    onChange={(e) => update('company', e.target.value)}
                  />
                </div>

                <div className="cm-field">
                  <label htmlFor="cm-type">Tipo de projeto <span className="cm-opt">(opcional)</span></label>
                  <select
                    id="cm-type"
                    name="projectType"
                    value={form.projectType}
                    onChange={(e) => update('projectType', e.target.value)}
                  >
                    <option value="">Escolher…</option>
                    {projectTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="cm-field">
                <label htmlFor="cm-message">O que precisas de desenvolver? *</label>
                <textarea
                  id="cm-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'cm-message-err' : undefined}
                />
                {errors.message && <span id="cm-message-err" className="cm-err">{errors.message}</span>}
              </div>

              <div className="cm-row">
                <div className="cm-field">
                  <label htmlFor="cm-budget">Orçamento estimado <span className="cm-opt">(opcional)</span></label>
                  <select
                    id="cm-budget"
                    name="budget"
                    value={form.budget}
                    onChange={(e) => update('budget', e.target.value)}
                  >
                    <option value="">Escolher…</option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="cm-field">
                  <label htmlFor="cm-deadline">Prazo desejado <span className="cm-opt">(opcional)</span></label>
                  <select
                    id="cm-deadline"
                    name="deadline"
                    value={form.deadline}
                    onChange={(e) => update('deadline', e.target.value)}
                  >
                    <option value="">Escolher…</option>
                    {deadlineOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="cm-actions">
                <button type="submit" className="cm-btn cm-btn-primary cm-btn-block">
                  Enviar projeto
                </button>
                <p className="cm-privacy">
                  Ao enviar, os teus dados vão apenas para a equipa da UXI. Sem spam.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
