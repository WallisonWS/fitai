import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'Imagem não fornecida' },
        { status: 400 }
      );
    }

    // Usar GPT-4 Vision para analisar a imagem
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analise esta imagem de alimento e retorne APENAS um JSON válido (sem markdown, sem explicações) com a seguinte estrutura:
{
  "name": "nome do prato/alimento em português",
  "calories": número total de calorias,
  "protein": gramas de proteína,
  "carbs": gramas de carboidratos,
  "fat": gramas de gordura,
  "healthScore": pontuação de 1 a 10,
  "ingredients": [
    {
      "name": "nome do ingrediente",
      "calories": calorias do ingrediente,
      "protein": gramas de proteína,
      "carbs": gramas de carboidratos,
      "fat": gramas de gordura
    }
  ]
}

Seja preciso nas estimativas nutricionais. Se não conseguir identificar o alimento, retorne valores zerados.`,
            },
            {
              type: 'image_url',
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;
    
    if (!content) {
      throw new Error('Resposta vazia da API');
    }

    // Tentar extrair JSON da resposta (caso venha com markdown)
    let jsonContent = content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonContent = jsonMatch[0];
    }

    const foodData = JSON.parse(jsonContent);

    return NextResponse.json(foodData);
  } catch (error) {
    console.error('Erro ao analisar alimento:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao analisar imagem',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

