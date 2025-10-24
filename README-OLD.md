# 🏋️ FitAI - Seu Personal Trainer Digital com Supabase

FitAI é uma aplicação moderna de fitness e nutrição que utiliza inteligência artificial para gerar planos personalizados de emagrecimento e treinamento. Integrado com Supabase para autenticação e banco de dados PostgreSQL.

## ✨ Funcionalidades

### 🎯 Core Features
- **🤖 IA Personalizada**: Geração de planos de treino e nutrição usando Z.AI GLM-4.5
- **🔐 Autenticação Segura**: Sistema de login/registro com Supabase Auth
- **🗄️ Banco de Dados**: PostgreSQL via Supabase com schema otimizado
- **📱 Interface Responsiva**: Design moderno com shadcn/ui e Tailwind CSS
- **📊 Dashboard de Sistema**: Monitoramento em tempo real da saúde da aplicação

### 🧩 UI Components
- **Formulários Inteligentes**: Validação com Zod e React Hook Form
- **Tabs de Navegação**: Alternar entre geração de planos e status do sistema
- **Cards Informativos**: Exibição clara de dados e status
- **Notificações**: Sistema de toast para feedback do usuário
- **Temas**: Suporte para modo claro/escuro

## 🚀 Tecnologias Utilizadas

### Frontend
- **⚡ Next.js 15** - Framework React com App Router
- **📘 TypeScript 5** - Tipagem segura e desenvolvimento robusto
- **🎨 Tailwind CSS 4** - Estilização utility-first
- **🧩 shadcn/ui** - Componentes acessíveis baseados em Radix UI
- **🎣 React Hook Form** - Formulários performáticos
- **✅ Zod** - Validação de schemas TypeScript-first

### Backend & Database
- **🗄️ Supabase** - PostgreSQL como serviço + Autenticação
- **🔐 Supabase Auth** - Sistema de autenticação completo
- **📊 Prisma ORM** - TypeScript ORM para banco de dados
- **🤖 Z.AI SDK** - Integração com IA para geração de planos

### Infraestrutura
- **🌐 Socket.IO** - Comunicação em tempo real
- **📡 API Routes** - Endpoints RESTful com Next.js
- **🔄 Hot Reload** - Desenvolvimento ágil com nodemon

## 🏗️ Arquitetura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── generate-plan/ # Geração de planos com IA
│   │   ├── test-supabase/ # Teste de conexão com Supabase
│   │   └── health/        # Health check
│   ├── page.tsx           # Página principal
│   ├── layout.tsx         # Layout raiz
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes shadcn/ui
│   ├── auth-form.tsx     # Formulário de autenticação
│   └── status-dashboard.tsx # Dashboard de sistema
├── hooks/                # Hooks personalizados
├── lib/                  # Utilitários e configurações
│   ├── db.ts            # Cliente Prisma
│   ├── supabase.ts      # Clientes Supabase
│   ├── auth.ts          # Funções de autenticação
│   └── utils.ts         # Utilitários diversos
└── prisma/               # Schema e configurações do banco
```

## 🚀 Configuração Rápida

### 1. Pré-requisitos
- Node.js 18+ instalado
- Conta no Supabase (https://supabase.com)
- Chave de API do Z.AI (opcional, para geração de planos)

### 2. Configurar Variáveis de Ambiente
Copie o arquivo `.env` e configure suas credenciais:

```bash
# Database URL do Supabase (Session pooler - recomendado para web)
DATABASE_URL=postgresql://postgres.seuprojeto:senha@aws-1-sa-east-1.pooler.supabase.com:5432/postgres

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seuprojeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_chave_servico_aqui

# Z.AI (opcional)
ZAI_API_KEY=sua_chave_zai_aqui
```

### 3. Instalar Dependências
```bash
npm install
```

### 4. Configurar Banco de Dados
```bash
# Push do schema para o banco de dados
npm run db:push

