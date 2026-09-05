// Constrói a mensagem de contacto enviada por WhatsApp ou email.
// Sem backend: o formulário abre o WhatsApp / cliente de email já preenchido.

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
  budget: string;
  deadline: string;
}

export const emptyContactForm: ContactFormData = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  message: '',
  budget: '',
  deadline: '',
};

export const contactSubject = 'Novo projeto — contacto pelo site UXI';

export function buildContactMessage(data: ContactFormData): string {
  const lines = [
    'Olá UXI! Gostaria de falar sobre um projeto.',
    '',
    `Nome: ${data.name}`,
    `Email: ${data.email}`,
  ];

  if (data.company.trim()) lines.push(`Empresa: ${data.company}`);
  if (data.projectType.trim()) lines.push(`Tipo de projeto: ${data.projectType}`);
  if (data.budget.trim()) lines.push(`Orçamento estimado: ${data.budget}`);
  if (data.deadline.trim()) lines.push(`Prazo desejado: ${data.deadline}`);

  lines.push('', 'O que preciso:', data.message.trim());

  return lines.join('\n');
}

export interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(data: ContactFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name.trim()) errors.name = 'Diz-nos como te chamas.';
  if (!data.email.trim()) errors.email = 'Precisamos de um email para responder.';
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = 'Esse email não parece válido.';
  if (data.message.trim().length < 10)
    errors.message = 'Conta-nos um pouco mais (pelo menos uma frase).';

  return errors;
}

export const budgetOptions = [
  'Ainda não sei',
  'Até 2.000 €',
  '2.000 – 5.000 €',
  '5.000 – 10.000 €',
  'Mais de 10.000 €',
];

export const deadlineOptions = ['Sem pressa', '1 mês', '2–3 meses', 'O quanto antes'];
