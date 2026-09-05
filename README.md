# UXI - React Web App

Projeto React web configurado com Vite e TypeScript.

## Pré-requisitos

- Node.js >= 18
- npm, yarn ou pnpm

## Instalação

1. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

## Executando o projeto

### Desenvolvimento
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

O projeto estará disponível em `http://localhost:5173`

### Build para produção
```bash
npm run build
# ou
yarn build
# ou
pnpm build
```

### Preview da build
```bash
npm run preview
# ou
yarn preview
# ou
pnpm preview
```

## Estrutura do Projeto

```
uxi/
├── src/
│   ├── components/    # Componentes de UI reutilizáveis (Navbar, ContactModal, ...)
│   ├── sections/      # Secções da landing page (Hero, Services, Process, ...)
│   ├── data/          # site.ts — todo o conteúdo do site (FICTÍCIO, ver TODO UXI)
│   ├── lib/           # Helpers (construção da mensagem de contacto)
│   ├── App.tsx        # Composição da página + tema + modal
│   ├── main.tsx       # Ponto de entrada
│   ├── App.css        # Layout e secções
│   └── index.css      # Reset + estilos globais
├── public/            # Ficheiros estáticos (favicon)
├── index.html         # HTML + meta tags / SEO
└── vite.config.ts     # Configuração do Vite
```

## Contacto / formulário

O modal de contacto **não tem backend**. Ao submeter, abre o WhatsApp (e oferece
email como alternativa) com a mensagem preenchida. Configurar números e email em
`src/data/site.ts`. Para receber leads automaticamente no futuro, substituir a
lógica de submit em `src/components/ContactModal.tsx` por uma chamada a uma
Serverless Function (ex.: Vercel + Resend).

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Preview da build de produção
- `npm run lint` - Executa o linter

## Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **ESLint** - Linter
