# Análise do Design FitCal - Referências Visuais

## Resumo Executivo
O aplicativo FitCal é um contador de calorias com funcionalidades de scanner de alimentos, registro de refeições e acompanhamento de macronutrientes. O design segue uma estética moderna com tons de rosa/lilás e elementos arredondados.

## Telas Identificadas

### 1. Tela Inicial (Home)
**Imagem de referência**: 1000357749.jpg

**Elementos principais**:
- **Header**: 
  - Logo "FitCal" no topo esquerdo
  - Ícone de fogo (streak/sequência) no topo direito com contador "0"
  - Calendário semanal com dias da semana (T, Q, Q, S, S, D) - dias 15-20

- **Card de Calorias Restantes**:
  - Valor grande: "2408"
  - Subtítulo: "Calorias restantes"
  - Ícone de fogo com círculo de progresso

- **Card de Macronutrientes** (3 colunas):
  - **Proteínas**: 119g (ícone vermelho/rosa)
  - **Carbos**: 228g (ícone laranja/amarelo)
  - **Gorduras**: 28g (ícone azul)

- **Botões de Ação** (3 cards rosa claro com ícones):
  1. **Escanear alimento** - ícone de câmera
  2. **Descrever refeição** - ícone de microfone
  3. **Banco de comida** - ícone de lupa

- **Barra de Navegação Inferior**:
  - Início (casa) - ativo
  - Estatísticas (gráfico)
  - Favoritos (coração)
  - Botão central flutuante "X" (fechar/menu)

---

### 2. Tela de Scanner de Alimento
**Imagem de referência**: 1000357750.jpg

**Elementos principais**:
- **Câmera ativa** mostrando preview da comida
- **Overlay de scanner** com cantos em L (frame de captura)
- **Botão X** no topo esquerdo (fechar)
- **Botão de ajuda** (?) no topo direito

- **Botões de Ação Inferiores** (2 cards rosa claro):
  1. **Escanear Alimento** - ícone de câmera
  2. **Galeria** - ícone de imagem

- **Mesma barra de navegação inferior**

---

### 3. Tela de Dashboard/Resumo Diário
**Imagem de referência**: 1000357751.jpg

**Elementos principais**:
- **Header**: Título "Conte suas calorias com o FitCal" (overlay de vídeo/marketing)
- **Calendário semanal** (mesmo da tela inicial)

- **Card Principal de Calorias**:
  - Valor: "1702"
  - Label: "Calorias restantes"
  - Ícone de fogo com círculo de progresso

- **Cards de Macronutrientes** (3 colunas com círculos de progresso):
  - **Proteínas**: 68g (círculo vermelho/rosa parcialmente preenchido)
  - **Carbos**: 172g (círculo laranja/amarelo parcialmente preenchido)
  - **Gorduras**: -2g (círculo azul vazio)

- **Lista de Refeições**:
  - Card com imagem da refeição
  - Título: "Carne de contra filé..."
  - Horário: "13:33"
  - Calorias: "706 kcal" (ícone de fogo)
  - Macros: 50g proteína, 56g carbos, 31g gorduras

- **Botão flutuante "+"** (adicionar refeição) - preto, canto inferior direito

- **Barra de navegação inferior**: Início ativo

---

### 4. Tela de Detalhes da Refeição (Parte 1)
**Imagem de referência**: 1000357752.jpg

**Elementos principais**:
- **Imagem da refeição** no topo (fullscreen ou hero)
- **Botão voltar** (seta) no topo esquerdo

- **Card de Informações**:
  - Horário: "16:33"
  - Nome: "Carne de contra filé grelhada com arroz branco e batata"
  
  - **Card de Calorias**:
    - Valor: "706"
    - Ícone de fogo
    - Botão de edição (lápis)

  - **Cards de Macros** (3 colunas):
    - **Prots**: 50.2g (ícone vermelho, botão de edição)
    - **Carbos**: 56.3g (ícone laranja, botão de edição)
    - **Gords**: 30.5g (ícone azul, botão de edição)

  - **Pontuação de Saúde**:
    - Ícone de coração
    - Barra de progresso verde
    - Valor: "7/10"

- **Botões de Ação**:
  - **Corrigir** (rosa claro)
  - **Salvar** (preto)

---

### 5. Tela de Detalhes da Refeição (Parte 2 - Ingredientes)
**Imagem de referência**: 1000357753.jpg

**Elementos principais**:
- **Mesma estrutura da tela anterior** (scroll para baixo)

- **Seção "Ingredientes"**:
  - Grid de cards com ingredientes individuais:
    1. **Contra filé grelhado**: 367 Kcal (botão de edição)
    2. **Arroz branco**: 218 Kcal (botão de edição)
    3. **Batata cozida**: 76 Kcal (botão de edição)
    4. **Sal**: 0 Kcal (botão de edição)
    5. **Óleo de oliva**: 45 Kcal (botão de edição)

