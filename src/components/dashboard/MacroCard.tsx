"use client";

import React from 'react';
import { CircularProgress } from '../shared/CircularProgress';
import { Beef, Wheat, Droplet } from 'lucide-react';

type MacroType = 'protein' | 'carbs' | 'fat';

interface MacroCardProps {
  type: MacroType;
  value: number;
  target: number;
}

const macroConfig = {
  protein: {
    label: 'Proteínas',
    color: '#E74C3C',
    icon: Beef,
  },
  carbs: {
    label: 'Carbos',
    color: '#F39C12',
    icon: Wheat,
  },
  fat: {
    label: 'Gorduras',
    color: '#3498DB',
    icon: Droplet,
  },
};

export function MacroCard({ type, value, target }: MacroCardProps) {
  const config = macroConfig[type];
  const Icon = config.icon;
  const percentage = target > 0 ? (value / target) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center">
      <div className="relative mb-3">
        <CircularProgress
          value={value}
          max={target}
          size={64}
          strokeWidth={6}
          color={config.color}
          backgroundColor="#F3F4F6"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-full p-1.5">
            <Icon className="w-4 h-4" style={{ color: config.color }} />
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-black">{value}g</p>
        <p className="text-xs text-gray-500 mt-0.5">{config.label}</p>
      </div>
    </div>
  );
}

