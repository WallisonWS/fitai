# Guia Rápido de Implantação no Vercel

## 🚀 Implantação Rápida (5 minutos)

### 1. Preparar o Código
```bash
# Adicionar todas as alterações
git add .

# Fazer commit
git commit -m "FitAI: Ready for deployment"

# Enviar para GitHub
git push origin main
```

### 2. Configurar Vercel
```bash
# Instalar Vercel CLI (se necessário)
npm install -g vercel

# Fazer login
vercel login

# Implantar
vercel --prod
```

### 3. Configurar Variáveis de Ambiente
Na dashboard do Vercel, adicione:

```bash
# Database
DATABASE_URL=postgresql://...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Google Gemini AI
GEMINI_API_KEY=AIzaSyBwAZ8WKJOHlbgJVlCPKB6gSY5fpn_Yzpo

# NextAuth
NEXTAUTH_SECRET=sua-chave-secreta
NEXTAUTH_URL=https://seu-projeto.vercel.app
```

### 4. Testar
Acesse seu projeto: `https://seu-projeto.vercel.app`

## 📱 Testar em Dispositivos Móveis

### Android
1. Abra o Chrome no celular
2. Acesse seu site
3. Clique no menu (⋮) → "Adicionar à tela inicial"

### iOS
1. Abra o Safari no iPhone
2. Acesse seu site
3. Clique no botão de compartilhare (⎙) → "Adicionar à tela inicial"

## 🔧 Comandos Úteis

### Vercel CLI
```bash
# Verificar status
vercel ls

# Verificar logs
vercel logs

# Remover implantação
vercel remove

# Configurar domínio
vercel domains add fitai.com
```

### Git
```bash
# Verificar status
git status

# Verificar remote
git remote -v

# Enviar alterações
git push origin main
```

## 🚨 Solução de Problemas Rápida

### Build Falha
```bash
# Verificar build local
npm run build

# Verificar dependências
npm install

# Limpar cache
npm run clean
```

### Variáveis de Ambiente
```bash
# Verificar arquivo .env.local
cat .env.local

# Testar localmente
npm run dev
```

### PWA Não Funciona
```bash
# Verificar manifest.json
cat public/manifest.json

# Verificar Service Worker
cat public/sw.js
```

## 🎉 Pronto!

Seu FitAI está agora:
- ✅ Implantado no Vercel
- ✅ Acessível em todos os dispositivos
- ✅ Com PWA funcionando
- ✅ Com integração AI

Parabéns! 🎊