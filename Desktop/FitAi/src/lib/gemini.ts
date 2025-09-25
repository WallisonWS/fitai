import { GoogleGenerativeAI } from '@google/generative-ai';
import ZAI from "z-ai-web-dev-sdk";

// Inicializa o Gemini com a API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyBwAZ8WKJOHlbgJVlCPKB6gSY5fpn_Yzpo');

export const gemini = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function generateFitnessPlan(prompt: string): Promise<string> {
  try {
    // Tentar usar o Gemini primeiro
    const result = await gemini.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Plano gerado com sucesso usando Gemini AI");
    return text;
  } catch (geminiError) {
    console.warn('Gemini não disponível, usando Z.AI como fallback:', geminiError);
    
    // Fallback para Z.AI
    try {
      const zai = await ZAI.create();
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Você é um personal trainer e nutricionista digital especialista em emagrecimento."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.6,
        max_tokens: 1200
      });

      const planText = completion.choices[0]?.message?.content || "Não foi possível gerar o plano.";
      console.log("Plano gerado com sucesso usando Z.AI (fallback)");
      return planText;
    } catch (zaiError) {
      console.error('Ambos Gemini e Z.AI falharam:', zaiError);
      throw new Error('Falha ao gerar plano com IA - ambos os serviços indisponíveis');
    }
  }
}