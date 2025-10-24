"use client";

import React from 'react';
import { Plus, X } from 'lucide-react';

interface FloatingButtonProps {
  onClick?: () => void;
  isOpen?: boolean;
  className?: string;
}

export function FloatingButton({ onClick, isOpen = false, className = '' }: FloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-20 right-4 w-14 h-14 bg-black text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-40 ${className}`}
      aria-label={isOpen ? 'Fechar' : 'Adicionar'}
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <Plus className="w-6 h-6" />
      )}
    </button>
  );
}

