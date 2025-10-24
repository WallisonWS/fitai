# Guia de Implantação do FitAI no Vercel

Este guia fornece instruções passo a passo para implantar o projeto FitAI na plataforma Vercel.

## Pré-requisitos

Antes de começar, certifique-se de que você tem:
- Uma conta no GitHub
- Uma conta no Vercel
- O código do projeto FitAI no seu repositório GitHub
- Todas as variáveis de ambiente necessárias

## Passo 1: Preparar o Repositório GitHub

### 1.1 Verificar o status do Git
```bash
git status
```

### 1.2 Adicionar todas as alterações ao Git
```bash
git add .
```

### 1.3 Fazer commit das alterações
```bash
git commit -m "FitAI: Mobile optimization and PWA support"
```

### 1.4 Enviar para o GitHub
```bash
git push origin main
```

Se você ainda não conectou seu repositório local ao GitHub, execute:

```bash
git remote add origin https://github.com/seu-usuario/fitai.git
git branch -M main
git push -u origin main
```

## Passo 2: Configurar o Projeto no Vercel

### 2.1 Fazer login no Vercel
Acesse [vercel.com](https://vercel.com) e faça login com sua conta.

### 2.2 Importar o Projeto
1. Clique no botão **"Add New..."** e selecione **"Project"**
2. Na seção **"Import Git Repository"**, procure pelo seu repositório `fitai`
3. Clique no botão **"Import"** ao lado do seu repositório

### 2.3 Configurar Variáveis de Ambiente
Na página de configuração do projeto, role para baixo até a seção **"Environment Variables"** e adicione as seguintes variáveis:

#### Variáveis de Produção
```bash
# Database
DATABASE_URL=postgresql://usuario:senha@host:porta/database

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Google Gemini AI
GEMINI_API_KEY=AIzaSyBwAZ8WKJOHlbgJVlCPKB6gSY5fpn_Yzpo

# NextAuth
NEXTAUTH_SECRET=uma-chave-secreta-aleatoria
NEXTAUTH_URL=https://seu-projeto.vercel.app
```

**Importante:** Substitua os valores acima pelos seus valores reais.

### 2.4 Configurar Build Command
Na seção **"Build & Development Settings"**:
- **Framework Preset**: Selecione **"Next.js"**
- **Build Command**: Deixe como `npm run build`
- **Output Directory**: Deixe como `.next`
- **Install Command**: Deixe como `npm install`

## Passo 3: Implantar o Projeto

### 3.1 Iniciar a Implantação
1. Clique no botão **"Deploy"** na parte inferior da página
2. O Vercel começará a construir e implantar seu projeto

### 3.2 Monitorar o Progresso
Aguarde enquanto o Vercel:
- Instala as dependências
- Constrói o projeto
- Implanta na plataforma

Isso pode levar alguns minutos.

### 3.3 Verificar a Implantação
Após a conclusão, você verá:
- Uma mensagem de sucesso
- O URL do seu projeto implantado (ex: `https://fitai-xyz.vercel.app`)
- Links para visualizar o site e verificar os logs

## Passo 4: Pós-Implantação

### 4.1 Testar o Site
Clique no URL fornecido para acessar seu site implantado e testar todas as funcionalidades:
- Página inicial
- Cadastro/login
- Geração de planos de treino
- Funcionalidades móveis

### 4.2 Verificar os Logs
Se algo der errado:
1. Na dashboard do Vercel, selecione seu projeto
2. Clique na aba **"Logs"**
3. Verifique os logs de construção e de execução

### 4.3 Configurar Domínio Personalizado (Opcional)
Se você tiver um domínio próprio:

1. Na dashboard do Vercel, selecione seu projeto
2. Clique na aba **"Settings"**
3. Selecione **"Domains"**
4. Adicione seu domínio (ex: `fitai.com`)
5. Siga as instruções para configurar o DNS

## Passo 5: Monitoramento e Manutenção

### 5.1 Configurar Monitoramento
O Vercel oferece monitoramento automático, mas você pode adicionar:
- Analytics (na aba **"Analytics"**)
- Webhooks para notificações
- Integrações com ferramentas externas

### 5.2 Atualizações Futuras
Para fazer atualizações:
1. Faça as alterações no seu código local
2. Envie para o GitHub:
   ```bash
   git add .
   git commit -m "Descrição da atualização"
   git push origin main
   ```
3. O Vercel detectará automaticamente as alterações e reimplantará o projeto

## Solução de Problemas Comuns

### Problema: Build falha
- **Verifique os logs** na aba **"Logs"** do Vercel
- **Certifique-se** de que todas as dependências estão no package.json
- **Verifique** se há erros de sintaxe no código

### Problema: Variáveis de ambiente não funcionam
- **Verifique** se todas as variáveis necessárias foram adicionadas
- **Certifique-se** de que os nomes estão exatamente como no código
- **Reimplante** após adicionar ou alterar variáveis

### Problema: Funcionalidades móveis não funcionam
- **Verifique** se o PWA está configurado corretamente
- **Teste** em diferentes dispositivos e navegadores
- **Verifique** os Service Workers

## Conclusão

Parabéns! Seu projeto FitAI agora está implantado no Vercel e acessível em todos os dispositivos, incluindo Android e iOS. Os usuários podem acessar o site através do URL fornecido e até mesmo instalá-lo como um aplicativo nativo em seus dispositivos móveis.

Lembre-se de manter seu projeto atualizado e monitorar seu desempenho regularmente através da dashboard do Vercel.