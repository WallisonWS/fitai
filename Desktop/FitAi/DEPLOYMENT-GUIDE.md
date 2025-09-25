# Guia de Deploy - FitAI

## 🚀 Deploy em Plataformas Cloud

### 1. Vercel (Recomendado)

#### Pré-requisitos
- Conta no Vercel
- Conta no Supabase
- API keys configuradas

#### Passos para Deploy

1. **Conectar com GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <seu-repositorio-github>
   git push -u origin main
   ```

2. **Importar no Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Selecione seu repositório GitHub
   - Configure as variáveis de ambiente

3. **Variáveis de Ambiente**
   ```env
   DATABASE_URL=postgresql://postgres.ceclteqlyeedwjdzprmb:Ww080522.791745@aws-1-sa-east-1.pooler.supabase.com:5432/postgres
   NEXT_PUBLIC_SUPABASE_URL=https://ceclteqlyeedwjdzprmb.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlY2x0ZXFseWVlZHdqZHpwcm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3NzM3NzAsImV4cCI6MjA3NDM0OTc3MH0.Hcmx9q7DGdTpMWp9JMNVFInj_SLiHW8ysOQ7TyWvhT8
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlY2x0ZXFseWVlZHdqZHpwcm1iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODc3Mzc3MCwiZXhwIjoyMDc0MzQ5NzcwfQ.fCK5ekNedvQGW-iXSIy5Bim1fFoQ5-cESoGHL-PfY3k
   ZAI_API_KEY=sua_chave_zai_aqui
   GEMINI_API_KEY=AIzaSyBwAZ8WKJOHlbgJVlCPKB6gSY5fpn_Yzpo
   ```

4. **Deploy Automático**
   - O Vercel irá fazer o deploy automaticamente
   - Aguarde a conclusão do build
   - Seu app estará disponível em `https://seu-projeto.vercel.app`

### 2. Railway

#### Passos para Deploy

1. **Instalar Railway CLI**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. **Inicializar Projeto**
   ```bash
   railway init
   railway up
   ```

3. **Configurar Variáveis de Ambiente**
   ```bash
   railway variables set DATABASE_URL="postgresql://postgres.ceclteqlyeedwjdzprmb:Ww080522.791745@aws-1-sa-east-1.pooler.supabase.com:5432/postgres"
   railway variables set NEXT_PUBLIC_SUPABASE_URL="https://ceclteqlyeedwjdzprmb.supabase.co"
   railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlY2x0ZXFseWVlZHdqZHpwcm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3NzM3NzAsImV4cCI6MjA3NDM0OTc3MH0.Hcmx9q7DGdTpMWp9JMNVFInj_SLiHW8ysOQ7TyWvhT8"
   railway variables set SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlY2x0ZXFseWVlZHdqZHpwcm1iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODc3Mzc3MCwiZXhwIjoyMDc0MzQ5NzcwfQ.fCK5ekNedvQGW-iXSIy5Bim1fFoQ5-cESoGHL-PfY3k"
   railway variables set ZAI_API_KEY="sua_chave_zai_aqui"
   railway variables set GEMINI_API_KEY="AIzaSyBwAZ8WKJOHlbgJVlCPKB6gSY5fpn_Yzpo"
   ```

### 3. Render

#### Passos para Deploy

1. **Criar Conta no Render**
   - Acesse [render.com](https://render.com)
   - Crie uma conta nova

2. **Criar Web Service**
   - Clique em "New +"
   - Selecione "Web Service"
   - Conecte seu repositório GitHub

3. **Configurar Build**
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Runtime**: Node 18

4. **Configurar Variáveis de Ambiente**
   Adicione todas as variáveis de ambiente necessárias

### 4. Docker (Self-hosted)

#### Criar Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  fitai:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres.ceclteqlyeedwjdzprmb:Ww080522.791745@aws-1-sa-east-1.pooler.supabase.com:5432/postgres
      - NEXT_PUBLIC_SUPABASE_URL=https://ceclteqlyeedwjdzprmb.supabase.co
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlY2x0ZXFseWVlZHdqZHpwcm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3NzM3NzAsImV4cCI6MjA3NDM0OTc3MH0.Hcmx9q7DGdTpMWp9JMNVFInj_SLiHW8ysOQ7TyWvhT8
      - SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlY2x0ZXFseWVlZHdqZHpwcm1iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODc3Mzc3MCwiZXhwIjoyMDc0MzQ5NzcwfQ.fCK5ekNedvQGW-iXSIy5Bim1fFoQ5-cESoGHL-PfY3k
      - ZAI_API_KEY=sua_chave_zai_aqui
      - GEMINI_API_KEY=AIzaSyBwAZ8WKJOHlbgJVlCPKB6gSY5fpn_Yzpo
```

## 📱 Progressive Web App (PWA)

O projeto está configurado como PWA, o que significa que:

### Recursos PWA
- **Instalação**: Pode ser instalado como app nativo
- **Offline**: Funciona parcialmente offline
- **Push Notifications**: Suporte a notificações
- **Responsive**: Adaptado para mobile

### Como Instalar
1. Acesse o site no navegador mobile
2. Clique no menu do navegador (⋮)
3. Selecione "Adicionar à tela inicial" ou "Instalar app"
4. O app será instalado como um aplicativo nativo

## 🎯 Configuração para Mobile

### Otimizações Realizadas
- **Responsive Design**: Interface adaptada para telas pequenas
- **Touch Friendly**: Botões e elementos otimizados para toque
- **Performance**: Carregamento rápido e otimizado
- **PWA Features**: Instalação e suporte offline

### Testar em Dispositivos Móveis
1. **Local Testing**: Use `ngrok` para expor localmente
   ```bash
   npm install -g ngrok
   ngrok http 3000
   ```

2. **Mobile Debugging**: Use Chrome DevTools para mobile
   - Abra Chrome DevTools (F12)
   - Clique no ícone de mobile/tablet
   - Selecione diferentes dispositivos

## 🔧 Pós-Deploy

### Verificar Funcionalidades
1. **Testar API Endpoints**
   ```bash
   curl https://seu-dominio.com/api/health
   curl https://seu-dominio.com/api/test-gemini
   ```

2. **Testar PWA**
   - Verificar se o manifest.json está acessível
   - Testar instalação em dispositivos móveis
   - Verificar service worker

3. **Monitoramento**
   - Configure monitoramento de erros
   - Monitore performance e uptime

### SEO e Analytics
1. **Google Analytics**: Adicione o script de rastreamento
2. **SEO**: Verifique meta tags e Open Graph
3. **Sitemap**: Gere sitemap para mecanismos de busca

## 🚨 Solução de Problemas

### Problemas Comuns
1. **Build Falha**: Verifique variáveis de ambiente
2. **PWA Não Funciona**: Verifique manifest.json e service worker
3. **Mobile Não Responsivo**: Teste em diferentes dispositivos
4. **API Não Responde**: Verifique configuração do Supabase

### Logs e Debug
- Use os logs da plataforma de deploy
- Verifique console do navegador para erros
- Teste endpoints individualmente

---

## 📋 Checklist Final

- [ ] Variáveis de ambiente configuradas
- [ ] Build realizado com sucesso
- [ ] API endpoints funcionando
- [ ] PWA instalável em dispositivos
- [ ] Interface responsiva em mobile
- [ ] Testes realizados em diferentes navegadores
- [ ] Monitoramento configurado
- [ ] SEO e analytics configurados

Seu FitAI está pronto para produção! 🎉