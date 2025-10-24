"use client";

import React from 'react';
import { Flame } from 'lucide-react';
import { CircularProgress } from '../shared/CircularProgress';

interface CalorieCardProps {
  remaining: number;
  target: number;
  consumed: number;
}

export function CalorieCard({ remaining, target, consumed }: CalorieCardProps) {
  const percentage = target > 0 ? (consumed / target) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mx-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-5xl font-extrabold text-black mb-1">{remaining}</h2>
          <p className="text-sm text-gray-500">Calorias restantes</p>
        </div>
        <div className="relative">
          <CircularProgress
            value={consumed}
            max={target}
            size={64}
            strokeWidth={6}
            color="#000000"
            backgroundColor="#F3F4F6"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full p-2">
              <Flame className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

