# FitAI - Personal Trainer Digital com Supabase

🏋️‍♂️ Seu personal trainer e nutricionista digital com IA, integrado com Supabase.

## 🚀 Funcionalidades

- ✅ **Autenticação com Supabase**: Login e registro seguros
- ✅ **Geração de Planos Personalizados**: IA cria planos de treino e nutrição
- ✅ **Banco de Dados PostgreSQL**: Armazenamento seguro com Supabase
- ✅ **Interface Responsiva**: Design moderno com Tailwind CSS e shadcn/ui
- ✅ **Validação de Assinaturas**: Sistema pronto para monetização

## 📋 Pré-requisitos

- Node.js 18+
- Conta no Supabase
- Conta no Z.ai (para API key)

## 🔧 Configuração

### 1. Clonar o Projeto

```bash
git clone <seu-repositorio>
cd fitai-supabase
npm install
```

### 2. Configurar Supabase

1. Acesse [https://app.supabase.com](https://app.supabase.com)
2. Crie um novo projeto
3. Vá em **Settings** → **API**
4. Copie as credenciais:
   - **Project URL**
   - **anon** **public** key
   - **service_role** **secret** key

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database URL do Supabase
DATABASE_URL=postgresql://postgres:[sua-senha]@db.seu-projeto.supabase.co:5432/postgres

# Z.AI API Key (opcional para testes)
ZAI_API_KEY=sua-chave-zai
```

### 4. Configurar Banco de Dados

```bash
# Gerar Prisma client
npm run db:generate

# Enviar schema para o Supabase
npm run db:push
```

### 5. Iniciar o Servidor

```bash
npm run dev
```

Acesse http://localhost:3000

## 🏗️ Arquitetura

```
src/
├── app/
│   ├── api/generate-plan/    # API para gerar planos
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página principal
├── components/
│   ├── auth-form.tsx        # Formulário de login/registro
│   └── ui/                  # Componentes UI
├── lib/
│   ├── auth.ts              # Autenticação e validação
│   ├── db.ts                # Cliente Prisma
│   ├── supabase.ts          # Cliente Supabase
│   └── utils.ts             # Utilitários
└── prisma/
    └── schema.prisma        # Schema do banco
```

## 🔄 Fluxo de Autenticação

1. **Registro/Login**: Usuário cria conta ou faz login com Supabase Auth
2. **JWT Token**: Supabase retorna um token JWT
3. **Validação**: API valida o token com Supabase
4. **Sincronização**: Usuário é sincronizado com o banco local
5. **Acesso**: Usuário pode gerar planos personalizados

## 📊 Schema do Banco de Dados

### Users
- `id` (UUID) - ID único do usuário
- `email` (String) - Email do usuário
- `name` (String) - Nome do usuário
- `createdAt` (DateTime) - Data de criação
- `updatedAt` (DateTime) - Data de atualização

### Plans
- `id` (UUID) - ID único do plano
- `userId` (UUID) - ID do usuário
- `objetivo` (String) - Objetivo principal
- `idade` (Int) - Idade do usuário
- `peso` (Float) - Peso do usuário
- `altura` (Float) - Altura do usuário
- `rotina` (String) - Rotina diária
- `restricoes` (String) - Restrições alimentares
- `planText` (String) - Plano gerado pela IA
- `createdAt` (DateTime) - Data de criação
- `updatedAt` (DateTime) - Data de atualização

### Subscriptions
- `id` (UUID) - ID único da assinatura
- `userId` (UUID) - ID do usuário
- `provider` (String) - Provedor (revenuecat/stripe)
- `productId` (String) - ID do produto
- `status` (String) - Status (active/canceled/expired)
- `expiresAt` (DateTime) - Data de expiração
- `createdAt` (DateTime) - Data de criação
- `updatedAt` (DateTime) - Data de atualização

## 🧪 Testes

### Testar API com cURL

```bash
# Substitua <TOKEN> pelo token JWT do usuário
curl -X POST "http://localhost:3000/api/generate-plan" \
 -H "Authorization: Bearer <TOKEN>" \
 -H "Content-Type: application/json" \
 -d '{
   "idade": 32,
   "peso": 85,
   "altura": 175,
   "objetivo": "emagrecer",
   "rotina": "trabalho sentado, 3x/sem exercício",
   "restricoes": "sem restrições"
 }'
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no Vercel
3. Faça o deploy

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 🔒 Segurança

- ✅ JWT tokens são validados com Supabase
- ✅ Chaves de API nunca são expostas no cliente
- ✅ Validação de entrada em todos os formulários
- ✅ Proteção contra SQL injection com Prisma ORM
- ✅ CORS configurado para produção

## 📈 Monetização

O sistema está preparado para monetização:

1. **RevenueCat**: Configure webhooks para atualizar a tabela `subscriptions`
2. **Stripe**: Integre pagamentos e gerencie assinaturas
3. **Verificação**: A API verifica assinaturas ativas antes de gerar planos

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Faça commit das suas mudanças
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT.

## 🆘 Suporte

Se você tiver algum problema ou dúvida:

1. Verifique o README
2. Abra uma issue no GitHub
3. Consulte a documentação do Supabase

---

**Feito com ❤️ usando Next.js, Supabase e Z.ai**