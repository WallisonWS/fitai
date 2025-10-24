"use client";

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { FloatingButton } from '@/components/layout/FloatingButton';
import { WeekCalendar } from '@/components/dashboard/WeekCalendar';
import { CalorieCard } from '@/components/dashboard/CalorieCard';
import { MacroCard } from '@/components/dashboard/MacroCard';
import { ActionButtons } from '@/components/dashboard/ActionButtons';
import { MealList } from '@/components/dashboard/MealList';
import type { Meal, DailyLog } from '@/types';

export default function HomePage() {
  const [dailyLog, setDailyLog] = useState<DailyLog>({
    id: '1',
    userId: 'user1',
    date: new Date().toISOString().split('T')[0],
    targetCalories: 2408,
    consumedCalories: 706,
    targetProtein: 120,
    consumedProtein: 50,
    targetCarbs: 240,
    consumedCarbs: 56,
    targetFat: 60,
    consumedFat: 31,
    meals: [],
    streak: 0,
  });

  const [meals, setMeals] = useState<Meal[]>([
    {
      id: '1',
      userId: 'user1',
      name: 'Carne de contra filé grelhada com arroz branco e batata',
      imageUrl: '/reference/1000357751.jpg',
      timestamp: new Date(),
      totalCalories: 706,
      protein: 50,
      carbs: 56,
      fat: 31,
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
    },
  ]);

  const remainingCalories = dailyLog.targetCalories - dailyLog.consumedCalories;

  return (
    <div className="min-h-screen bg-background pb-safe">
      <Header streak={dailyLog.streak} />
      
      <main className="pt-2">
        {/* Calendário Semanal */}
        <WeekCalendar />

        {/* Card de Calorias */}
        <div className="mt-4">
          <CalorieCard
            remaining={remainingCalories}
            target={dailyLog.targetCalories}
            consumed={dailyLog.consumedCalories}
          />
        </div>

        {/* Cards de Macronutrientes */}
        <div className="grid grid-cols-3 gap-3 px-4 mt-4">
          <MacroCard
            type="protein"
            value={dailyLog.consumedProtein}
            target={dailyLog.targetProtein}
          />
          <MacroCard
            type="carbs"
            value={dailyLog.consumedCarbs}
            target={dailyLog.targetCarbs}
          />
          <MacroCard
            type="fat"
            value={dailyLog.consumedFat}
            target={dailyLog.targetFat}
          />
        </div>

        {/* Botões de Ação */}
        <ActionButtons />

        {/* Lista de Refeições */}
        <MealList meals={meals} />
      </main>

      {/* Botão Flutuante */}
      <FloatingButton onClick={() => alert('Adicionar refeição')} />

      {/* Navegação Inferior */}
      <BottomNavigation />
    </div>
  );
}

