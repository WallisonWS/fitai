import { NextRequest, NextResponse } from "next/server";
import { generateFitnessPlan } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idade, peso, altura, objetivo, rotina, restricoes } = body;

    // Validate required fields
    if (!idade || !peso || !altura || !objetivo) {
      return NextResponse.json({ error: "Campos obrigatórios: idade, peso, altura, objetivo" }, { status: 400 });
    }

    // Create prompt for Gemini
    const userPrompt = `
Você é um personal trainer e nutricionista digital especialista em emagrecimento. Gere um plano de EMAGRECIMENTO personalizado e completo.

Dados do usuário:
- Idade: ${idade} anos
- Peso: ${peso} kg
- Altura: ${altura} cm
- Objetivo principal: ${objetivo}
- Rotina diária: ${rotina || 'Não informada'}
- Restrições alimentares: ${restricoes || 'Nenhuma'}

Gere um plano completo com:

1. PLANO DE TREINAMENTO SEMANAL:
   - Divida por dias da semana (segunda a domingo)
   - Para cada dia: exercícios específicos, séries, repetições e tempo de descanso
   - Inclua exercícios aeróbicos e de força
   - Adapte ao nível do iniciante/intermediário

2. PLANO ALIMENTAR DIÁRIO:
   - Café da manhã, almoço, jantar e lanches
   - Porções específicas e alternativas
   - Calorias aproximadas
   - Dicas de preparo simples
   - Respeite as restrições alimentares

3. DICAS MOTIVACIONAIS:
   - 3-5 dicas curtas e práticas
   - Frases de motivação
   - Conselhos para manter a disciplina

4. METAS SEMANAIS:
   - Metas realistas para a primeira semana
   - Indicadores de progresso

Formate o texto de forma clara e organizada, usando tópicos e subtítulos. Seja direto, prático e motivador.
    `;

    // Call Gemini AI
    const planText = await generateFitnessPlan(userPrompt);
    
    return NextResponse.json({ plan: planText }, { status: 200 });

  } catch (error) {
    console.error("Error generating plan:", error);
    return NextResponse.json(
      { error: "Erro no servidor", details: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}