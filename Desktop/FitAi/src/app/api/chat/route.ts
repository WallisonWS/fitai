import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Mensagem é obrigatória" }, { status: 400 });
    }

    // Usando API gratuita do Hugging Face
    const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
      method: "POST",
      headers: {
        "Authorization": "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // Token público de exemplo
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Você é um personal trainer e nutricionista especialista. Responda de forma amigável e profissional sobre fitness, nutrição e saúde. Pergunta: ${message}`,
        parameters: {
          max_length: 200,
          temperature: 0.7,
        }
      }),
    });

    if (!response.ok) {
      // Fallback para resposta simples se a API falhar
      const fallbackResponse = getFallbackResponse(message);
      return NextResponse.json({ reply: fallbackResponse });
    }

    const data = await response.json();
    const reply = data[0]?.generated_text || getFallbackResponse(message);

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Erro no chat:", error);
    const fallbackResponse = getFallbackResponse("erro");
    return NextResponse.json({ reply: fallbackResponse });
  }
}

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("treino") || lowerMessage.includes("exercicio")) {
    return "💪 Para um bom treino, recomendo começar com 3-4 exercícios básicos: agachamento, flexão, prancha e caminhada. Comece devagar e aumente a intensidade gradualmente!";
  }
  
  if (lowerMessage.includes("dieta") || lowerMessage.includes("alimenta")) {
    return "🍎 Uma alimentação saudável inclui: proteínas magras, carboidratos integrais, muitos vegetais e frutas. Beba bastante água e evite alimentos processados!";
  }
  
  if (lowerMessage.includes("peso") || lowerMessage.includes("emagrec")) {
    return "⚖️ Para emagrecer de forma saudável: combine exercícios regulares com alimentação balanceada, durma bem e seja consistente. Resultados aparecem em 4-6 semanas!";
  }
  
  if (lowerMessage.includes("motivação") || lowerMessage.includes("desanimo")) {
    return "🔥 Lembre-se: cada dia é uma nova oportunidade! Pequenos progressos diários levam a grandes transformações. Você consegue!";
  }
  
  return "👋 Olá! Sou seu assistente fitness. Posso te ajudar com dicas sobre treino, alimentação, motivação e saúde. Como posso te ajudar hoje?";
}