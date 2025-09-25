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

  const handleAuthSuccess = (token: string) => {
    setAuthToken(token);
    // Extrair email do token JWT (simplificado)
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUserEmail(payload.email);
  };

  const handleLogout = () => {
    setAuthToken(null);
    setUserEmail(null);
    setGeneratedPlan(null);
    form.reset();
    toast.success("Deslogado com sucesso!");
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
      toast.success("Plano gerado com sucesso!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Erro ao gerar plano");
    } finally {
      setIsGenerating(false);
    }
  };

  // Temporariamente removido para teste
  // if (!authToken) { ... }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header com usuário e logout */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">FitAI</h1>
            <Apple className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center sm:text-left truncate max-w-[200px] sm:max-w-none">
              Logado como: {userEmail}
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="w-full">
              {!generatedPlan ? (
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Gerar Plano Personalizado
                      <div className="flex items-center gap-1 ml-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 font-medium">AI Powered</span>
                      </div>
                    </CardTitle>
                    <CardDescription>
                      Preencha seus dados para receber um plano de emagrecimento personalizado gerado por IA
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                          <FormField
                            control={form.control}
                            name="idade"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm sm:text-base">Idade</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="30" 
                                    className="text-sm sm:text-base"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="peso"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm sm:text-base">Peso (kg)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    step="0.1"
                                    placeholder="70.5" 
                                    className="text-sm sm:text-base"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="altura"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm sm:text-base">Altura (cm)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="175" 
                                    className="text-sm sm:text-base"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="objetivo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">Objetivo Principal</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="text-sm sm:text-base">
                                    <SelectValue placeholder="Selecione seu objetivo" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="emagrecer">Emagrecer</SelectItem>
                                  <SelectItem value="ganhar_massa">Ganhar massa muscular</SelectItem>
                                  <SelectItem value="manter_peso">Manter peso</SelectItem>
                                  <SelectItem value="melhorar_saude">Melhorar saúde geral</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="rotina"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">Rotina Diária</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Descreva sua rotina diária (ex: trabalho sentado, 3x por semana na academia, etc.)"
                                  className="resize-none text-sm sm:text-base min-h-[80px] sm:min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription className="text-xs">
                                Isso nos ajuda a adaptar o plano à sua realidade
                              </FormDescription>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="restricoes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">Restrições Alimentares</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Liste qualquer restrição alimentar (ex: intolerância à lactose, vegetariano, etc.)"
                                  className="resize-none text-sm sm:text-base min-h-[80px] sm:min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription className="text-xs">
                                Deixe em branco se não tiver restrições
                              </FormDescription>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          className="w-full h-12 sm:h-auto text-sm sm:text-base" 
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              IA gerando seu plano...
                            </>
                          ) : (
                            "Gerar Meu Plano com IA"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              ) : (
                <Card className="w-full">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <Dumbbell className="h-5 w-5" />
                      Seu Plano Personalizado por IA
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Plano gerado especialmente para você pela nossa Inteligência Artificial
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <div className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg text-sm sm:text-base max-h-[60vh] overflow-y-auto">
                        {generatedPlan}
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <Button 
                        onClick={() => setGeneratedPlan(null)}
                        variant="outline"
                        className="w-full sm:w-auto text-sm sm:text-base h-10 sm:h-auto"
                      >
                        Gerar Novo Plano com IA
                      </Button>
                      <Button 
                        onClick={() => {
                          navigator.clipboard.writeText(generatedPlan);
                          toast.success("Plano copiado para a área de transferência!");
                        }}
                        className="w-full sm:w-auto text-sm sm:text-base h-10 sm:h-auto"
                      >
                        Copiar Plano
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900 dark:text-white">
            Como Funciona
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <Card className="h-full">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  1. Informe Seus Dados
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Preencha o formulário com suas informações pessoais, objetivos e preferências.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                    <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                  </div>
                  2. IA Analisa
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Nossa inteligência artificial analisa seus dados e cria um plano personalizado.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <Apple className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  3. Receba Seu Plano
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Receba um plano completo com treinos, nutrição e dicas motivacionais.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}