- **Botões de Ação** (mesmos da tela anterior):
  - **Corrigir**
  - **Salvar**

---

## Paleta de Cores

### Cores Principais
- **Background**: Rosa muito claro / Lilás pastel (#F5E6F8 aproximadamente)
- **Cards**: Rosa claro (#FFE6F0 aproximadamente)
- **Texto primário**: Preto / Cinza escuro
- **Texto secundário**: Cinza médio

### Cores de Ícones/Macros
- **Proteínas**: Vermelho/Rosa (#E74C3C ou similar)
- **Carboidratos**: Laranja/Amarelo (#F39C12 ou similar)
- **Gorduras**: Azul (#3498DB ou similar)
- **Calorias/Fogo**: Preto com fundo branco

### Cores de Ação
- **Botão primário (Salvar)**: Preto (#000000)
- **Botão secundário (Corrigir)**: Rosa claro transparente
- **Botão flutuante (+)**: Preto com sombra

---

## Tipografia

- **Título principal (FitCal)**: Sans-serif, bold
- **Valores grandes (calorias)**: Sans-serif, extra bold, tamanho grande
- **Labels**: Sans-serif, regular, tamanho médio
- **Texto de cards**: Sans-serif, medium

---

## Componentes UI

### Cards
- **Border radius**: Grande (16-20px)
- **Padding**: Generoso (16-24px)
- **Shadow**: Sutil, suave
- **Background**: Branco ou rosa claro

### Botões
- **Border radius**: Grande (12-16px)
- **Padding**: 12-16px vertical
- **Ícones**: Centralizados, tamanho médio
- **Texto**: Abaixo do ícone ou ao lado

### Círculos de Progresso
- **Stroke width**: Médio (6-8px)
- **Background**: Cinza claro
- **Fill**: Cor do macro correspondente
- **Animação**: Suave

### Ícones
- **Estilo**: Line icons (outline)
- **Tamanho**: 20-24px (pequenos), 32-40px (médios)
- **Cores**: Preto ou cores dos macros

---

## Navegação

### Bottom Navigation
- **5 itens**: Início, Busca, Adicionar (+), Vídeos, Perfil
- **Ícones**: Outline quando inativo, filled quando ativo
- **Indicador**: Cor ou preenchimento do ícone
- **Background**: Branco com sombra superior

### Botão Flutuante
- **Posição**: Canto inferior direito
- **Forma**: Círculo
- **Cor**: Preto
- **Ícone**: "+" branco
- **Shadow**: Pronunciada

---

## Funcionalidades Identificadas

1. **Contador de calorias diário**
2. **Rastreamento de macronutrientes** (proteínas, carboidratos, gorduras)
3. **Scanner de alimentos via câmera**
4. **Upload de fotos da galeria**
5. **Descrição de refeição por voz**
6. **Banco de dados de alimentos**
7. **Histórico de refeições**
8. **Calendário semanal**
9. **Pontuação de saúde das refeições**
10. **Edição de valores nutricionais**
11. **Detalhamento de ingredientes**
12. **Sistema de streaks/sequência**

---

## Requisitos Técnicos

### PWA
- **Manifest.json** configurado
- **Service Worker** para offline
- **Ícones** em múltiplos tamanhos (192px, 512px, 1024px)
- **Splash screens** para iOS e Android

### Funcionalidades Nativas
- **Acesso à câmera** (MediaDevices API)
- **Acesso à galeria** (File Input)
- **Reconhecimento de voz** (Web Speech API)
- **Notificações push** (opcional)
- **Armazenamento local** (IndexedDB ou LocalStorage)

### Compatibilidade
- **Android**: Chrome, WebView
- **iOS**: Safari, WebView
- **Responsivo**: Mobile-first design

---

## Próximos Passos

1. ✅ Análise completa das imagens de referência
2. ⏳ Planejar arquitetura de componentes
3. ⏳ Implementar design system (cores, tipografia, componentes)
4. ⏳ Desenvolver telas principais
5. ⏳ Integrar funcionalidades de câmera e scanner
6. ⏳ Configurar PWA para Android/iOS
7. ⏳ Preparar para publicação na Play Store

---

## Notas Importantes

- O design atual do projeto (FitAI) é completamente diferente do design de referência (FitCal)
- Será necessária uma **refatoração completa** da interface
- O projeto atual usa Next.js + React - **manter stack**
- Adicionar biblioteca de UI components (shadcn/ui já está configurada)
- Implementar sistema de design tokens para cores e espaçamentos
- Criar componentes reutilizáveis para cards, botões, círculos de progresso

