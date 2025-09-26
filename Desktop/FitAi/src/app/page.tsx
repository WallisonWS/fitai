"use client";

import { useState } from "react";
import { Loader2, Dumbbell, Apple, Target } from "lucide-react";

interface FormData {
  idade: string;
  peso: string;
  altura: string;
  objetivo: string;
  rotina?: string;
  restricoes?: string;
}

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    idade: "",
    peso: "",
    altura: "",
    objetivo: "",
    rotina: "",
    restricoes: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true);
    try {
      // Simular geração de plano (sem API)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simular delay
      
      const planText = `
# 🏋️ SEU PLANO PERSONALIZADO DE EMAGRECIMENTO

## 📊 Seus Dados:
- **Idade**: ${data.idade} anos
- **Peso**: ${data.peso} kg  
- **Altura**: ${data.altura} cm
- **Objetivo**: ${data.objetivo}

## 📅 PLANO DE TREINAMENTO SEMANAL

### Segunda-feira - Treino de Pernas + Cardio
- **Agachamento livre**: 3 séries de 12 repetições
- **Leg Press**: 3 séries de 15 repetições  
- **Panturrilha em pé**: 3 séries de 20 repetições
- **Caminhada rápida**: 30 minutos

### Terça-feira - Treino de Braços + Core
- **Flexão de braço**: 3 séries de 10 repetições
- **Rosca direta**: 3 séries de 12 repetições
- **Tríceps no banco**: 3 séries de 12 repetições
- **Prancha**: 3 séries de 30 segundos

### Quarta-feira - Cardio Intenso
- **Corrida leve**: 20 minutos
- **Burpees**: 3 séries de 8 repetições
- **Jumping Jacks**: 3 séries de 30 segundos

## 🍎 PLANO ALIMENTAR DIÁRIO

### Café da Manhã (400 calorias)
- **Opção 1**: Aveia (40g) + banana + canela + leite desnatado
- **Opção 2**: Omelete (2 ovos) + 1 fatia de pão integral + tomate

### Almoço (500 calorias)
- **Proteína**: Frango grelhado (120g) ou peixe (150g)
- **Carboidrato**: Arroz integral (3 colheres) ou batata doce (150g)
- **Vegetais**: Salada verde à vontade + legumes refogados

### Jantar (400 calorias)
- **Proteína**: Peixe grelhado (150g) ou frango (100g)
- **Carboidrato**: Quinoa (2 colheres) ou batata doce pequena
- **Vegetais**: Salada variada + legumes no vapor

## 💪 DICAS MOTIVACIONAIS

- **"Cada dia é uma nova oportunidade de ser melhor que ontem"**
- **Hidratação**: Beba pelo menos 2,5L de água por dia
- **Sono**: Durma 7-8 horas por noite para recuperação muscular
- **Consistência**: É melhor treinar 30min todos os dias do que 2h uma vez por semana

## 🎯 METAS SEMANAIS

### Semana 1 - Adaptação
- ✅ Completar 5 treinos na semana
- ✅ Beber 2L de água por dia
- ✅ Seguir o plano alimentar 80% do tempo
- ✅ Dormir 7+ horas por noite

**💪 Você consegue! Cada dia é um passo mais próximo do seu objetivo!**
      `;

      setGeneratedPlan(planText);
      alert("Plano gerado com sucesso!");
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao gerar plano");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.idade || !formData.peso || !formData.altura || !formData.objetivo) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Dumbbell className="h-8 w-8 text-emerald-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">FitAI</h1>
            <Apple className="h-8 w-8 text-orange-500" />
          </div>
          <p className="text-xl text-gray-600">
            Seu personal trainer e nutricionista digital
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!generatedPlan ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5" />
                <h2 className="text-xl font-bold">Gerar Plano Personalizado</h2>
                <div className="flex items-center gap-1 ml-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">AI Powered</span>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Preencha seus dados para receber um plano de emagrecimento personalizado
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Idade *
                    </label>
                    <input
                      type="number"
                      placeholder="30"
                      value={formData.idade}
                      onChange={(e) => handleInputChange('idade', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Peso (kg) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="70.5"
                      value={formData.peso}
                      onChange={(e) => handleInputChange('peso', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Altura (cm) *
                    </label>
                    <input
                      type="number"
                      placeholder="175"
                      value={formData.altura}
                      onChange={(e) => handleInputChange('altura', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Objetivo Principal *
                  </label>
                  <select
                    value={formData.objetivo}
                    onChange={(e) => handleInputChange('objetivo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  >
                    <option value="">Selecione seu objetivo</option>
                    <option value="emagrecer">Emagrecer</option>
                    <option value="ganhar_massa">Ganhar massa muscular</option>
                    <option value="manter_peso">Manter peso</option>
                    <option value="melhorar_saude">Melhorar saúde geral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rotina Diária
                  </label>
                  <textarea
                    placeholder="Descreva sua rotina diária (ex: trabalho sentado, 3x por semana na academia, etc.)"
                    value={formData.rotina}
                    onChange={(e) => handleInputChange('rotina', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[100px] resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Isso nos ajuda a adaptar o plano à sua realidade
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Restrições Alimentares
                  </label>
                  <textarea
                    placeholder="Liste qualquer restrição alimentar (ex: intolerância à lactose, vegetariano, etc.)"
                    value={formData.restricoes}
                    onChange={(e) => handleInputChange('restricoes', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[100px] resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Deixe em branco se não tiver restrições
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      IA gerando seu plano...
                    </>
                  ) : (
                    "Gerar Meu Plano com IA"
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="h-5 w-5" />
                <h2 className="text-xl font-bold">Seu Plano Personalizado por IA</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Plano gerado especialmente para você pela nossa Inteligência Artificial
              </p>

              <div className="bg-gray-50 p-6 rounded-lg max-h-[60vh] overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm">{generatedPlan}</pre>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setGeneratedPlan(null)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Gerar Novo Plano com IA
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedPlan);
                    alert("Plano copiado para a área de transferência!");
                  }}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-md transition-all"
                >
                  Copiar Plano
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Como Funciona
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold">1. Informe Seus Dados</h3>
              </div>
              <p className="text-gray-600">
                Preencha o formulário com suas informações pessoais, objetivos e preferências.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <Dumbbell className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold">2. IA Analisa</h3>
              </div>
              <p className="text-gray-600">
                Nossa inteligência artificial analisa seus dados e cria um plano personalizado.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Apple className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold">3. Receba Seu Plano</h3>
              </div>
              <p className="text-gray-600">
                Receba um plano completo com treinos, nutrição e dicas motivacionais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}