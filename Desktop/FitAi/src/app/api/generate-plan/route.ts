import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateFitnessPlan } from "@/lib/gemini";
import { validateAuth, checkSubscription } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Validate authentication
    const authResult = await validateAuth(request);
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { userId } = authResult;
    
    // Parse request body
    const body = await request.json();
    const { idade, peso, altura, objetivo, rotina, restricoes } = body;

    // Validate required fields
    if (!idade || !peso || !altura || !objetivo) {
      return NextResponse.json({ error: "missing_required_fields" }, { status: 400 });
    }

    // Check subscription (for demo, we'll allow all requests with demo token)
    // In production, you would enforce this check
    const hasActiveSubscription = await checkSubscription(userId);
    if (!hasActiveSubscription && userId !== "demo-user-id") {
      return NextResponse.json({ error: "subscription_required" }, { status: 402 });
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
    
    // Save to database
    await db.plan.create({
      data: {
        userId,
        objetivo,
        idade,
        peso,
        altura,
        rotina: rotina || "",
        restricoes: restricoes || "",
        planText
      }
    });

    return NextResponse.json({ plan: planText }, { status: 200 });

  } catch (error) {
    console.error("Error generating plan:", error);
    return NextResponse.json(
      { error: "server_error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}