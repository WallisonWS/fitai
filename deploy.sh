#!/bin/bash

# Script de Deploy Simplificado para FitAI

echo "🚀 Iniciando processo de deploy do FitAI..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para imprimir mensagens
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    print_error "package.json não encontrado. Execute este script no diretório raiz do projeto."
    exit 1
fi

# Passo 1: Verificar dependências
print_message "Verificando dependências..."
if [ ! -d "node_modules" ]; then
    print_message "Instalando dependências..."
    npm install
fi

# Passo 2: Limpar build anterior
print_message "Limpando build anterior..."
rm -rf .next

# Passo 3: Testar build
print_message "Testando build local..."
if npm run build; then
    print_message "✅ Build local bem-sucedido!"
else
    print_error "❌ Build falhou localmente. Corrija os erros antes de tentar deploy."
    exit 1
fi

# Passo 4: Verificar variáveis de ambiente
print_message "Verificando variáveis de ambiente..."
required_vars=("DATABASE_URL" "NEXT_PUBLIC_SUPABASE_URL" "NEXT_PUBLIC_SUPABASE_ANON_KEY" "SUPABASE_SERVICE_ROLE_KEY" "GEMINI_API_KEY")

missing_vars=()
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -gt 0 ]; then
    print_warning "As seguintes variáveis de ambiente estão faltando:"
    for var in "${missing_vars[@]}"; do
        echo "  - $var"
    done
    print_warning "Configure estas variáveis na sua plataforma de deploy."
    echo ""
    echo "Variáveis necessárias:"
    cat .env.example
    echo ""
    read -p "Deseja continuar mesmo assim? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    print_message "✅ Todas as variáveis de ambiente necessárias estão configuradas!"
fi

# Passo 5: Testar APIs localmente
print_message "Testando APIs localmente..."
if npm start > /dev/null 2>&1 & then
    sleep 5
    if curl -s http://localhost:3000/api/health > /dev/null; then
        print_message "✅ API de saúde funcionando!"
    else
        print_warning "⚠️  API de saúde não respondeu localmente"
    fi
    pkill -f "npm start" 2>/dev/null
else
    print_warning "⚠️  Não foi possível iniciar o servidor local para teste"
fi

# Passo 6: Git status
print_message "Verificando status do Git..."
if ! git diff-index --quiet HEAD --; then
    print_warning "Existem mudanças não commitadas:"
    git status --porcelain
    read -p "Deseja commitar as mudanças? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Digite a mensagem do commit: " commit_message
        git add .
        git commit -m "$commit_message"
        print_message "✅ Mudanças commitadas!"
    fi
fi

# Passo 7: Escolher plataforma de deploy
echo ""
print_message "Escolha sua plataforma de deploy:"
echo "1) Vercel (Recomendado)"
echo "2) Railway"
echo "3) Render"
echo "4) GitHub Pages (Estático)"
echo "5) Sair"
echo ""
read -p "Digite sua escolha (1-5): " choice

case $choice in
    1)
        print_message "Deploy para Vercel..."
        echo ""
        echo "Instruções para Vercel:"
        echo "1. Faça push para seu repositório GitHub"
        echo "2. Acesse https://vercel.com"
        echo "3. Clique em 'New Project'"
        echo "4. Selecione seu repositório"
        echo "5. Configure as variáveis de ambiente:"
        echo "   - DATABASE_URL"
        echo "   - NEXT_PUBLIC_SUPABASE_URL"
        echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
        echo "   - SUPABASE_SERVICE_ROLE_KEY"
        echo "   - GEMINI_API_KEY"
        echo "6. Clique em Deploy"
        echo ""
        read -p "Pressione Enter para continuar..."
        
        # Push para GitHub
        print_message "Fazendo push para GitHub..."
        git push origin main
        ;;
    2)
        print_message "Deploy para Railway..."
        echo ""
        echo "Instruções para Railway:"
        echo "1. Instale Railway CLI: npm install -g @railway/cli"
        echo "2. Login: railway login"
        echo "3. Inicialize: railway init"
        echo "4. Configure variáveis:"
        for var in "${required_vars[@]}"; do
            echo "   railway variables set $var=\"${!var}\""
        done
        echo "5. Deploy: railway up"
        echo ""
        ;;
    3)
        print_message "Deploy para Render..."
        echo ""
        echo "Instruções para Render:"
        echo "1. Acesse https://render.com"
        echo "2. Crie um novo Web Service"
        echo "3. Conecte seu repositório GitHub"
        echo "4. Configure:"
        echo "   - Build Command: npm run build"
        echo "   - Start Command: npm start"
        echo "   - Runtime: Node 18"
        echo "5. Adicione variáveis de ambiente"
        echo ""
        ;;
    4)
        print_warning "GitHub Pages é para sites estáticos. APIs não funcionarão."
        echo "Isso significa que a geração de planos com IA não funcionará."
        read -p "Deseja continuar? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
        echo ""
        echo "Instruções para GitHub Pages:"
        echo "1. Instale next-export: npm install next-export"
        echo "2. Adicione ao next.config.ts:"
        echo "   output: 'export'"
        echo "3. Rode: npm run build && npm run export"
        echo "4. Copie pasta 'out' para branch gh-pages"
        echo ""
        ;;
    5)
        print_message "Saindo..."
        exit 0
        ;;
    *)
        print_error "Escolha inválida!"
        exit 1
        ;;
esac

# Passo 8: Finalizar
echo ""
print_message "🎉 Processo de deploy iniciado!"
echo ""
echo "Próximos passos:"
echo "1. Acompanhe o deploy na plataforma escolhida"
echo "2. Teste todas as funcionalidades"
echo "3. Configure seu domínio personalizado"
echo "4. Monitore o desempenho e erros"
echo ""
print_message "Se precisar de ajuda, consulte DEPLOYMENT-TROUBLESHOOTING.md"
echo ""

# Testar se o deploy foi bem-sucedido (após alguns minutos)
read -p "Deseja testar o deploy após alguns minutos? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Digite a URL do seu deploy: " deploy_url
    print_message "Testando deploy em $deploy_url..."
    
    # Testar health check
    if curl -s "$deploy_url/api/health" > /dev/null; then
        print_message "✅ API de saúde funcionando!"
    else
        print_error "❌ API de saúde não respondeu"
    fi
    
    # Testar Gemini
    if curl -s "$deploy_url/api/test-gemini" > /dev/null; then
        print_message "✅ Integração com Gemini funcionando!"
    else
        print_error "❌ Integração com Gemini falhou"
    fi
fi

print_message "🚀 Deploy concluído! Seu FitAI está no ar!"