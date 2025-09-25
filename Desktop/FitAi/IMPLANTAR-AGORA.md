# 🚀 IMPLANTAR FITAI AGORA - PASSO A PASSO SIMPLES

## 1. ENVIAR PARA GITHUB
```bash
git push origin master
```

## 2. CONFIGURAR VERCEL
1. Acesse: https://vercel.com
2. Faça login com GitHub
3. Clique: "Add New" → "Project"
4. Selecione seu repositório "fitai"
5. Clique: "Import"

## 3. ADICIONAR VARIÁVEIS DE AMBIENTE
Na página de configuração, adicione:

```bash
DATABASE_URL=postgresql://usuario:senha@host:porta/database
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
GEMINI_API_KEY=AIzaSyBwAZ8WKJOHlbgJVlCPKB6gSY5fpn_Yzpo
NEXTAUTH_SECRET=uma-chave-secreta-aleatoria
NEXTAUTH_URL=https://seu-projeto.vercel.app
```

## 4. IMPLANTAR
Clique no botão **"Deploy"**

## 5. TESTAR
Acesse seu projeto: `https://fitai-xyz.vercel.app`

## 6. INSTALAR NO CELULAR

### Android:
- Abra o Chrome
- Acesse seu site
- Menu (⋮) → "Adicionar à tela inicial"

### iOS:
- Abra o Safari
- Acesse seu site
- Compartilhar (⎙) → "Adicionar à tela inicial"

## ✅ PRONTO!

Seu FitAI está no ar e funcionando em todos os dispositivos!

---

### 📱 Para testar:
- [ ] Página inicial carrega
- [ ] Login/cadastro funciona
- [ ] Geração de planos de treino
- [ ] Instalação PWA
- [ ] Interface responsiva

### 🔧 Para atualizar:
```bash
git add .
git commit -m "atualização"
git push origin master
```

**Parabéns! Seu FitAI está online!** 🎉