"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Dumbbell, Apple, Target, LogOut, Activity } from "lucide-react";
import { toast } from "sonner";
import { AuthForm } from "@/components/auth-form";
import { StatusDashboard } from "@/components/status-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  idade: z.string().min(1, "Idade é obrigatória").max(3, "Idade inválida"),
  peso: z.string().min(1, "Peso é obrigatório").max(6, "Peso inválido"),
  altura: z.string().min(1, "Altura é obrigatória").max(6, "Altura inválida"),
  objetivo: z.string().min(1, "Objetivo é obrigatório"),
  rotina: z.string().optional(),
  restricoes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idade: "",
      peso: "",
      altura: "",
      objetivo: "",
      rotina: "",
      restricoes: "",
    },
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
      const response = await fetch("/api/test-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idade: parseInt(data.idade),
          peso: parseFloat(data.peso),
          altura: parseFloat(data.altura),
          objetivo: data.objetivo,
          rotina: data.rotina || "",
          restricoes: data.restricoes || "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao gerar plano");
      }

      setGeneratedPlan(result.plan);
      toast.success("Plano gerado com sucesso!");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao gerar plano");
    } finally {
      setIsGenerating(false);
    }
  };

  // Temporariamente removido para teste
  // if (!authToken) { ... }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header com usuário e logout */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">FitAI</h1>
            <Apple className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
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
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12 sm:h-auto">
              <TabsTrigger value="generate" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-2">
                <Target className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Gerar Plano</span>
                <span className="sm:hidden">Plano</span>
              </TabsTrigger>
              <TabsTrigger value="status" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-2">
                <Activity className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Sistema</span>
                <span className="sm:hidden">Status</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate" className="mt-6">
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
            </TabsContent>
            
            <TabsContent value="status" className="mt-6">
              <StatusDashboard />
            </TabsContent>
          </Tabs>
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
    </div>
  );
}