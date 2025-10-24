// Types for FitCal App

export interface Meal {
  id: string;
  userId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  timestamp: Date;
  totalCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  healthScore: number;
  ingredients: Ingredient[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Ingredient {
  id: string;
  foodId: string;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Food {
  id: string;
  name: string;
  brand?: string;
  category: string;
  servingSize: number;
  servingUnit: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  barcode?: string;
}

export interface DailyLog {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  targetCalories: number;
  consumedCalories: number;
  targetProtein: number;
  consumedProtein: number;
  targetCarbs: number;
  consumedCarbs: number;
  targetFat: number;
  consumedFat: number;
  meals: string[]; // IDs das refeições
  streak: number;
}

export interface UserSettings {
  id: string;
  userId: string;
  dailyCalorieTarget: number;
  proteinTarget: number;
  carbsTarget: number;
  fatTarget: number;
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'lose_weight' | 'maintain' | 'gain_muscle';
}

export type MacroType = 'protein' | 'carbs' | 'fat';

export interface MacroInfo {
  type: MacroType;
  value: number;
  target: number;
  unit: string;
  color: string;
  icon: string;
}

export interface WeekDay {
  day: string;
  date: number;
  isToday: boolean;
  hasData: boolean;
}

