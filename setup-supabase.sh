#!/bin/bash

echo "🚀 Configurando FitAI com Supabase..."
echo ""

# Verificar se as variáveis de ambiente estão configuradas
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "❌ Erro: Variáveis de ambiente do Supabase não configuradas!"
    echo "Por favor, configure as seguintes variáveis no arquivo .env:"
    echo "- NEXT_PUBLIC_SUPABASE_URL"
    echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "- SUPABASE_SERVICE_ROLE_KEY"
    exit 1
fi

echo "✅ Variáveis de ambiente encontradas"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install @supabase/supabase-js
echo "✅ Dependências instaladas"
echo ""

# Atualizar o DATABASE_URL para usar o Supabase
echo "🔗 Atualizando configuração do banco de dados..."
read -p "Cole a connection string do seu Supabase (postgresql://...): " SUPABASE_DB_URL

if [ -z "$SUPABASE_DB_URL" ]; then
    echo "❌ Erro: Connection string não fornecida!"
    exit 1
fi

# Atualizar o .env com a URL do banco de dados
sed -i "s|DATABASE_URL=file:.*|DATABASE_URL=$SUPABASE_DB_URL|" .env

echo "✅ Database URL atualizada"
echo ""

# Gerar o Prisma client
echo "🔄 Gerando Prisma client..."
npm run db:generate
echo "✅ Prisma client gerado"
echo ""

# Push do schema para o Supabase
echo "📤 Enviando schema para o Supabase..."
npm run db:push
echo "✅ Schema enviado com sucesso!"
echo ""

echo "🎉 Setup completo! Seu FitAI agora está integrado com o Supabase!"
echo ""
echo "📋 Próximos passos:"
echo "1. Execute 'npm run dev' para iniciar o servidor"
echo "2. Acesse http://localhost:3000"
echo "3. Crie uma conta ou faça login"
echo "4. Comece a gerar seus planos personalizados!"
echo ""
echo "🔑 Não se esqueça de configurar sua ZAI_API_KEY no .env se ainda não o fez!"