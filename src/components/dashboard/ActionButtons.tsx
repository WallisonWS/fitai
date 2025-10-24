"use client";

import React from 'react';
import { Camera, Mic, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ActionButtons() {
  const router = useRouter();

  const actions = [
    {
      icon: Camera,
      label: 'Escanear alimento',
      onClick: () => router.push('/scanner'),
    },
    {
      icon: Mic,
      label: 'Descrever refeição',
      onClick: () => {
        // TODO: Implementar reconhecimento de voz
        alert('Funcionalidade de voz em desenvolvimento');
      },
    },
    {
      icon: Search,
      label: 'Banco de comida',
      onClick: () => router.push('/food-bank'),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 px-4 mt-4">
      {actions.slice(0, 2).map((action, index) => {
        const Icon = action.icon;
        return (
          <button
            key={index}
            onClick={action.onClick}
            className="bg-[#FFE6F0] hover:bg-[#FFD6E6] active:scale-95 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Icon className="w-6 h-6 text-black" />
            <span className="text-sm font-medium text-black text-center">
              {action.label}
            </span>
          </button>
        );
      })}
      <button
        onClick={actions[2].onClick}
        className="col-span-2 bg-[#FFE6F0] hover:bg-[#FFD6E6] active:scale-95 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm"
      >
        <Search className="w-6 h-6 text-black" />
        <span className="text-sm font-medium text-black text-center">
          {actions[2].label}
        </span>
      </button>
    </div>
  );
}

