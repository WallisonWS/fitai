# Plano de Arquitetura - FitCal PWA

## Stack Tecnológica

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Linguagem**: TypeScript
- **UI Library**: React 18+
- **Styling**: Tailwind CSS
- **Componentes**: shadcn/ui (já configurado)
- **Ícones**: Lucide React

### Funcionalidades Nativas
- **Câmera**: MediaDevices API (getUserMedia)
- **Galeria**: File Input API
- **Voz**: Web Speech API (SpeechRecognition)
- **Armazenamento**: IndexedDB (via Dexie.js)
- **PWA**: Workbox (Service Worker)

### Banco de Dados
- **Local**: IndexedDB para armazenamento offline
- **Estrutura**: 
  - Tabela de refeições (meals)
  - Tabela de alimentos (foods)
  - Tabela de configurações do usuário (user_settings)
  - Tabela de histórico diário (daily_logs)

---

## Estrutura de Pastas

```
src/
├── app/
│   ├── layout.tsx                 # Layout principal com navegação
│   ├── page.tsx                   # Tela inicial (Dashboard)
│   ├── scanner/
│   │   └── page.tsx              # Tela de scanner de alimentos
│   ├── meal/
│   │   └── [id]/
│   │       └── page.tsx          # Detalhes da refeição
│   ├── food-bank/
│   │   └── page.tsx              # Banco de alimentos
│   └── stats/
│       └── page.tsx              # Estatísticas
│
├── components/
│   ├── ui/                        # Componentes shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── progress.tsx
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── BottomNavigation.tsx  # Barra de navegação inferior
│   │   ├── Header.tsx            # Cabeçalho do app
│   │   └── FloatingButton.tsx    # Botão flutuante de adicionar
│   │
│   ├── dashboard/
│   │   ├── CalorieCard.tsx       # Card de calorias restantes
│   │   ├── MacroCard.tsx         # Card de macronutrientes
│   │   ├── WeekCalendar.tsx      # Calendário semanal
│   │   ├── ActionButtons.tsx     # Botões de ação (scanner, voz, banco)
│   │   └── MealList.tsx          # Lista de refeições do dia
│   │
│   ├── scanner/
│   │   ├── CameraView.tsx        # Visualização da câmera
│   │   ├── ScannerOverlay.tsx    # Overlay de scanner
│   │   └── ScannerActions.tsx    # Botões de ação do scanner
│   │
│   ├── meal/
│   │   ├── MealHeader.tsx        # Cabeçalho com imagem
│   │   ├── MealInfo.tsx          # Informações da refeição
│   │   ├── NutritionCard.tsx     # Card de nutrição
│   │   ├── HealthScore.tsx       # Pontuação de saúde
│   │   ├── IngredientsList.tsx   # Lista de ingredientes
│   │   └── MealActions.tsx       # Botões de ação (corrigir, salvar)
│   │
│   └── shared/
│       ├── CircularProgress.tsx  # Círculo de progresso
│       ├── MacroIcon.tsx         # Ícone de macro (proteína, carbo, gordura)
│       └── EditableValue.tsx     # Valor editável com lápis
│
├── lib/
│   ├── db/
│   │   ├── index.ts              # Configuração do IndexedDB
│   │   ├── meals.ts              # Operações de refeições
│   │   ├── foods.ts              # Operações de alimentos
│   │   └── settings.ts           # Operações de configurações
│   │
│   ├── api/
│   │   ├── scanner.ts            # API de scanner (OCR/IA)
│   │   ├── nutrition.ts          # API de nutrição
│   │   └── speech.ts             # API de reconhecimento de voz
│   │
│   ├── hooks/
│   │   ├── useCamera.ts          # Hook para câmera
│   │   ├── useSpeech.ts          # Hook para voz
│   │   ├── useMeals.ts           # Hook para refeições
│   │   └── useCalories.ts        # Hook para cálculo de calorias
│   │
│   └── utils/
│       ├── calories.ts           # Cálculos de calorias
│       ├── macros.ts             # Cálculos de macros
│       ├── date.ts               # Utilitários de data
│       └── format.ts             # Formatação de valores
│
├── types/
│   ├── meal.ts                   # Tipos de refeição
│   ├── food.ts                   # Tipos de alimento
│   ├── nutrition.ts              # Tipos de nutrição
│   └── user.ts                   # Tipos de usuário
│
└── styles/
    ├── globals.css               # Estilos globais
    └── tokens.css                # Design tokens (cores, espaçamentos)
```

---

## Modelos de Dados

