import { NextRequest, NextResponse } from "next/server";
import { generateFitnessPlan } from "@/lib/gemini";

export async function GET(request: NextRequest) {
  try {
    console.log("Testing Gemini integration...");
    
    // Test prompt
    const testPrompt = `
Você é um personal trainer digital. Gere um breve plano de treino para iniciante.
Inclua:
1. 3 exercícios básicos
2. Número de séries e repetições
3. Uma dica motivacional

Seja breve e direto.
    `;

    const result = await generateFitnessPlan(testPrompt);
    
    console.log("AI test successful!");
    console.log("Generated plan length:", result.length);
    
    return NextResponse.json({ 
      success: true, 
      message: "AI integration working (with fallback)",
      planLength: result.length,
      sample: result.substring(0, 200) + "..."
    });

  } catch (error) {
    console.error("AI test failed:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}