# Gerar cliente Prisma
npm run db:generate
```

### 5. Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 📋 Guia de Uso

### 1. Criar Conta
- Acesse a aplicação
- Clique em "Criar Conta"
- Preencha email, senha e nome
- Verifique seu email para confirmação

### 2. Fazer Login
- Use suas credenciais para fazer login
- Você será redirecionado para o dashboard principal

### 3. Gerar Plano Personalizado
- Na aba "Gerar Plano", preencha o formulário com:
  - Idade, peso e altura
  - Objetivo principal (emagrecer, ganhar massa, etc.)
  - Rotina diária (opcional)
  - Restrições alimentares (opcional)
- Clique em "Gerar Meu Plano"
- Aguarde a IA criar seu plano personalizado

### 4. Monitorar Sistema
- Na aba "Sistema", visualize o status da aplicação
- Verifique conexão com banco de dados
- Monitore número de usuários cadastrados
- Atualize o status em tempo real

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor com hot reload
npm run build        # Build para produção
npm run start        # Inicia servidor de produção
npm run lint         # Verifica qualidade do código

# Banco de Dados
npm run db:push      # Envia schema para o banco
npm run db:generate  # Gera cliente Prisma
npm run db:migrate   # Roda migrações
npm run db:reset     # Reseta banco de dados
```

## 🗄️ Schema do Banco de Dados

### User
- `id` (UUID) - Identificador único
- `email` (String) - Email do usuário (único)
- `name` (String) - Nome do usuário
- `createdAt` (DateTime) - Data de criação
- `updatedAt` (DateTime) - Data de atualização

### Plan
- `id` (UUID) - Identificador único
- `userId` (UUID) - Referência ao usuário
- `objetivo` (String) - Objetivo principal
- `idade` (Int) - Idade do usuário
- `peso` (Float) - Peso em kg
- `altura` (Float) - Altura em cm
- `rotina` (String) - Descrição da rotina
- `restricoes` (String) - Restrições alimentares
- `planText` (String) - Plano gerado pela IA
- `createdAt` (DateTime) - Data de criação
- `updatedAt` (DateTime) - Data de atualização

### Subscription
- `id` (UUID) - Identificador único
- `userId` (UUID) - Referência ao usuário
- `provider` (String) - Provedor (stripe/revenuecat)
- `productId` (String) - ID do produto
- `status` (String) - Status da assinatura
- `expiresAt` (DateTime) - Data de expiração
- `createdAt` (DateTime) - Data de criação
- `updatedAt` (DateTime) - Data de atualização

## 🔒 Segurança

### Autenticação
- JWT tokens via Supabase Auth
- Validação de tokens em todas as requisições protegidas
- Sincronização automática de usuários entre Supabase e banco local

### Banco de Dados
- Conexão segura via Session Pooler
- UUIDs como identificadores únicos
- Relacionamentos com foreign keys
- Campos sensíveis criptografados

### API
- Validação de entrada com Zod
- Tratamento de erros adequado
- Rate limiting (pode ser implementado)
- CORS configurado

## 🚀 Deploy

### Para Produção
1. Configure todas as variáveis de ambiente no ambiente de produção
2. Build da aplicação:
   ```bash
   npm run build
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```

### Variáveis de Ambiente de Produção
- `NODE_ENV=production`
- Todas as variáveis do `.env` devem estar configuradas
- URL do Supabase de produção
- Chaves de API de produção

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- **[Supabase](https://supabase.com)** - Plataforma de backend como serviço
- **[Z.AI](https://z.ai)** - IA para geração de planos personalizados
- **[shadcn/ui](https://ui.shadcn.com)** - Componentes UI de alta qualidade
- **[Next.js](https://nextjs.org)** - Framework React production-ready

---

🏋️ Desenvolvido com ❤️ para a comunidade fitness. Superchargeado por [Z.ai](https://z.ai) 🚀