### Meal (Refeição)
```typescript
interface Meal {
  id: string;
  userId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  timestamp: Date;
  totalCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  healthScore: number;
  ingredients: Ingredient[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Ingredient (Ingrediente)
```typescript
interface Ingredient {
  id: string;
  foodId: string;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
```

### Food (Alimento)
```typescript
interface Food {
  id: string;
  name: string;
  brand?: string;
  category: string;
  servingSize: number;
  servingUnit: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  barcode?: string;
}
```

### DailyLog (Registro Diário)
```typescript
interface DailyLog {
  id: string;
  userId: string;
  date: Date;
  targetCalories: number;
  consumedCalories: number;
  targetProtein: number;
  consumedProtein: number;
  targetCarbs: number;
  consumedCarbs: number;
  targetFat: number;
  consumedFat: number;
  meals: string[]; // IDs das refeições
  streak: number;
}
```

### UserSettings (Configurações do Usuário)
```typescript
interface UserSettings {
  id: string;
  userId: string;
  dailyCalorieTarget: number;
  proteinTarget: number;
  carbsTarget: number;
  fatTarget: number;
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'lose_weight' | 'maintain' | 'gain_muscle';
}
```

---

## Componentes Principais

### 1. Dashboard (Tela Inicial)
**Componentes**:
- Header com logo e streak
- WeekCalendar
- CalorieCard (calorias restantes)
- MacroCard (3x: proteínas, carbos, gorduras)
- ActionButtons (3x: scanner, voz, banco)
- MealList (lista de refeições do dia)
- FloatingButton (adicionar refeição)
- BottomNavigation

**Estado**:
- dailyLog (registro do dia atual)
- meals (refeições do dia)
- userSettings (metas do usuário)

**Funcionalidades**:
- Exibir calorias restantes
- Exibir progresso de macros
- Listar refeições do dia
- Navegar para scanner/voz/banco
- Adicionar nova refeição

---

### 2. Scanner (Tela de Scanner)
**Componentes**:
- CameraView (preview da câmera)
- ScannerOverlay (frame de captura)
- ScannerActions (botões: escanear, galeria)
- BottomNavigation

**Estado**:
- cameraStream (stream de vídeo)
- capturedImage (imagem capturada)
- scanResult (resultado do scan)

**Funcionalidades**:
- Ativar câmera
- Capturar foto
- Enviar para API de reconhecimento
- Selecionar da galeria
- Processar imagem

---

### 3. Meal Details (Detalhes da Refeição)
**Componentes**:
- MealHeader (imagem hero)
- MealInfo (nome, horário)
- NutritionCard (calorias e macros editáveis)
- HealthScore (pontuação de saúde)
- IngredientsList (lista de ingredientes)
- MealActions (botões: corrigir, salvar)

**Estado**:
- meal (dados da refeição)
- editMode (modo de edição)
- modifiedValues (valores modificados)

**Funcionalidades**:
- Exibir detalhes da refeição
- Editar valores nutricionais
- Editar ingredientes
- Salvar alterações
- Deletar refeição

---

### 4. Food Bank (Banco de Alimentos)
**Componentes**:
- SearchBar
- FoodList
- FoodCard
- BottomNavigation

**Estado**:
- foods (lista de alimentos)
- searchQuery (termo de busca)
- selectedFood (alimento selecionado)

**Funcionalidades**:
- Buscar alimentos
- Filtrar por categoria
- Selecionar alimento
- Adicionar à refeição

---

## Design System

### Cores (Design Tokens)
```css
:root {
  /* Cores principais */
  --color-primary: #F5E6F8;
  --color-secondary: #FFE6F0;
  --color-accent: #000000;
  
  /* Cores de macros */
  --color-protein: #E74C3C;
  --color-carbs: #F39C12;
  --color-fat: #3498DB;
  --color-calories: #000000;
  
  /* Cores de texto */
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #6B7280;
  --color-text-tertiary: #9CA3AF;
  
  /* Cores de fundo */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F9FAFB;
  --color-bg-card: #FFE6F0;
  
  /* Cores de borda */
  --color-border: #E5E7EB;
  
  /* Espaçamentos */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Border radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;
  
  /* Sombras */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
```

### Componentes Reutilizáveis

#### CircularProgress
- Props: value (0-100), color, size
- Renderiza círculo de progresso SVG
- Animação suave

#### MacroCard
- Props: type (protein/carbs/fat), value, target
- Exibe ícone, valor, círculo de progresso
- Cores dinâmicas baseadas no tipo

#### EditableValue
- Props: value, unit, onEdit
- Exibe valor com ícone de lápis
- Abre modal de edição ao clicar

#### ActionCard
- Props: icon, label, onClick
- Card rosa claro com ícone e texto
- Hover effect

---

## Fluxo de Dados

### 1. Adicionar Refeição via Scanner
```
1. Usuário clica em "Escanear alimento"
2. Câmera é ativada
3. Usuário captura foto
4. Imagem é enviada para API de reconhecimento
5. API retorna alimentos detectados + valores nutricionais
6. Usuário revisa e edita se necessário
7. Refeição é salva no IndexedDB
8. Dashboard é atualizado
```

### 2. Adicionar Refeição via Voz
```
1. Usuário clica em "Descrever refeição"
2. Microfone é ativado
3. Usuário fala descrição da refeição
4. Texto é transcrito via Web Speech API
5. Texto é enviado para API de processamento
6. API retorna alimentos + valores nutricionais
7. Usuário revisa e edita se necessário
8. Refeição é salva no IndexedDB
9. Dashboard é atualizado
```

### 3. Adicionar Refeição via Banco
```
1. Usuário clica em "Banco de comida"
2. Busca alimentos no banco de dados local
3. Seleciona alimentos e quantidades
4. Valores nutricionais são calculados
5. Refeição é salva no IndexedDB
6. Dashboard é atualizado
```

### 4. Editar Refeição
```
1. Usuário clica em refeição na lista
2. Abre tela de detalhes
3. Usuário clica em ícone de edição
4. Modifica valores
5. Clica em "Salvar"
6. Refeição é atualizada no IndexedDB
7. Dashboard é atualizado
```

---

## APIs Necessárias

### 1. Scanner de Alimentos (Opcional - pode ser mock)
- **Endpoint**: POST /api/scan
- **Input**: Imagem (base64 ou FormData)
- **Output**: Lista de alimentos detectados + valores nutricionais
- **Alternativa**: Usar API pública como FatSecret, Nutritionix, ou USDA FoodData Central

### 2. Reconhecimento de Voz
- **API**: Web Speech API (nativa do browser)
- **Fallback**: API externa se necessário

### 3. Banco de Dados de Alimentos
- **Opção 1**: Banco local (JSON) com alimentos comuns brasileiros
- **Opção 2**: API pública (FatSecret, Nutritionix)
- **Opção 3**: Criar próprio banco de dados

---

## PWA Configuration

### manifest.json
```json
{
  "name": "FitCal - Contador de Calorias",
  "short_name": "FitCal",
  "description": "Conte suas calorias com inteligência artificial",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F5E6F8",
  "theme_color": "#000000",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-1024.png",
      "sizes": "1024x1024",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### Service Worker (Workbox)
- Cache de assets estáticos
- Cache de imagens
- Offline fallback
- Background sync (opcional)

---

## Prioridades de Implementação

### Fase 1 - Core UI (Alta Prioridade)
1. ✅ Setup de design tokens
2. ✅ Componentes base (Card, Button, Progress)
3. ✅ Layout principal (Header, BottomNav, FloatingButton)
4. ✅ Dashboard (CalorieCard, MacroCard, WeekCalendar)
5. ✅ ActionButtons

### Fase 2 - Funcionalidades Básicas (Alta Prioridade)
1. ✅ IndexedDB setup
2. ✅ CRUD de refeições
3. ✅ Cálculo de calorias e macros
4. ✅ Lista de refeições
5. ✅ Detalhes da refeição

### Fase 3 - Scanner e Câmera (Média Prioridade)
1. ✅ Acesso à câmera
2. ✅ Captura de foto
3. ✅ Upload da galeria
4. ⏳ Integração com API de reconhecimento (ou mock)

### Fase 4 - Funcionalidades Avançadas (Baixa Prioridade)
1. ⏳ Reconhecimento de voz
2. ⏳ Banco de alimentos com busca
3. ⏳ Estatísticas e gráficos
4. ⏳ Sistema de streaks
5. ⏳ Notificações

### Fase 5 - PWA e Deploy (Alta Prioridade)
1. ✅ Configuração do PWA
2. ✅ Service Worker
3. ✅ Ícones e splash screens
4. ✅ Testes em Android/iOS
5. ✅ Preparação para Play Store

---

## Considerações de Performance

### Otimizações
- Lazy loading de imagens
- Code splitting por rota
- Compressão de imagens antes do upload
- Debounce em buscas
- Virtual scrolling para listas longas

### Acessibilidade
- Contraste adequado de cores
- Labels em todos os inputs
- Navegação por teclado
- ARIA labels

### SEO (para PWA)
- Meta tags adequadas
- Open Graph tags
- Sitemap
- robots.txt

---

## Próximos Passos

1. ✅ Análise de design concluída
2. ✅ Arquitetura planejada
3. ⏳ Implementar design system
4. ⏳ Criar componentes base
5. ⏳ Implementar Dashboard
6. ⏳ Implementar Scanner
7. ⏳ Implementar Detalhes da Refeição
8. ⏳ Configurar PWA
9. ⏳ Testes
10. ⏳ Deploy

