#!/bin/bash

# Script de Implantação Automatizada do FitAI no Vercel
# Este script automatiza o processo de implantação no Vercel

echo "🚀 Iniciando implantação do FitAI no Vercel..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se o Git está configurado
echo -e "${YELLOW}📋 Verificando configuração do Git...${NC}"
if ! git config --get user.name > /dev/null; then
    echo -e "${RED}❌ Git user.name não configurado${NC}"
    echo "Por favor, configure o Git:"
    echo "git config --global user.name 'Seu Nome'"
    echo "git config --global user.email 'seu.email@exemplo.com'"
    exit 1
fi

# Verificar se o repositório Git está inicializado
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}📁 Inicializando repositório Git...${NC}"
    git init
    git add .
    git commit -m "Initial commit: FitAI project"
fi

# Verificar se há alterações para commit
echo -e "${YELLOW}📝 Verificando alterações...${NC}"
if git diff-index --quiet HEAD --; then
    echo -e "${GREEN}✅ Nenhuma alteração pendente${NC}"
else
    echo -e "${YELLOW}💾 Fazendo commit das alterações...${NC}"
    git add .
    git commit -m "FitAI: Mobile optimization and PWA support - $(date)"
fi

# Verificar se o remote do GitHub está configurado
echo -e "${YELLOW}🔗 Verificando remote do GitHub...${NC}"
if ! git remote get-url origin > /dev/null 2>&1; then
    echo -e "${RED}❌ Remote 'origin' não configurado${NC}"
    echo "Por favor, configure o remote do GitHub:"
    echo "git remote add origin https://github.com/seu-usuario/fitai.git"
    echo "git branch -M main"
    echo "git push -u origin main"
    exit 1
fi

# Enviar para o GitHub
echo -e "${YELLOW}📤 Enviando para o GitHub...${NC}"
if git push origin main; then
    echo -e "${GREEN}✅ Código enviado para o GitHub com sucesso${NC}"
else
    echo -e "${RED}❌ Falha ao enviar para o GitHub${NC}"
    exit 1
fi

# Verificar se o Vercel CLI está instalado
echo -e "${YELLOW}🔧 Verificando Vercel CLI...${NC}"
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}📦 Instalando Vercel CLI...${NC}"
    npm install -g vercel
fi

# Verificar se está logado no Vercel
echo -e "${YELLOW}👤 Verificando login no Vercel...${NC}"
if ! vercel whoami > /dev/null 2>&1; then
    echo -e "${YELLOW}🔐 Por favor, faça login no Vercel:${NC}"
    vercel login
fi

# Perguntar se quer implantar
echo -e "${YELLOW}🚀 Deseja implantar o projeto no Vercel? (y/n)${NC}"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo -e "${YELLOW}🌐 Iniciando implantação...${NC}"
    vercel --prod
    
    echo -e "${GREEN}🎉 Implantação concluída!${NC}"
    echo -e "${YELLOW}📱 Seu FitAI está agora disponível em todos os dispositivos!${NC}"
    echo -e "${YELLOW}📋 Próximos passos:${NC}"
    echo "1. Configure as variáveis de ambiente na dashboard do Vercel"
    echo "2. Teste o site em diferentes dispositivos"
    echo "3. Configure um domínio personalizado (opcional)"
else
    echo -e "${YELLOW}🛑 Implantação cancelada${NC}"
    echo "Você pode implantar manualmente com: vercel --prod"
fi

echo -e "${GREEN}✅ Script concluído${NC}"