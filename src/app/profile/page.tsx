"use client";

import React from 'react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { Header } from '@/components/layout/Header';
import { User } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="px-4 py-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <User className="w-16 h-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-black mb-2">Perfil</h1>
          <p className="text-gray-500 text-center">
            Funcionalidade de perfil em desenvolvimento
          </p>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}

