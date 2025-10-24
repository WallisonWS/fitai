"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Flame, Beef, Wheat, Droplet, Edit2, Heart } from 'lucide-react';
import type { Meal } from '@/types';

// Mock data - em produção, buscar do banco de dados
const mockMeal: Meal = {
  id: '1',
  userId: 'user1',
  name: 'Carne de contra filé grelhada com arroz branco e batata',
  imageUrl: '/reference/1000357751.jpg',
  timestamp: new Date('2024-10-23T16:33:00'),
  totalCalories: 706,
  protein: 50.2,
  carbs: 56.3,
  fat: 30.5,
  healthScore: 7,
  ingredients: [
    {
      id: '1',
      foodId: 'f1',
      name: 'Contra filé grelhado',
      amount: 150,
      unit: 'g',
      calories: 367,
      protein: 35,
      carbs: 0,
      fat: 25,
    },
    {
      id: '2',
      foodId: 'f2',
      name: 'Arroz branco',
      amount: 100,
      unit: 'g',
      calories: 218,
      protein: 5,
      carbs: 45,
      fat: 1,
    },
    {
      id: '3',
      foodId: 'f3',
      name: 'Batata cozida',
      amount: 100,
      unit: 'g',
      calories: 76,
      protein: 2,
      carbs: 17,
      fat: 0,
    },
    {
      id: '4',
      foodId: 'f4',
      name: 'Sal',
      amount: 2,
      unit: 'g',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    {
      id: '5',
      foodId: 'f5',
      name: 'Óleo de oliva',
      amount: 5,
      unit: 'ml',
      calories: 45,
      protein: 0,
      carbs: 0,
      fat: 5,
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function MealDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [meal, setMeal] = useState<Meal>(mockMeal);

  const handleSave = () => {
    // TODO: Salvar alterações no banco de dados
    alert('Refeição salva com sucesso!');
    router.back();
  };

  const handleEdit = (field: string) => {
    const newValue = prompt(`Editar ${field}:`, '');
    if (newValue) {
      // TODO: Atualizar valor
      alert(`${field} atualizado!`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Imagem Hero */}
      <div className="relative w-full h-64 bg-gray-200">
        {meal.imageUrl ? (
          <img
            src={meal.imageUrl}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Flame className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        {/* Botão voltar */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg safe-area-inset-top"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="px-4 py-6 space-y-6">
        {/* Informações básicas */}
        <div>
          <p className="text-sm text-gray-500 mb-1">
            {meal.timestamp.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <h1 className="text-xl font-bold text-black">{meal.name}</h1>
        </div>

        {/* Card de Calorias */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-black" />
              <div>
                <p className="text-xs text-gray-500">Calorias</p>
                <p className="text-2xl font-bold text-black">{meal.totalCalories}</p>
              </div>
            </div>
            <button
              onClick={() => handleEdit('Calorias')}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cards de Macros */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-1 mb-2">
              <Beef className="w-4 h-4 text-[#E74C3C]" />
              <p className="text-xs text-gray-500">Prots</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-black">{meal.protein}g</p>
              <button
                onClick={() => handleEdit('Proteínas')}
                className="text-gray-400 hover:text-black"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-1 mb-2">
              <Wheat className="w-4 h-4 text-[#F39C12]" />
              <p className="text-xs text-gray-500">Carbos</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-black">{meal.carbs}g</p>
              <button
                onClick={() => handleEdit('Carboidratos')}
                className="text-gray-400 hover:text-black"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-1 mb-2">
              <Droplet className="w-4 h-4 text-[#3498DB]" />
              <p className="text-xs text-gray-500">Gords</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-black">{meal.fat}g</p>
              <button
                onClick={() => handleEdit('Gorduras')}
                className="text-gray-400 hover:text-black"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Pontuação de Saúde */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              <p className="text-sm font-medium text-black">Pontuação de Saúde</p>
            </div>
            <p className="text-sm font-bold text-black">{meal.healthScore}/10</p>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${(meal.healthScore / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Ingredientes */}
        <div>
          <h2 className="text-lg font-semibold text-black mb-3">Ingredientes</h2>
          <div className="grid grid-cols-2 gap-3">
            {meal.ingredients.map((ingredient) => (
              <div key={ingredient.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-sm font-medium text-black mb-1 line-clamp-2">
                  {ingredient.name}
                </p>
                <p className="text-lg font-bold text-black mb-2">
                  {ingredient.calories} Kcal
                </p>
                <button
                  onClick={() => handleEdit(ingredient.name)}
                  className="text-gray-400 hover:text-black"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Botões de ação */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <button
            onClick={() => router.back()}
            className="bg-[#FFE6F0] hover:bg-[#FFD6E6] active:scale-95 rounded-2xl py-3 px-4 text-black font-medium transition-all"
          >
            Corrigir
          </button>
          <button
            onClick={handleSave}
            className="bg-black hover:bg-gray-800 active:scale-95 rounded-2xl py-3 px-4 text-white font-medium transition-all"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

