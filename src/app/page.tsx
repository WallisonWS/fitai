'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { FloatingButton } from '@/components/layout/FloatingButton';
import { WeekCalendar } from '@/components/dashboard/WeekCalendar';
import { CalorieCard } from '@/components/dashboard/CalorieCard';
import { MacroCard } from '@/components/dashboard/MacroCard';
import { ActionButtons } from '@/components/dashboard/ActionButtons';
import { MealList } from '@/components/dashboard/MealList';
import { useFoodContext } from '@/contexts/FoodContext';

export default function HomePage() {
  const { dailyData } = useFoodContext();

  const caloriesRemaining = dailyData.caloriesGoal - dailyData.caloriesConsumed;
  const proteinRemaining = dailyData.proteinGoal - dailyData.protein;
  const carbsRemaining = dailyData.carbsGoal - dailyData.carbs;
  const fatRemaining = dailyData.fatGoal - dailyData.fat;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5E6F8] to-white pb-24">
      <Header streak={0} />
      
      <main className="px-4 py-6 space-y-6">
        {/* Calendário Semanal */}
        <WeekCalendar />

        {/* Card de Calorias */}
        <CalorieCard
          consumed={dailyData.caloriesConsumed}
          remaining={caloriesRemaining}
          goal={dailyData.caloriesGoal}
        />

        {/* Cards de Macros */}
        <div className="grid grid-cols-3 gap-3">
          <MacroCard
            label="Proteínas"
            value={dailyData.protein}
            goal={dailyData.proteinGoal}
            color="pink"
          />
          <MacroCard
            label="Carbos"
            value={dailyData.carbs}
            goal={dailyData.carbsGoal}
            color="orange"
          />
          <MacroCard
            label="Gorduras"
            value={dailyData.fat}
            goal={dailyData.fatGoal}
            color="blue"
          />
        </div>

        {/* Botões de Ação */}
        <ActionButtons />

        {/* Lista de Refeições */}
        {dailyData.meals.length > 0 ? (
          <MealList meals={dailyData.meals} />
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center">
            <p className="text-gray-500 text-sm">
              Nenhuma refeição registrada hoje.
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Escaneie um alimento para começar!
            </p>
          </div>
        )}
      </main>

      <FloatingButton />
      <BottomNavigation />
    </div>
  );
}

