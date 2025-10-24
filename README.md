# 🔥 FitCal - Contador de Calorias com IA

**Conte suas calorias com inteligência artificial**

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8)](https://web.dev/progressive-web-apps/)

---

## 📱 Sobre o Projeto

FitCal é um aplicativo PWA (Progressive Web App) moderno para contagem de calorias e acompanhamento de macronutrientes. Com uma interface intuitiva e recursos avançados, ajuda você a alcançar seus objetivos de saúde e fitness.

### ✨ Principais Recursos

- 📸 **Scanner de Alimentos** - Tire fotos e reconheça alimentos automaticamente
- 📊 **Acompanhamento de Macros** - Proteínas, carboidratos e gorduras
- 🎯 **Metas Personalizadas** - Defina suas metas diárias
- 📅 **Calendário Semanal** - Visualize seu progresso
- 💪 **Pontuação de Saúde** - Avalie a qualidade das suas refeições
- 🔍 **Banco de Alimentos** - Milhares de alimentos cadastrados
- 🎤 **Reconhecimento de Voz** - Descreva suas refeições por voz
- 📱 **PWA Nativo** - Funciona como app nativo no Android e iOS
- 🔒 **Privacidade Total** - Dados armazenados localmente

---

## 🚀 Tecnologias

- **Next.js 15.3** - Framework React com SSR
- **React 19.2** - Biblioteca UI
- **TypeScript 5.9** - Tipagem estática
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI reutilizáveis
- **Lucide React** - Ícones modernos
- **Service Worker** - Cache e funcionalidade offline
- **IndexedDB** - Armazenamento local

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/WallisonWS/fitai.git
cd fitai/Desktop/FitAi

# Instale as dependências
pnpm install

# Execute em desenvolvimento
pnpm dev
```

Acesse: http://localhost:3000

---

## 🏗️ Estrutura do Projeto

```
Desktop/FitAi/
├── public/                 # Arquivos estáticos
│   ├── icon-*.png         # Ícones PWA
│   ├── manifest.json      # Web App Manifest
│   └── sw.js             # Service Worker
├── src/
│   ├── app/              # Páginas Next.js
│   ├── components/       # Componentes React
│   ├── lib/             # Utilitários e hooks
│   ├── types/           # TypeScript types
│   └── styles/          # Estilos globais
└── ...
```

---

## 📱 Deploy

### Vercel (Recomendado)

1. Acesse [Vercel](https://vercel.com)
2. Importe o repositório GitHub
3. Configure **Root Directory**: `Desktop/FitAi`
4. Deploy!

**Leia o guia completo**: [DEPLOY-GUIDE.md](./DEPLOY-GUIDE.md)

### Play Store

Use TWA (Trusted Web Activities) para publicar na Play Store.

**Leia o guia completo**: [DEPLOY-GUIDE.md](./DEPLOY-GUIDE.md)

---

## 🎯 Funcionalidades

### ✅ Implementadas

- [x] Dashboard com calorias e macros
- [x] Calendário semanal
- [x] Lista de refeições
- [x] Detalhes da refeição
- [x] Scanner de câmera
- [x] Upload de galeria
- [x] PWA configurado

### 🚧 Em Desenvolvimento

- [ ] Reconhecimento de alimentos (IA)
- [ ] Reconhecimento de voz
- [ ] Banco de alimentos com busca
- [ ] Estatísticas e gráficos
- [ ] Sistema de streaks
- [ ] Notificações push

---

## 👨‍💻 Autor

**Wallison WS**
- GitHub: [@WallisonWS](https://github.com/WallisonWS)

---

**Desenvolvido com ❤️ para ajudar você a alcançar seus objetivos de saúde!**

⭐ Se este projeto te ajudou, deixe uma estrela!

