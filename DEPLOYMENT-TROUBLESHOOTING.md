# 🚨 Guia de Troubleshooting para Deploy

## Problemas Comuns de Deploy e Soluções

### 1. Build Falha

#### Problema: `Build failed` ou `Error during build`

**Causas Comuns:**
- Dependências faltando
- Variáveis de ambiente não configuradas
- Versões incompatíveis de pacotes
- Erros de TypeScript

**Soluções:**

1. **Verificar dependências:**
```bash
npm install
npm audit fix
```

2. **Limpar cache e rebuild:**
```bash
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

3. **Verificar variáveis de ambiente:**
- Todas as variáveis necessárias estão configuradas?
- As chaves estão corretas?

4. **Testar build local:**
```bash
npm run build
```

### 2. Erros de Variáveis de Ambiente

#### Problema: Variáveis não encontradas ou inválidas

**Soluções:**

1. **Verificar .env.example:**
```bash
cat .env.example
```

2. **Configurar todas as variáveis necessárias:**
```env
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ZAI_API_KEY=sua_chave_zai_aqui
GEMINI_API_KEY=AIzaSyBwAZ8WKJOHlbgJVlCPKB6gSY5fpn_Yzpo
```

3. **Para Vercel:**
- Vá para Settings > Environment Variables
- Adicione todas as variáveis
- Marque as variáveis públicas com `NEXT_PUBLIC_`

### 3. Erros de Runtime

#### Problema: App funciona localmente mas falha em produção

**Soluções:**

1. **Verificar logs de erro:**
- Vercel: Verificar a aba "Functions"
- Railway: Verificar logs do serviço
- Render: Verificar logs do serviço

2. **Testar endpoints:**
```bash
curl https://seu-app.vercel.app/api/health
curl https://seu-app.vercel.app/api/test-gemini
```

3. **Verificar banco de dados:**
- A conexão com Supabase está funcionando?
- As tabelas foram criadas?

### 4. Problemas com PWA

#### Problema: Service Worker não funciona

**Soluções:**

1. **Verificar manifest.json:**
```bash
curl https://seu-app.vercel.app/manifest.json
```

2. **Verificar service worker:**
```bash
curl https://seu-app.vercel.app/sw.js
```

3. **Limpar cache do navegador:**
- Abra DevTools (F12)
- Vá para Application > Storage
- Limpe Cache Storage e Service Workers

### 5. Problemas de Mobile

#### Problema: App não funciona bem em dispositivos móveis

**Soluções:**

1. **Testar em diferentes navegadores:**
- Chrome mobile
- Safari mobile
- Firefox mobile

2. **Verificar viewport:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

3. **Testar PWA installation:**
- Acesse o site no celular
- Tente "Adicionar à tela inicial"

## Soluções por Plataforma

### Vercel

#### Problema: Build falha no Vercel

**Soluções:**

1. **Verificar Node.js version:**
```json
// package.json
"engines": {
  "node": ">=18.0.0"
}
```

2. **Configurar build command:**
```bash
# Configuração correta no Vercel
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

3. **Verificar variáveis de ambiente:**
- Ir para Project Settings
- Environment Variables
- Adicionar todas as variáveis necessárias

#### Problema: API routes não funcionam

**Soluções:**
```bash
# Testar localmente
curl http://localhost:3000/api/health

# Testar em produção
curl https://seu-app.vercel.app/api/health
```

### Railway

#### Problema: Deploy falha no Railway

**Soluções:**

1. **Verificar Railway service configuration:**
```yaml
# railway.toml (se necessário)
[build]
command = "npm run build"

[deploy]
startCommand = "npm start"
```

2. **Configurar variáveis de ambiente:**
```bash
railway variables set DATABASE_URL="sua_url"
railway variables set NEXT_PUBLIC_SUPABASE_URL="sua_url"
# ... outras variáveis
```

### Render

#### Problema: App não inicia no Render

**Soluções:**

1. **Verificar service configuration:**
- Build Command: `npm run build`
- Start Command: `npm start`
- Runtime: `Node18`

2. **Verificar environment variables:**
- Ir para Environment
- Adicionar todas as variáveis necessárias

## Debug Passo a Passo

### Passo 1: Verificar Build Local
```bash
# Limpar tudo
rm -rf .next node_modules package-lock.json

# Reinstalar
npm install

# Testar build
npm run build

# Testar local
npm start
```

### Passo 2: Verificar APIs
```bash
# Testar health check
curl http://localhost:3000/api/health

# Testar Gemini integration
curl http://localhost:3000/api/test-gemini

# Testar Supabase connection
curl http://localhost:3000/api/test-supabase
```

### Passo 3: Preparar para Deploy
```bash
# Commitar mudanças
git add .
git commit -m "Fix deployment issues"

# Push para repositório
git push origin main
```

### Passo 4: Monitorar Deploy
- Verificar logs da plataforma
- Testar todas as funcionalidades
- Monitorar erros com ferramentas como Sentry

## Soluções Rápidas

### 1. Usar Template Pronto
Se nada funcionar, use este template:

```bash
# Criar novo projeto com Next.js
npx create-next-app@latest fitai --typescript --tailwind --app

# Copiar arquivos importantes
# - src/app/
# - src/lib/
# - src/components/
# - public/
# - package.json
# - tailwind.config.ts
# - tsconfig.json
```

### 2. Deploy Estático
Se APIs não forem críticas:

```bash
# Exportar estático
npm run build
npm run export

# Deploy em serviços estáticos
# - Vercel
# - Netlify
# - GitHub Pages
```

### 3. Usar Docker
Create `Dockerfile`:

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

## Contato e Suporte

Se você ainda tiver problemas:

1. **Verifique os logs de erro** da plataforma de deploy
2. **Teste localmente** com as mesmas variáveis de ambiente
3. **Simplifique o projeto** removendo dependências não essenciais
4. **Use um serviço de deploy diferente** (Vercel é geralmente o mais fácil)

---

## 📋 Checklist Final

- [ ] Build funciona localmente
- [ ] Todas as variáveis de ambiente configuradas
- [ ] APIs testadas e funcionando
- [ ] Mobile responsiveness verificado
- [ ] PWA features funcionando
- [ ] Domínio configurado
- [ ] HTTPS funcionando
- [ ] Monitoramento configurado

Lembre-se: a maioria dos problemas de deploy são relacionados a **variáveis de ambiente** ou **dependências**!