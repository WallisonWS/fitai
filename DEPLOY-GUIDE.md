# Guia de Deploy - FitCal PWA

## 🚀 Opções de Deploy

### Opção 1: Vercel (Recomendado) ⭐

O Vercel é a plataforma ideal para aplicativos Next.js e PWA. É **gratuito** e oferece:
- Deploy automático a cada push no GitHub
- HTTPS gratuito
- CDN global
- Otimizações automáticas para PWA
- Domínio gratuito `.vercel.app`

#### Passo a Passo - Vercel

1. **Acesse o Vercel**
   - Vá para: https://vercel.com
   - Clique em "Sign Up" ou "Log In"
   - Use sua conta do GitHub para fazer login

2. **Importar Projeto**
   - Clique em "Add New..." → "Project"
   - Selecione "Import Git Repository"
   - Escolha o repositório: `WallisonWS/fitai`
   - Clique em "Import"

3. **Configurar Projeto**
   - **Project Name**: `fitcal` (ou o nome que preferir)
   - **Framework Preset**: Next.js (detectado automaticamente)
   - **Root Directory**: `Desktop/FitAi` ⚠️ **IMPORTANTE**
   - **Build Command**: `pnpm build` (ou deixe o padrão)
   - **Output Directory**: `.next` (padrão)
   - **Install Command**: `pnpm install` (ou deixe o padrão)

4. **Variáveis de Ambiente** (se necessário)
   - Não é necessário para a versão atual
   - No futuro, adicione aqui as chaves de API

5. **Deploy**
   - Clique em "Deploy"
   - Aguarde 2-5 minutos
   - Seu site estará disponível em: `https://fitcal.vercel.app` (ou similar)

6. **Domínio Personalizado** (Opcional)
   - Vá em "Settings" → "Domains"
   - Adicione seu domínio personalizado
   - Siga as instruções para configurar DNS

---

### Opção 2: Netlify (Alternativa)

#### Passo a Passo - Netlify

1. **Acesse o Netlify**
   - Vá para: https://netlify.com
   - Faça login com GitHub

2. **Importar Projeto**
   - Clique em "Add new site" → "Import an existing project"
   - Escolha "Deploy with GitHub"
   - Selecione o repositório `WallisonWS/fitai`

3. **Configurar Build**
   - **Base directory**: `Desktop/FitAi`
   - **Build command**: `pnpm build`
   - **Publish directory**: `.next`

4. **Deploy**
   - Clique em "Deploy site"
   - Aguarde o deploy

---

### Opção 3: Deploy Manual via Vercel CLI

Se preferir fazer deploy via linha de comando:

```bash
# 1. Instalar Vercel CLI
pnpm add -g vercel

# 2. Fazer login
vercel login

# 3. Navegar até o projeto
cd Desktop/FitAi

# 4. Deploy
vercel --prod
```

---

## 📱 Configuração para Play Store

Para publicar o PWA na Google Play Store, você precisará usar **TWA (Trusted Web Activities)**.

### Ferramentas Necessárias

1. **Bubblewrap** - Ferramenta oficial do Google para criar TWA
2. **Android Studio** - Para assinar o APK
3. **Google Play Console** - Para publicar

### Passo a Passo - TWA

#### 1. Instalar Bubblewrap

```bash
npm install -g @bubblewrap/cli
```

#### 2. Inicializar TWA

```bash
cd Desktop/FitAi
bubblewrap init --manifest https://seu-dominio.vercel.app/manifest.json
```

Responda as perguntas:
- **Domain**: `seu-dominio.vercel.app`
- **App name**: `FitCal`
- **Package name**: `com.fitcal.app`
- **Start URL**: `/`

#### 3. Gerar Keystore (Primeira vez)

```bash
bubblewrap build
```

Isso irá:
- Criar um keystore para assinar o app
- Gerar o APK
- Salvar em `./app-release-signed.apk`

⚠️ **IMPORTANTE**: Guarde o keystore em local seguro! Você precisará dele para todas as atualizações futuras.

#### 4. Testar o APK

