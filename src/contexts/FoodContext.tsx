'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Ingredient {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Meal {
  id: string;
  name: string;
  time: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  healthScore: number;
  ingredients: Ingredient[];
}

interface DailyData {
  caloriesConsumed: number;
  caloriesGoal: number;
  protein: number;
  proteinGoal: number;
  carbs: number;
  carbsGoal: number;
  fat: number;
  fatGoal: number;
  meals: Meal[];
}

interface FoodContextType {
  dailyData: DailyData;
  addMeal: (meal: Meal) => void;
  resetDaily: () => void;
}

const initialDailyData: DailyData = {
  caloriesConsumed: 0,
  caloriesGoal: 2400,
  protein: 0,
  proteinGoal: 120,
  carbs: 0,
  carbsGoal: 230,
  fat: 0,
  fatGoal: 30,
  meals: [],
};

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export function FoodProvider({ children }: { children: ReactNode }) {
  const [dailyData, setDailyData] = useState<DailyData>(initialDailyData);

  const addMeal = (meal: Meal) => {
    setDailyData((prev) => ({
      ...prev,
      caloriesConsumed: prev.caloriesConsumed + meal.calories,
      protein: prev.protein + meal.protein,
      carbs: prev.carbs + meal.carbs,
      fat: prev.fat + meal.fat,
      meals: [meal, ...prev.meals],
    }));
  };

  const resetDaily = () => {
    setDailyData(initialDailyData);
  };

  return (
    <FoodContext.Provider value={{ dailyData, addMeal, resetDaily }}>
      {children}
    </FoodContext.Provider>
  );
}

export function useFoodContext() {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error('useFoodContext must be used within a FoodProvider');
  }
  return context;
}

