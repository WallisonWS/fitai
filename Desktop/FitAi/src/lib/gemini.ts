import { GoogleGenerativeAI } from '@google/generative-ai';
import ZAI from "z-ai-web-dev-sdk";

// Inicializa o Gemini com a API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyBwAZ8WKJOHlbgJVlCPKB6gSY5fpn_Yzpo');

export const gemini = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function generateFitnessPlan(prompt: string): Promise<string> {
  // Temporariamente retornando plano fixo para teste
  console.log("Gerando plano de teste...");
  
  return `
# 🏋️ SEU PLANO PERSONALIZADO DE EMAGRECIMENTO

## 📅 PLANO DE TREINAMENTO SEMANAL

### Segunda-feira - Treino de Pernas + Cardio
- **Agachamento livre**: 3 séries de 12 repetições
- **Leg Press**: 3 séries de 15 repetições  
- **Panturrilha em pé**: 3 séries de 20 repetições
- **Caminhada rápida**: 30 minutos
- **Descanso entre séries**: 60 segundos

### Terça-feira - Treino de Braços + Core
- **Flexão de braço**: 3 séries de 10 repetições
- **Rosca direta**: 3 séries de 12 repetições
- **Tríceps no banco**: 3 séries de 12 repetições
- **Prancha**: 3 séries de 30 segundos
- **Abdominal**: 3 séries de 15 repetições

### Quarta-feira - Cardio Intenso
- **Corrida leve**: 20 minutos
- **Burpees**: 3 séries de 8 repetições
- **Jumping Jacks**: 3 séries de 30 segundos
- **Mountain Climbers**: 3 séries de 20 repetições

### Quinta-feira - Treino de Costas + Ombros
- **Remada curvada**: 3 séries de 12 repetições
- **Elevação lateral**: 3 séries de 12 repetições
- **Desenvolvimento**: 3 séries de 10 repetições
- **Pulldown**: 3 séries de 12 repetições

### Sexta-feira - Treino Funcional
- **Agachamento com salto**: 3 séries de 10 repetições
- **Flexão com rotação**: 3 séries de 8 repetições
- **Afundo alternado**: 3 séries de 12 repetições (cada perna)
- **Prancha lateral**: 2 séries de 20 segundos (cada lado)

### Sábado - Atividade Leve
- **Caminhada**: 45 minutos
- **Alongamento**: 15 minutos
- **Yoga ou Pilates**: 30 minutos

### Domingo - Descanso Ativo
- **Caminhada leve**: 30 minutos
- **Alongamento completo**: 20 minutos

## 🍎 PLANO ALIMENTAR DIÁRIO

### Café da Manhã (400 calorias)
- **Opção 1**: Aveia (40g) + banana + canela + leite desnatado (200ml)
- **Opção 2**: Omelete (2 ovos) + 1 fatia de pão integral + tomate
- **Opção 3**: Iogurte grego (150g) + granola (20g) + frutas vermelhas

### Lanche da Manhã (150 calorias)
- **Opção 1**: 1 maçã + 10 amêndoas
- **Opção 2**: Iogurte natural (100g) + 1 colher de mel
- **Opção 3**: 1 banana + 1 colher de pasta de amendoim

### Almoço (500 calorias)
- **Proteína**: Frango grelhado (120g) ou peixe (150g) ou carne magra (100g)
- **Carboidrato**: Arroz integral (3 colheres) ou batata doce (150g)
- **Vegetais**: Salada verde à vontade + legumes refogados
- **Gordura boa**: 1 colher de azeite extra virgem

### Lanche da Tarde (200 calorias)
- **Opção 1**: Vitamina de frutas com leite desnatado
- **Opção 2**: 2 fatias de pão integral + queijo branco + tomate
- **Opção 3**: Mix de castanhas (20g) + 1 fruta

### Jantar (400 calorias)
- **Proteína**: Peixe grelhado (150g) ou frango (100g) ou ovos (2 unidades)
- **Carboidrato**: Quinoa (2 colheres) ou batata doce pequena
- **Vegetais**: Salada variada + legumes no vapor
- **Sopa**: Opção de sopa de legumes com proteína

### Ceia (100 calorias) - Opcional
- **Opção 1**: Chá de camomila + 2 castanhas
- **Opção 2**: Iogurte natural (100g)
- **Opção 3**: 1 copo de leite desnatado morno

## 💪 DICAS MOTIVACIONAIS

### 🎯 Mindset Vencedor
- **"Cada dia é uma nova oportunidade de ser melhor que ontem"**
- **"O seu corpo pode fazer isso. É a sua mente que você precisa convencer"**
- **"Progresso, não perfeição"**

### 📝 Dicas Práticas
1. **Hidratação**: Beba pelo menos 2,5L de água por dia
2. **Sono**: Durma 7-8 horas por noite para recuperação muscular
3. **Consistência**: É melhor treinar 30min todos os dias do que 2h uma vez por semana
4. **Preparação**: Prepare suas refeições no domingo para a semana toda
5. **Paciência**: Resultados visíveis aparecem após 4-6 semanas de consistência

### 🔥 Frases de Motivação
- "Você não precisa ser extremo, apenas consistente"
- "A disciplina pesa gramas, o arrependimento pesa toneladas"
- "Seu futuro eu está contando com você hoje"
- "Cada treino te aproxima do seu objetivo"

## 🎯 METAS SEMANAIS

### Semana 1 - Adaptação
- ✅ Completar 5 treinos na semana
- ✅ Beber 2L de água por dia
- ✅ Seguir o plano alimentar 80% do tempo
- ✅ Dormir 7+ horas por noite
- ✅ Tirar medidas e fotos iniciais

### Indicadores de Progresso
- **Energia**: Você deve se sentir mais disposto(a)
- **Sono**: Qualidade do sono deve melhorar
- **Digestão**: Funcionamento intestinal mais regular
- **Humor**: Sensação de bem-estar e autoestima
- **Físico**: Roupas podem começar a ficar mais folgadas

### 📊 Como Acompanhar
- **Peso**: Pese-se 1x por semana, sempre no mesmo dia e horário
- **Medidas**: Tire medidas de cintura, quadril, braço e coxa
- **Fotos**: Tire fotos de frente, lado e costas para comparar
- **Diário**: Anote como se sente após cada treino

## ⚠️ OBSERVAÇÕES IMPORTANTES

- **Aquecimento**: Sempre faça 5-10 minutos de aquecimento antes do treino
- **Alongamento**: Termine cada treino com 10 minutos de alongamento
- **Progressão**: Aumente a intensidade gradualmente a cada 2 semanas
- **Descanso**: Respeite os dias de descanso para evitar lesões
- **Hidratação**: Beba água antes, durante e após os treinos

## 🚨 QUANDO PROCURAR AJUDA

- Se sentir dores persistentes
- Se tiver tonturas ou mal-estar durante exercícios
- Se não conseguir seguir o plano por mais de 3 dias seguidos
- Para ajustes personalizados após 4 semanas

---

**💪 LEMBRE-SE: O sucesso está na consistência, não na perfeição!**

**🎯 Você consegue! Cada dia é um passo mais próximo do seu objetivo!**
  `;
}