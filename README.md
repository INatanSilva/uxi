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
│   ├── components/    # Componentes reutilizáveis
│   ├── screens/       # Páginas/Telas
│   ├── utils/         # Funções utilitárias
│   ├── types/         # Tipos TypeScript
│   ├── App.tsx        # Componente principal
│   ├── main.tsx       # Ponto de entrada
│   └── index.css      # Estilos globais
├── public/            # Arquivos estáticos
├── index.html         # HTML principal
└── vite.config.ts     # Configuração do Vite
```

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
