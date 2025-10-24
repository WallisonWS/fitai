"use client";

import React from 'react';
import { Flame } from 'lucide-react';

interface HeaderProps {
  streak?: number;
}

export function Header({ streak = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-gray-200 safe-area-inset-top z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-black">FitCal</span>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1.5 shadow-sm">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-semibold text-black">{streak}</span>
        </div>
      </div>
    </header>
  );
}

