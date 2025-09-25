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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calculator, Target, Clock, Utensils, Dumbbell } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  // Dados básicos
  idade: z.string().min(1, "Idade é obrigatória").max(3, "Idade inválida"),
  peso: z.string().min(1, "Peso é obrigatório").max(6, "Peso inválido"),
  altura: z.string().min(1, "Altura é obrigatória").max(6, "Altura inválida"),
  sexo: z.enum(["masculino", "feminino"], { message: "Selecione o sexo" }),
  
  // Objetivos
  objetivo: z.string().min(1, "Objetivo é obrigatório"),
  pesoMeta: z.string().optional(),
  prazoMeta: z.string().optional(),
  
  // Nível de atividade
  nivelAtividade: z.enum(["sedentario", "leve", "moderado", "intenso", "muito_intenso"]),
  experienciaTreino: z.enum(["iniciante", "intermediario", "avancado"]),
  
  // Disponibilidade
  diasTreino: z.array(z.string()).min(1, "Selecione pelo menos 1 dia"),
  tempoTreino: z.string().min(1, "Selecione o tempo disponível"),
  localTreino: z.enum(["casa", "academia", "ambos"]),
  
  // Preferências alimentares
  restricoes: z.array(z.string()).optional(),
  preferenciasAlimentares: z.string().optional(),
  refeicoesDia: z.string().min(1, "Selecione quantas refeições por dia"),
  
  // Saúde
  problemaSaude: z.string().optional(),
  medicamentos: z.string().optional(),
  
  // Motivação
  motivacao: z.string().optional(),
  desafios: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface AdvancedFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export function AdvancedForm({ onSubmit, isLoading }: AdvancedFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [imc, setImc] = useState<number | null>(null);
  const [imcCategory, setImcCategory] = useState<string>("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idade: "",
      peso: "",
      altura: "",
      sexo: undefined,
      objetivo: "",
      pesoMeta: "",
      prazoMeta: "",
      nivelAtividade: undefined,
      experienciaTreino: undefined,
      diasTreino: [],
      tempoTreino: "",
      localTreino: undefined,
      restricoes: [],
      preferenciasAlimentares: "",
      refeicoesDia: "",
      problemaSaude: "",
      medicamentos: "",
      motivacao: "",
      desafios: "",
    },
  });

  const watchedPeso = form.watch("peso");
  const watchedAltura = form.watch("altura");

  // Calcular IMC automaticamente
  React.useEffect(() => {
    if (watchedPeso && watchedAltura) {
      const pesoNum = parseFloat(watchedPeso);
      const alturaNum = parseFloat(watchedAltura) / 100; // converter cm para m
      
      if (pesoNum > 0 && alturaNum > 0) {
        const imcCalculado = pesoNum / (alturaNum * alturaNum);
        setImc(imcCalculado);
        
        if (imcCalculado < 18.5) setImcCategory("Abaixo do peso");
        else if (imcCalculado < 25) setImcCategory("Peso normal");
        else if (imcCalculado < 30) setImcCategory("Sobrepeso");
        else setImcCategory("Obesidade");
      }
    }
  }, [watchedPeso, watchedAltura]);

  const steps = [
    { id: 1, title: "Dados Básicos", icon: Calculator },
    { id: 2, title: "Objetivos", icon: Target },
    { id: 3, title: "Treino", icon: Dumbbell },
    { id: 4, title: "Alimentação", icon: Utensils },
    { id: 5, title: "Finalizar", icon: Clock },
  ];

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const diasSemana = [
    { id: "segunda", label: "Segunda" },
    { id: "terca", label: "Terça" },
    { id: "quarta", label: "Quarta" },
    { id: "quinta", label: "Quinta" },
    { id: "sexta", label: "Sexta" },
    { id: "sabado", label: "Sábado" },
    { id: "domingo", label: "Domingo" },
  ];

  const restricoesOptions = [
    "Vegetariano",
    "Vegano",
    "Intolerância à lactose",
    "Celíaco (sem glúten)",
    "Diabetes",
    "Hipertensão",
    "Colesterol alto",
    "Alergia a frutos do mar",
    "Alergia a nozes",
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Questionário Completo - FitAI
          <div className="flex items-center gap-1 ml-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">AI Powered</span>
          </div>
        </CardTitle>
        <CardDescription>
          Preencha todas as informações para receber um plano ultra-personalizado
        </CardDescription>
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mt-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= step.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                <step.icon className="h-4 w-4" />
              </div>
              <span className={`ml-2 text-sm ${
                currentStep >= step.id ? 'text-blue-600 font-medium' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-2 ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Etapa 1: Dados Básicos */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Dados Básicos</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="idade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Idade</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="peso"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Peso (kg)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="70.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="altura"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Altura (cm)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="175" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="sexo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="masculino" id="masculino" />
                            <label htmlFor="masculino">Masculino</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="feminino" id="feminino" />
                            <label htmlFor="feminino">Feminino</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Calculadora de IMC */}
                {imc && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Seu IMC</h4>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {imc.toFixed(1)}
                      </Badge>
                      <span className="text-blue-700">{imcCategory}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navegação */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>
              
              {currentStep < 5 ? (
                <Button type="button" onClick={nextStep}>
                  Próximo
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gerando Plano...
                    </>
                  ) : (
                    "Gerar Plano Personalizado"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}