```bash
# Instalar no dispositivo Android conectado via USB
adb install app-release-signed.apk
```

#### 5. Publicar na Play Store

1. **Criar Conta de Desenvolvedor**
   - Acesse: https://play.google.com/console
   - Taxa única: $25 USD

2. **Criar Novo App**
   - Clique em "Create app"
   - Preencha as informações:
     - Nome: FitCal
     - Idioma padrão: Português (Brasil)
     - Tipo: App
     - Categoria: Saúde e fitness

3. **Upload do APK**
   - Vá em "Production" → "Create new release"
   - Upload do arquivo `app-release-signed.apk`

4. **Preencher Informações**
   - **Descrição curta**: "Contador de calorias com IA"
   - **Descrição completa**: (use o texto abaixo)
   - **Screenshots**: Tire prints do app (mínimo 2)
   - **Ícone**: Use o `icon-512.png`
   - **Banner**: Crie um banner 1024x500

5. **Política de Privacidade**
   - Crie uma página de política de privacidade
   - Adicione a URL

6. **Classificação de Conteúdo**
   - Preencha o questionário
   - App de saúde/fitness

7. **Publicar**
   - Revise tudo
   - Clique em "Submit for review"
   - Aguarde aprovação (1-7 dias)

---

## 📝 Descrição para Play Store

### Descrição Curta (80 caracteres)
```
Contador de calorias com IA. Escaneie alimentos e acompanhe macros.
```

### Descrição Completa

```
🔥 FitCal - Seu Contador de Calorias Inteligente

Conte suas calorias de forma fácil e rápida com inteligência artificial!

✨ RECURSOS PRINCIPAIS:

📸 Scanner de Alimentos
• Tire uma foto da sua refeição
• IA reconhece automaticamente os alimentos
• Calorias e macros calculados instantaneamente

📊 Acompanhamento Completo
• Calorias diárias
• Proteínas, carboidratos e gorduras
• Pontuação de saúde das refeições
• Histórico completo

🎯 Simples e Intuitivo
• Interface moderna e fácil de usar
• Calendário semanal
• Progresso visual com gráficos
• Edição rápida de valores

🍽️ Banco de Alimentos
• Milhares de alimentos cadastrados
• Busca rápida
• Adicione alimentos personalizados

💪 Alcance Seus Objetivos
• Defina suas metas diárias
• Acompanhe seu progresso
• Sistema de streaks para motivação

🔒 Privacidade
• Seus dados ficam no seu dispositivo
• Sem necessidade de criar conta
• Totalmente offline

Baixe agora e comece a transformar sua saúde!
```

---

## 🔧 Troubleshooting

### Erro: "Root Directory não encontrado"

**Solução**: Certifique-se de configurar o Root Directory como `Desktop/FitAi` no Vercel/Netlify.

### Erro: "Build failed"

**Solução**: 
1. Verifique se o `package.json` está correto
2. Rode `pnpm install` localmente
3. Teste `pnpm build` localmente

### PWA não instala no celular

**Solução**:
1. Certifique-se de que o site está em HTTPS
2. Verifique se o `manifest.json` está acessível
3. Verifique se o Service Worker está registrado
4. Limpe o cache do navegador

### Câmera não funciona

**Solução**:
1. O site DEVE estar em HTTPS
2. Dê permissão de câmera no navegador
3. Teste em um dispositivo real (não emulador)

---

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs de build no Vercel/Netlify
2. Teste localmente com `pnpm dev`
3. Verifique o console do navegador (F12)

---

## 🎉 Próximos Passos

Após o deploy:

1. ✅ Teste o PWA em diferentes dispositivos
2. ✅ Adicione à tela inicial do celular
3. ✅ Teste todas as funcionalidades
4. ✅ Colete feedback de usuários
5. ✅ Prepare para publicação na Play Store

---

## 📱 URLs do Projeto

- **Repositório GitHub**: https://github.com/WallisonWS/fitai
- **Deploy Vercel**: (será gerado após deploy)
- **Play Store**: (após publicação)

---

**Desenvolvido com ❤️ para ajudar você a alcançar seus objetivos de saúde!**

