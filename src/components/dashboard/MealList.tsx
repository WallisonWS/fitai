"use client";

import React from 'react';
import { Flame, Beef, Wheat, Droplet } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Meal {
  id: string;
  name: string;
  time: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealListProps {
  meals: Meal[];
}

export function MealList({ meals }: MealListProps) {
  const router = useRouter();

  if (meals.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-black mb-3">Refeições de Hoje</h3>
      <div className="space-y-3">
        {meals.map((meal) => (
          <button
            key={meal.id}
            onClick={() => router.push(`/meal/${meal.id}`)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
          >
            {/* Imagem da refeição */}
            <div className="w-20 h-20 rounded-xl bg-gray-200 flex-shrink-0 overflow-hidden">
              {meal.image ? (
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Flame className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>

            {/* Informações da refeição */}
            <div className="flex-1 text-left">
              <h4 className="font-semibold text-black mb-1 line-clamp-1">
                {meal.name}
              </h4>
              <p className="text-xs text-gray-500 mb-2">
                {meal.time}
              </p>
              <div className="flex items-center gap-1 mb-2">
                <Flame className="w-4 h-4 text-black" />
                <span className="text-sm font-semibold text-black">
                  {meal.calories} kcal
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <Beef className="w-3 h-3 text-[#E74C3C]" />
                  <span className="text-gray-600">{meal.protein}g</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wheat className="w-3 h-3 text-[#F39C12]" />
                  <span className="text-gray-600">{meal.carbs}g</span>
                </div>
                <div className="flex items-center gap-1">
                  <Droplet className="w-3 h-3 text-[#3498DB]" />
                  <span className="text-gray-600">{meal.fat}g</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

